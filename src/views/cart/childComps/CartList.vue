<template>
    <div>
        <cart-list-item 
        v-for="(item, index) in cartList" :key="index"
        :product="item"></cart-list-item >
    </div>
</template>

<script>
import CartListItem from './CartListItem.vue';
    export default {
        name: "CartList",
        props: {
            cartList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        components: {
            CartListItem,
        }
    }
</script>

<style scoped>

</style>