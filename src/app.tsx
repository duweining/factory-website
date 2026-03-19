import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'
import ContactPage from './pages/ContactPage'
import CasesPage from './pages/CasesPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminNews from './pages/admin/AdminNews'
import AdminSettings from './pages/admin/AdminSettings'
import AdminCases from './pages/admin/AdminCases'
import AdminSeo from './pages/admin/AdminSeo'
import BatchNewsGenerator from './pages/admin/BatchNewsGenerator'
import AdminAutoNews from './pages/admin/AdminAutoNews'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          {/* Admin Routes - 放在前面 */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/batch-news" element={<BatchNewsGenerator />} />
          <Route path="/admin/auto-news" element={<AdminAutoNews />} />
          <Route path="/admin/cases" element={<AdminCases />} />
          <Route path="/admin/seo" element={<AdminSeo />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Public Routes */}
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
            path="/products/:id"
            element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <ProductDetailPage />
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
            path="/news/:id"
            element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <NewsDetailPage />
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
          <Route
            path="/cases"
            element={
              <>
                <Navbar />
                <main className="flex-grow pt-20">
                  <CasesPage />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </HashRouter>
  )
}
