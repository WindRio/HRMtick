<template>
  <div class="container">
    <div class="otp_form">
      <el-form
        :label-position="'top'"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
      >
        <el-form-item>
          <div class="content_center">
            <h2>{{ Text.OtpTitle }}</h2>
          </div>
        </el-form-item>
        <el-form-item :label="Text.OtpRequest" prop="otp">
          <v-otp-input
            ref="ruleForm"
            input-classes="otp-input"
            separator="-"
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="true"
            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
            @on-change="handleOnChange"
          />
        </el-form-item>
        <el-form-item>
          <div class="">
            {{ Text.OtpReSendTitle }}
            <el-link
              type="primary"
              :underline="false"
              @click="reSendOtp()"
              :disabled="resendBtnDisable"
              >{{ countdown }}</el-link
            >
            seconds
          </div>
        </el-form-item>
        <el-form-item>
          <button-common
            @click="router.go(-1)"
            :title="Text.cancelButtonText"
          />
          <button-common
            type="primary"
            @click="submitForm(ruleFormRef)"
            :title="Text.verifyButtonText"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { ref, reactive, watchEffect, onBeforeUnmount } from "vue";
import { Text, Message } from "../../constants/commonConstants";
import { verifyOtp } from "../../util/validate";
import router from "../../router";
import VOtpInput from "vue3-otp-input";
import { ButtonCommon, MessageBox, LoadingModal, NotifyModal } from "../common";
import { useStore } from "../../reducers/AuthReducer";
import { AuthSaga } from "../../sagas";

export default {
  name: "Otp",
  components: {
    VOtpInput,
    ButtonCommon,
  },
  setup() {
    const { OTP } = AuthSaga;
    const AuthReducer = useStore();
    const countdown = ref(10);
    const resendBtnDisable = ref(true);
    var clockCall = null;
    const formSize = ref("default");
    const ruleFormRef = ref();
    const ruleForm = reactive({
      Otp: "",
    });
    const handleOnChange = (value) => {
      ruleForm.Otp = value;
    };
    const validateOtp = (rule, value, callback) => {
      value = ruleForm.Otp;
      if (value === "") {
        callback(new Error(Message.inputOtoNull));
      } else {
        if (verifyOtp(value) !== true) {
          if (!ruleFormRef.value) return;
          callback(new Error(Message.inputOtoFormat));
        }
        callback();
      }
    };
    const rules = reactive({
      otp: [
        {
          validator: validateOtp,
          trigger: "blur",
        },
      ],
    });
    const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          OTP(ruleForm);
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const decrementClock = () => {
      if (countdown.value === 0 || countdown.value === "Gửi lại") {
        clearInterval(clockCall);
        countdown.value = "Gửi lại";
        resendBtnDisable.value = false;
      } else {
        countdown.value = countdown.value - 1;
      }
    };
    const reSendOtp = () => {
      OTP();
      resendBtnDisable.value = true;
      countdown.value = 30;
    };
    watchEffect(() => {
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
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
      return () => {
        clearInterval(clockCall);
      };
    });
    onBeforeUnmount(() => {
      AuthReducer.$reset();
    });
    return {
      handleOnChange,
      Text,
      Message,
      router,
      formSize,
      ruleFormRef,
      submitForm,
      ruleForm,
      rules,
      countdown,
      reSendOtp,
      resendBtnDisable,
    };
  },
};
</script>
<style scoped>
@import "../../styles/AuthStyles/OtpStyle.css";
</style>
