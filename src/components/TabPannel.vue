<template>
    <span class="wrapper">
        <div class="nav">
            <span :class="{active: tabNumber === 0}" @click="tabNumber = 0">Bestelling</span>
            <span :class="{active: tabNumber === 1}" @click="tabNumber = 1">Info</span>
        </div>

        <div class="tab-pannel" v-if="tabNumber === 0">
            <img class="preview" src="../assets/door.jpg"/>
            
            <div class="price">€ {{ price }},00</div>
            <div class="btw">(inclusief BTW)</div>

            <hr class="divider">
            <div class="indicator">
                <b>Breedte:</b> {{ width }}cm
            </div>
            <hr class="divider">
            <div class="indicator">
                <b>Hoogte:</b> {{ height }}cm
            </div>
            <hr class="divider">
            <div class="indicator">
                <b>Oppervlak:</b> {{ (width/1000) * (height/1000) }}m<sup>2</sup>
            </div>
            <hr class="divider">
            <div class="indicator">
                <b>Kleur:</b> {{ color }}
            </div>
            <hr class="divider">
            <div class="indicator">
                <b>Model:</b> {{ model }}
            </div>
            <hr class="divider">
        </div>

        <div class="tab-pannel" v-if="tabNumber === 1">
            <hr class="divider">
            <div class="indicator">
                <a href="#">Omschrijving</a>
            </div>
            <hr class="divider">
            <div class="indicator">
                <a href="#">Montage</a>
            </div>
            <hr class="divider">
            <div class="indicator">
                <a href="#">Handleiding</a>
            </div>
            <hr class="divider">
        </div>
    </span>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 0
        },

        height: {
            type: Number,
            default: 0
        },

        color: {
            type: String,
            default: "default color"
        },

        model: {
            type: String,
            default: "default model"
        },

        price: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            tabNumber: 0
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/color-sceme.scss";
@import "../styles/styles.scss";

.wrapper {
    @include small {
        display: none;
    }

    .nav {
        float: left;
        text-align: left;
        margin-top: 30px;
        width: 40vw;
        max-width: 500px;
        min-width: 200px;

        span {
            padding: 10px 20px;
            padding-bottom: 5px;
            margin-right: 20px;
            background: white;
            border-top: 5px solid $light-color;
            color: gray;
            cursor: pointer;
        
            &.active {
                border-top: 5px solid $main-color;
                color: black;
            }
        }
    }

    .tab-pannel {
        margin-top: 50px;
        padding-top: 20px;
        box-shadow: 5px -5px 5px lightgray, -5px 5px 5px lightgray, 5px 5px 5px lightgray;
        text-align: center;

        img {
            width: 50%;
        }

        .price {
            border: 2px solid $light-color;
            width: 60%;
            margin-left: 20%;
            border-radius: 50px;
            color: black;
            padding-top: 3px;
        }

        .btw {
            margin-top: 5px;
            margin-bottom: 15px;
            font-size: 12px;
            color: black;
        }

        .divider {
            border: 1px solid #eee;
        }

        .indicator {
            color: gray;
            text-align: left;
            padding-left: 10px;

            b {
                color: black;
            }
        }
    }
}
</style>