<template>
  <el-input
    :type="type"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    :suffix-icon="rightIcon"
    :prefix-icon="leftIcon"
    :show-password="showPassword"
  />
</template>
<script>
export default {
  name: "InputCommon",
  props: {
    type: {
      type: String,
      default: "",
    },
    placeholder: {
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
    showPassword: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    leftIcon: {
      type: String,
      default: "",
    },
    rightIcon: {
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
