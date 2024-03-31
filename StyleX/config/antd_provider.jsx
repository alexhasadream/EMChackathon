export default {
    appConfig: {},
    configProvider: {
        renderEmpty: () => <div>暂无数据</div>
    },
    theme: {
        token: {
            colorPrimary: '#406dea',
            borderRadius: 2
        },
        components: {
            Tag: {
                defaultBg: '#fafafa'
            },
            Table: {
                colorBgContainer: '#f7fcfd'
            }
        }
    }
}
