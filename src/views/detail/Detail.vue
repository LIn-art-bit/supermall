<template>
    <div class="detail">
        <detail-nav-bar class="nav-bar"
         @titleClick="titleClick"
         ref="nav"></detail-nav-bar>
         <!-- <ul>
            <li v-for=" (item, i) in $store.state.cartList" :key="i">
            {{item}}
            </li>
         </ul> -->
        <Scroll class="content"
        :probe-type="3"
        :pullUPLoad="true"
        @scroll="contentScroll"
        ref="scroll"> 
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :base-info="baseInfo"></detail-base-info>
        <detail-shop-info :shop-info="shopInfo"></detail-shop-info>
       <detail-goods-info :goodsInfo ='goodsInfo' @goodsInfoImgLoad="goodsInfoImgLoad"/>
       <detail-goods-params :goodsParams="goodsParams" ref="params"></detail-goods-params>
       <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
       <good-list :goodsList="recomend" ref="recommend"></good-list>
        </Scroll>
        <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
        <back-top @click.native="backTop" v-if="isShowBackTop"></back-top>
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailGoodsParams from './childComps/DetailGoodsParams.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import DetailBottomBar from "./childComps/DetailBottomBar.vue"

import GoodList from '../../components/comtent/goods/GoodList.vue';
import BackTop from '../../components/common/backTop/BackTop.vue';

import Scroll from '../../components/common/scroll/Scroll.vue';

import {getDetail, Goods, Shop, getRecommend} from '../../network/detail'
import { mapActions } from 'vuex';
    export default {
        name:"Detail",
        data() {
            return {
                iid: null,
              topImages: [],
              baseInfo: {},
              shopInfo: {},
              goodsInfo: {},
              goodsParams: {},
              commentInfo: {},
              recomend: [],
              imgItemListener: null,
              paramTopY: [],
              currentIndex: 0,
              isShowBackTop: false,
        }
        },
        created() {
            this.iid = this.$route.params.iid;
            getDetail(this.iid).then(res => {
                    this.topImages = res.result.itemInfo.topImages; 
                    const data = res.result;
                    this.baseInfo = new Goods(data.itemInfo, data.colums, data.shopInfo.services)
                    this.shopInfo = new Shop(data.shopInfo);
                    this.goodsInfo = data.detailInfo;
                    this.goodsParams = data.itemParams;
                    this.commentInfo = data.rate;
                });
                getRecommend().then(res => {
                    
                    this.recomend = res.data.list
                })
        },
        components: {
            DetailNavBar,
            DetailSwiper,
             DetailBaseInfo,
             DetailShopInfo,
             Scroll,
             DetailGoodsInfo,
             DetailGoodsParams,
             DetailCommentInfo,
             GoodList,
             DetailBottomBar,
             BackTop,
        },
        methods: {
        goodsInfoImgLoad() {
            
            this.$refs.scorll &&  this.$refs.scorll.refresh();
            this.paramTopY = [];
            this.paramTopY.push(0);
            this.paramTopY.push(this.$refs.params.$el.offsetTop)
            this.paramTopY.push(this.$refs.comment.$el.offsetTop)
            this.paramTopY.push(this.$refs.recommend.$el.offsetTop)
            this.paramTopY.push(Number.MAX_VALUE)
        },
        //防抖函数
         debounce(func,delay) {
            let timer = null;
            return function (...args) {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    func.apply(this,args)
                },delay)
            }
        },
        titleClick(index) {
            console.log(this.paramTopY[index])
            this.$refs.scroll.scrollTop(0,-this.paramTopY[index],300)
            console.log(index)
        },
        //监听内容的滚动
        contentScroll(position) {
            // 监听滚动是否显示backtop按钮
            this.isShowBackTop = Math.abs(position.y) > 6000;
            //滑动时使title与位置相对应
            let currentPosition = -position.y;
            for( let i=0; i<this.paramTopY.length-1; i++) {
                if(this.currentIndex!==i &&currentPosition>=this.paramTopY[i]&&currentPosition<this.paramTopY[i+1]) {
                    this.currentIndex = i;
                    console.log(i)
                     this.$refs.nav.currentIndex = this.currentIndex
                }
            }
        },
        //回到顶部
        backTop() {
            this.$refs.scroll.scrollTop(0,0,200)
        },
        //添加到购物车
        addCart() {
           const product = {};
           product.title = this.baseInfo.title;
           product.desc = this.baseInfo.desc;
           product.iid = this.baseInfo.iid;
           product.realPrice = this.baseInfo.realPrice;
           product.img = this.topImages[0];
           this.addToCart(product).then(res =>{
            this.$toast.show(res,2000)
           });
           console.log(this.$store.state.cartList)
        },
        ...mapActions({addToCart: 'addCart'})
    },
      mounted() {
         //goodListItem的图片加载完后进行刷新
        const refresh = this.debounce(this.$refs.scroll.refresh, 100)
        this.imgItemListener = ()=>{
            refresh();
        }
      this.$bus.$on('detailItemImageLoad',this.imgItemListener)
    }
    }
    
</script>

<style scoped>
 .detail {
    height: 100vh;
    position: relative;
    background-color:#fff;
    position: relative;
    z-index: 9;
} 
.nav-bar {
    position: relative;
    /* z-index: 9; */
}
.content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 58px;
   overflow: hidden;
} 
</style>