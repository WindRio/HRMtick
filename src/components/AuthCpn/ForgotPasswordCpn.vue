<template>
  <div class="container">
    <div class="forgotPassword_form">
      <el-form
        :label-position="'top'"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        @submit.prevent
      >
        <el-form-item>
          <div class="content_center">
            <h3>{{ Text.ForgotTitle }}</h3>
          </div>
        </el-form-item>
        <el-form-item :label="Text.ForgotRequest" prop="email">
          <input-common
            v-model="ruleForm.email"
            size="large"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>
        <el-form-item>
          <button-common
            @click="router.go(-1)"
            :title="Text.cancelButtonText"
          />
          <button-common
            type="primary"
            @click="submitForm(ruleFormRef)"
            :title="Text.confirmButtonText"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { ref, reactive, watchEffect, onBeforeUnmount } from "vue";
import { verifyEmail } from "../../util/validate";
import { Text, Message } from "../../constants/commonConstants";
import {
  ButtonCommon,
  MessageBox,
  LoadingModal,
  InputCommon,
  NotifyModal,
} from "../common";
import router from "../../router";

import { useStore } from "../../reducers/AuthReducer";
import { AuthSaga } from "../../sagas";

export default {
  name: "ForgotPassword",
  components: {
    ButtonCommon,
    InputCommon,
  },
  setup() {
    const AuthReducer = useStore();
    const { forgotPassword } = AuthSaga;
    const formSize = ref("default");
    const ruleFormRef = ref();
    const ruleForm = reactive({
      email: "",
    });
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(Message.inputEmailNull));
      } else {
        if (verifyEmail(value) !== true) {
          if (!ruleFormRef.value) return;
          callback(new Error(Message.inputEmailFormat));
        }
        callback();
      }
    };
    const rules = reactive({
      email: [
        {
          validator: validateEmail,
          trigger: "blur",
        },
      ],
    });
    const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          forgotPassword(ruleForm);
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    watchEffect(async () => {
      if (AuthReducer.isFetching === true) {
        LoadingModal();
      }
      if (AuthReducer.message !== null) {
        setTimeout(() => {
          MessageBox({ message: AuthReducer.message, path: "/otp" });
        }, 1000);
      }
      if (AuthReducer.messageError !== null) {
        setTimeout(() => {
          NotifyModal({ message: AuthReducer.messageError, type: "error" });
        }, 1000);
      }
    });
    onBeforeUnmount(() => {
      AuthReducer.$reset();
    });
    return {
      formSize,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      validateEmail,
      Text,
      router,
    };
  },
};
</script>
<style scoped>
@import "../../styles/AuthStyles/ForgotPassword.css";
</style>
