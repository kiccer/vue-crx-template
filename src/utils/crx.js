// 重写 chrome 扩展 api

// 转 promise 封装方法
const tryPromise = (fn) => {
    return new Promise((resolve, reject) => {
        try {
            fn(resolve, reject)
        } catch (err) {
            reject(err)
        }
    })
}

// 通过 winId 获取指定 cookie storeId
export const getStoreId = winId => {
    return tryPromise(async (resolve, reject) => {
        const win = await getWindow(winId)

        chrome.cookies.getAllCookieStores(res => {
            const store = res.find(item => item.tabIds.includes(win.tabs[0].id))

            if (store) {
                resolve(store.id)
            } else {
                reject('未找到对应的 storeId')
            }
        })
    })
}

// 获取当前窗口的 storeId
export const currentStoreId = async () => {
    const win = await currentWindow()
    return await getStoreId(win.id)
}

// 获取 cookie
export const getCookies = (payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.cookies.get(payload, res => resolve(res))
    })
}

// 设置 cookie
export const setCookie = (payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.cookies.set(payload, res => resolve(res))
    })
}

// 删除 cookie
export const removeCookie = (payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.cookies.remove(payload, res => resolve(res))
    })
}

// 获取所有cookie
export const getAllCookies = (payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.cookies.getAll(payload, res => resolve(res))
    })
}

// 操作 localStorage
export const localStorage = {
    get: key => {
        return tryPromise((resolve, reject) => {
            chrome.storage.local.get(key, res => resolve(res[key]))
        })
    },

    set: (key, val) => {
        return tryPromise((resolve, reject) => {
            chrome.storage.local.set({ [key]: val }, res => resolve(res))
        })
    }
}

// 创建 window
export const createWindow = (payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.windows.create(payload, res => resolve(res))
    })
}

// 关闭 window
export const closeWindow = windowId => {
    return tryPromise((resolve, reject) => {
        chrome.windows.remove(windowId, res => resolve(res))
    })
}

// 通过 id 获取 window
export const getWindow = windowId => {
    return tryPromise((resolve, reject) => {
        chrome.windows.get(windowId, { populate: true }, res => resolve(res))
    })
}

// 获取所有 window
export const getAllWindows = (payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.windows.getAll({ populate: true, ...payload }, res => resolve(res))
    })
}

// 获取当前窗口
export const currentWindow = () => {
    return tryPromise((resolve, reject) => {
        chrome.windows.getCurrent(res => resolve(res))
    })
}

// 往页面中注入 js 或 css
export const injectContent = (tabId, payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.tabs.executeScript(tabId, payload, res => resolve(res))
    })
}

// 关闭 tab
export const closeTab = tabId => {
    return tryPromise((resolve, reject) => {
        chrome.tabs.remove(tabId, res => resolve(res))
    })
}

// 重新加载页面
export const reloadTab = tabId => {
    return tryPromise((resolve, reject) => {
        chrome.tabs.reload(tabId, res => resolve(res))
    })
}

// 从内存中移除 tab
export const discardTab = tabId => {
    return tryPromise((resolve, reject) => {
        chrome.tabs.discard(tabId, res => resolve(res))
    })
}

// 更新 tab
export const updateTab = (tabId, payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.tabs.update(tabId, payload, res => resolve(res))
    })
}

// 获取指定 id 窗口中的所有 tab
export const windowTabs = windowId => {
    return tryPromise((resolve, reject) => {
        chrome.tabs.getAllInWindow(windowId, res => resolve(res))
    })
}

// 通知
export const notify = (payload = {}) => {
    return tryPromise((resolve, reject) => {
        chrome.notifications.create(payload, res => resolve(res))
    })
}

// sleep
export const sleep = (time = 0) => {
    return new Promise(resolve => setTimeout(resolve, time))
}

// 生成随机 hash 串
const hash = (len = 16) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const maxPos = chars.length
    let res = ''

    for (let i = 0; i < len; i++) {
        res += chars[Math.floor(Math.random() * maxPos)]
    }

    return res
}

// background 连接，只需要在 background.js 中调用一次
// popup.js 中通过 chrome.extension.getBackgroundPage() 获取
export class Connect {
    constructor () {
        // 所有连接
        this.ports = []

        // 处理器
        this.handlers = new Map()

        // 连接事件
        chrome.runtime.onConnect.addListener(port => {
            // 保存连接
            this.ports.push(port)

            // 监听消息
            port.onMessage.addListener(msg => {
                // 获取处理指令的处理器
                const handler = this.handlers.get(msg.command)
                if (!handler) throw new Error(`未找到指令 ${msg.command} 的处理器`)

                // 处理消息 (前两个是常用参数，后面两个完整参数放着备用)
                handler(msg.payload, res => {
                    const isError = res instanceof Error

                    port.postMessage({
                        token: msg.token,
                        payload: isError ? {
                            status: false,
                            message: res.message
                        } : {
                            status: true,
                            data: res
                        }
                    })
                }, msg, port)
            })

            // 监听断开连接
            port.onDisconnect.addListener(() => {
                // 移除连接
                this.ports = this.ports.filter(p => p !== port)
            })
        })
    }

    // 注册处理器
    on (command = '', handler = (payload, callback, msg, port) => {}) {
        if (!command) throw new Error('指令不能为空')
        this.handlers.set(command, handler)
    }

    // 主动触发处理器
    emit (command = '', payload) {
        return new Promise((resolve, reject) => {
            if (!command) return reject(new Error('指令不能为空'))

            // 获取处理指令的处理器
            const handler = this.handlers.get(command)
            if (!handler) return reject(new Error(`未找到指令 ${command} 的处理器`))

            // 处理消息
            handler(payload, resolve)
        })
    }

    // 主动发送消息 (向所有页面发送，主要用于广播消息、同步数据等)
    broadcast (command = '', payload = {}) {
        if (!command) throw new Error('指令不能为空')

        this.ports.forEach(port => {
            port.postMessage({ command, payload })
        })
    }
}

// content 连接，content.js 和 options.js 通过此类与 background.js 连接
export class Port {
    constructor () {
        // 异步响应
        this.promises = new Map()

        // 广播处理器
        this.handlers = new Map()

        // 连接事件
        this.port = chrome.runtime.connect({
            name: 'content'
        })

        // 监听消息
        this.port.onMessage.addListener(msg => {
            if (msg.command) {
                // 主动通信
                const handler = this.handlers.get(msg.command)
                if (!handler) throw new Error(`未找到指令 ${msg.command} 的处理器`)
                handler(msg.payload)
            } else {
                // 被动通信
                const { token, payload } = msg
                const { resolve, reject } = this.promises.get(token)

                if (payload.status) {
                    resolve(payload.data)
                } else {
                    reject(new Error(payload.message))
                }

                // 移除
                this.promises.delete(token)
            }
        })
    }

    // 监听广播消息
    on (command = '', handler = (payload) => {}) {
        if (!command) throw new Error('指令不能为空')
        this.handlers.set(command, handler)
    }

    // 发送消息
    send (command = '', payload) {
        return new Promise((resolve, reject) => {
            if (!command) return reject(new Error('指令不能为空'))
            const token = hash()
            this.promises.set(token, { resolve, reject })
            this.port.postMessage({ command, payload, token })
        })
    }
}
