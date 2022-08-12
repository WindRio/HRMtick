import { createPinia } from 'pinia'
import {PiniaLogger} from 'pinia-logger';
const pinia = createPinia()

pinia.use(PiniaLogger({
    expanded: true,
    disabled: process.env.mode === "production"
}))

export default pinia