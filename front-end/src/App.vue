<template>
  <div id="app">
    <Header v-if="this.$route.path!='/login'"></Header>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components:{Header},
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
