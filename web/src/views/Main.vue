<template>
  <div class="main">
    <div class="topbar bg-black py-2 px-3 text-white d-flex ai-center" >
      <img src="../assets/logo.png" height="30">
      <div class="pl-3 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-gray fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="nav bg-primary pt-3 pb-2 nav-inverse pb-1 jc-around">
        <div class="nav-item" v-for="(c,index) in cpn" :key="index" :class="{active:index===activeIndex}" @click="activeIndex=index">
            <router-link class="nav-link" tag="div" :to=c.link>{{c.title}}</router-link>
        </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data(){
      return{
          activeIndex:0,
          cpn:[
              {title:'首页',link:'/'},
              {title:'攻略中心',link:'/strategycenter'},
              {title:'赛事中心',link:'/'}
              ]
      }
  }
}
</script>
<style lang="scss">

.topbar{
    position: sticky;
    top:0;
    z-index: 99;
    .btn{
        height: 1.846rem;
    }

}

</style>
