import { defineStore } from 'pinia'
import { AccountTypes, TickTypes } from '../constants/actionsType'

const RoleStore = defineStore({
    id: 'Role',
    state: () => ({
        isFetching: false,
        dataRole: [],
        storageRoleItem: [],
        storagePageRole: [],
        totalPages: 1,
        activePage: 1,
        error: false,
        messageError: null,
    }),
    getters: {
    },
    actions: {
        getRoleTickRequest() {
            AccountTypes.GET_ROLE_REQUEST
            this.isFetching = true
            this.dataRole = []
            this.error = false
            this.messageError = null
        },
        getRoleTickSuccess(payload) {
            AccountTypes.GET_ROLE_SUCCESS
            this.isFetching = false
            this.dataRole = payload.dataRole
            this.totalPages = payload.totalPages
            this.activePage = payload.activePage
            this.error = false
            this.messageError = null
        },
        getRoleTickFailure(payload) {
            AccountTypes.GET_ROLE_FAILURE
            this.isFetching = false
            this.dataRole = []
            this.totalPages = 1
            this.activePage = 1
            this.error = true
            this.messageError = payload.message
        },
        saveStorage(payload) {
            TickTypes.SAVE_STORAGE
            this.storageRoleItem = payload.storageRoleItem
        },
    },
})

export default RoleStore;