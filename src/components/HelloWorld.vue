<template>
  <TickCpn />
</template>

<script>
import TickCpn from "./TickCpn.vue";
export default {
  components: {
    TickCpn,
  },
  setup() {},
  methods: {},
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 1rem 2rem;
}

footer {
  font-size: 0.75rem;
  text-align: right;
  color: darkgray;
}

div.cell {
  display: flex;
}
</style>
