import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import HomePage from './pages/auth/HomePage';
import Disclaimer from './ui/policy/Disclaimer';

import ReturnPolicy from './ui/policy/ReturnPolicy';

import TermsAndConditions from './ui/policy/TermsAndConditions';
import ShippingPolicy from './ui/policy/ShippingPolicy';
import Footer from './components/Footer/Footer';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          {/* Public routes (only accessible when NOT logged in) */}
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

          {/* Protected routes (only accessible when logged in) */}
          <Route path="/" element={
            <AuthGuard>
             <HomePage/>
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
          <Route path="/products" element={
            <AuthGuard>
              <Products />
           </AuthGuard>
          } />


          {/* Catch all route - redirect to signin */}
          <Route path="*" element={<Navigate to="/signin" replace />} />



            {/* policies */}
            
            <Route path="/policies/terms" element={<TermsAndConditions />} />
            <Route path="/policies/disclaimer" element={<Disclaimer />} />
            <Route path="/support/return" element={<ReturnPolicy />} />
             <Route path="/ShippingPolicy" element={<ShippingPolicy />} />
           
        </Routes>
        <Footer/>
      </Router>
    </QueryClientProvider>
  );
}

export default App;