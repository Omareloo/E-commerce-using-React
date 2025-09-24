import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home/home";
import LoginPage from "./pages/Login/login";
import DashboardLayout from "./Layouts/DashBoardLayout";

function App() {
  const isAuthenticated = true; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
