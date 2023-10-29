import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/front/LoginPage";
import Admin from "./pages/admin/Admin";
import useAuth from "./store/auth";
import AdminLayout from "./components/AdminLayout";
import Skills from "./pages/client/Skills";
import Education from "./pages/client/Education";
import Portfolio from "./pages/client/Portfolio";
import Messages from "./pages/client/Messages";
import ClientPage from "./pages/client/ClientPage";
import Experience from "./pages/client/Experience";
import ClientLayout from "./components/ClientLayout";

const App = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "client" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="experince" element={<ClientPage />} />
          <Route path="client" element={<Experience />} />
          <Route path="skills" element={<Skills />} />
          <Route path="education" element={<Education />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "admin" ? (
              <ClientLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
