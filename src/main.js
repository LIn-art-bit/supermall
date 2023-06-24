import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import toast from './components/common/toast/index'
//添加fastclick解决移动端点击延迟问题
import FasstClick from 'fastclick'
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue(); //注册事件总线
Vue.use (toast)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
FasstClick.attach(document.body)