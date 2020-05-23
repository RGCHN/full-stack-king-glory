<template>
    <div class="home">
        <swiper :options="swiperOptions">
            <swiper-slide><img src="../assets/home-images/761f7572f0ecf8a193bfed42efa4c624.jpeg" class="w-100"></swiper-slide>
            <swiper-slide><img src="../assets/home-images/f5f862d4a9e84e9a59e8768efc1cdbdc.jpeg" class="w-100"></swiper-slide>
            <swiper-slide><img src="../assets/home-images/c39560c6914a8f5cc2dbe5b7917af022.jpeg" class="w-100"></swiper-slide>
            <div class="swiper-pagination pagination-home px-3 pb-2" slot="pagination" style="text-align: right"></div>
        </swiper>

        <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-lighter">
            <div class="d-flex flex-wrap ai-end">
                <div class="nav-item pt-2" v-for="(value,key,index) in navList" :key="index">
                    <i class="sprite" :class="key"></i>
                    <p>{{value}}</p>
                </div>
            </div>
            <div class="bg-light py-2 fs-sm">
                <i class="iconfont icon-shouqi px-1"></i>
                <span>收起</span>
            </div>
        </div>

        <m-card icon="cc-menu-circle" title="新闻资讯">
            <div class="nav jc-between">
                <div class="nav-item active">热门</div>
                <div class="nav-item">新闻</div>
                <div class="nav-item">公告</div>
                <div class="nav-item">活动</div>
                <div class="nav-item">赛事</div>
            </div>

            <swiper>
                <swiper-slide v-for="i in 5" :key="i">
                    <div v-for="n in 6" :key="n" class="pt-3">
                        <span>[新闻]</span><span>|</span><span> 【520情侣皮肤】 所有等待，只为重逢</span><span>05/22</span>
                    </div>
                </swiper-slide>
            </swiper>
        </m-card>


    </div>
    
</template>
<script>
    export default {
        name: "Home",
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
                }
            }
        },

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

</style>