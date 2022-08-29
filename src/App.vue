<template>
  <div id="app" :class="channel">
     <keep-alive :include="'home'">
        <router-view></router-view>    
     </keep-alive>
  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      channel:''
    }
  },
  components: {
    
  },
  created(){
      this.init()
  },
  methods:{
    init(){//初始化
      const channel = localStorage.getItem('channel')
      this.channel = channel || 'ly'
      this.$store.state.channel = channel
      this.getConfig()
    },
    getConfig(){
      this.$axios.post('/Config/config',{})
      .then( res => {
        console.log(res)
        if(res.code == 0){
          this.$store.state.logoUrl = res.data.icon
          this.$store.state.logoLink = res.data.official_url
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
 #app{
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  background: #f7f7f7;
  position: relative;
 }
</style>
