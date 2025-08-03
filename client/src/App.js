import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from './views/common/Header';
import Dashboard from "./views/Dashboard";
import Register from "./views/Register";
import Login from "./views/Login";
import AddEvent from "./views/AddEvent";
import PublicRoute from "./routes/PublicRoutes";
import PrivateRoute from "./routes/PrivateRoutes";
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {user} = useContext(AuthContext);
  const redirectFromHome = () => {
    return <Navigate to={user ? "/events" : "/viewRegister"} replace />;
  };

  return (
   <Router>
      <div>
        <Header/>
          <Routes>
            <Route path="/" element={redirectFromHome()} />
            <Route 
              path="/events" 
              element={
                <PrivateRoute>
                  <Dashboard/>
                </PrivateRoute>  
              }/>
            <Route 
              path="/viewRegister" 
              element={
                <PublicRoute>
                  <Register/>
                </PublicRoute>
              } />
            <Route 
              path="/viewLogin" 
              element={
                <PublicRoute>
                  <Login/>
                </PublicRoute>  
              } />
            <Route 
              path="/viewAddEvent" 
              element={
                <PrivateRoute>
                  <AddEvent/>
                </PrivateRoute> 
              } />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
