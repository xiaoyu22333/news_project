<template>
  <div class="container">
       <div class="header">
          <div class="title">
            <div class="logo">
              <img class="logo-icon" :src="$store.state.logoUrl" alt="" @click="gopage">
            </div>
            热门资讯
          </div>
       </div>
       <div class="content">
        <PullRefresh v-model="refreshing" @refresh="onRefresh">
          <List
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <NewList v-for="(item,index) in list" :key="index" :item="item"/>
            </List>
        </PullRefresh>
       </div>
  </div>
</template>

<script>
import { List, PullRefresh  } from 'vant'
import NewList from '@/components/NewList'
export default {
  name: "home",
  data() {
    return {
      homeIcon: require('../assets/imgs/home-'+this.$store.state.channel+'.png'),
      logoIcon: require('../assets/imgs/logo-'+this.$store.state.channel+'.png'),
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
      limit: 10,
      scrollTop: 0
    }
  },
  components: {
    List,
    NewList,
    PullRefresh 
  },
  computed: {

  },
  activated(){
     document.querySelector('.content').scrollTop = this.scrollTop
  },
  created() {
      this.$bus.on('addReadTime', this.addReadTime)
  },
  beforeDestroy(){
      this.$bus.on('addReadTime', this.addReadTime)
  },
  beforeRouteLeave(to,from,next){
    this.scrollTop = document.querySelector('.content').scrollTop
    console.log(this.scrollTop)
    next()
  },
  methods:{
    gopage(){
      window.open(this.$store.state.logoLink)
    },
    addReadTime(params){
      const data = this.list.filter( item => item.id == params)
      if(data.length > 0){
        data[0].real_views++
      }
    },
     async onLoad() {
      this.loadList()
    },
    loadList(){
      this.$axios.post('/Article/list',{
        page: this.page,
        limit: this.limit,
        keys:'',
        status: 1
      }).then( res => {
        if(res.code == 0){
          if(this.page == 1){
            this.list = res.data.data
          }else{
            this.list = this.list.concat(res.data.data)
          }
          this.loading = false
          if (this.list.length >= res.data.total) {
            this.finished = true;
          }
          if (this.refreshing) {
            this.refreshing = false;
          }
          this.page++
        }

      })
    },
    onRefresh() {
      this.page = 1
      this.scrollTop = 0
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  }
}
</script>

<style scoped lang="scss">
.container{
  padding-top: 50px;
}
.header{
  width: 100%;
  height: 50px;
  position: absolute;
  top: 0;
  left: 0px;
  background: #FFFFFF;
  box-shadow: inset 0px -0.33px 0px #B6B6B6;
  padding: 0 10px;
  box-sizing: border-box;
  .title{
    width: 100%;
    height: 100%;
    line-height: 50px;
    text-align: center;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: #333333;
    position: relative;
  }
  .logo{
    height: 100%;
    position: absolute;
    display: flex;
    align-items: center;
  }
}
.content{
  height: calc(100vh - 50px);
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
