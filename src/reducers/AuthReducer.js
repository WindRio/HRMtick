import { defineStore } from 'pinia'
import { authenTypes } from '../constants/actionsType'

export const useStore = defineStore({
    id: 'auth',
    state: () => ({
        isFetching: false,
        token: null,
        otpTimeout: null,
        timeLock: null,
        message: null,
        error: false,
        messageError: null,
    }),
    getters: {
    },
    actions: {
        loginRequest() {
            authenTypes.LOGIN_REQUEST
            this.isFetching = true
            this.message = null
            this.error = false
            this.messageError = null
        },
        loginSuccess(payload) {
            authenTypes.LOGIN_SUCCESS
            this.isFetching = false
            this.message = payload.message
            this.error = false
            this.messageError = null
        },
        loginFailure(payload) {
            authenTypes.LOGIN_FAILURE
            this.isFetching = false
            this.message = null
            this.error = true
            this.messageError = payload.message
        },
        forgotPasswordRequest() {
            authenTypes.FORGOT_PASSWORD_REQUEST
            this.isFetching = true
            this.otpTimeout = null
            this.message = null
            this.error = false
            this.messageError = null
        },
        forgotPasswordSuccess(payload) {
            authenTypes.FORGOT_PASSWORD_SUCCESS
            this.isFetching = false
            this.otpTimeout = payload.otpTimeout
            this.message = payload.message
            this.error = false
            this.messageError = null
        },
        forgotPasswordFailure(payload) {
            authenTypes.FORGOT_PASSWORD_FAILURE
            this.isFetching = false
            this.otpTimeout = null
            this.message = null
            this.error = true
            this.messageError = payload.message
        },
        changePasswordRequest() {
            authenTypes.CHANGE_PASSWORD_REQUEST
            this.isFetching = true
            this.message = null
            this.error = false
            this.messageError = null
        },
        changePasswordSuccess(payload) {
            authenTypes.CHANGE_PASSWORD_SUCCESS
            this.isFetching = false
            this.message = payload.message
            this.error = false
            this.messageError = null
        },
        changePasswordFailure(payload) {
            authenTypes.CHANGE_PASSWORD_FAILURE
            this.isFetching = false
            this.message = null
            this.error = true
            this.messageError = payload.message
        },
        otpRequest() {
            authenTypes.OTP_REQUEST
            this.isFetching = true
            this.token = null
            this.otpTimeout = null
            this.message = null
            this.error = false
            this.messageError = null
        },
        otpSuccess(payload) {
            authenTypes.OTP_SUCCESS
            this.isFetching = false
            this.token = payload.token
            this.message = payload.message
            this.otpTimeout = payload.otpTimeout
            this.error = false
            this.messageError = null
        },
        otpFailure(payload) {
            authenTypes.OTP_FAILURE
            this.isFetching = false
            this.token = null
            this.message = null
            this.otpTimeout = null
            this.error = true
            this.messageError = payload.message

        }
    },
})
