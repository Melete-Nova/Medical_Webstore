import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// The component now accepts setIsAdmin to manage admin status
const SignInForm = ({ setIsLoggedIn, setIsAdmin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isAdminLogin, setIsAdminLogin] = useState(false); // Renamed for clarity
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.email && form.password) {
      setIsLoggedIn(true); // User is now logged in

      if (isAdminLogin) {
        setIsAdmin(true); // Set the admin flag
        navigate("/admin"); // Navigate to admin dashboard
      } else {
        setIsAdmin(false); // Ensure admin flag is off for regular users
        navigate("/"); // Navigate to homepage
      }
    }

    setForm({ email: "", password: "" });
  };

  const toggleAdminMode = (e) => {
    e.preventDefault();
    setIsAdminLogin(!isAdminLogin);
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleSubmit}>
        <h1>{isAdminLogin ? 'Admin Sign In' : 'Sign In'}</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
        
        <a href="#" onClick={toggleAdminMode} className="admin-toggle-link">
          {isAdminLogin ? 'Sign in as User' : 'Sign in as Admin'}
        </a>
      </form>
    </div>
  );
};

export default SignInForm;