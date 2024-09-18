import React, { useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import { getAdminDetailsAPI } from '../../services/allAPI';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await getAdminDetailsAPI(); 
      const result = response.data; 

      const adminEmail = String(result.email);
      const adminPassword = String(result.password);

      if (adminEmail === loginData.email && adminPassword === loginData.password) {
        navigate('/dashboard');
      } else {
        alert('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-left">
            <img
              src="https://img.freepik.com/premium-photo/lovable-animated-black-widow-with-iconic-stingers-ready-white-background_1021867-15823.jpg"
              alt="Login Visual"
              className="login-img"
            />
          </div>
          <div className="login-right">
            <h2 className="login-title">Admin Login</h2>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </FloatingLabel>

              <Button className="login-btn" type="submit">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
