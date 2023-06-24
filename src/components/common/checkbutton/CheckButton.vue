<template>
    <div class="check-button">
        <img :class="{check : isChecked}" src="../../../assets/img/cart/tick.svg">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
        props: {
            isChecked: {
                type: Boolean,
                default: false,
            }
        }
    }

</script>

<style  scoped>
.check-button {
    border-radius: 50%;
    /* text-align: center; */
    /* background-color: red; */
}
.check-button img {
     width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid rgba(100,100,100,.2);
}
.check {
     background-color: var(--color-tint);
}
</style>