import { Connect } from '@/utils/crx'

const conn = new Connect()

// 注册处理器 'test' 为自定义的指令名称，后面的函数为处理器
// 处理器的参数为 (payload, callback, msg, port)
// payload 为消息体，callback 为回调函数，msg 为完整消息，port 为连接对象 (后两个参数一般用不到，放着备用)
conn.on('test', (payload, callback) => {
    if (payload.isError) {
        callback(new Error('测试错误'))

        // 甚至可以在这里写递归...
        // ! 注意，这是一个错误的例子，打开这个注释会出现死循环，具体使用场景请自行思考
        // conn.emit('test', payload, callback)
    } else {
        callback('测试成功')
    }
})

// 添加更多的处理器...

// 将变量暴露到全局，用于 popup.js 中调用
window.conn = conn
