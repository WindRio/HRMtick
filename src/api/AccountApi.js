import Helpers from '../util/helpers/index';
import ApiScheme from './Account@scheme'

const accountApi = {
    getAccount: Helpers.createApi(ApiScheme.ACCOUNT.GET),
    addAccount: Helpers.createApi(ApiScheme.ACCOUNT.ADD),
    updateAccount: Helpers.createApi(ApiScheme.ACCOUNT.UPDATE),
    deleteAccount: Helpers.createApi(ApiScheme.ACCOUNT.DELETE),
}
const profileApi = {
    getProfile: Helpers.createApi(ApiScheme.PROFILE.GET),
    updateProfile: Helpers.createApi(ApiScheme.PROFILE.UPDATE),
}
const roleApi = {
    getRole: Helpers.createApi(ApiScheme.ROLE.GET),
    getAllRole: Helpers.createApi(ApiScheme.ROLE.GETALL),
    addRole: Helpers.createApi(ApiScheme.ROLE.ADD),
    updateRole: Helpers.createApi(ApiScheme.ROLE.UPDATE),
    deleteRole: Helpers.createApi(ApiScheme.ROLE.DELETE),
}
const permissionApi = {
    getPermission: Helpers.createApi(ApiScheme.PERMISSION.GET),
    getAllPermission: Helpers.createApi(ApiScheme.PERMISSION.GETALL),
    updatePermission: Helpers.createApi(ApiScheme.PERMISSION.UPDATE),
}

export {
    accountApi, roleApi, permissionApi, profileApi
};