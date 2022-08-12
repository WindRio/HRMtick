import authApi from "./AuthApi";
import * as AccountApi from "./AccountApi";

const { accountApi, roleApi, permissionApi, profileApi } = AccountApi;

export {
    authApi,
    accountApi, roleApi, permissionApi, profileApi
}