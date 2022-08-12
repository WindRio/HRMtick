<template>
  <div class="container">
    <div class="changePass_form">
      <el-form
        :label-position="'top'"
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item>
          <div class="content_center">
            <h2>{{ Text.ChangePassTitle }}</h2>
          </div>
        </el-form-item>
        <el-form-item label="Password" prop="pass" class="padding_bot_2vh">
          <input-common
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
            suffix-icon="Hide"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass" class="padding_bot_2vh">
          <input-common
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
            suffix-icon="Hide"
            @keyup.enter="submitForm(ruleFormRef)"
          />
        </el-form-item>
        <el-form-item>
          <button-common
            @click="router.go(-2)"
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
import { reactive, ref, watchEffect } from "vue";
import { verifyPassword } from "../../util/validate";
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
  name: "ChangePassword",
  components: {
    ButtonCommon,
    InputCommon,
  },
  setup() {
    const ruleFormRef = ref();
    const AuthReducer = useStore();
    const { changePassword } = AuthSaga;

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
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(Message.inputPasswordConfirmNull));
      } else if (value !== ruleForm.pass) {
        callback(new Error(Message.inputPasswordConfirm));
      } else {
        callback();
      }
    };

    const ruleForm = reactive({
      pass: "",
      checkPass: "",
    });

    const rules = reactive({
      pass: [{ validator: validatePass, trigger: "blur" }],
      checkPass: [{ validator: validatePass2, trigger: "blur" }],
    });

    const submitForm = (formEl) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          changePassword(ruleForm);
        } else {
          return false;
        }
      });
    };

    watchEffect(async () => {
      if (AuthReducer.isFetching === true) {
        LoadingModal();
      }
      if (AuthReducer.message !== null) {
        setTimeout(() => {
          MessageBox({ message: AuthReducer.message, path: "/home" });
        }, 1000);
      }
      if (AuthReducer.messageError !== null) {
        setTimeout(() => {
          NotifyModal({ message: AuthReducer.messageError, type: "error" });
        }, 1000);
      }
    });
    return {
      rules,
      ruleForm,
      ruleFormRef,
      Text,
      router,
      submitForm,
    };
  },
};
</script>
<style scoped>
@import "../../styles/AuthStyles/ChangePassword.css";
</style>
