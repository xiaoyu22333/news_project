<template>
  <div class="detail" ref="topInfo">
    <template v-if="info">
      <div class="top-info">
        <div class="back-icon" :style="margin" @click="goback"><Icon name="arrow-left" /></div>
        <img class="thumb-img" :src="info.thumb_text" alt="">
        <div class="black-info">
          <div class="title">
            {{info.title}}
          </div>
          <div class="bottom-info">
              <div class="publish_time">
                  {{info.publish_time_text}}
              </div>
              <div class="right">
                <div>
                  <img :src="require('../../public/static/head-' +$store.state.channel+ '.png')" alt="">
                  {{info.author}}
                </div>
                  <div>
                      <Icon name="eye-o"></Icon> {{changeNumber(Number(info.virtual_views) + Number(info.real_views))}}
                  </div>
              </div>
          </div>
        </div>
      </div>
      <div class="content" v-html="info.content">

      </div>
    </template>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: "detail",
  data() {
    return {
      id:'',
      info: null,
      screenWidth: document.body.clientWidth,
      margin:{
        'margin-left':'-250px'
      }
    }
  },
  components: {
    Icon
  },
  computed: {

  },
  watch:{
    screenWidth(){
      const width = this.$refs.topInfo.scrollWidth
      this.margin= {
        'margin-left': (0 - width/2 + 5) + 'px'
      }
    }
  },
  mounted(){
    const that = this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
        })()
    }
  },
  created() {
      if(!this.$route.query.id || this.$route.query.id == ''){
        this.$router.replace({
          path:'/'
        })
      }else{
        this.id = this.$route.query.id
        this.queryDetail()
      }
      this.$nextTick( () => {
        const width = this.$refs.topInfo.scrollWidth
        this.margin= {
          'margin-left': (0 - width/2 + 16) + 'px'
        }
      })
  },
  methods:{
    changeNumber(num){
        if(num < 10000){
            return num
        }else{
             return (num/10000).toFixed(2) + 'W'
        }
    },
    goback(){
      this.$router.push({
          path:'/'
        })
    },
    queryDetail(){
      this.info = null
      this.$axios.post('/Article/info',{
        id: this.id
      }).then( res => {
        this.$bus.emit('addReadTime',this.id)
        if(res.code == 0){
          this.info = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.detail{
  width: 100%;
  .top-info{
    width: 100%;
    position: relative;
    .back-icon{
      font-size: 24px;
      color: #ffffff;
      position: fixed;
      background: rgba(0,0,0,.4);
      top: 11px;
      left: 50%;
      padding: 2px 2px 2px 1px;
      z-index: 999;
      cursor: pointer;
      border-radius: 4px;
    }
    img{
      width: 100%;
    }
    .black-info{
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background:rgba(0,0,0,.6);
      padding: 10px;
      box-sizing: border-box;
      height: 86px;
      .title{
        width: 100%;
        color: #ffffff;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .bottom-info{
        margin-top: 10px;
        line-height: 16px;
        display: flex;
        font-size: 10px;
        color: #ffffff;
        justify-content: space-between;
        .right{
            display: flex;
            align-items: center;
            div{
                display: flex;
                align-items: center;
                img{
                    margin-right: 4px;
                    width: 16px;
                }
            }
            &>div:last-child{
                margin-left: 8px;
            }
        }
      }
    }
  }
}
.content{
  font-size: 14px;
  padding: 20px 10px;
  background: #f7f7f7;
  overflow-x: hidden;
}
</style>
