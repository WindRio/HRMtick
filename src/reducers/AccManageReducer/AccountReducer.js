import { defineStore } from 'pinia'
import { AccountTypes } from '../../constants/actionsType'

const AccountStore = defineStore({
    id: 'account',
    state: () => ({
        isFetching: false,
        data: [],
        totalPages: 1,
        activePage: 1,
        textSearch: '',
        error: false,
        messageError: null,
    }),
    getters: {
        items: (state) =>
            state.data.reduce((items, item) => {
                items.push({ name: item })
                return items
            }, []),
    },
    actions: {
        getAccountRequest() {
            AccountTypes.GET_ACCOUNT_REQUEST
            this.isFetching = true
            this.data = []
            this.totalPages = null
            this.textSearch = ''
            this.error = false
            this.messageError = null
        },
        getAccountSuccess(payload) {
            AccountTypes.GET_ACCOUNT_SUCCESS
            this.isFetching = false
            this.data = payload.data
            this.totalPages = payload.totalPages
            this.activePage = payload.activePage
            this.textSearch = payload.textSearch
            this.error = false
            this.messageError = null
        },
        getAccountFailure(payload) {
            AccountTypes.GET_ACCOUNT_FAILURE
            this.isFetching = false
            this.data = []
            this.totalPages = null
            this.textSearch = ''
            this.error = true
            this.messageError = payload.message
        },
        createAccountRequest() {
            AccountTypes.CREATE_ACCOUNT_REQUEST
            this.isFetching = true
            this.error = false
            this.messageError = null
        },
        createAccountSuccess() {
            AccountTypes.CREATE_ACCOUNT_SUCCESS
            this.isFetching = false
            this.error = false
            this.messageError = null
        },
        createAccountFailure(payload) {
            AccountTypes.CREATE_ACCOUNT_FAILURE
            this.isFetching = false
            this.error = true
            this.messageError = payload.message
        },
        updateAccountRequest() {
            AccountTypes.UPDATE_ACCOUNT_REQUEST
            this.isFetching = true
            this.error = false
            this.messageError = null
        },
        updateAccountSuccess() {
            AccountTypes.UPDATE_ACCOUNT_SUCCESS
            this.isFetching = false
            this.error = false
            this.messageError = null
        },
        updateAccountFailure(payload) {
            AccountTypes.UPDATE_ACCOUNT_FAILURE
            this.isFetching = false
            this.error = true
            this.messageError = payload.message
        },
        deleteAccountRequest() {
            AccountTypes.DELETE_ACCOUNT_REQUEST
            this.isFetching = true
            this.error = false
            this.messageError = null
        },
        deleteAccountSuccess() {
            AccountTypes.DELETE_ACCOUNT_SUCCESS
            this.isFetching = false
            this.error = false
            this.messageError = null
        },
        deleteAccountFailure(payload) {
            AccountTypes.DELETE_ACCOUNT_FAILURE
            this.isFetching = false
            this.error = true
            this.messageError = payload.message
        }
    },
})
export default AccountStore;