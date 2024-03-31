/*
 * @Author: zhencheng.hu
 * @Date: 2023-11-03 13:52:53
 * @LastEditors: zhencheng.hu
 * @LastEditTime: 2023-12-27 16:54:54
//  * @Description: file content
 */
import { extend } from 'umi-request'
import { http_code_map } from './code_map'
import { Modal, message } from 'antd'
import { debounce } from 'lodash'
import { clearSocket } from '@/utils/socket'
import { history } from 'umi'

const msg_queue = {}, // 消息队列
    msg_cd = 1000 * 3 // 消息冷却时间

let is_refreshing = false,
    failed_queue = [],
    logout_modal_ref = void 0

const processQueue = (error, token) => {
    failed_queue.forEach(prom => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failed_queue = []
}

/**
 * @description: 异常提示
 * @param {type}
 * @return:
 */

const errorMessage = msg => {
    const now = Date.now(),
        last_same_msg_time = msg_queue.hasOwnProperty(msg) ? msg_queue[msg] : void 0

    if (!last_same_msg_time || now - last_same_msg_time >= msg_cd) {
        if (msg) {
            message.error(msg)
            msg_queue[msg] = now
        }
    }
}

/**
 * @description: token失效处理，强制退出登录
 * @param {*} _
 * @return {*}
 */
const tokenFailure = debounce((code, message) => {
    const pathname = window?.location?.pathname
    if (pathname !== '/webportal/login') {
        clearSocket()
        if (!logout_modal_ref) {
            logout_modal_ref = Modal.warning({
                title: message,
                // title: `${code === '70135038' ? '登录失效' : '用户被禁或删除'}，请重新登录`,
                onOk: () => {
                    localStorage.removeItem('web_token')
                    history.replace('/webportal/login')
                    logout_modal_ref = void 0
                }
            })
        }
    }
}, 500)

/**
 * @description: 异常处理程序
 * @param {type}
 * @return:
 */
const errorHandler = error => {
    const { response: { status } = {}, data: { message } = {} } = error,
        error_text = message ? JSON.stringify(message) : http_code_map?.[status]

    errorMessage(error_text)
    return error
}

/**
 * @description: 配置request请求时的默认参数
 * @param {type}
 * @return:
 */
const instance = extend({
    // prefix: localStorage.getItem('currentAddress') ? localStorage.getItem('currentAddress') : 'http://172.16.20.181:19102',
    errorHandler
})

/* request拦截器, 改变url 或 options */
instance.interceptors.request.use((url, { headers, ...rest }) => {
    return {
        url,
        options: {
            headers: {
                'X-Authorization': `Bearer ${localStorage.getItem('web_token')}`,
                // userId: localStorage.getItem('user_id'),
                ...headers
            },
            ...rest
        }
    }
})

/* response拦截器, 处理response */
instance.interceptors.response.use(async (response, options) => {
    try {
        const res = await response.clone().json(),
            { code, message } = res

        if (response.status === 200 && code !== '00000000') {
            if (['70135038', '70122004', '70122005', '70122003'].includes(code)) {
                // 退出登录模式，游客模式
                localStorage.removeItem('web_token')
                localStorage.removeItem('refresh_token')
                localStorage.removeItem('user_id')
                localStorage.removeItem('user_info')
            } else {
                const error_text = JSON.stringify(message)
                errorMessage(error_text)
            }
        }
    } catch (error) {
        console.log(error)
    }

    return response
})

export default instance
