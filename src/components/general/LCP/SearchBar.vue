<template>
    <span class="searchbar">
        <input type="text" ref="textInput" class="searchbar" :value="value" @input="update"/>
        <i class="fas fa-search"></i>
    </span>
</template>

<script>
export default {
    props: {
        value: String
    },

    methods: {
        update() {
            this.$emit('input', this.$refs.textInput.value);
        }
    }
}
</script>

<style>

</style>