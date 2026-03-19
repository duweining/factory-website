import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import NewsPage from './pages/NewsPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminNews from './pages/admin/AdminNews'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <HomePage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/products"
            element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <ProductsPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <NewsPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <ContactPage />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
