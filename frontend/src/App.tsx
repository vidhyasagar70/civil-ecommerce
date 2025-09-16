import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header/Header';
import Products from './ui/admin/products/Products';
import AdminDashboard from './ui/admin/AdminDashboard';
import SignupPage from './pages/auth/SignupPage';
import SigninPage from './pages/auth/SigninPage';
import AuthCallbackPage from './pages/auth/AuthCallbackPage';
import ProfilePage from './ui/profile/ProfilePage';
import './App.css';
import { Orders, Settings, Categories, Companies, Dashboard } from './ui/admin';
import CategoryListing from './pages/CategoryListing';
import CompanyListing from './pages/CompanyListing';
import ProductDetail from './pages/ProductDetail';
import AuthGuard from './components/Auth/AuthGuard';
import PublicRoute from './components/Auth/PublicRoute';

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();

  // Define routes where you don't want the Header
  const hideHeaderRoutes = ['/signin', '/signup'];

  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

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

        {/* Auth callback (public) */}
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Protected routes */}
        <Route path="/" element={
          <AuthGuard>
            <div>Welcome to Home Page</div>
          </AuthGuard>
        } />
        <Route path="/profile" element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        } />
        <Route path="/admin/products" element={
          <AuthGuard>
            <Products />
          </AuthGuard>
        } />
        <Route path="/admin-dashboard" element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        } />

        <Route path="/admin/*" element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        } />
        <Route path='/admin/orders' element={
          <AuthGuard>
            <Orders />
          </AuthGuard>
        } />
        <Route path='/admin/settings' element={
          <AuthGuard>
            <Settings />
          </AuthGuard>
        } />
        <Route path='/admin/categories' element={
          <AuthGuard>
            <Categories />
          </AuthGuard>
        } />
        <Route path='/admin/companies' element={
          <AuthGuard>
            <Companies />
          </AuthGuard>
        } />
        <Route path='/admin/dashboard' element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        } />
        <Route path="/software" element={
          <AuthGuard>
            <CategoryListing />
          </AuthGuard>
        } />
        <Route path="/company/:company" element={
          <AuthGuard>
            <CompanyListing />
          </AuthGuard>
        } />
        <Route path="/product/:id" element={
          <AuthGuard>
            <ProductDetail />
          </AuthGuard>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppLayout />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
