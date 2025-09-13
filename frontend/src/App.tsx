import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header/Header';
import Products from './ui/admin/products/Products'; // adjust import path accordingly
import AdminDashboard from './ui/admin/Dashboard'; // if you have this
import './App.css';
import { Orders, Settings, Categories, Companies, Dashboard } from './ui/admin';
import CategoryListing from './pages/CategoryListing';
import CompanyListing from './pages/CompanyListing';
import ProductDetail from './pages/ProductDetail';


// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<div>Welcome to Home Page</div>} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/admin/orders' element={<Orders />} />
          <Route path='/admin/settings' element={<Settings />} />
          <Route path='/admin/categories' element={<Categories />} />
          <Route path='/admin/companies' element={<Companies />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path="/software" element={<CategoryListing />} />
          <Route path="/company/:company" element={<CompanyListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
