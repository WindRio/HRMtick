import { defineStore } from 'pinia'
import { AccountTypes } from '../../constants/actionsType'

const RoleStore = defineStore({
    id: 'Role',
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
        getRoleRequest() {
            AccountTypes.GET_ROLE_REQUEST
            this.isFetching = true
            this.data = []
            this.totalPages = null
            this.textSearch = ''
            this.error = false
            this.messageError = null
        },
        getRoleSuccess(payload) {
            AccountTypes.GET_ROLE_SUCCESS
            this.isFetching = false
            this.data = payload.data
            this.totalPages = payload.totalPages
            this.activePage = payload.activePage
            this.textSearch = payload.textSearch
            this.error = false
            this.messageError = null
        },
        getRoleFailure(payload) {
            AccountTypes.GET_ROLE_FAILURE
            this.isFetching = false
            this.data = []
            this.totalPages = null
            this.textSearch = ''
            this.activePage = ''
            this.error = true
            this.messageError = payload.message
        },
        createRoleRequest() {
            AccountTypes.CREATE_ROLE_REQUEST
            this.isFetching = true
            this.error = false
            this.messageError = null
        },
        createRoleSuccess() {
            AccountTypes.CREATE_ROLE_SUCCESS
            this.isFetching = false
            this.error = false
            this.messageError = null
        },
        createRoleFailure(payload) {
            AccountTypes.CREATE_ROLE_FAILURE
            this.isFetching = false
            this.error = true
            this.messageError = payload.message
        },
        updateRoleRequest() {
            AccountTypes.UPDATE_ROLE_REQUEST
            this.isFetching = true
            this.error = false
            this.messageError = null
        },
        updateRoleSuccess() {
            AccountTypes.UPDATE_ROLE_SUCCESS
            this.isFetching = false
            this.error = false
            this.messageError = null
        },
        updateRoleFailure(payload) {
            AccountTypes.UPDATE_ROLE_FAILURE
            this.isFetching = false
            this.error = true
            this.messageError = payload.message
        },
        deleteRoleRequest() {
            AccountTypes.DELETE_ROLE_REQUEST
            this.isFetching = true
            this.error = false
            this.messageError = null
        },
        deleteRoleSuccess() {
            AccountTypes.DELETE_ROLE_SUCCESS
            this.isFetching = false
            this.error = false
            this.messageError = null
        },
        deleteRoleFailure(payload) {
            AccountTypes.DELETE_ROLE_FAILURE
            this.isFetching = false
            this.error = true
            this.messageError = payload.message
        }
    },
})

export default RoleStore;