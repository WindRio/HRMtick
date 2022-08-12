<template>
  <el-dialog
    v-model="dialogVisible"
    title="Update Permission"
    width="50%"
    draggable
    :before-close="handleClose"
  >
    <el-form :label-position="'top'">
      <el-form-item label="Permission">
        <input-common :placeholder="props.itemUpd.name" disabled />
      </el-form-item>
      <el-form-item label="Description">
        <input-common
          :rows="3"
          type="textarea"
          placeholder="Please input description"
          v-model="updForm.description"
        />
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
import { ref, watchEffect, reactive } from "vue";
import { InputCommon, ButtonCommon } from "../../common";
import { updatePermission } from "../../../sagas/AccountManageSaga/PermissionSaga";
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
    const dialogVisible = ref(false);
    const updForm = reactive({
      id: "",
      description: "",
    });
    const handleCancel = () => {
      props.cancel();
    };
    const handleConfirm = () => {
      updatePermission(updForm);
      props.cancel();
    };
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          updatePermission(updForm);
          done();
        })
        .catch(() => {
          // catch error
        });
    };
    watchEffect(() => {
      if (props.visible == true) {
        dialogVisible.value = true;
      } else {
        dialogVisible.value = false;
      }
      if (props.itemUpd) {
        updForm.id = props.itemUpd.id;
        updForm.description = props.itemUpd.description;
      }
    });
    return {
      updForm,
      dialogVisible,
      props,
      handleCancel,
      InputCommon,
      ButtonCommon,
      handleConfirm,
      handleClose,
    };
  },
};
</script>
<style></style>
