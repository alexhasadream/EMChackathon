import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('1234123412ABCDEF'), // 十六位十六进制数作为密钥
    iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量

export const encrypt = data => {
    if (typeof data === 'object') {
        try {
            data = JSON.stringify(data)
        } catch (err) {
            console.error('Encrypt error:', err)
        }
    }
    const data_hex = CryptoJS.enc.Utf8.parse(data),
        encrypted = CryptoJS.AES.encrypt(data_hex, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
    return encrypted.ciphertext.toString()
}

export const decrypt = data => {
    try {
        const encrypt_hex_str = CryptoJS.enc.Hex.parse(data),
            str = CryptoJS.enc.Base64.stringify(encrypt_hex_str),
            decrypted = CryptoJS.AES.decrypt(str, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
        return decrypted.toString(CryptoJS.enc.Utf8)
    } catch (err) {
        console.error('Decrypt error:', err)
        return null
    }
}
