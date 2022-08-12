import { defineStore } from 'pinia'
import { AccountTypes } from '../../constants/actionsType'

const PermissionStore = defineStore({
    id: 'Permission',
    state: () => ({
        isFetching: false,
        data: [],
        totalPages: null,
        textSearch:'',
        activePage: 1,
        error: false,
        messageError: null,
    }),
    getters: {
    },
    actions: {
        getPermissionRequest() {
            AccountTypes.GET_PERMISSION_REQUEST
            this.isFetching = true
            this.data = []
            this.totalPages = null
            this.textSearch = ''
            this.error = false
            this.messageError = null
        },
        getPermissionSuccess(payload) {
            AccountTypes.GET_PERMISSION_SUCCESS
            this.isFetching = false
            this.data = payload.data
            this.totalPages = payload.totalPages
            this.activePage = payload.activePage
            this.textSearch = payload.textSearch
            this.error = false
            this.messageError = null
        },
        getPermissionFailure(payload) {
            AccountTypes.GET_PERMISSION_FAILURE
            this.isFetching = false
            this.data = []
            this.totalPages = null
            this.error = true
            this.messageError = payload.message
        },
        updatePermissionRequest() {
            AccountTypes.UPDATE_PERMISSION_REQUEST
            this.isFetching = true
            this.error = false
            this.messageError = null
        },
        updatePermissionSuccess() {
            AccountTypes.UPDATE_PERMISSION_SUCCESS
            this.isFetching = false
            this.error = false
            this.messageError = null
        },
        updatePermissionFailure(payload) {
            AccountTypes.UPDATE_PERMISSION_FAILURE
            this.isFetching = false
            this.error = true
            this.messageError = payload.message
        },
    },
})
export default PermissionStore;