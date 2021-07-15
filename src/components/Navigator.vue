<template>
    <div class="nav">
      <router-link class="nav-button" to="/">Home</router-link>
      <router-link class="nav-button" to="/about">Over ons</router-link>
      <router-link class="nav-button" to="/order">Bestellen</router-link>
      <router-link class="nav-button" to="/contact">Contact</router-link>
      <router-link class="nav-button" to="/tips">Tips</router-link>
    </div>
</template>

<style lang="scss" scoped>
@import "../styles/color-sceme.scss";

.nav {
    background: $main-color;
    text-align: left;
    padding-left: 10px;
    height: 40px;

    .nav-button {
        display: inline-flex;
        color: white;
        text-decoration: none;
        padding: 10px 20px;

        &:hover {
            background: #cfeeca;
            color: black;
        }
    }
}
</style>