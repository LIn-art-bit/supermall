  <template>
    <div class="cart-list-item">
        <div class="button-box">
        <check-button class="item-selector" :isChecked="product.isSelected" @click.native="clickSelect"></check-button>
         </div>
         <div class="goods-img">
            <img :src="product.img">
        </div>
         <div class="goods-info">
            <div class="title">{{product.title}}</div>
            <div class="desc">{{product.desc}}</div>
            <div class="price_num">
                <div class="price">{{product.realPrice}}</div>
                <div class="num">X{{product.num}}</div>
            </div> 
        </div> 
    </div>
</template>

<script>
import CheckButton from "../../../components/common/checkbutton/CheckButton.vue"
    export default {
        name: "CartListItem",
        props: {
            product: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        components: {
            CheckButton,
        },
        methods: {
            clickSelect() {
                this.product.isSelected = !this.product.isSelected;
            }
        }
    }
</script>

<style scoped>
.cart-list-item {
    width: 100%;
    padding: 8px;
    display: flex;
    border-bottom: 2px solid rgba(100, 100, 100, .2);
}
.goods-img {
    padding: 5px;
}
.goods-img img {
    width: 80px;
    height: 110px;
    border-radius: 5px;
}

.goods-info {
    padding: 10px 5px;
    overflow: hidden;
    font-size: 17px;
    position: relative;
    color: #333;
    
}
.goods-info .title, .goods-info .desc {
    width: 100%; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.goods-info .desc {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
}
.goods-info .price_num {
    padding: 8px  5px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.goods-info .price_num .price {
    color: var(--color-high-text);
    font-size: 20px;
    font-weight: bold;
}
.button-box {
    padding-top: 40px;
}
</style>