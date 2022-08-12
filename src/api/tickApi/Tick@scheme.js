import { REST_API_METHOD as METHOD, BASE_URL } from '../../constants/index'

const TICK_SCHEME = {
    ACCOUNT: {
        GET: {
            url: `${BASE_URL}/getAccount`,
            method: METHOD.GET
        },
        UPDATE: {
            url: `${BASE_URL}/updateAccount/:id`,
            method: METHOD.PUT
        },
    },
    ROLE: {
        GET: {
            url: `${BASE_URL}/getRole`,
            method: METHOD.GET
        },
    },
}

export default TICK_SCHEME