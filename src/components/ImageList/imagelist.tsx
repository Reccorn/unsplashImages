import { useEffect, useRef, useState } from "react"
import { RotatingLines } from "react-loader-spinner"
import ImageItem from "./ImageItem/imageitem"
import styles from "./imagelist.module.scss"

interface listProps {
    query: string
}

export default function ImageList(props: listProps) {
    const { query } = props

    const [currentPage, setCurrentPage] = useState<number>(0)
    const [images, setImages] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingError, setLoadingError] = useState<boolean>(false)
    const [lastValue, setLastValue] = useState<string>('')

    const bottomOfList = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            setLoadingError(false)

            try {
                const res = await fetch(`https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=${query}&page=${currentPage}`)
                if (res.ok) {
                    const data = await res.json()
                    if (data.results.length > 0) {
                        setImages(prevState => prevState.concat(...data.results))
                        setCurrentPage(prevState => prevState + 1)
                    } else {
                        observer.disconnect()
                    }
                } else {
                    throw (res.status)
                }
            } catch(err) {
                console.log(err)
                setLoadingError(true)
            } finally {
                setLoading(false)
            }
        }

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) {
                loadData()
            }
        }, {
            rootMargin: '0px'
        })

        if (bottomOfList.current) {
            observer.observe(bottomOfList.current)
        }

        if (query !== lastValue) {
            setLoadingError(false)
            setLastValue(query)
            setCurrentPage(1)
            setImages([])
        }

        return () => {
            if (bottomOfList.current) {
                observer.unobserve(bottomOfList.current)
            }
        }
    }, [bottomOfList.current, currentPage, query])

    return (
        <>
            <ul className={styles.images__list}>


                {images.map((item, index) =>
                    <ImageItem key={index}
                        smallImage={item.urls.small}
                        bigImage={item.urls.full}
                        descr={item.description}
                    />
                )}
            </ul>
            {loading &&
                <div className={styles.loading}>
                    <RotatingLines
                        strokeColor="#000000"
                        strokeWidth="6"
                        width="32"
                        visible={true}
                        animationDuration="1"
                    />
                </div>
            }
            <div ref={bottomOfList}></div>
            {images.length === 0  && !loading && !loadingError &&
                <p>К сожалению, поиск не дал результатов</p>
            }
            {loadingError &&
                <div className={styles.error}>
                    <p>При загрузке данных произошла ошибка</p>
                </div>
            }
        </>
    )
}