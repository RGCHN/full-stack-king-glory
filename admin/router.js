import Vue from 'vue'
import VueRouter from  'vue-router'

const Home = ()=>import('./src/views/Home');
const CategoryEdit = ()=>import('./src/views/Category/CategoryEdit');
const CategoryList = ()=>import('./src/views/Category/CategoryList')
Vue.use(VueRouter);

const routes = [
    {
        path:'',
        redirect:'/home',
        component:Home
    },
    {
        path:'/home',
        name:'home',
        component:Home,
        children:[
            {path:'/categories/create', component:CategoryEdit},
            {path:'/categories/list', component:CategoryList},
            /*props表示把路由中冒号后的信息注入到页面中 页面中在props中接收*/
            {path:'/categories/edit/:id',component:CategoryEdit,props:true}
        ]
    },


]

const router = new VueRouter({
    routes,
    mode:'history'
})
export default router
