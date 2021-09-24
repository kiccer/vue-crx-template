import Vue from 'vue'
import Content from './Content.vue'
// import router from './router'
import store from './store'

Vue.config.productionTip = false

const dom = document.createElement('div')
document.body.appendChild(dom)

new Vue({
    // router,
    store,
    render: h => h(Content)
}).$mount(dom)
