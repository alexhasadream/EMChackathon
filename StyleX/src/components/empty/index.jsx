import { useSelector } from 'umi'
import styles from './styles.less'
import { useEffect, useState } from 'react'

const View = () => {
    const { language } = useSelector(state => state.global),
        [languageType, setLanguageType] = useState('zh')

    useEffect(() => {
        setLanguageType(language ? language : 'zh')
    }, [language])

    return (
        <div className={styles.emptyView}>
            <div className={styles.wrap}>
                <div className={styles.img} />
                <div className={styles.text}>{languageType === 'zh' ? '请登录后查看' : 'Please login to view'}</div>
            </div>
        </div>
    )
}

export default View
