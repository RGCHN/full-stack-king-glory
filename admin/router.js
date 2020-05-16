import Vue from 'vue'
import VueRouter from  'vue-router'

const Home = ()=>import('./src/views/Home');
const CategoryEdit = ()=>import('./src/views/Category/CategoryEdit');
const CategoryList = ()=>import('./src/views/Category/CategoryList');

const ItemEdit = ()=>import('./src/views/item/itemEdit');
const ItemList = ()=>import('./src/views/item/itemList');

const HeroEdit = ()=>import('./src/views/hero/HeroEdit');
const HeroList = ()=>import('./src/views/hero/HeroList');

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
            {path:'/categories/edit/:id',component:CategoryEdit,props:true},

            {path:'/items/create', component:ItemEdit},
            {path:'/items/list', component:ItemList},
            {path:'/items/edit/:id',component:ItemEdit,props:true},

            {path:'/hero/create', component:HeroEdit},
            {path:'/hero/list', component:HeroList},
            {path:'/hero/edit/:id',component:HeroEdit,props:true},
        ]
    },


]

const router = new VueRouter({
    routes,
    mode:'history'
})
export default router
