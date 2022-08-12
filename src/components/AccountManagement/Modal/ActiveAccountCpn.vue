<template>
  <el-popconfirm
    title="Are you sure to save this?"
    @confirm="confirmEventAuthor()"
    @cancel="cancelEventAuthor()"
    
  >
    <template #reference>
      <el-switch
        v-model="isActive"
        inline-prompt
        active-icon="Check"
        inactive-icon="Close"
      />
    </template>
  </el-popconfirm>
</template>
<script>
import { ref, watchEffect } from "vue";
import { updateAccount } from "../../../sagas/AccountManageSaga/AccountSaga";
export default {
  props: {
    account: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const isActive = ref(false);
    const confirmEventAuthor = () => {
      updateAccount({ id: props.account.id, isActive: isActive.value });
    };
    const cancelEventAuthor = () => {
      console.log("cancel!");
      isActive.value = !isActive.value;
    };
    watchEffect(() => {
      isActive.value = props.account.active;
    });
    return {
      confirmEventAuthor,
      cancelEventAuthor,
      isActive,
    };
  },
};
</script>
<style></style>
