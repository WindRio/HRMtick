<template>
  <el-dialog
    v-model="dialogVisible"
    title="Update Role"
    width="50%"
    draggable
    :before-close="handleClose"
  >
    <el-form :label-position="'top'">
      <el-form-item label="Role">
        <input-common
          :placeholder="props.itemUpd.name"
          v-model="updForm.name"
        />
      </el-form-item>
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
        <button-common @click="handleCancel()" title="Cancel" />
        <el-button type="primary" @click="handleConfirm()">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ref, watchEffect, reactive, onMounted } from "vue";
import { InputCommon, ButtonCommon } from "../../common";
import { updateRole } from "../../../sagas/AccountManageSaga/RoleSaga";
import PermissionStore from "../../../reducers/AccManageReducer/PermissionReducer";
import { getAllPermission } from "../../../sagas/AccountManageSaga/PermissionSaga";
import { ElMessageBox } from "element-plus";

export default {
  components: {
    InputCommon,
    ButtonCommon,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "",
    },
    itemUpd: {
      type: Object,
      default: null,
    },
    cancel: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    getAllPermission({ activePage: "" });
    const PermissionReducer = PermissionStore();
    const dialogVisible = ref(false);
    const options = ref([]);
    const value = ref([]);
    const updForm = reactive({
      id: "",
      name: "",
      permissions: null,
    });
    const handleCancel = () => {
      props.cancel();
      value.value = "";
      dialogVisible.value = false;
    };
    const handleConfirm = () => {
      updForm.id = props.itemUpd.id;
      updForm.permissions = value.value.map((item) => {
        return item;
      });
      updateRole(updForm);
      dialogVisible.value = false;
    };
    onMounted(() => {
      value.value = props.itemUpd.permissions.map((item) => {
        return `${item.id}`;
      });
      console.log(props.itemUpd);
    });
    watchEffect(() => {
      if (props.visible == true) {
        dialogVisible.value = true;
      } else {
        dialogVisible.value = false;
      }
      updForm.name = props.itemUpd.name;
      updForm.permissions = value.value;
      options.value = PermissionReducer.data.map((item) => {
        return { value: `${item.id}`, label: `${item.name}` };
      });
    });
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          done();
          updateRole(updForm);
          dialogVisible.value = false;
          props.cancel();
        })
        .catch(() => {});
    };
    return {
      value,
      options,
      dialogVisible,
      props,
      handleCancel,
      InputCommon,
      ButtonCommon,
      updForm,
      handleConfirm,
      PermissionReducer,
      handleClose,
    };
  },
};
</script>
<style></style>
