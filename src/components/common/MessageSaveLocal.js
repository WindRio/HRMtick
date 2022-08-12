import { h } from 'vue'
import { ElMessageBox } from 'element-plus'
const MessageBox = ({ data }) => {
    ElMessageBox({
        title: "Message",
        message: h("p", null, [
          h("span", null, "Are you sure you want to close this?"),
        ]),
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Back Later",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            done();
            // props.cancel();
            // dialogVisible.value = false;
          } else {
              localStorage.setItem("key", data)
              localStorage.setItem("value", data)
            done();
          }
        },
      });
}

export default MessageBox;