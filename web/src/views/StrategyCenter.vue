<template>
    <div class="strategyCenter">
        <swiper :options="swiperOptions">
            <swiper-slide v-for="(img,index) in swiperImgs" :key="index" >
                <img :src="img.image" alt="" class="vw-100">
            </swiper-slide>
            <div class="swiper-pagination pagination-home px-3 pb-2" slot="pagination" style="text-align: right"></div>
        </swiper>
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
                swiperImgs:[]
            }
        },
        methods:{
            async fetchSwiperImgs(){
                const res = await this.$http.get('/ads/strategy-swiper');
                this.swiperImgs = res.data[0].items;
            }
        },
        created() {
            this.fetchSwiperImgs()
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