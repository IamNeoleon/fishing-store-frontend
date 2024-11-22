import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getToken } from './utils/getToken'
import { isTokenExpired } from './utils/isTokenExpired '
import { deleteToken } from './utils/deleteToken'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Cart from './pages/Cart'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Admin from './pages/Admin'
import AdminEditProduct from './pages/AdminEditProduct'
import './scss/index.scss'
import CreateProductForm from './components/CreateProductForm/CreateProductForm'


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
				<Route path='/admin' element={<AdminLayout />}>
					<Route index element={<Admin />} />
					<Route path='product/:id' element={<AdminEditProduct />} />
					<Route path='create_product' element={<CreateProductForm />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
