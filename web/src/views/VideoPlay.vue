<template>
    <div class="videoPlay" v-if="video">
        <video controls autoplay class="videoBox">
            <source :src="video.hyperlink" type="video/mp4">
        </video>
        <div class="detail px-2 mt-3">
            <div class="d-flex">
                <img src="../assets/default_head.jpg" class="head-img pr-3 ">
                <div class="info">
                    <div class="title">{{video.title}}</div>
                    <div class="info mt-1 text-gray">
                        <span>投稿：113</span>
                        <span>粉丝：212</span>
                        <div class="my-1">个性签名：</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="like f-flex mt-3">
            <i class="icon-font icon-gerenzhongxincainixihuan"></i>
            <span class="guesslike">猜您喜欢</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoPlay",
        props:{
            id:{required:true}
        },
        data(){
            return {
                video:''
            }
        },
        methods:{
          async fetchVideo(){
              const res = await this.$http.get(`/video/${this.id}`);
              this.video = res.data;
          }
        },
        created() {
            this.fetchVideo();
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/variable';
    .videoBox{
        width: 100vw;
    }
    .detail{
        border: 2px soild $border-color;
        .head-img{
            height: 5rem;
        }
    }



</style>