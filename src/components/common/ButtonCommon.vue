<template>
  <el-button
    :type="type"
    :icon="icon"
    :size="size"
    :disabled="disabled"
    :color="color"
  >
    {{ title }}
  </el-button>
</template>
<script>
export default {
  name: "ButtonCommon",
  props: {
    type: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  // setup(props) {
  //   console.log(props);
  // },
};
</script>
<style></style>
