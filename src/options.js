import Vue from 'vue'
// import App from './App.vue'
import Options from './Options.vue'
import router from './router/options.js'
import store from './store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(Options)
}).$mount('#app')
