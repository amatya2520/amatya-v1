import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
