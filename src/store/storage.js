import {USER_ROLES} from "./static";

export class PersistentStorage {
    KEY_TOKEN = "app-token"
    KEY_USER = "app-user"
    _default_values = {
        [this.KEY_TOKEN]: "",
        [this.KEY_USER]: {
            firstName: "",
            lastName: "",
            role: USER_ROLES.ANONYMOUS
        },
    }

    constructor() {
        this.$storage = localStorage
    }

    _get_default(key) {
        return this._default_values[key];
    }

    save(key, payload) {
        const json = JSON.stringify(payload)
        this.$storage.setItem(key, json)
    }

    read(key) {
        const json = this.$storage.getItem(key)
        try {
            const data = JSON.parse(json)
            return (data === null)? this._get_default(key): data
        } catch (e) {
            return this._get_default(key) || null
        }
    }

    clear(key) {
        this.$storage.setItem(key, null)
    }
}

export const STORAGE = new PersistentStorage()
export default STORAGE