import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//使用插件
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
