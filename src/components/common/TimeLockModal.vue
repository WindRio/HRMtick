<template>
  <el-dialog v-model="showModal" title="Warning" width="30%" center>
    <div style="display: flex; flex-direction: column; align-items: center">
      <span style="margin: 0 0 10px"
        >Do nhập sai OTP nhiều lần, email của bạn đã bị khóa! Vui lòng đợi để mở
        khóa email!</span
      >
      <vue-countdown
        :time="hoursLock * minutesLock * secondsLock * milliseconds"
        v-slot="{ hours, minutes, seconds }"
        style="font-size: 20px"
      >
        {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds
      </vue-countdown>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeModal">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { ref } from "vue";
import VueCountdown from "@chenfengyuan/vue-countdown";
export default {
  components: { VueCountdown },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    cancelModal: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const showModal = ref(props.visible);
    const milliseconds = ref(1000);
    const secondsLock = ref(60);
    const minutesLock = ref(1);
    const hoursLock = ref(1);
    const closeModal = () => {
      showModal.value = false;
      props.cancelModal();
    };
    return {
      showModal,
      closeModal,
      milliseconds,
      secondsLock,
      minutesLock,
      hoursLock,
    };
  },
};
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
