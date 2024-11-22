import { Outlet } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader/AdminHeader';
import Footer from '../components/Footer/Footer';

const AdminLayout: React.FC = () => {

	return (
		<>
			<main className="main">
				<div className="admin">
					<AdminHeader />
					<Outlet />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default AdminLayout;