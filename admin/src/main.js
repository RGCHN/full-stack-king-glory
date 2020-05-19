import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import http from "./network/http";

Vue.config.productionTip = false;
//添加到原型中以便项目中直接使用
Vue.prototype.$http = http;

//文件上传的header中携带token
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
