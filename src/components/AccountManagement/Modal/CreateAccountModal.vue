<template>
  <el-dialog
    v-model="dialogVisible"
    title="Create Account"
    width="30%"
    draggable
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="Role">
        <el-select
          v-model="value"
          multiple
          filterable
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose Permission"
          style="width: 100%"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel()">Cancel</el-button>
        <el-button type="primary" @click="handleCreate()">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ref, watchEffect, reactive } from "vue";
import { createAccount } from "../../../sagas/AccountManageSaga/AccountSaga";
import { getAllRole } from "../../../sagas/AccountManageSaga/RoleSaga";
import RoleStore from "../../../reducers/AccManageReducer/RoleReducer";
import { ElMessageBox } from "element-plus";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: "",
    },
    cancel: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const RoleReducer = RoleStore();
    const dialogVisible = ref(false);
    const options = ref([]);
    const value = ref([]);
    const accountForm = reactive({
      email: "",
      roles: [],
    });
    const handleCreate = () => {
      createAccount(accountForm);
      dialogVisible.value = false;
      props.cancel();
    };
    const handleCancel = () => {
      props.cancel();
      dialogVisible.value = false;
    };
    watchEffect(() => {
      if (props.visible == true) {
        dialogVisible.value = true;
      } else {
        dialogVisible.value = false;
      }
      if (props.email) {
        accountForm.email = props.email;
      }
      if (value.value) {
        accountForm.roles = value.value;
      }
      options.value = RoleReducer.data.map((item) => {
        return { value: `${item.id}`, label: `${item.name}` };
      });
    });
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          createAccount(accountForm);
          dialogVisible.value = false;
          props.cancel();
          done();
        })
        .catch(() => {});
    };
    getAllRole();
    return {
      value,
      RoleReducer,
      options,
      dialogVisible,
      props,
      handleCancel,
      accountForm,
      handleCreate,
      handleClose,
    };
  },
};
</script>
<style></style>
