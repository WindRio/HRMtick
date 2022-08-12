import { h } from 'vue'
import { ElMessageBox } from 'element-plus'
import router from '../../router'
const MessageBox = ({ message, path }) => {
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
                    router.push(path)
                    return true
                }, 1000)
            } else {
                done()
            }
        },
    })
}

export default MessageBox;