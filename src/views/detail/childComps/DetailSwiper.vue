<template>
        <swiper class="detail-swiper">
            <swiper-item v-for="(item,i) in topImages" :key="i">
            <img :src="item" alt="">
            </swiper-item>
        </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '../../../components/common/swiper/index';
    export default {
        name:"DetailSwiper",
        components: {
            Swiper, SwiperItem,

        },
        props: {
            topImages: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
.detail-swiper {
    height: 300px;
    
}
</style>