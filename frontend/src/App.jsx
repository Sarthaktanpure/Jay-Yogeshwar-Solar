import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage";
import ContactPage from "./pages/ContactPage";
import EstimatorPage from "./pages/EstimatorPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import SolutionsPage from "./pages/SolutionsPage";
import TrendsPage from "./pages/TrendsPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
        <Route path="/trends" element={<TrendsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
