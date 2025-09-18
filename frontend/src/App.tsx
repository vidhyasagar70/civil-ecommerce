import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header/Header';
import Products from './ui/admin/products/Products';
import AdminDashboard from './ui/admin/AdminDashboard';
import SignupPage from './pages/auth/SignupPage';
import SigninPage from './pages/auth/SigninPage';
import AuthCallbackPage from './pages/auth/AuthCallbackPage';
import ProfilePage from './ui/profile/ProfilePage';
import { Orders, Settings, Categories, Companies, Dashboard } from './ui/admin';
import CategoryListing from './pages/CategoryListing';
import CompanyListing from './pages/CompanyListing';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import AuthGuard from './components/Auth/AuthGuard';
import PublicRoute from './components/Auth/PublicRoute';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import PasswordResetPage from './pages/auth/PasswordResetPage';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import Disclaimer from './ui/policy/Disclaimer';
import ReturnPolicy from './ui/policy/ReturnPolicy';
import TermsAndConditions from './ui/policy/TermsAndConditions';
import ShippingPolicy from './ui/policy/ShippingPolicy';
import ContactPage from './pages/ContactPage';
const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();

  // Define routes where you don't want the Header
  const hideHeaderRoutes = ['/signin', '/signup', '/forgot-password', '/reset-password'];

  const shouldHideHeader = hideHeaderRoutes.some(route =>
    location.pathname === route || location.pathname.startsWith('/reset-password/')
  );

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/signup" element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        } />
        <Route path="/signin" element={
          <PublicRoute>
            <SigninPage />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        } />
        <Route path="/reset-password/:token" element={
          <PublicRoute>
            <PasswordResetPage />
          </PublicRoute>
        } />

        {/* Auth callback (public) */}
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthGuard>
              <ProfilePage />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/products"
          element={
            <AuthGuard>
              <Products />
            </AuthGuard>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AuthGuard>
              <AdminDashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AuthGuard>
              <AdminDashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AuthGuard>
              <Orders />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <AuthGuard>
              <Settings />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AuthGuard>
              <Categories />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/companies"
          element={
            <AuthGuard>
              <Companies />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/software"
          element={
            <AuthGuard>
              <CategoryListing />
            </AuthGuard>
          }
        />
        <Route
          path="/company/:company"
          element={
            <AuthGuard>
              <CompanyListing />
            </AuthGuard>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AuthGuard>
              <ProductDetail />
            </AuthGuard>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthGuard>
              <CartPage />
            </AuthGuard>
          }
        />
        <Route
          path="/contact"
          element={
            <AuthGuard>
              <ContactPage />
            </AuthGuard>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
      </Routes>
      {!shouldHideHeader && <Footer />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <AppLayout />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;