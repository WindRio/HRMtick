<template>
  <el-dialog
    v-model="dialogVisible"
    title="Update Profile"
    width="50%"
    draggable
    :before-close="handleClose"
  >
    <el-form style="padding: 0.5em" label-position="left" label-width="115px">
      <h3>{{ accountEmail == "" ? "Choose a account" : accountEmail }}</h3>
      <el-form-item class="flex_none" style="margin-left: 0"> </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Full Name:" class="content_profile">
            <input-common v-model="updForm.name" />
          </el-form-item>
          <el-form-item label="Date of birth:">
            <input-common v-model="updForm.birthday" />
          </el-form-item>
          <el-form-item label="Gender:">
            <input-common v-model="updForm.gender" />
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-left: 0.5em">
          <el-form-item label="Referral Code:" >
            <input-common v-model="props.itemUpd.referralCode" disabled/>
          </el-form-item>
          <el-form-item label="Presenter Code:">
            <input-common v-model="props.itemUpd.presenterCode" disabled/>
          </el-form-item>
          <el-form-item label="Phone:">
            <input-common v-model="updForm.phone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Address:">
        <input-common v-model="updForm.address" />
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
import { updateProfile } from "../../../sagas/AccountManageSaga/ProfileSaga";
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
    accountEmail: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const dialogVisible = ref(false);
    const updForm = reactive({
      id: "",
      name: "",
      birthday: "",
      gender: "",
      phone: "",
      address: "",
    });
    const handleCancel = () => {
      props.cancel();
    };
    const handleConfirm = () => {
      updateProfile(updForm);
      props.cancel();
    };
    const handleClose = (done) => {
      ElMessageBox.confirm("Are you sure you want to close this?")
        .then(() => {
          updateProfile(updForm);
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
        updForm.name = props.itemUpd.fullName;
        updForm.birthday = props.itemUpd.birthday;
        updForm.gender = props.itemUpd.gender;
        updForm.phone = props.itemUpd.phone;
        updForm.address = props.itemUpd.address;
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
