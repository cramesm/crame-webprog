import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <NavBar />
      <main className="grow pt-20">
        <Outlet />
      </main>
      {/* Enhancement 1: Implementation of the custom Footer */}
      <Footer />
    </div>
  );
};

export default Layout;