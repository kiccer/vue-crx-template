import Vue from 'vue'
// import App from './App.vue'
import Popup from './Popup.vue'
import router from './router/popup.js'
import store from './store'
import { Port } from '@crx-api/messaging'

Vue.config.productionTip = false
Vue.prototype.$port = new Port('my-extensions')

new Vue({
    router,
    store,
    render: h => h(Popup)
}).$mount('#app')
