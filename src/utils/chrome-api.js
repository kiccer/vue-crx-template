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
    },

    remove: key => {
        return tryPromise((resolve, reject) => {
            chrome.storage.local.remove(key, res => resolve(res))
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
