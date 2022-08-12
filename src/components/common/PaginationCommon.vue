<template>
  <div style="display: flex; justify-content: center">
    <el-pagination
      v-model:currentPage="currentPage"
      background
      layout=" prev, pager, next"
      :page-size="1"
      :total="totalPages"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    handlePagination: {
      type: Function,
      default: () => {},
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    activePage: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const currentPage = ref(props.activePage);
    const handleCurrentChange = (val) => {
      props.handlePagination(val);
    };
    return {
      currentPage,
      handleCurrentChange,
    };
  },
};
</script>
<style></style>
