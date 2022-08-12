import AccountStore from '../reducers/TickAccountReducer'
import RoleStore from '../reducers/TickRoleReducer'
import { accountApi, roleApi } from '../api/tickApi'
// import { Account, Role } from './mockup'
const token = localStorage.getItem('token')
const limit = 5;

async function getAccount(payload) {
    const actions = AccountStore()
    await actions.getAccountRequest()
    try {
        // const res = Account
        const res = await accountApi.getAccount(
            null, null, {
            activePage: `${payload.activePage - 1}&`, limit: `${limit}`
        }, null
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

async function updateAccount(payload) {
    const actions = AccountStore()
    await actions.updateAccountRequest()
    try {
        let activePage = actions.$state.activePage
        const res = await accountApi.updateAccount(
            { listIdRole: payload.role }, { id: `${payload.id}` }, null, null
        )
        if (res.status) {
            await actions.updateAccountSuccess()
            await getAccount({ activePage: activePage })
        } else throw { message: res.message }
    } catch (error) {
        await actions.updateAccountFailure(error)
    }
}

async function getRoleTick(payload) {
    const actions = RoleStore()
    await actions.getRoleTickRequest()
    try {
        // const res = Role
        const res = await roleApi.getRole(
            null, null, {
            activePage: `${payload.activePage - 1}&`, limit: `${limit}`
        }, token
        )
        let totalPages = res.totalPage
        if (!totalPages || totalPages == 0) { totalPages = 1 }
        await actions.getRoleTickSuccess({
            dataRole: res.data,
            totalPages: totalPages,
            activePage: payload.activePage,
        })
    } catch (error) {
        await actions.getRoleTickFailure(error)
    }
}

export {
    getAccount, updateAccount, getRoleTick
}