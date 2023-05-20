import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LoginForm } from './forms/LoginForm';
import { Notification } from './components/Notification';
import loginService from './services/loginApi';
import { setToken } from './services/blogsApi';
import { Blogs } from './components/blogs/Blogs';

import './App.css';
import { SignupForm } from './forms/SignupForm';

function App() {
  const user_key = 'blog_user';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storage = localStorage.getItem(user_key);
    if (storage) {
      const user = JSON.parse(storage);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setToken(user.token);
      setUser(user);
      setPassword('');
      setUsername('');
      localStorage.setItem(user_key, JSON.stringify(user));
      navigate('/blogs');
    } catch (e) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      navigate('/signup');
    }
  };

  const logout = () => {
    // loginService.logout();
    localStorage.removeItem(user_key);
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="App">
      {user && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '10vh'
          }}
        >
          <button className='logout-button' onClick={logout}>Logout</button>
        </div>
      )}
      <div className='menu'>
        <div className='nav'>
          {!user && <Link className='link' to='/login' style={{ paddingRight: '1rem' }}>Login</Link>}
          {user && <Link className='link' to='/blogs' style={{ paddingRight: '1rem' }}>Home</Link>}
          {!user && <Link className='link' to='/signup'>Signup</Link>}
        </div>
        {user && <button className='logout'  onClick={logout}>Logout</button>}
      </div>
      <Notification
        className='notification'
        message={errorMessage}
      />
      <Routes>
        <Route path='login' element={<LoginForm
          username={username}
          password={password}
          setUsername={e => setUsername(e.target.value)}
          setPassword={e => setPassword(e.target.value)}
          handleLogin={handleLogin}
        />} />
        <Route path='blogs' element={<Blogs />} />
        <Route path='signup' element={<SignupForm />} />
      </Routes>
    </div>
  );
}

export default App;
