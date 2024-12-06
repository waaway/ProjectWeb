import React, { useState } from 'react';
import './style/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // เพิ่มสถานะ Loading
  const [error, setError] = useState(''); // เพิ่มสถานะแสดงข้อความ Error

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // เริ่ม Loading
    setError(''); // รีเซ็ตข้อความ Error

    const userData = { username, password };

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        // เก็บ Token ใน LocalStorage หรือ Cookie
        localStorage.setItem('token', data.token);

        // นำทางไปยังหน้า Overview
        window.location.href = '/overview';
      } else {
        setError(data.message || 'Login failed.'); // แสดงข้อความ Error ที่ได้รับจากเซิร์ฟเวอร์
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Too many login attempts, please try again after 15 minutes.'); // แสดงข้อความ Error กรณีเซิร์ฟเวอร์มีปัญหา
    } finally {
      setLoading(false); // หยุด Loading
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error-message">{error}</div>} {/* แสดงข้อความ Error */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'} {/* แสดงสถานะ Loading */}
        </button>
        <div className="register-link-container">
          Don't have an account? <a href="/register" className="register-link">Register</a> here to get started.
        </div>
      </form>
    </div>
  );
};

export default Login;
