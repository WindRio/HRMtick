import PermissionStore from '../../reducers/AccManageReducer/PermissionReducer'
import { permissionApi } from '../../api'
// import { Permission } from '../mockup'
const token = localStorage.getItem('token')
const limit = 5;
async function getPermission(payload) {
    const actions = PermissionStore()
    await actions.getPermissionRequest()
    try {
        console.log(payload, " day la saga cua permission")
        // const res = Permission
        const res = await permissionApi.getPermission(
            null, null, {
            activePage: `${payload.activePage - 1}&`, limit: `${limit}&`, textSearch: `${payload.textSearch}`
        }, token
        )
        console.log(res, " day la saga cua permission")
        let totalPages = res.totalPage
        if (!totalPages || totalPages == 0) { totalPages = 1 }
        await actions.getPermissionSuccess({
            data: res.data,
            totalPages: totalPages,
            activePage: payload.activePage,
            textSearch: payload.textSearch,
        })
    } catch (error) {
        await actions.getPermissionFailure(error)
    }
}
async function getAllPermission(payload) {
    const actions = PermissionStore()
    await actions.getPermissionRequest()
    try {
        console.log(payload, " day la saga cua permission")
        // const res = Permission
        const res = await permissionApi.getAllPermission(
            null, null, null, token
        )
        console.log(res, " day la saga cua permission")
        await actions.getPermissionSuccess({
            data: res.data
        })
    } catch (error) {
        await actions.getPermissionFailure(error)
    }
}

async function updatePermission(payload) {
    const actions = PermissionStore()
    await actions.updatePermissionRequest()
    try {
        console.log(payload)
        const res = await permissionApi.updatePermission(
            { description: payload.description }, { id: `${payload.id}` }, null, token
        )
        console.log(res, " day la saga cua permission")
        let textSearch = actions.$state.textSearch
        let activePage = actions.$state.activePage
        if (res.status === true) {
            if (!textSearch) {
                await actions.updatePermissionSuccess()
                await getPermission({ activePage: activePage, textSearch: "" })
            } else {
                await actions.updatePermissionSuccess()
                await getPermission({ activePage: activePage, textSearch: textSearch })
            }
        } else throw { message: res.message }
    } catch (error) {
        await actions.updatePermissionFailure(error)
    }
}

export {
    getPermission, updatePermission, getAllPermission
}