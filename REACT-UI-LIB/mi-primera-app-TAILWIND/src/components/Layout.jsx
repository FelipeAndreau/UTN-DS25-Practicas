// src/components/Layout.jsx

import Header from './Header';
import Menu from './Menu';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Menu />
      <main className="w-full px-5 space-y-14">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;