<template>
    <div class="competition-center">
        <div class="nav">
            <div class="nav-item" :class="{active:isActive===index}"
                 v-for="(item,index) in competition" :key="index" @click="swiper.slideTo(index)">
                <div class="item-link pt-3 pb-2 px-3">{{item.name}}</div>
            </div>
        </div>
        <div class="pt-3">
            <swiper ref="ListSwiper" @slide-change="()=>this.isActive = swiper.realIndex">
                <swiper-slide v-for="(content, i) in competition" :key="i">
                    <div >
                        <h2 class="text-blue-lighter px-2">{{content.name}}</h2>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

    </div>
</template>

<script>
    export default {
        name: "CompetitionCenter",
        data(){
            return{
                competition:[],
                isActive:0,
            }
        },
        computed:{
            swiper(){
                return this.$refs.ListSwiper.$swiper;
            }
        },
        methods:{
            async fetchCompetition(){
                const res = await this.$http.get('competition/list')
                this.competition = res.data;
            }
        },
        created() {
            this.fetchCompetition();
        }

    }
</script>

<style lang="scss">
    .competition-center{
        .nav{
            width: 100vw;
            overflow-x: scroll;
            .nav-item{
                white-space:nowrap;
            }
        }

    }

</style>