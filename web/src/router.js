import Vue from 'vue'
import Router from 'vue-router'

const Home =()=>import('./views/Home')
const Main =()=>import('./views/Main')
Vue.use(Router)

const routes = [
    {
      path:'/',
      name:'main',
      component:Main,
      children:[
          {
              path:'/',name:'home',component:Home,
          }
      ]
    },

]

const router = new Router({
    routes,
    mode:'history'
})
export default router