import { defineStore } from 'pinia'
import { AccountTypes } from '../constants/actionsType'

const AccountStore = defineStore({
    id: 'account',
    state: () => ({
        isFetching: false,
        data: [],
        totalPages: 1,
        activePage: 1,
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
            this.error = false
            this.messageError = null
        },
        getAccountSuccess(payload) {
            AccountTypes.GET_ACCOUNT_SUCCESS
            this.isFetching = false
            this.data = payload.data
            this.totalPages = payload.totalPages
            this.activePage = payload.activePage
            this.error = false
            this.messageError = null
        },
        getAccountFailure(payload) {
            AccountTypes.GET_ACCOUNT_FAILURE
            this.isFetching = false
            this.data = []
            this.totalPages = null
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
    },
})
export default AccountStore;