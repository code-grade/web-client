import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueToastify, {settings} from "./plugins/toastify";
import DatetimePicker from 'vuetify-datetime-picker'
import "./plugins/global.scss"
import PopupManagerPlugin from "./plugins/popups";

Vue.config.productionTip = false

Vue.use(VueToastify, settings, router);
Vue.use(DatetimePicker)
Vue.use(PopupManagerPlugin, {vuetify, router})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
