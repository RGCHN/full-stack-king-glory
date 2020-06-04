<template>
    <div class="news-detail" v-if="article">
        <div class="d-flex py-3 px-1 border-bottom">
            <div class="iconfont icon-back text-blue pr-1" @click="backClick"></div>
            <strong class="flex-1 text-blue">{{article.title}}</strong>
            <div class="text-gray fs-xs">2020-05-18</div>
        </div>
        <div v-html="article.body" class="px-3 news-body fa-lg py-2"></div>
        <div class="news-footer px-3">
                <div class="d-flex ai-center py-2">
                    <i class="iconfont icon-lianjie"></i>
                    <strong class="text-blue fs-lg ml-2">相关资讯</strong>
                </div>
                <div class="pt-2">
                    <router-link
                            :to="`/${type}/${item._id}`"
                            tag="div"
                            v-for="(item,index) in article.related" :key="index"
                            class="py-1 ">
                        {{item.title}}
                    </router-link>
                </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewsDetail",
        props: {
            id: {required: true},
            type:{required:true}
        },
        data(){
            return {
                article:null
            }
        },
        watch:{
          id:'fetchNews',
          type:'fetchNews'
        },
        methods:{
            async fetchNews() {
                const res = await this.$http.get(`/${this.type}/${this.id}`);
                this.article = res.data;
            },
            backClick(){
                this.$router.push('/');
            }
        },
        created(){
            this.fetchNews();
        }

    }
</script>

<style lang="scss">
   .news-detail{
       .news-body{
           img{
               max-width: 100%;
               height: auto;
           }
           p{
               margin:0;
               line-height: 1.5em;
           }
       }
       .news-footer{
           .iconfont{
               font-size:2rem;
           }
       }
   }
</style>