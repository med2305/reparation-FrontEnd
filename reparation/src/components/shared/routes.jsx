import { BrowserRouter as Router, Route, Routes as Routing, useNavigate } from 'react-router-dom';
import Home from '../home/home';
import SignIn from '../authentification/login';
import Users from '../admin/users';
import ManageUser from '../admin/manageUser';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import CheckoutStepper from '../stepper';
import Signup from '../authentification/signup';

// function RedirectToSignIn() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate('/login');
//   }, [navigate]);

//   return null;
// }

export default function Routes() {
  const token = localStorage.getItem('token');
  let role
  if (token) {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role;
    console.log('Decoded Token:', role);
  }
  else {
    // RedirectToSignIn();
  }
  return (
    <Router>
      <Routing>
        <Route exact path="*" element={<Home />} />
        <Route exact path="/login" element={<SignIn />} />
        <Route exact path="/users" element={role === 'admin' ?<Users /> : <Home />} />
        <Route exact path="/createUser" element={role === 'admin' ?<ManageUser /> : <Home />} />
        <Route exact path="/updateUser" element={role === 'admin' ?<ManageUser /> : <Home />} />
        <Route exact path="/stepper" element={<CheckoutStepper />} />
        <Route exact path="/register" element={<Signup />} />☻
      </Routing>
    </Router>
  );
}
