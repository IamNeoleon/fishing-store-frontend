import { Route, Routes, useNavigate } from 'react-router-dom'
import './scss/index.scss'
import { useAppSelector } from './hooks'
import { selectCount } from './redux/slices/counterSlice'
import { useEffect } from 'react'
import { getToken } from './utils/getToken'
import Auth from './pages/Auth'

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = getToken()

		if (!token) {
			navigate('/auth')
		}
	}, [])

	return (
		<>
			<Routes>
				<Route path='/' element={<div>sdasd</div>}></Route>
				<Route path='/auth' element={<Auth />}></Route>
			</Routes>
		</>
	)
}

export default App
