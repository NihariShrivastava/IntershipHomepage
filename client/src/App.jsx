import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/LoginPage.jsx";
import Signup from "./pages/Sign-up.jsx";
import About from "./pages/About.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import DashBoard from "./pages/HomePage2.jsx";
import Explore from "./pages/explore.jsx";
import SavedInternships from "./pages/saved.jsx";
import ApplyPage from "./pages/ApplyPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      {" "}
      <Toaster position="top-right" reverseOrder={false} />{" "}
      <Routes>
        {" "}
        {/* Public Routes */} 
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/signup" element={<Signup />} />{" "}
        <Route path="/" element={<DashBoard />} /> 
        {/* Protected Routes */}{" "}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              {" "}
              <DashBoard />{" "}
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              {" "}
              <Explore />{" "}
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              {" "}
              <SavedInternships />{" "}
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/apply"
          element={
            <ProtectedRoute>
              {" "}
              <ApplyPage />{" "}
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              {" "}
              <ProfilePage />{" "}
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              {" "}
              <About />{" "}
            </ProtectedRoute>
          }
        />{" "}
        {/* ✅ Fallback route */}{" "}
        <Route
          path="*"
          element={
            <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
              {" "}
              404 – Page Not Found{" "}
            </h2>
          }
        />{" "}
      </Routes>{" "}
      {/* The Chatbot component is correctly placed here, outside the Routes, so it is visible across all pages that match a route. */}{" "}
         
        </Router>
  );
}
export default App;
