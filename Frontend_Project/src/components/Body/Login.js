import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useUser } from './UserContext';

const Login = () => {
    const { login } = useUser(); // Assuming useUser is correctly implemented in UserContext
    const navigate = useNavigate(); // useNavigate hook for navigation

    const [userType, setUserType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLogin = () => {
        fetch(`http://localhost:8080/login/${userType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid credentials');
            }
            return response.json();
        })
        .then(data => {
            login(data); 
            console.log('Login successful', data);
            switch (userType) {
                case 'admin':
                    navigate('/admin/home');
                    break;
                case 'customer':
                    navigate('/customer/home');
                    break;
                case 'restaurant':
                    navigate('/restaurant/home');
                    break;
                case 'delivery':
                    navigate('/delivery/home');
                    break;
                default:
                    break;
            }
        })
        .catch(error => {
            setLoginError(error.message);
            console.error('Login error', error);
        });
    };

    return (
        <div className="container border rounded my-5 py-5 shadow text-center" style={{ height: "auto", width: "450px" }}>
            <form className="px-5">
                <div className="header fs-1 text-center mb-5 bg-primary text-light rounded-top">
                    LOGIN
                </div>
                {loginError && <div className="alert alert-danger">{loginError}</div>}
                <div className="mb-4">
                    <select
                        className="form-select form-select-md mb-3"
                        aria-label="Large select example"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        required
                    >
                        <option value="">Select User Type</option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="delivery">Delivery Person</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="emailId" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailId"
                        placeholder="Enter Your Email-Id"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pswd" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Your Password"
                        id="pswd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="lg-rg mx-2 mt-5">
                    <button type="button" className="btn btn-primary mx-2 px-3" onClick={handleLogin}>LOGIN</button>
                    {/* Example of a link back to welcome page */}
                    <Link to="/welcome" className="btn btn-danger mx-2 px-4">BACK</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
