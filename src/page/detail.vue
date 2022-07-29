<template>
  <div class="detail" v-if="info">
    <div class="top-info">
      <img class="thumb-img" :src="info.thumb_text" alt="">
      <div class="black-info">
        <div class="title">
          {{info.desc}}
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
                    <Icon name="eye-o"></Icon>
                    {{Number(info.virtual_views) + Number(info.real_views)}}
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="content" v-html="info.content">

    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'

export default {
  name: "detail",
  data() {
    return {
      id:'',
      info: null
    }
  },
  components: {
    Icon
  },
  computed: {

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
  },
  methods:{
    queryDetail(){
      this.info = null
      this.$axios.post('/Article/info',{
        id: this.id
      }).then( res => {
        console.log(res)
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
      .title{
        width: 100%;
        color: #ffffff;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .bottom-info{
        margin-top: 10px;
        display: flex;
        font-size: 10px;
        color: #ffffff;
        justify-content: space-between;
        .right{
            display: flex;
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
}
</style>
