import { useEffect, useState } from 'react';
import { LoginForm } from './forms/LoginForm';
import { Notification } from './components/Notification';
import loginService from './services/loginApi';
import { setToken } from './services/blogsApi';
import './App.css';
import { Blogs } from './components/blogs/Blogs';

function App() {
  const user_key = 'blog_user';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

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
    } catch (e) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logout = () => {
    // loginService.logout();
    localStorage.removeItem(user_key);
    setUser(null);
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
      <Notification
        className='notification'
        message={errorMessage}
      />
      {!user && <LoginForm
        username={username}
        password={password}
        setUsername={e => setUsername(e.target.value)}
        setPassword={e => setPassword(e.target.value)}
        handleLogin={handleLogin}
      />}
      {user && <Blogs name={user.name} />}
    </div>
  );
}

export default App;
