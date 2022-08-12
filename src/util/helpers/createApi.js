import Axios from 'axios'

export default function createApi({ url, method }) {
    const request = (payload = null, paths = null, queries = null, token = null) => {
        // console.log(payload, paths, queries, 'requestttt')
        const config = {}
        config.url = url
        config.method = method


        if (token) {
            config.headers = { 'Authorization': `Bearer ${token}` }
        }

        if (paths) {
            config.url = Object
                .keys(paths)
                .reduce((prev, curr) => prev.replace(`:${curr}`, paths[curr]), url)
        }

        if (queries) {
            // console.log(config.url, 'url goc')
            config.url = Object
                .keys(queries)
                .reduce((prev, curr) => prev + `${curr}=${queries[curr]}`, `${config.url}?`)
        }

        if (payload) {
            config.data = payload
        }

        // console.log('config', config)

        return Axios(config)
            .then(res => res.data)
            .catch(res => res.error)
    }

    return request
}