<template>
  <el-dialog
    v-model="dialogVisible"
    title="Authorization"
    width="50%"
    draggable
    :before-close="handleClose"
  >
    <el-form :label-position="'top'">
      <el-form-item label="Email:">
        <div>{{ itemUpd.email }}</div>
      </el-form-item>
      <el-form-item label="Role">
        <el-select
          v-model="value"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose Role"
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
import { ButtonCommon } from "../../common";
import { updateAccount } from "../../../sagas/AccountManageSaga/AccountSaga";
import RoleStore from "../../../reducers/AccManageReducer/RoleReducer";
import { getAllRole } from "../../../sagas/AccountManageSaga/RoleSaga";
import { ElMessageBox } from "element-plus";

export default {
  components: {
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
    getAllRole({ activePage: "" });
    const RoleReducer = RoleStore();
    const dialogVisible = ref(false);
    const options = ref([]);
    const value = ref([]);
    const updForm = reactive({
      id: "",
      isActive: null,
      role: null,
    });
    const handleCancel = () => {
      props.cancel();
      value.value = "";
      dialogVisible.value = false;
    };
    const handleConfirm = () => {
      updateAccount(updForm);
      props.cancel();
    };
    onMounted(() => {
      value.value = props.itemUpd.role.map((item) => {
        return `${item.id}`;
      });
    });
    watchEffect(() => {
      if (props.visible == true) {
        dialogVisible.value = true;
      } else {
        dialogVisible.value = false;
      }
      options.value = RoleReducer.data.map((item) => {
        return { value: `${item.id}`, label: `${item.name}` };
      });
      updForm.id = props.itemUpd.id;
      updForm.isActive = props.itemUpd.isActive;
      updForm.role = value.value;
    });
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          done();
          updateAccount(updForm);
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
      ButtonCommon,
      updForm,
      handleConfirm,
      RoleReducer,
      handleClose,
    };
  },
};
</script>
<style></style>
