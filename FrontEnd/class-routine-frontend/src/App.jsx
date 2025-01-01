import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ToastNotification from "./components/ToastNotification";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import AuthContext from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import CoordinatorPanel from "./pages/CoordinatorPanel";
import StudentView from "./pages/StudentView";
import TeacherView from "./pages/TeacherView";
import LabAssistantView from "./pages/LabAssistantView";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Header />}
        <div className="main-content">
          {isAuthenticated && <Sidebar />}
          <div className="page-content">
            <ToastNotification />
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route
                path="/"
                element={<ProtectedRoute element={<Dashboard />} />}
              />

              <Route
                path="/admin"
                element={<RoleBasedRoute roles={["Admin"]} element={<AdminPanel />} />}
              />

              <Route
                path="/coordinator"
                element={<RoleBasedRoute roles={["Coordinator"]} element={<CoordinatorPanel />} />}
              />

              <Route
                path="/student"
                element={<RoleBasedRoute roles={["Student"]} element={<StudentView />} />}
              />

              <Route
                path="/teacher"
                element={<RoleBasedRoute roles={["Teacher"]} element={<TeacherView />} />}
              />

              <Route
                path="/lab-assistant"
                element={<RoleBasedRoute roles={["LabAssistant"]} element={<LabAssistantView />} />}
              />
            </Routes>
          </div>
        </div>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

export default App;
