import Helpers from '../util/helpers/index';
import ApiScheme from './@scheme'

const authApi = {
    login: Helpers.createApi(ApiScheme.LOGIN),
    logout: Helpers.createApi(ApiScheme.LOGOUT),
    forgotPassword: Helpers.createApi(ApiScheme.FORGOT_PASSWORD),
    changePassword: Helpers.createApi(ApiScheme.CHANGE_PASSWORD),
    checkOtpLogin: Helpers.createApi(ApiScheme.OTP_LOGIN),
    resendOtp: Helpers.createApi(ApiScheme.OTP_RESEND),
    validateToken: Helpers.createApi(ApiScheme.VALIDATE_TOKEN)
}

export default authApi;