import { Tooltip, Input, Image, Spin } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'umi'
import { styles_list } from './helper'
import styles from './styles.less'
import img from '../../assets/creation/No_style.png'

const { TextArea } = Input

const list = [1, 2, 4, 9]

function App() {
    const dispatch = useDispatch(),
        { image_list } = useSelector(state => state.my_creation),
        loading = useSelector(state => state.loading),
        upload_loading = loading.effects['my_creation/MAIN_LIST'],
        [radio_key, setRadioKey] = useState(1),
        [imageStyle, setImageStyle] = useState({
            name: 'No Style',
            url: require('@/assets/creation/No_style.png')
        }),
        [value, setValue] = useState(void 0)

    console.log(upload_loading)

    return (
        <div className={styles.bigView}>
            <div className={styles.headerWrap}>
                <img src={require('@/assets/creation/AI.png')} alt='' />
                <div className={styles.headerTitle}>AI Image Generator</div>
            </div>
            <div className={styles.contentWrap}>
                <div className={styles.leftWrap}>
                    <div className={styles.leftTitle}>
                        Prompt
                        <Tooltip placement='bottomLeft' title='Generate images that are more consistent and replendent with a similar artistic style below '>
                            <img src={require('@/assets/creation/detail.png')} alt='' />
                        </Tooltip>
                    </div>
                    <div className={styles.textAreaWrap}>
                        <TextArea
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            allowClear
                            placeholder='Discribe what you want the AI to create'
                            autoSize={{ minRows: 6, maxRows: 6 }}
                        />
                    </div>
                    <div className={styles.selectWrap}>Output Numbers</div>
                    <div className={styles.radioWrap}>
                        {list.map((item, index) => (
                            <div
                                onClick={() => {
                                    dispatch({ type: 'my_creation/CHANGE_STATE', payload: { image_list: [] } })
                                    setRadioKey(item)
                                }}
                                key={index}
                                className={`${styles.radioItem} ${radio_key === item ? styles.radioItemActive : ''}`}>
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className={styles.leftTitle}>
                        Style
                        <img src={require('@/assets/creation/detail.png')} alt='' />
                    </div>
                    <div className={styles.stylesWrap}>
                        {styles_list.map((item, index) => (
                            <div key={index} className={styles.stylesItem} onClick={() => setImageStyle(item)}>
                                <div className={`${styles.imgItem} ${imageStyle?.name === item.name ? styles.stylesItemActive : ''}`}>
                                    <img
                                        style={{
                                            width: index === 0 ? '40px' : '68px',
                                            height: index === 0 ? '29px' : '68px'
                                        }}
                                        src={item.url}
                                        alt=''
                                    />
                                </div>
                                <div className={styles.name}>{item.name}</div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.leftFooter}>
                        <Spin spinning={upload_loading ? true : false}>
                            <div className={styles.btn} onClick={onSubmit}>
                                Generate
                            </div>
                        </Spin>
                    </div>
                </div>
                <div className={styles.rightWrap}>
                    <div className={styles.rightTitle}>
                        <img src={require('@/assets/creation/Vector.png')} alt='' />
                        My Creation
                    </div>
                    <div className={styles.rightContent}>
                        {image_list.length > 0 ? (
                            <div
                                className={`${
                                    radio_key === 1 || radio_key === 2 ? styles.imgContent : radio_key === 4 ? styles.imgContent4 : styles.imgContent9
                                }`}>
                                {image_list.map((item, index) =>
                                    radio_key === 1 ? (
                                        <Image key={index} src={`data:image/jpeg;base64,${item}`} alt='' />
                                    ) : (
                                        <div key={index} className={styles.imgLeft}>
                                            <Image src={`data:image/jpeg;base64,${item}`} alt='' />
                                        </div>
                                    )
                                )}
                            </div>
                        ) : (
                            <div className={styles.initStyle}>
                                <div className={styles.initContent}>
                                    <img src={require('@/assets/creation/Creation.png')} alt='' />
                                    <div className={styles.initText}>Type prompt and click “Generate” to get outstanding creations now! </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )

    function onSubmit() {
        const params = {
            prompt: imageStyle && imageStyle.name !== 'No Style' ? imageStyle.name + ',' + value : value,
            batch_size: radio_key
        }
        dispatch({ type: 'my_creation/MAIN_LIST', payload: params })
    }
}
export default App
