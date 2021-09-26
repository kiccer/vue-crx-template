import Vue from 'vue'
// import App from './App.vue'
import Popup from './Popup.vue'
import router from './router/popup.js'
import store from './store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(Popup)
}).$mount('#app')
