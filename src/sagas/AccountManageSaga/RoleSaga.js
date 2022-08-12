import RoleStore from '../../reducers/AccManageReducer/RoleReducer'
import { roleApi } from '../../api'
// import { Role } from '../mockup'
const token = localStorage.getItem('token')
const limit = 5;

async function getRole(payload) {
    const actions = RoleStore()
    await actions.getRoleRequest()
    try {
        // const res = Role
        const res = await roleApi.getRole(
            null, null, {
            activePage: `${payload.activePage - 1}&`, limit: `${limit}&`, textSearch: `${payload.textSearch}`
        }, token
        )
        let totalPages = res.totalPage
        if (!totalPages || totalPages == 0) { totalPages = 1 }
        await actions.getRoleSuccess({
            data: res.data,
            totalPages: totalPages,
            activePage: payload.activePage,
            textSearch: payload.textSearch,
        })
    } catch (error) {
        await actions.getRoleFailure(error)
    }
}

async function getAllRole() {
    const actions = RoleStore()
    await actions.getRoleRequest()
    try {
        const res = await roleApi.getAllRole(
            null, null, null, token
        )
        await actions.getRoleSuccess({
            data: res.data
        })
    } catch (error) {
        await actions.getRoleFailure(error)
    }
}

async function createRole(payload) {
    const actions = RoleStore()
    await actions.createRoleRequest()
    try {
        let totalPages = actions.$state.totalPages
        let textSearch = actions.$state.textSearch
        let data = actions.$state.data
        const res = await roleApi.addRole(
            { name: payload.name, listIdPermission: payload.permissions }, null, null, token
        )
        if (res.status) {
            if (payload.name.toLowerCase().includes(textSearch.toLowerCase())) {
                if (data.length == limit) {
                    await actions.createRoleSuccess()
                    await getRole({ activePage: totalPages + 1, textSearch: textSearch })
                } else {
                    await actions.createRoleSuccess()
                    await getRole({ activePage: totalPages, textSearch: textSearch })
                }
            } else {
                await actions.createRoleSuccess()
                await actions.getRoleSuccess({ activePage: 1, totalPages: 1, data: [res.data] })
            }
        } else throw { message: res.message }
    } catch (error) {
        await actions.createRoleFailure(error)
    }
}

async function updateRole(payload) {
    const actions = RoleStore()
    await actions.updateRoleRequest()
    try {
        // let totalPages = actions.$state.totalPages
        let textSearch = actions.$state.textSearch
        let activePage = actions.$state.activePage
        const res = await roleApi.updateRole(
            { name: payload.name, listIdPermission: payload.permissions }, { id: `${payload.id}` }, null, token
        )
        if (res.status) {
            if (payload.name.toLowerCase().includes(textSearch.toLowerCase())) {
                await actions.updateRoleSuccess()
                await getRole({ activePage: activePage, textSearch: textSearch })
            } else {
                await actions.updateRoleSuccess()
                await actions.getRoleSuccess({ activePage: 1, textSearch: 1, data: [res.data] })
            }
        } else throw { message: res.message }
    } catch (error) {
        await actions.updateRoleFailure(error)
    }
}

async function deleteRole(payload) {
    const actions = RoleStore()
    await actions.deleteRoleRequest()
    try {
        // let totalPages = actions.$state.totalPages
        let textSearch = actions.$state.textSearch
        let activePage = actions.$state.activePage
        let data = actions.$state.data
        const res = await roleApi.deleteRole(
            null, { id: `${payload}` }, null, token
        )
        if (res.status) {
            if (data.length === 1) {
                if (activePage === 1) {
                    await actions.deleteRoleSuccess()
                    await getRole({ activePage: 1, textSearch: textSearch, totalPages: 1, data: [] })
                } else {
                    await actions.deleteRoleSuccess()
                    await getRole({ activePage: activePage - 1, textSearch: textSearch })
                }
            } else {
                await actions.deleteRoleSuccess()
                await getRole({ activePage: activePage, textSearch: textSearch })
            }
        } else throw { message: res.message }
    } catch (error) {
        await actions.deleteRoleFailure(error)
    }
}


export {
    getRole, createRole, updateRole, deleteRole, getAllRole
}