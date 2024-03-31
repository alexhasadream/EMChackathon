import { main_list } from './service.js'

const initial_values = {
    image_list: []
}

export default {
    namespace: 'my_creation',
    state: initial_values,
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        /* 改变状态 */
        *CHANGE_STATE({ payload }, { put }) {
            yield put({ type: 'updateState', payload })
        },
        /* 重置 */
        *RESET(_, { put }) {
            yield put({ type: 'updateState', payload: initial_values })
        },
        /* 查询 */
        *MAIN_LIST({ payload }, { call, put, select }) {
            const res = yield call(main_list, payload)
            if (res?.code === '00000000') {
                console.log(res)
                const { data } = res,
                    { images } = data || {}
                yield put({ type: 'updateState', payload: { image_list: images } })
            }
        }
    }
}
