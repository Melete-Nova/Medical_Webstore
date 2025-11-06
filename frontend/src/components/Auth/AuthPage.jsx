import React, { useState } from "react";
import "./AuthPage.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const AuthPage = ({ setIsLoggedIn }) => {
  const [mode, setMode] = useState("signIn");

  const toggleMode = (newMode) => {
    if (mode !== newMode) setMode(newMode);
  };

  const containerClass =
    "auth-container " + (mode === "signUp" ? "right-panel-active" : "");

  return (
    <div className="auth-page-wrapper">
      <div className={containerClass}>
        <SignUpForm />
        {/* pass setIsLoggedIn here */}
        <SignInForm setIsLoggedIn={setIsLoggedIn} />  

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To continue shopping with MediStore, sign in with your details</p>
              <button className="ghost" onClick={() => toggleMode("signIn")}>
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Welcome!</h1>
              <p>Create an account to start your health journey</p>
              <button className="ghost" onClick={() => toggleMode("signUp")}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
