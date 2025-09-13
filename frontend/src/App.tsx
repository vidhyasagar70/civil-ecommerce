import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "./components/Header/Header";
import Products from "./ui/admin/products/Products";
import AdminDashboard from "./ui/admin/AdminDashboard"; 
import { Orders, Settings, Categories, Companies, Dashboard } from "./ui/admin";

import "./App.css";
import GoogleCallback from "./pages/auth/googleCallback";
import SignIn from "./pages/auth/signIn";
import HomePage from "./pages/homePage";
import ProtectedRoute from "./components/routes/protectedRoute";

// Create QueryClient for React Query
const queryClient = new QueryClient();

// ✅ Layout for Admin pages (adds Header once)
function AdminLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
        <Route path="categories" element={<Categories />} />
        <Route path="companies" element={<Companies />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route index element={<AdminDashboard />} /> 
        {/* fallback to dashboard */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* 🔹 Auth routes */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/google/callback" element={<GoogleCallback />} />

          {/* 🔹 Default route → Signin */}
          <Route path="/" element={<Navigate to="/signin" replace />} />

          {/* 🔹 Home page (protected) */}
          <Route
            path="/homePage"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Admin section (protected) */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Fallback route */}
          <Route path="*" element={<Navigate to="/homePage" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
