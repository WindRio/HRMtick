<template>
  <div class="container">
    <div class="login_form">
      <h2>{{ Text.loginTitle }}</h2>
      <el-form
        :label-position="'top'"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item label="Email" prop="email">
          <input-common
            v-model="ruleForm.email"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <input-common
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            :showPassword="true"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>
        <el-form-item>
          <el-link
            type="primary"
            :underline="false"
            @click="forgotPasswordClick()"
            >Forgot Password?</el-link
          >
        </el-form-item>
        <el-form-item>
          <div class="content_center">
            <button-common
              size="large"
              type="primary"
              @click="submitForm(ruleFormRef)"
              :title="Text.loginTitle"
              style="width: 50%"
            />
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { ref, reactive, watchEffect, onBeforeUnmount } from "vue";
import { verifyPassword, verifyEmail } from "../../util/validate";
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
  name: "Login",
  components: {
    ButtonCommon,
    InputCommon,
  },
  setup() {
    const AuthReducer = useStore();
    const { login } = AuthSaga;
    const formSize = ref("default");
    const ruleFormRef = ref();
    const ruleForm = reactive({
      email: "",
      password: "",
    });
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(Message.inputPasswordNull));
      } else {
        if (verifyPassword(value) !== true) {
          if (!ruleFormRef.value) return;
          callback(new Error(Message.inputPasswordFormat));
        }
        callback();
      }
    };
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
      password: [
        {
          validator: validatePass,
          trigger: "blur",
        },
      ],
    });
    const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          login(ruleForm);
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const forgotPasswordClick = () => {
      router.push({ name: "ForgotPassword" });
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
      Text,
      submitForm,
      validatePass,
      validateEmail,
      forgotPasswordClick,
    };
  },
};
</script>
<style scoped>
@import "../../styles/AuthStyles/Login.css";
</style>
