<template>
    <div class="goods-item"  @click="itemClick">
        <img :src="showImg" @load="imgLoad">    
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodListItem",
        props: {
            goodsItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods:{
           imgLoad() {
            if(this.$route.path.indexOf ('/home')) {
            this.$bus.$emit('homeItemImageLoad')
            } 
            else if(this.$route.path.indexOf ('/detail')) {
                this.$bus.$emit('detailItemImageLoad')
            }
           },
           itemClick() {
            this.$router.push('/detail/'+this.goodsItem.iid)
           }
        },
        computed: {
            showImg() {
                if(this.goodsItem.image) return this.goodsItem.image;
                else  return  this.goodsItem.show.img
            }
        }
    }
</script>

<style>
 .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 48%;
}
.goods-item img{
    width: 100%;
    border-radius: 8px;
}
.goods-info {
    text-align: center;
    padding: 3px;
    position: absolute;
    bottom: 0px;
    left:0;
    right: 0;
    overflow: hidden;
    font-size: 14px;
}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.goods-info .price {
    color: var(--color-high-text);
    margin-right: 24px;
}
.goods-info .collect {
    position: relative;
}
.goods-info .collect::before{
    content: '';
    position: absolute;
    top: 0;
    left: -16px;
    width: 14px;
    height: 14px;
    background: url('../../../assets/img/common/collect.svg') 0 0/14px 14px;
} 
</style>