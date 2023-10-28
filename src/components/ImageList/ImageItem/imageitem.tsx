import { useState } from 'react'
import styles from './imageitem.module.scss'
import Modal from '../../Modal/modal'

interface imageProps {
    smallImage: string,
    bigImage: string,
    descr: string
}

export default function ImageItem({ smallImage, bigImage, descr }: imageProps) {
    const [imageOpened, setImageOpened] = useState<boolean>(false)

    return (
        <>
            <li className={styles.image__item} onClick={() => setImageOpened(true)}>
                <img src={smallImage} alt={descr} />
            </li>
            {imageOpened &&
                <Modal closeFunc={() => setImageOpened(false)}>
                    <img src={bigImage} alt="descr" />
                </Modal>
            }
        </>
    )
}