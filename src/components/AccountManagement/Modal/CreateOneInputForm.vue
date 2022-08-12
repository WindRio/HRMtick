<template>
  <CreateRoleModal
    v-if="showCreateRoleModal == true"
    :visible="showCreateRoleModal"
    :cancel="handleCancelModal"
    :role="ruleForm.name"
  />
  <CreateAccountModal
    v-if="showCreateAccModal == true"
    :visible="showCreateAccModal"
    :cancel="handleCancelModal"
    :email="ruleForm.name"
  />
  <el-form
    :inline="true"
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    @submit.prevent
  >
    <el-form-item prop="name">
      <input-common
        v-model="ruleForm.name"
        :placeholder="Text.CreateInput"
        @keyup.enter="submitForm(ruleFormRef)"
      />
    </el-form-item>
    <el-form-item>
      <button-common
        @click="submitForm(ruleFormRef)"
        :title="Text.CreateBtn"
        icon="Plus"
      />
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, ref } from "vue";
import { Text, Message } from "../../../constants/commonConstants";
import { InputCommon, ButtonCommon, NotifyModal } from "../../common";
import { verifyEmail } from "../../../util/validate";
import CreateRoleModal from "./CreateRoleModal.vue";
import CreateAccountModal from "./CreateAccountModal.vue";
export default {
  components: {
    ButtonCommon,
    InputCommon,
    CreateRoleModal,
    CreateAccountModal,
  },
  props: {
    screen: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const showCreateRoleModal = ref(false);
    const showCreateAccModal = ref(false);
    const ruleFormRef = ref();
    const ruleForm = reactive({
      name: "",
    });
    const validateRole = (rule, value, callback) => {
      if (value === "") {
        callback(new Error());
        NotifyModal({ message: Message.inputRoleNull, type: "error" });
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error());
        NotifyModal({ message: Message.inputEmailNull, type: "error" });
      } else {
        if (verifyEmail(value) !== true) {
          if (!ruleFormRef.value) return;
          callback(new Error(Message.inputEmailFormat));
        }
        callback();
      }
    };
    const rules = reactive({
      name: [
        {
          validator: props.screen == "Account" ? validateEmail : validateRole,
          trigger: "blur",
        },
      ],
    });
    const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          switch (props.screen) {
            case "Role":
              showCreateRoleModal.value = true;
              break;
            case "Account":
              showCreateAccModal.value = true;
              break;
            default:
              break;
          }
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    const handleCancelModal = () => {
      showCreateRoleModal.value = false;
      showCreateAccModal.value = false;
      ruleForm.name = "";
    };
    // onMounted(() => {
    //   window.onbeforeunload = window.confirm(
    //     "Do you really want to leave? you have unsaved changes!"
    //   );
    // });
    return {
      Text,
      showCreateRoleModal,
      showCreateAccModal,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      handleCancelModal,
    };
  },
};
</script>
<style></style>
