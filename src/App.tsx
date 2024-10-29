import { Route, Routes, useNavigate } from 'react-router-dom'
import './scss/index.scss'
import { useEffect } from 'react'
import { getToken } from './utils/getToken'
import { isTokenExpired } from './utils/isTokenExpired '
import { deleteToken } from './utils/deleteToken'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Header from './components/Header/Header'
import Sort from './components/Sort/Sort'


function App() {
	const navigate = useNavigate();


	useEffect(() => {
		const token = getToken();
		if (token) {
			if (isTokenExpired(token)) {
				navigate('/auth')
				deleteToken()
			} else {
				navigate('/')
			}
		} else {
			navigate('/auth');
		}
	}, [])

	return (
		<>
			<Header />
			<Sort />
			<main className='main'>
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/auth' element={<Auth />}></Route>
				</Routes>
			</main>
		</>
	)
}

export default App
