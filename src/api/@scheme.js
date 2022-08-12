import { REST_API_METHOD as METHOD, BASE_URL } from '../constants/index'

const AUTHEN_SCHEME = {
        VALIDATE_TOKEN: {
            url: `${BASE_URL}/auth`,
            method: METHOD.GET
        },
        LOGIN: {
            url: `${BASE_URL}/login`,
            method: METHOD.POST
        },
        FORGOT_PASSWORD: {
            url: `${BASE_URL}/forgotPassword`,
            method: METHOD.POST
        },
        OTP_LOGIN: {
            url: `${BASE_URL}/otp/sendOTPLogin`,
            method: METHOD.POST
        },
        OTP_RESEND: {
            url: `${BASE_URL}/otp/createOTP`,
            method: METHOD.POST
        },
        CHANGE_PASSWORD: {
            url: `${BASE_URL}/changePassword`,
            method: METHOD.POST
        },
        LOGOUT: {
            url: `${BASE_URL}/logout`,
            method: METHOD.POST
        }
}

export default AUTHEN_SCHEME