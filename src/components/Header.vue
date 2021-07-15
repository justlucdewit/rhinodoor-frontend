<template>
    <div class="header">
        <img src="@/assets/logo-white-bg.png" class="header-logo"/>
        <span class="site-title">Rhino Door</span>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../styles/color-sceme.scss";

.header {
    font-size: 60px;
    background: $main-color;
    color: white;
    font-weight: bold;
    text-align: left;
    display: flex;
    align-items: center;
    height: 75px;

    .header-logo {
        height: 100px;
        margin-right: 20px;
    }

    .site-title {
        padding-top: 20px;
        font-size: #{"max(17px, min(4vw, 40px))"}
    }
}
</style>