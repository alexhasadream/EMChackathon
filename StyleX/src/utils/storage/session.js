import { decrypt as decrypt_func, encrypt as encrypt_func } from './crypto'

/**
 * @description: 获取值
 * @param {string} key 存储的key
 * @param {boolean} options.decrypt 是否解密
 * @return {void}
 */
const get = (key, { decrypt } = {}) => {
    if (!key) return null
    try {
        const storage_str = sessionStorage.getItem(key),
            data = decrypt ? decrypt_func(storage_str) : storage_str
        return JSON.parse(data)
    } catch (err) {
        console.error(`Error get ${key} from sessionStorage`)
        return null
    }
}

/**
 * @description: 设置值
 * @param {string} key 设置的key
 * @param {*} value 设置的value
 * @param {object} options 选项对象
 * @param {boolean} options.encrypt 是否加密
 * @return {void}
 */
const set = (key, value, { encrypt } = {}) => {
    try {
        const value_str = JSON.stringify(!!value ? value : null),
            data = encrypt ? encrypt_func(value_str) : value_str
        sessionStorage.setItem(key, data)
    } catch (err) {
        console.error(`Error set ${key} from sessionStorage`)
    }
}

const remove = key => sessionStorage.removeItem(key)

const clear = () => sessionStorage.clear()

export { clear, get, remove, set }
