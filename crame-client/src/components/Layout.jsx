import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

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