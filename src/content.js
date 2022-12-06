import Vue from 'vue'
import Content from './Content.vue'
// import router from './router'
import store from './store'
import { Port } from '@crx-api/messaging'

const isProd = process.env.NODE_ENV === 'production'

Vue.config.productionTip = false
Vue.prototype.$port = new Port('my-extensions')

// 如果是本地开发环境就跳过，防止双重渲染问题
if (
    !(/localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(location.href) && isProd)
) {
    const dom = document.createElement('div')
    document.body.appendChild(dom)

    new Vue({
        // router,
        store,
        render: h => h(Content)
    }).$mount(dom)
}
