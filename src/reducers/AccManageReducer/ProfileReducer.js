import { defineStore } from 'pinia'
import { AccountTypes } from '../../constants/actionsType'

const ProfileStore = defineStore({
    id: 'Profile',
    state: () => ({
        isFetching: false,
        data: {},
        error: false,
        messageError: null,
    }),
    getters: {},
    actions: {
        getProfileRequest() {
            AccountTypes.GET_PROFILE_REQUEST
            this.isFetching = true
            this.data = {}
            this.error = false
            this.messageError = null
        },
        getProfileSuccess(payload) {
            AccountTypes.GET_PROFILE_SUCCESS
            this.isFetching = false
            this.data = payload.data
            this.error = false
            this.messageError = null
        },
        getProfileFailure(payload) {
            AccountTypes.GET_PROFILE_FAILURE
            this.isFetching = false
            this.data = {}
            this.error = true
            this.messageError = payload.message
        },
        updateProfileRequest() {
            AccountTypes.UPDATE_PROFILE_REQUEST
            this.isFetching = true
            // this.data = {}
            this.error = false
            this.messageError = null
        },
        updateProfileSuccess() {
            AccountTypes.UPDATE_PROFILE_SUCCESS
            this.isFetching = false
            this.error = false
            this.messageError = null
        },
        updateProfileFailure(payload) {
            AccountTypes.UPDATE_PROFILE_FAILURE
            this.isFetching = false
            this.data = {}
            this.error = true
            this.messageError = payload.message
        },
    },
})
export default ProfileStore;