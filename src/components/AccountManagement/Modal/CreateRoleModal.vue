<template>
  <el-dialog
    v-model="dialogVisible"
    title="Create Role"
    width="50%"
    draggable
    :before-close="handleClose"
  >
    <el-form>
      <el-form-item label="Permission">
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
import PermissionStore from "../../../reducers/AccManageReducer/PermissionReducer";
import { getAllPermission } from "../../../sagas/AccountManageSaga/PermissionSaga";
import { createRole } from "../../../sagas/AccountManageSaga/RoleSaga";
import { ElMessageBox } from "element-plus";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "",
    },
    cancel: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    getAllPermission();
    const PermissionReducer = PermissionStore();
    const dialogVisible = ref(false);
    const options = ref([]);
    const value = ref([]);
    const roleForm = reactive({
      name: "",
      permissions: [],
    });
    const handleCancel = () => {
      props.cancel();
    };
    const handleCreate = () => {
      createRole(roleForm);
      props.cancel();
    };
    watchEffect(() => {
      if (props.visible == true) {
        dialogVisible.value = true;
      } else {
        dialogVisible.value = false;
      }
      if (props.role) {
        roleForm.name = props.role;
      }
      if (value.value) {
        roleForm.permissions = value.value;
      }
      options.value = PermissionReducer.data.map((item) => {
        return { value: `${item.id}`, label: `${item.name}` };
      });
    });
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          props.cancel();
          dialogVisible.value = false;
          done();
        })
        .catch(() => {});
    };
    return {
      value,
      options,
      dialogVisible,
      props,
      handleCancel,
      handleCreate,
      handleClose,
      PermissionReducer,
    };
  },
};
</script>
<style></style>
