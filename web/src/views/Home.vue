<template>
    <div class="home">
        <swiper :options="swiperOptions">
            <swiper-slide v-for="(img,index) in swiperImgs" :key="index" >
                <img :src="img.image"  alt="" class="vw-100 h-100">
            </swiper-slide>
            <div class="swiper-pagination pagination-home px-3 pb-2" slot="pagination" style="text-align: right"></div>
        </swiper>

        <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-lighter">
            <div class="d-flex flex-wrap ai-end nav-content">
                <div class="nav-item pt-2" v-for="(value,key,index) in navList" :key="index">
                    <i class="sprite" :class="key"></i>
                    <p>{{value}}</p>
                </div>
            </div>
            <div v-if="isFold" class="bg-light py-2 fs-sm foldContent"  @click="foldContent">
                <i class="iconfont icon-zhankai px-1"></i>
                <span>展开</span>
            </div>
            <div v-else class="bg-light py-2 fs-sm foldContent" @click="foldContent" >
                <i class="iconfont icon-shouqi px-1"></i>
                <span>收起</span>
            </div>
        </div>
        <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newCats">
            <template #items="{category}">
                <router-link tag="div" :to="`/detail/news/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
                    <span class="text-info">[{{news.categoriesName}}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-dark-lighter text-ellipsis pr-2">{{news.title}}</span>
                    <span class="text-gray-lighter fs-sm">{{news.createdAt|date}}</span>
                </router-link>
            </template>
        </m-list-card>

        <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
            <template #items="{category}">
                <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
                    <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center hero-box" v-for="(hero,i) in category.heroesList" :key="i">
                        <img class="w-100" :src="hero.avatar">
                        <div class="text-info">{{hero.name}}</div>
                    </router-link>
                </div>
            </template>
        </m-list-card>

        <m-list-card icon="shipin" title="精彩视频" :categories="videoCats" :auto-h="false">
                <template #items="{category}">
                    <div class="video-list d-flex flex-wrap jc-between ai-end" >
                        <router-link tag="div" :to="`/video/${v._id}`" class="video-item py-2" v-for="(v,index) in category.videoList" :key="index">
                            <img :src="v.preview" alt="">
                            <p class="title px-1 fs-lg">{{v.title}}</p>
                            <div class="others pt-2 px-1 text-gray fs-sm d-flex jc-between ai-end">
                                <div class="playTimes">
                                    <span class="iconfont icon-shipin"> </span>
                                    {{getPlayTimes(v.playTimes)}}
                                </div>
                                <span class="date">{{getSimpleDate(v.date)}}</span>
                            </div>
                        </router-link>
                    </div>
                </template>
        </m-list-card>
        <div class="load-more text-center text-gray-lighter bg-white py-3 fs-sm">
            <a type="text" href="strategyCenter">加载更多内容</a>
        </div>

        <m-list-card icon="tuwen" title="图文攻略" :categories="walkthroughCats">
            <template #items="{category}">
                <router-link tag="div" :to="`/detail/walkthrough/${w._id}`" class="walkthrough-item pb-2 pt-3 fs-lg d-flex pl-1"  v-for="(w,index) in category.walkthroughList" :key="index">
                    <div class="left mr-2">
                        <img :src="w.preview" alt="">
                    </div>
                    <div class="info flex-1">
                        <p class="title fs-xl">{{w.title}}</p>
                        <p class="des text-gray fs-md">{{w.title}}</p>
                        <p class="date text-gray-lighter fs-xs">{{getSimpleDate(w.date)}}</p>
                    </div>
                </router-link>
            </template>
        </m-list-card>
    </div>
</template>
<script>
    import dayjs from 'dayjs'
    export default {
        name: "Home",
        filters:{
            date(val){
                return dayjs(val).format('MM/DD')
            }
        },
        data() {
            return {
                swiperOptions: {
                    pagination: {
                        el: '.pagination-home',
                    },
                    autoplay:{delay:1500},
                },
                navList: {
                    'sprite-news':'爆料站',
                    'sprite-story':'故事站',
                    'sprite-mall':'周边商城',
                    'sprite-ava':'体验服',
                    'sprite-fresh':'新人专区',
                    'sprite-inherit':'荣耀•传承',
                    'sprite-modify':'模拟战资料库',
                    'sprite-camp':'王者营地',
                    'sprite-wechat':'公众号',
                    'sprite-version': '版本介绍',
                    'sprite-env':'对局环境',
                    'sprite-inf':'无限王者团',
                },
                newCats:[],
                heroCats:[],
                videoCats:[],
                walkthroughCats:[],
                swiperImgs: [],
                isFold:false
            }
        },
        created(){
            this.fetchNewsCats();
            this.fetchHeroList();
            this.fetchVideoList();
            this.fetchWalkthrough();
            this.fetchSwiperImgs();
        },
        methods:{
            async fetchNewsCats(){
                const res = await this.$http.get('news/list')
                this.newCats = res.data;
            },
            async fetchHeroList(){
                const res = await this.$http.get('heroes/list')
                this.heroCats = res.data;
            },
            async fetchVideoList(){
                const res = await this.$http.get('videos/list');
                this.videoCats = res.data;
            },
            async fetchWalkthrough(){
              const res= await this.$http.get('walkthrough/list');
              this.walkthroughCats = res.data;
            },
            async fetchSwiperImgs(){
              const res = await this.$http.get('ads/homepage-swiper');
              this.swiperImgs = res.data[0].items;
            },
            getPlayTimes(original){
                if(original>10000){
                    return original/10000 + '万';
                }
                return original
            },
            getSimpleDate(original){
                return original.substr(5);
            },
            foldContent(){
                if(this.isFold){
                    this.isFold = !this.isFold;
                    const content = document.querySelector('.nav-content');
                    content.style.height =  '204px'
                }else{
                    this.isFold = !this.isFold;
                    const content = document.querySelector('.nav-content');
                    content.style.height = '60px';
                }

            }
        }

    }
</script>

<style lang="scss">
@import '../assets/scss/variable';

    .pagination-home{
        .swiper-pagination-bullet{
            opacity: 1;
            border-radius: 0.154rem;
            background:map-get($colors,'white');
            &.swiper-pagination-bullet-active{
                background:map-get($colors,'swiper-dot');
            }
        }
    }
    .nav-icons{
        border-top:1px solid $border-color;
        .nav-content{
            overflow: hidden;
            .nav-item{
                width: 25%;
                border-left:1px solid $border-color;
                margin-bottom: 1.5rem;
                &:nth-child(4n+1){
                    border-left: none;
                }
                p{
                    -webkit-margin-before: 0;
                    -webkit-margin-after: 0;
                    margin-block-start: 0;
                    margin-block-end: 0;
                }
            }
        }

    }
    .hero-box{
        width: 20%;
    }
    .video-list{
        .video-item{
            width: 49%;
            img{
                width: 100%;
            }
            p{
                margin-block-start: 0;
                margin-block-end:0;
                line-height: 150%;
            }
            .title{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2;
                overflow: hidden;
            }
            .icon-shipin{
                font-size:xx-small;
            }
        }

    }
    .load-more{
        a{
            text-decoration:none;
        }
    }
    .walkthrough-item{
        border-bottom:1px solid $border-color;
        .left{
            height: 5.385rem;
            width: 8.923rem;
        }
        img{
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 0.154rem;
        }
        .info{
            height: 100%;
            p{
                margin-block-start: 0.1rem;
                margin-block-end: 0.25rem;
            }
            .title{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp:1;
                overflow: hidden;
                line-height: 100%;
            }
            .des{
                line-height: 150%;
            }
            .date{
                margin-block-end: 0;
            }
        }

    }




</style>