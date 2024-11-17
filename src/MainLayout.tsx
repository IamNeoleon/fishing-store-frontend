import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';

const MainLayout: React.FC = () => {
    return (
        <>
            <Header />
            <Categories />
            <main className="main">
                <Outlet /> {/* Здесь будут рендериться вложенные маршруты */}
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;