import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ setIsLoggedIn, setIsAdmin }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email && form.password) {
      setIsLoggedIn(true);
      if (isAdminLogin) {
        setIsAdmin(true);
        navigate("/admin");
      } else {
        setIsAdmin(false);
        navigate("/");
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
        <div className="social-container">
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-github"></i></a>
        </div>
        <span>or use your account</span>
        <div className="input-with-icon">
            <i className="fas fa-envelope"></i>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-with-icon">
            <i className="fas fa-lock"></i>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        </div>
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
        {/* Updated link color to red */}
        <a href="#" onClick={toggleAdminMode} className="admin-toggle-link" style={{color: '#D31027', fontWeight: 'bold'}}>
          {isAdminLogin ? 'Sign in as User' : 'Sign in as Admin'}
        </a>
      </form>
    </div>
  );
};

export default SignInForm;