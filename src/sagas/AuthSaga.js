import { useStore } from '../reducers/AuthReducer'
import { authApi } from '../api'

async function login(payload) {
    const actions = useStore()
    await actions.loginRequest()
    try {
        let res = await authApi.login({
            email: payload.email,
            password: payload.password
        }, "", "")
        if (res.status) {
            await localStorage.setItem('user', payload.email)
            await actions.loginSuccess({
                message: res.message
            })
            localStorage.setItem("user", payload.email)
        } else {
            throw { message: res.message }
        }
    } catch (error) {
        await actions.loginFailure(error)
    }
}
async function forgotPassword(payload) {
    const actions = useStore()
    await actions.forgotPasswordRequest()
    try {
        let res = await authApi.forgotPassword({
            email: payload.email
        }, "", "")
        if (res.status) {
            await actions.forgotPasswordSuccess({
                message: res.message,
                otpTimeout: res.time_otp
            })
        } else {
            throw { message: res.message }
        }
    } catch (error) {
        await actions.forgotPasswordFailure(error)
    }
}
async function changePassword(payload) {
    const actions = useStore()
    await actions.changePasswordRequest()
    try {
        let res = await authApi.changePassword({
            email: payload.email,
            password_new: payload.password
        }, "", "")
        if (res.status) {
            await actions.changePasswordSuccess({
                message: res.message,
                otpTimeout: res.time_otp
            })
        } else {
            throw { message: res.message }
        }
    } catch (error) {
        await actions.changePasswordFailure(error)
    }
}
async function OTP(payload) {
    const actions = useStore()
    await actions.otpRequest()
    try {
        console.log(payload, 'payload')
        const emailUser = await localStorage.getItem('user')
        if (!payload) {
            let res = await authApi.resendOtp({ email: emailUser }, null, null, null)
            await actions.otpSuccess({ message: res.message, otpTimeout: res.time_otp })
        } else {
            let res = await authApi.checkOtpLogin({
                email: emailUser,
                otp: payload.Otp
            }, "", "")
            console.log(res,"login")
            if (res.status) {
                localStorage.setItem('token', res.data.token)
                await actions.otpSuccess({
                    message: res.message,
                    token: res.data.token
                })
            } else {
                throw { message: res.message }
            }
        }
    } catch (error) {
        await actions.otpFailure(error)
    }
}
export {
    login, forgotPassword, OTP, changePassword
}