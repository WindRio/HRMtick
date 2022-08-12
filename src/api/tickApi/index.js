import Helpers from '../../util/helpers/index';
import ApiScheme from './Tick@scheme'

const accountApi = {
    getAccount: Helpers.createApi(ApiScheme.ACCOUNT.GET),
    updateAccount: Helpers.createApi(ApiScheme.ACCOUNT.UPDATE),
}
const roleApi = {
    getRole: Helpers.createApi(ApiScheme.ROLE.GET),
}

export {
    accountApi, roleApi,
};