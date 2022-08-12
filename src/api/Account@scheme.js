import { REST_API_METHOD as METHOD, BASE_URL } from '../constants/index'

const ACCOUNT_SCHEME = {
    ACCOUNT: {
        GET: {
            url: `${BASE_URL}/account`,
            method: METHOD.GET
        },
        ADD: {
            url: `${BASE_URL}/registerWeb`,
            method: METHOD.POST
        },
        UPDATE: {
            url: `${BASE_URL}/account/:id`,
            method: METHOD.PUT
        },
        DELETE: {
            url: `${BASE_URL}/account/:id`,
            method: METHOD.DELETE
        },
    },
    PROFILE: {
        GET: {
            url: `${BASE_URL}/profile/getById/:id`,
            method: METHOD.GET
        },
        UPDATE: {
            url: `${BASE_URL}/profile/:id`,
            method: METHOD.PUT
        },
    },
    ROLE: {
        GET: {
            url: `${BASE_URL}/role`,
            method: METHOD.GET
        },
        GETALL: {
            url: `${BASE_URL}/role/getAll`,
            method: METHOD.GET
        },
        ADD: {
            url: `${BASE_URL}/role`,
            method: METHOD.POST
        },
        UPDATE: {
            url: `${BASE_URL}/role/:id`,
            method: METHOD.PUT
        },
        DELETE: {
            url: `${BASE_URL}/role/:id`,
            method: METHOD.DELETE
        },
    },
    PERMISSION: {
        GET: {
            url: `${BASE_URL}/permission`,
            method: METHOD.GET
        },
        GETALL: {
            url: `${BASE_URL}/permission/getAll`,
            method: METHOD.GET
        },
        UPDATE: {
            url: `${BASE_URL}/permission/:id`,
            method: METHOD.PUT
        },
    }
}

export default ACCOUNT_SCHEME