import { post } from '@/utils/request'

/* 查询 */
export const main_list = v => post('/v1/emc/paint', v)
