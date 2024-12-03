import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
import Product from './pages/Product'
import './scss/index.scss'
import CreateProductForm from './components/CreateProductForm/CreateProductForm'
import { getUser } from './utils/getUser'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import CreateOrder from './pages/CreateOrder'
import OrdersPage from './pages/OrdersPage'



function App() {
	const navigate = useNavigate();
	const user = getUser();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	useEffect(() => {
		if (user) {
			setIsAdmin(user.isStaff);
		}
	}, [user]);

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
					<Route path="create_order" element={<CreateOrder />} />
					<Route path="product/:id" element={<Product />} />
					<Route path="orders" element={<OrdersPage />} />
				</Route>
				<Route element={<ProtectedRoute isAllowed={isAdmin} redirectTo="/" />}>
					<Route path='/admin' element={<AdminLayout />}>
						<Route index element={<Admin />} />
						<Route path='product/:id' element={<AdminEditProduct />} />
						<Route path='create_product' element={<CreateProductForm />} />
					</Route>
				</Route>
			</Routes >
		</>
	)
}

export default App
