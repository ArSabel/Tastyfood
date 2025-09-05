import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}