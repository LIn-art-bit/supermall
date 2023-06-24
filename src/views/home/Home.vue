<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
         <tab-control 
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isShowTabControl"
                class="tabcontrol"
                />
           <Scroll 
          class="content" 
          ref="scroll"
          @scroll=" handleScrollContent"
          :pullUPLoad="true"
          :probe-type="3"
          @loadMore="loadMore"
          >
              <!-- @loadMore="loadMore" -->
            <home-swiper 
            :banners="banners"
            @imgFinishLoad="imgFinishLoad"/>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control 
                :titles="['流行','新款','精选']" 
                @tabClick="tabClick"
                ref="tabControl2"
                />
         <good-list :goodsList="showGoods" class="goods-list"></good-list>
        </Scroll>
        <back-top  @click.native="backClick"  v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';
import GoodList from '../../components/comtent/goods/GoodList.vue';

import NavBar from '../../components/common/navbar/NavBar.vue';
import TabControl from '../../components/comtent/TabControl.vue';
import Scroll from '../../components/common/scroll/Scroll.vue';
import BackTop from '../../components/common/backTop/BackTop.vue';

import { getHomeMultidata,getHomeGoods } from '../../network/home';

// import {itemListenerMixin} from '@/common/mixin';

export default {
    name: 'Home',
    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodList,
        Scroll,
        BackTop,
    },
    data() {
        return {
            banners:[],
            recommends:[],
            currentType: 'pop',
            goods: {
                pop: {page: 0, list: []},
                new: {page: 0, list: []},
                sell: {page: 0, list: []}
            },
            isShowBackTop: false,
            tabControlOffSetTop: 0,
            isShowTabControl: false,
            saveY: 0,
            imgItemListener: null,
        }
    },
    created() {
        this.getHomeMultidata();

        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

   
    },
    mounted() {

         const refresh = this.debounce(this.$refs.scroll.refresh, 100)
        this.imgItemListener = ()=>{
            refresh();
        }
      this.$bus.$on('homeItemImageLoad',this.imgItemListener)
    },
    methods: {
        //事件监听相关方法
        tabClick(index) {
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break;
                case 1:
                    this.currentType = 'new'
                    break;
                case 2:
                    this.currentType = 'sell'
                    break;

            }
            this.$refs.tabControl2.currentIndex=index;
            this.$refs.tabControl1.currentIndex=index;
        },
        // 1.获取首页轮播图以及推荐数据
        getHomeMultidata(){
            getHomeMultidata().then(res => {
                this.banners = res?.data?.banner?.list;
                this.recommends = res?.data?.recommend?.list;
            }).catch(err => {
                console.log(err);
            });
        },
        // 2.获取商品数据
        getHomeGoods(type){
            let page = this.goods[type].page+1;
            getHomeGoods(type, page).then(res=>{
                // this.goods[type].list.concat(res.data.list);此方法不会改变原来得数组
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page++ ;
                this.$refs.scroll.finishPull()
            });
        },

        //3. 返回顶部
        backClick() {
            this.$refs.scroll.scrollTop(0,0,300);
        },
        //4.获取滚动位置
        handleScrollContent(position) {
       
            // 1.是否显示backTop图标
            this.isShowBackTop = Math.abs(position.y) > 1000;

            // 2.障眼法显示tabControl吸顶
            this.isShowTabControl = Math.abs(position.y) > this.tabControlOffsetTop;
        },
        //5. 上拉加载更多
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        //6.防抖函数
        debounce(func,delay) {
            let timer = null;
            return function (...args) {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => {
                    func.apply(this,args)
                },delay)
            }
        },
        //7.轮播图图片加载完成
        imgFinishLoad() {
            this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    activated() {
        this.$refs.scroll.refresh();
        this.$refs.scroll.scrollTop(0,this.saveY,0);
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getSaveY();
    }
}
</script>

<style scoped>
#home {
    /* padding-top: 44px; */
    position: relative;
    height: 100vh;
}
.home-nav {
    background: var(--color-tint);
    color: #fff;
    /* position: fixed;  */
    /* text-align: center;  */
    /* position: sticky;
     top:0;
    left: 0;
    right: 0;
    z-index: 9; */
}
.content{
    /* height: 500px; */
    position: absolute;
    left: 0; 
    right: 0;
    top: 40px;
    bottom: 49px;
    overflow: hidden;
    /* background: #fff; */
}


.goods-list {
    padding: 8px;
}
.tabcontrol {
    z-index: 9;
    position: relative;
}
</style>
