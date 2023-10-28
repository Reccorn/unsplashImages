import { useState } from 'react'
import styles from './search.module.scss'

interface searchProps {
    searchIsInited: boolean,
    onSubmit: (arg0: string) => void
}

export default function Search({ searchIsInited, onSubmit }: searchProps) {
    const [searchValue, setSearchValue] = useState<string>('')

    return (
        <form className={styles.form__wrapper + (searchIsInited ? ' ' + styles.wrapper__top : '')} onSubmit={(e) => {
            e.preventDefault()
            onSubmit(searchValue)
        }}>
            <div className={styles.form__item}>
                <input type="text" value={searchValue} placeholder='Телефоны, яблоки, груши...' onChange={(e) => setSearchValue(e.target.value)} />
                {searchValue.length > 0 &&
                    <span className={styles.clear} onClick={() => setSearchValue('')}></span>
                }
            </div>
            <button type='submit'>
                Искать
            </button>
        </form>
    )
}