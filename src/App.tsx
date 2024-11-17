import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './scss/index.scss'
import { useEffect } from 'react'
import { getToken } from './utils/getToken'
import { isTokenExpired } from './utils/isTokenExpired '
import { deleteToken } from './utils/deleteToken'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Cart from './pages/Cart'
import MainLayout from './MainLayout'
import Admin from './pages/Admin'


function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = getToken();
		if (token) {
			if (isTokenExpired(token)) {
				navigate('/auth')
				deleteToken()
			}
		} else {
			navigate('/auth');
		}
	}, [])

	return (
		<>
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path="cart" element={<Cart />} />
				</Route>
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</>
	)
}

export default App
