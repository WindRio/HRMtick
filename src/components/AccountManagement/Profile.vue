<template>
  <UpdateProfileModal
    :visible="showUpdateModal"
    :cancel="handleCancelModal"
    :itemUpd="ProfileReducer.data"
    :accountEmail="accountEmail"
  />
  <el-form style="padding: 0.5em" label-position="left" label-width="115px">
    <h3>{{ accountEmail == "" ? "Choose a account" : accountEmail }}</h3>
    <el-form-item class="flex_none" style="margin-left: 0"> </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item label="Full Name:" class="content_profile">
          <div>
            {{ ProfileReducer.data.fullName }}
          </div>
        </el-form-item>
        <el-form-item label="Date of birth:">
          <div>
            {{ ProfileReducer.data.birthday }}
          </div>
        </el-form-item>
        <el-form-item label="Gender:">
          <div>
            {{ ProfileReducer.data.gender }}
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="padding-left: 0.5em">
        <el-form-item label="Referral Code:">
          <div>
            {{ ProfileReducer.data.referralCode }}
          </div>
        </el-form-item>
        <el-form-item label="Presenter Code:">
          <div>
            {{ ProfileReducer.data.presenterCode }}
          </div>
        </el-form-item>
        <el-form-item label="Phone:">
          <div>
            {{ ProfileReducer.data.phone }}
          </div>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="Address:">
      <div>
        {{ ProfileReducer.data.address }}
      </div>
    </el-form-item>
    <el-form-item>
      <button-common
        type="warning"
        :title="Text.EditBtn"
        icon="Edit"
        @click="handleEdit()"
      />
      <button-common
        type="danger"
        :title="Text.DeleteBtn"
        icon="Delete"
        @click="handleDelete()"
      />
    </el-form-item>
  </el-form>
</template>
<script>
import { ref, watchEffect } from "vue";
import { ProfileStore } from "../../reducers/AccManageReducer";
import { Text } from "../../constants/commonConstants";
import { ButtonCommon } from "../common";
import { DeleteModal, UpdateProfileModal } from "./Modal";
export default {
  components: {
    ButtonCommon,
    UpdateProfileModal,
  },
  props: {
    accountEmail: {
      type: String,
      default: "",
    },
    idAccount: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const noDataLabel = ref(true);
    const showUpdateModal = ref(false);
    const ProfileReducer = ProfileStore();
    const handleDelete = () => {
      DeleteModal({
        message: "Do you want to delete this account?",
        id: props.idAccount,
        key: "Account",
      });
    };
    const handleCancelModal = () => {
      showUpdateModal.value = false;
    };
    const handleEdit = () => {
      showUpdateModal.value = true;
    };
    watchEffect(() => {});
    return {
      Text,
      handleDelete,
      noDataLabel,
      ProfileReducer,
      showUpdateModal,
      handleEdit,
      handleCancelModal,
    };
  },
};
</script>
<style>
@import "../../styles/AccountManageStyle.css";
</style>
