<template>
  <div style="">
    <el-input
      v-model="textSearchModel"
      :placeholder="Text.SearchInput"
      class="input-with-select"
      @keyup.enter="handleSearch()"
    >
      <template #append>
        <el-button icon="Search" @click="handleSearch({ textSearchModel })" />
      </template>
    </el-input>
  </div>
</template>
<script>
import { Text } from "../../constants/commonConstants";
import { ref } from "vue";
export default {
  props: {
    handleSearch: {
      type: Function,
      default: () => {},
    },
    textSearch: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const textSearchModel = ref(props.textSearch);
    return {
      Text,
      textSearchModel,
    };
  },
};
</script>
<style></style>
