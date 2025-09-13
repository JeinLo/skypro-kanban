import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function ExitPage({ setIsAuth }) {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userInfo');
    navigate('/login');
  }, [setIsAuth, setToken, navigate]);

  return null;
}

export default ExitPage;