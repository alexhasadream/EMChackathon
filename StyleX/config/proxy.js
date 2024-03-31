const proxy = {
    '/v1': {
        target: 'http://172.16.20.181:5010',
        changeOrigin: true
    }
}

export default proxy
