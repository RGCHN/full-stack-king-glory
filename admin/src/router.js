import Vue from 'vue'
import VueRouter from  'vue-router'

const Home = ()=>import('./views/Home');
const CategoryEdit = ()=>import('./views/Category/CategoryEdit');
const CategoryList = ()=>import('./views/Category/CategoryList');

const ItemEdit = ()=>import('./views/item/itemEdit');
const ItemList = ()=>import('./views/item/itemList');

const HeroEdit = ()=>import('./views/hero/HeroEdit');
const HeroList = ()=>import('./views/hero/HeroList');

const ArticleEdit = ()=>import('./views/articles/ArticleEdit');
const ArticleList = ()=>import('./views/articles/ArticleList');

const AdEdit = ()=>import('./views/AD/AdEdit');
const AdList = ()=>import('./views/AD/AdList');

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

            {path:'/articles/create', component:ArticleEdit},
            {path:'/articles/list', component:ArticleList},
            {path:'/articles/edit/:id',component:ArticleEdit,props:true},

            {path:'/ads/create', component:AdEdit},
            {path:'/ads/list', component:AdList},
            {path:'/ads/edit/:id',component:AdEdit,props:true},
        ]
    },


]

const router = new VueRouter({
    routes,
    mode:'history'
})
export default router
