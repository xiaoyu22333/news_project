<template>
  <div class="list" @click="detailHandle">
       <img class="thumb-img" :src="item.thumb_text" alt="">
       <div class="info-box">
        <div class="title">
            {{item.title}}
        </div>
        <div class="desc">
            {{item.desc}}
        </div>
        <div class="bottom-info">
            <div class="publish_time">
                {{item.publish_time_text}}
            </div>
            <div class="right">
               <div>
                 <img :src="require('../../public/static/head-' +$store.state.channel+ '.png')" alt="">
                 {{item.author}}
               </div>
                <div>
                    <Icon name="eye-o"></Icon>
                    {{Number(item.virtual_views) + Number(item.real_views)}}
                </div>
            </div>
        </div>
       </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
export default {
  name: "newsList",
  props:['item'],
  data() {
    return {

    }
  },
  components: {
    Icon
  },
  computed: {

  },
  created() {

  },
  methods:{
    detailHandle(){
        this.$router.push({
            path:'/detail',
            query:{
                id: this.item.id
            }
        })
    }
  }
}
</script>

<style scoped lang="scss">
.list{
    margin: 15px 10px 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 16px;
    height: 96px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.22);
    border-radius: 4px;
    box-sizing: border-box;
    .thumb-img{
        width: 84px;
        height: 67px;
    }
    .info-box{
        margin-left: 15px;
        flex: 1;
        .title{
            width: 100%;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 26px;
            color: #2B2B2B;
        }
        .desc{
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 18px;
            height: 36px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #969696;
        }
        .bottom-info{
            display: flex;
            line-height: 24px;
            font-size: 10px;
            color: #969696;
            justify-content: space-between;
            .right{
                display: flex;
                div{
                    display: flex;
                    align-items: center;
                    img{
                        margin-right: 4px;
                    }
                }
                &>div:last-child{
                    margin-left: 8px;
                }
            }
        }
    }
}
</style>
