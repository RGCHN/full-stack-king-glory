<template>
    <div class="hero-detail">
        <div class="topbar bg-black py-2 px-3 text-white d-flex ai-center" v-if="model">
            <img src="../assets/logo.png" height="30">
            <div class="text flex-1 ml-3">
                <span class="text-white">王者荣耀</span>
                <span class="ml-3">攻略站</span>
            </div>
            <router-link to="/" tag="div">更多英雄 &gt;</router-link>
        </div>
        <div class="top" :style="{'background-image':`url(${model.banner})`}">
            <div class="info text-white d-flex p-3 h-100 flex-column jc-end">
                <span class="fs-sm">{{model.title}}</span>
                <h2 class="my-2">{{model.name}}</h2>
                <span class="fs-sm">{{getHeroType()}}</span>
                <div class="d-flex jc-between">
                    <div class="scores pt-1 d-flex ai-center" v-if="scores">
                        <span>难度</span>
                        <span class="badge bg-dark-yellow text-light-1">{{scores.difficult}}</span>
                        <span>技能</span>
                        <span class="badge bg-dark-blue text-light-1">{{scores.skills}}</span>
                        <span>攻击</span>
                        <span class="badge bg-danger text-light-1">{{scores.attack}}</span>
                        <span>攻击</span>
                        <span class="badge bg-dark text-light-1">{{scores.survive}}</span>
                    </div>
                    <router-link to="/" tag="span" class="text-gray-lighter fs-sm">皮肤: 8 &gt;</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Hero",
        props:{
            id:{required:true}
        },
        data(){
            return {
                model: {},
                heroType:[],
                scores:{}
            }
        },
        methods:{
            async fetchHero(){
                let res = await this.$http.get(`/heroes/${this.id}`);
                this.model = res.data;
                this.heroType = res.data.categories;
                this.scores = res.data.scores;
            },
            getHeroType(){
                return this.heroType.map(item=>item.name).join('/');
            }
        },
        created() {
            this.fetchHero();
        }
    }
</script>

<style lang="scss">
    .hero-detail{
        .top{
            height: 48vw;
            background: #fff no-repeat top center;
            background-size:auto 100%;
        }
        .info{
            background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
            .scores{
                .badge{
                    margin:0 0.25rem;
                    display: inline-block;
                    height: 1rem;
                    width: 1rem;
                    line-height: 0.9rem;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 0.6rem;
                    border:1px solid rgba(255,255,255,0.2)
                }
            }
        }
    }
</style>