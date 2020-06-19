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

const AdminUserEdit = ()=>import('./views/admin/AdminUserEdit');
const AdminUserList = ()=>import('./views/admin/AdminUserList');

const VideoEdit = ()=>import('./views/Video/VideoEdit');
const VideoList = ()=>import('./views/Video/VideoList');

const WalkthroughEdit = ()=>import('./views/Walkthrough/WalkthroughEdit');
const WalkthroughList = ()=>import('./views/Walkthrough/WalkthroughList');

const CompetitionEdit = ()=>import('./views/competition/CompetitionEdit');
const CompetitionList = ()=>import('./views/competition/CompetitionList');

const Login = ()=>import('./views/Login');
const Register = ()=>import('./views/Register')

Vue.use(VueRouter);

const routes = [
    {path:'/login', name:'login', component:Login,meta:{isPublic:true}},
    {path:'/register',name:'register',component:Register,meta:{isPublic: true}},
    {
        path:'/', name:'home', component:Home,
        children:[
            {path:'/categories/create', component:CategoryEdit},
            {path:'/categories/list', component:CategoryList},
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

            {path:'/admin_users/create', component:AdminUserEdit},
            {path:'/admin_users/list', component:AdminUserList},
            {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true},

            {path:'/video/create', component:VideoEdit},
            {path:'/video/list', component:VideoList},
            {path:'/video/edit/:id',component:VideoEdit,props:true},

            {path:'/walkthrough/create', component:WalkthroughEdit},
            {path:'/walkthrough/list', component:WalkthroughList},
            {path:'/walkthrough/edit/:id',component:WalkthroughEdit,props:true},

            {path:'/competition/create', component:CompetitionEdit},
            {path:'/competition/list', component:CompetitionList},
            {path:'/competition/edit/:id',component:CompetitionEdit,props:true},

        ]
    },


]

const router = new VueRouter({
    routes,
    mode:'history'
})

//客户端路由限制 若页面不能公开访问且token不存在 则跳转到login页面
router.beforeEach((to,from,next)=>{
    if(!to.meta.isPublic && !localStorage.token){
      return next('/login')
    }
    next()
})
export default router
