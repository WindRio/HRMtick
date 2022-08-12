import { ElMessage } from 'element-plus'

const Message = ({ message, type, }) => {
    ElMessage({
        showClose: true,
        message: message,
        type: type,
    })
}

export default Message;