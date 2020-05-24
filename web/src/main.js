import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from "./router";
import './assets/icon-font/iconfont.css'

import VueAwesomeSwiper from "vue-awesome-swiper";
import 'swiper/css/swiper.css';
Vue.use(VueAwesomeSwiper)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:'http://localhost:3000/web/api'
})

//卡片组件
import Card from "./components/Card";
import ListCard from "./components/ListCard";
Vue.component('m-list-card',ListCard)
Vue.component('m-card',Card)
;
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
