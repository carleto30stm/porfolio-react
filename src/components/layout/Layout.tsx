import React, { Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const CinematicWorld = React.lazy(() => import('../three/CinematicWorld'));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Suspense fallback={null}>
        <CinematicWorld />
      </Suspense>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
