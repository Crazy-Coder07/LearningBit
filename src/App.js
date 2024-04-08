import './App.css';
import Login from './Registration/Login/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeLink from './HomeLink/HomeLink';
import Register from './Registration/Register/Register';
import ForgotPassword from './Registration/ForgotPassword/ForgotPassword';
import NotFound from './Component/NotFound/NotFound';

function App() {

  const accessToken = !!localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/home/*"
          element={accessToken ? <HomeLink /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!accessToken ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/register"
          element={!accessToken ? <Register /> : <Navigate to="/home" />}
        />
        <Route
        path='forgot-password'
        element={!accessToken ? <ForgotPassword /> : <Navigate to="/home" />}
        />
        <Route
        path="/*"
        element={<NotFound/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
