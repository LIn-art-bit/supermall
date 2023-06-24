<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"
    export default {
        name: "Scroll",
        data() {
            return {
                scroll: null,
            }
        },
         props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUPLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
           this.scroll=new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            pullUpLoad: this.pullUPLoad,
            click: true,
           observeDOM: true,
           })
           //监听滚动位置
            this.scroll.on('scroll',(position) => {
            // console.log(position)
            this.$emit('scroll', position);
           })
          
          this.scroll.on('pullingUp', () => {
            this.$emit('loadMore')
          })
        } ,
        methods: {
            scrollTop(x, y,time=0) {
                this.scroll&&this.scroll.scrollTo(x, y,time);
            },
            finishPull() {
                this.scroll.finishPullUp()
            },
             refresh() {
                this.scroll&&this.scroll.refresh&&this.scroll.refresh();
            },
            getSaveY() {
                return this.scroll ? this.scroll.y : 0;
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>