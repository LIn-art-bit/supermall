<template>
    <div class="goods">
        <good-list-item 
        v-for = " (item, i) in goodsList"
        :key="i"
        :goodsItem="item"
        ></good-list-item> 
    </div>
</template>

<script>
import GoodListItem from './GoodListItem.vue'
    export default {
        name:"GoodList",
        props: {
            goodsList:{
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            GoodListItem
        }
    }
</script>

<style>
 .goods {
    margin-top: 20px;
    width: 100%;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-around;
 }
</style>