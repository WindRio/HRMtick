import AccountStore from '../../reducers/AccManageReducer/AccountReducer'
import { accountApi } from '../../api'
// import { Account } from '../mockup'
const token = localStorage.getItem('token')
const limit = 10;
const password = "Eledevo@123"

async function getAccount(payload) {
    const actions = AccountStore()
    await actions.getAccountRequest()
    try {
        // const res = Account
        const res = await accountApi.getAccount(
            null, null, {
            activePage: `${payload.activePage - 1}&`, limit: `${limit}&`, textSearch: `${payload.textSearch}`
        }, token
        )
        let totalPages = res.totalPage
        if (!totalPages || totalPages == 0) { totalPages = 1 }
        await actions.getAccountSuccess({
            data: res.data,
            totalPages: totalPages,
            activePage: payload.activePage
        })
    } catch (error) {
        await actions.getAccountFailure(error)
    }
}

async function createAccount(payload) {
    const actions = AccountStore()
    await actions.createAccountRequest()
    try {
        const textSearch = actions.$state.textSearch
        const totalPages = actions.$state.totalPages
        let data = actions.$state.data
        const res = await accountApi.addAccount(
            { email: payload.email, listIdRole: payload.roles, password: password }, null, null, token
        )
        if (res.status) {
            if (payload.name.toLowerCase().includes(textSearch.toLowerCase())) {
                if (data.length == limit) {
                    await actions.createAccountSuccess()
                    await getAccount({ activePage: totalPages + 1, textSearch: textSearch })
                } else {
                    await actions.createAccountSuccess()
                    await getAccount({ activePage: totalPages, textSearch: textSearch })
                }
            } else {
                await actions.createAccountSuccess()
                await actions.getAccountSuccess({ activePage: 1, totalPages: 1, data: [res.data] })
            }
        } else throw { message: res.message }
    } catch (error) {
        await actions.createAccountFailure(error)
    }
}

async function updateAccount(payload) {
    const actions = AccountStore()
    await actions.updateAccountRequest()
    try {
        let textSearch = actions.$state.textSearch
        let activePage = actions.$state.activePage
        const res = await accountApi.updateAccount(
            { active: payload.isActive, listIdRole: payload.role }, { id: `${payload.id}` }, null, token
        )
        if (res.status) {
            if (payload.name.toLowerCase().includes(textSearch.toLowerCase())) {
                await actions.updateAccountSuccess()
                await getAccount({ activePage: activePage, textSearch: textSearch })
            } else {
                await actions.updateAccountSuccess()
                await actions.getAccountSuccessSuccess({ activePage: 1, textSearch: 1, data: [res.data] })
            }
        } else throw { message: res.message }
    } catch (error) {
        await actions.updateAccountFailure(error)
    }
}

async function deleteAccount(payload) {
    const actions = AccountStore()
    await actions.deleteAccountRequest()
    try {
        console.log(payload)
        const res = await accountApi.deleteAccount()
        if (res.status) {
            await actions.deleteAccountSuccess()
            await getAccount()
        } else throw { message: res.message }
    } catch (error) {
        await actions.deleteAccountFailure(error)
    }
}


export {
    getAccount, createAccount, updateAccount,
    deleteAccount
}