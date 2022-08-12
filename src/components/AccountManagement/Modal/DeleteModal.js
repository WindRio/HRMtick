import { h } from 'vue'
import { ElMessageBox } from 'element-plus'
import {
    deleteAccount,
} from "../../../sagas/AccountManageSaga/AccountSaga";
import {
    deleteRole,
} from "../../../sagas/AccountManageSaga/RoleSaga";

const MessageBox = ({ message, id, key }) => {
    ElMessageBox({
        title: 'Message',
        message: h('p', null, [
            h('span', null, message),
        ]),
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = 'Loading...'
                setTimeout(() => {
                    done()
                    setTimeout(() => {
                        instance.confirmButtonLoading = false
                    }, 300)
                    switch (key) {
                        case "Account":
                            deleteAccount(id);
                            break;
                        case "Role":
                            deleteRole(id);
                            break;
                        default:
                            null
                            break;
                    }
                    return true
                }, 1000)
            } else {
                done()
            }
        },
    })
}

export default MessageBox;