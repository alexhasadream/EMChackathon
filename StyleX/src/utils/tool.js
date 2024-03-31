import { message } from 'antd'
import { uid } from 'uid'

/* file转base64 */
export const file_to_base64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

/* 文件下载 */
export const download_file = (url, filename) => {
    if (!url) return
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    if (!!filename?.length) link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/* 通过blob下载 */
export const download_blob = (data, file_name, suffix = 'xlsx') => {
    const blob = data instanceof Blob ? data : new Blob([data]),
        a = document.createElement('a'),
        url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = `${file_name}.${suffix}`
    a.click()
    window.URL.revokeObjectURL(url)
}

/* 随机色 */
export const random_color = () => {
    const color = ((Math.random() * 0xffffff) | 0).toString(16)
    return `#${'0'.repeat(6 - color.length)}${color}`
}

/* 根据url获取图片宽高 */
export const url_to_size = url =>
    new Promise((resolve, reject) => {
        if (url === undefined) return
        const img = new Image()
        img.src = url
        img.onload = () => resolve({ width: img.width, height: img.height })
        img.onerror = error => reject(error)
    })

/* 图片url转base64 */
export const url_to_base64 = url =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.crossOrigin = 'anonymous'
        image.src = `${url}?v=${uid()}`
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            const ctx = canvas.getContext('2d')
            ctx.drawImage(image, 0, 0, image.width, image.height)
            const dataURL = canvas.toDataURL()
            resolve(dataURL)
        }
        image.onerror = error => reject(error)
    })

/**
 * 判断图片url是否有效
 * @param {string} url - 图片url
 * @returns {Promise<boolean>} - 返回一个Promise对象，resolve为true表示url有效，resolve为false表示url无效
 */
export const valid_img = url =>
    new Promise(resolve => {
        const image = new Image()
        image.src = url
        image.onload = () => resolve(true)
        image.onerror = () => resolve(false)
    })

/* 复制内容到剪贴板 */
export const copy = async v => {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(v)
            message.success('复制成功')
        } else {
            const input = document.createElement('input')
            input.setAttribute('readonly', 'readonly')
            input.setAttribute('value', v)
            document.body.appendChild(input)
            input.select()
            if (document.execCommand('copy')) {
                message.success('复制成功')
            }
            document.body.removeChild(input)
        }
    } catch (err) {
        message.error('复制失败')
    }
}

/**
 * @description: 解析并存储token信息
 * @param {*} token
 * @return {*}
 */
export const parse_token = token => {
    if (!token) return
    const token_arr = token.split('.')
    if (token_arr.length !== 3) return
    const res = JSON.parse(atob(token_arr?.[1]))
    return res
}
