<template>
  <div id="app">
    <Header />
    <Navigator />

    <div class="main-body">
      <router-view />
    </div>
    
    
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import Navigator from "@/components/Navigator.vue"
import Footer from "@/components/Footer.vue"

export default {
  components: {
    Header: Header,
    Navigator: Navigator,
    Footer: Footer
  }
};
</script>

<style lang="scss">
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow-x: hidden;
}

.main-body {
  min-height: calc(100vh - 230px);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
