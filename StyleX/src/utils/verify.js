/* 中文 */
export const chinese = /^[\u4e00-\u9fa5]+$/
/* 电子邮箱 */
export const email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/

/* 12字符 */
export const max12 = /^.{0,12}$/

/* 16字符 */
export const max16 = /^.{0,16}$/

/* 32字符 */
export const max32 = /^.{0,32}$/

/* 50字符 */
export const max50 = /^.{0,50}$/

/* 64字符 */
export const max64 = /^.{0,64}$/

/* 128字符 */
export const max128 = /^.{0,128}$/

/* 255字符 */
export const max255 = /^.{0,255}$/

/* 256字符 */
export const max256 = /^.{0,256}$/

/* 非中文 */
export const not_chinese = /^[^\u4e00-\u9fa5]+$/

/* 密码强度 */
export const pwd_strength = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/

/* 端口 */
export const port = /^[0-9]{1,5}$/

/* IP */
export const ip = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

/* 手机号 */
export const mobile = /^1[34578]\d{9}$/

/* 2开头状态码 */
export const success_status = /^2\d{2}$/

/* 英文、数字、下划线、横线 */
export const pattern_string = /^[a-zA-Z0-9-_]+$/

/* 6到20位字母、数字和下划线的组合 */
export const name_string = /^[a-zA-Z0-9_]{6,20}$/

/* 正整数 */
export const positive_int = /^[1-9]\d*$/

/* 除了下划线、横线 */
export const special_chars = /^[^~!@#￥%……&*()=——+|\\[/\]{}`;':"<>?，、　]+$/u

/* 英文和英文空格 */
export const english = /^[A-Za-z ]*$/

/* 包含数字字母和特殊字符 */
export const psd = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%~&*()\-_=+{};:,<.>])(?!.*\s).{8,16}$/
