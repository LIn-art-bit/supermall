<template>
    <div>
        <nav-bar>
            <div slot="left" class="back-button" @click="backClick">
                <img src="../../../assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" 
                :key= "index"
                class="title-item"
                 @click="itemClick(index)"
                :class="{active : currentIndex===index}"
               >
                {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from '../../../components/common/navbar/NavBar.vue'
    export default {
        name:"DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                titles: ['商品','参数','评论','推荐'],
                currentIndex: 0,
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index
                this.$emit('titleClick',index)
            },
            backClick() {
                this.$router.back();
            }
        }
    }
</script>

<style  scoped>
.title {
    display: flex;
}
.title-item {
    flex: 1;
}
.active {
    color: var(--color-high-text);
}
.back-button img {
    margin-top: 13px;
}
</style>