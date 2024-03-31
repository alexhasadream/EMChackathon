import { useEffect } from 'react'
import { Outlet, useLocation, history, useSelectedRoutes } from 'umi'
import { useTitle } from 'ahooks'
import day from 'dayjs'
import 'dayjs/locale/zh-cn'
day.locale('zh-cn')

const View = () => {
    const { pathname } = useLocation(),
        selected_routes = useSelectedRoutes(),
        label = selected_routes.at(-1)?.route?.label

    useTitle(`${APP_TITLE}-${label || ''}`)

    useEffect(() => {
        if (pathname === '/') {
            history.replace('/my_creation')
        }
    }, [])

    return (
        <>
            <Outlet />
        </>
    )
}

export default View
