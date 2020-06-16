import Vue from 'vue'
import Router from 'vue-router'

const Home =()=>import('./views/Home')
const Main =()=>import('./views/Main')
const NewsDetail = ()=>import('./views/NewsDetail')
const Hero = ()=>import('./views/Hero')
const StrategyCenter = ()=>import('./views/StrategyCenter')
const VideoPlay = ()=>import('./views/VideoPlay')
Vue.use(Router)

const routes = [
    {
      path:'/',
      name:'main',
      component:Main,
      children:[
          {path:'/',name:'homePage',component:Home,},
          {path:'/detail/:type/:id',name:'news-detail',component:NewsDetail,props:true},
          {path:'/strategyCenter',name:'strategyCenter',component:StrategyCenter},
          {path:'/video/:id',name:'videoPlay',component:VideoPlay,props:true},
      ]
    },
    {
        path:'/heroes/:id',name:'hero-detail',component:Hero,props:true
    }

]

const router = new Router({
    routes,
    mode:'history'
})
export default router