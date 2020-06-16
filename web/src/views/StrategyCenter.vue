<template>
    <div class="strategyCenter">
        <swiper :options="swiperOptions">
            <swiper-slide v-for="(img,index) in swiperImgs" :key="index" >
                <img :src="img.image" alt="" class="vw-100">
            </swiper-slide>
            <div class="swiper-pagination pagination-home px-3 pb-2" slot="pagination" style="text-align: right"></div>
        </swiper>

        <m-list-card icon="shipin" title="热门视频" :categories="videoCats" :auto-h="false">

        </m-list-card>

        <m-list-card icon="shipin" title="精品栏目" :categories="videoCats" :auto-h="false">
            <template #items="{category}">
                <div class="video-list d-flex flex-wrap jc-between ai-end" >
                    <div class="video-item py-2" v-for="(v,index) in category.videoList" :key="index">
                        <img :src="v.preview" alt="">
                        <p class="title px-1 fs-lg">{{v.title}}</p>
                        <div class="others pt-2 px-1 text-gray fs-sm d-flex jc-between ai-end">
                            <div class="playTimes">
                                <span class="iconfont icon-shipin"> </span>
                                {{getPlayTimes(v.playTimes)}}
                            </div>
                            <span class="date">{{getSimpleDate(v.date)}}</span>
                        </div>
                    </div>
                </div>
            </template>
        </m-list-card>

        <m-list-card icon="shipin" title="赛事精品" :categories="videoCats" :auto-h="false">
            <template #items="{category}">
                <div class="video-list d-flex flex-wrap jc-between ai-end" >
                    <div class="video-item py-2" v-for="(v,index) in category.videoList" :key="index">
                        <img :src="v.preview" alt="">
                        <p class="title px-1 fs-lg">{{v.title}}</p>
                        <div class="others pt-2 px-1 text-gray fs-sm d-flex jc-between ai-end">
                            <div class="playTimes">
                                <span class="iconfont icon-shipin"> </span>
                                {{getPlayTimes(v.playTimes)}}
                            </div>
                            <span class="date">{{getSimpleDate(v.date)}}</span>
                        </div>
                    </div>
                </div>
            </template>
        </m-list-card>

        <m-list-card icon="shipin" title="精彩视频" :categories="videoCats" :auto-h="false">
            <template #items="{category}">
                <div class="video-list d-flex flex-wrap jc-between ai-end" >
                    <div class="video-item py-2" v-for="(v,index) in category.videoList" :key="index">
                        <img :src="v.preview" alt="">
                        <p class="title px-1 fs-lg">{{v.title}}</p>
                        <div class="others pt-2 px-1 text-gray fs-sm d-flex jc-between ai-end">
                            <div class="playTimes">
                                <span class="iconfont icon-shipin"> </span>
                                {{getPlayTimes(v.playTimes)}}
                            </div>
                            <span class="date">{{getSimpleDate(v.date)}}</span>
                        </div>
                    </div>
                </div>
            </template>
        </m-list-card>

        <m-list-card icon="tuwen" title="图文攻略" :categories="walkthroughCats">
            <template #items="{category}">
                <router-link tag="div" :to="`/walkthrough/${w._id}`" class="walkthrough-item pb-2 pt-3 fs-lg d-flex pl-1"  v-for="(w,index) in category.walkthroughList" :key="index">
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
    export default {
        name: "StrategyCenter",
        data(){
            return{
                swiperOptions: {
                    pagination: {
                        el: '.pagination-home',
                    },
                    autoplay:{delay:1500},
                },
                swiperImgs:[],
                videoCats:[],
                walkthroughCats:[],
                HotVideo:[],

            }
        },
        methods:{
            async fetchSwiperImgs(){
                const res = await this.$http.get('/ads/strategy-swiper');
                this.swiperImgs = res.data[0].items;
            },
            async fetchVideoList(){
                const res = await this.$http.get('videos/list');
                this.videoCats = res.data;
            },
            async fetchWalkthrough(){
                const res= await this.$http.get('walkthrough/list');
                this.walkthroughCats = res.data;
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
        },
        created() {
            this.fetchSwiperImgs()
            this.fetchVideoList();
            this.fetchWalkthrough();
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

</style>