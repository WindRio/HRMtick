<template>
  <div id="app">
    <Router />
    <router-view />
  </div>
</template>

<script>
import Router from "./router/index";

export default {
  name: "app",
  components: {
    Router,
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
