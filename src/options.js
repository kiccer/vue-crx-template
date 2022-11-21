import Vue from 'vue'
// import App from './App.vue'
import Options from './Options.vue'
import router from './router/options.js'
import store from './store'
import { Port } from '@/utils/crx.js'

Vue.config.productionTip = false
Vue.prototype.$port = new Port()

new Vue({
    router,
    store,
    render: h => h(Options)
}).$mount('#app')
