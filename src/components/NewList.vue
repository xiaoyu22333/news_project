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
                <div class="readTime">
                    <Icon name="eye-o"></Icon>
                    <span>{{changeNumber(Number(item.virtual_views) + Number(item.real_views))}}</span>
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
    },
    changeNumber(num){
        if(num < 10000){
            return num
        }else{
             return (num/10000).toFixed(2) + 'W'
        }
    }
  }
}
</script>

<style scoped lang="scss">
.list{
    margin: 10px 10px 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 6px 16px;
    height: 90px;
    background: #FFFFFF;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.22);
    border-radius: 4px;
    box-sizing: border-box;
    .thumb-img{
        width: 88px;
        height: 66px;
        border-radius: 2px;
    }
    .info-box{
        flex: 1;
        box-sizing: border-box;
        padding-left: 8px;
        box-sizing: border-box;
        overflow: hidden;
        .title{
            width: 100%;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 15px;
            color: #2B2B2B;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .desc{
            margin-top: 4px;
            font-family: 'PingFang SC';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            height: 32px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            color: #969696;
        }
        .bottom-info{
            display: flex;
            font-size: 12px;
            line-height: 14px;
            margin-top: 7px;
            color: #969696;
            justify-content: space-between;
            .right{
                display: flex;
                img{
                    width: 14px;
                }
                .readTime{
                    span{
                        width: 55px;
                        display: inline-block;
                        padding-left: 2px;
                    }
                }
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
