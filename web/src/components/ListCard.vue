<template>
    <div class="list-card">
        <m-card :icon="icon" :title="title">
            <div class="nav jc-between">
                <div class="nav-item" :class="{active:isActive===index}"
                    v-for="(item,index) in categories" :key="index" @click="swiper.slideTo(index)">
                    <div class="item-link">{{item.name}}</div>
                </div>
            </div>
            <div class="pt-3">
                <swiper ref="ListSwiper" :options="{autoHeight:true}"
                        @slide-change="()=>this.isActive = swiper.realIndex">
                    <swiper-slide v-for="(category, i) in categories" :key="i">
                        <slot name="items" :category="category"></slot>
                    </swiper-slide>
                </swiper>
            </div>

        </m-card>
    </div>
</template>

<script>
    export default {
        name: "ListCard",
        props:{
            icon:{type:String,required:true},
            title:{type:String,required:true},
            categories:{type:Array,required:true}
        },
        computed:{
            swiper(){
                return this.$refs.ListSwiper.$swiper;
            }
        },
        data(){
            return{
                isActive:0,
            }
        },

    }
</script>

<style scoped>

</style>