import { useState } from 'react'
import Search from './components/Search/search'
import ImageList from './components/ImageList/imagelist'

function App() {
	const [searchValue, setSearchValue] = useState<string>('')
	const [searchIsInited, setSearchIsInited] = useState<boolean>(false)

	function initSearch(value: string) {
		if (value) {
			setSearchValue(value)
			setSearchIsInited(true)
		}
	}

	return (
		<main>
			<Search searchIsInited={searchIsInited} onSubmit={initSearch} />
			<div className="container">
				{searchIsInited &&
					<ImageList query={searchValue} />
				}
			</div>
		</main>
	)
}

export default App
