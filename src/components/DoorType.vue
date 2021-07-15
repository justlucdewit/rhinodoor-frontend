<template>
    <div class="door-type">
        <div class="title">
            {{ name }}
        </div>

        <img :src="
            image === 'london' ? require(`../assets/doors/london.jpg`) : 
            image === 'chicago' ? require(`../assets/doors/chicago.jpg`) : 
            image === 'manchester' ? require(`../assets/doors/manchester.jpg`) : ''" />

        <div class="price">
            vanaf € {{ price }},00
        </div>

        <div class="button" @click="visitPage">
            Deur bekijken
        </div>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        link: {
            type: String,
            required: true
        },
        
        image: {
            type: String,
            required: true
        },
    },

    methods: {
        visitPage() {
            window.location.replace(this.link);
        }
    }
}
</script>

<style lang="scss">
@import "../styles/color-sceme.scss";
@import "../styles/styles.scss";

.door-type {
    box-shadow:  -2px -2px 2px lightgray, 2px -2px 2px lightgray, -2px 2px 2px lightgray, 2px 2px 2px lightgray;
    border-radius: 5px;
    width: 200px;
    height: 250px;
    margin: 15px 15px;
    padding: 20px;

    .title {
        font-weight: bolder;
    }

    .price {
        position: relative;
        bottom: -10px;
        color: #666;
    }

    .button {
        font-size: 15px;
        position: relative;
        bottom: -20px;
    }

    img {
        width: 150px;
        height: 150px;
    }
}
</style>