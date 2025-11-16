import React, { useState } from "react";

const SignUpForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Signing up as ${form.name} (${form.email})`);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-github"></i></a>
        </div>
        <span>or use your email for registration</span>
        <div className="input-with-icon">
            <i className="fas fa-user"></i>
            <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="input-with-icon">
            <i className="fas fa-envelope"></i>
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-with-icon">
            <i className="fas fa-lock"></i>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;