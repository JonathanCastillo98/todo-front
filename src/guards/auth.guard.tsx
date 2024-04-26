import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const PrivateRoute = <Outlet />;

export const AuthGuard = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) window.location.replace('/login');
  const verifyToken = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/validateJWT', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
      localStorage.removeItem('accessToken');
      window.location.replace('/login');
    }
  }

  useEffect(() => {
    verifyToken();
  })

  return PrivateRoute
};

export default AuthGuard;
