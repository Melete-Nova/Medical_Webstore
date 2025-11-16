import React, { useState } from 'react';
import ReactDOM from 'react-dom'; // 1. Import ReactDOM
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './AuthPage.css';

const AuthPage = ({ setIsLoggedIn, setIsAdmin }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    // 2. The entire component's JSX is now wrapped in ReactDOM.createPortal
    return ReactDOM.createPortal(
        <div className="auth-page-portal-background"> {/* Renamed for clarity */}
            <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`} id="container">
                <SignUpForm />
                <SignInForm setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost-button" onClick={() => setIsSignUp(false)}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost-button" onClick={() => setIsSignUp(true)}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body // 3. We are telling React to render this component as a direct child of <body>
    );
};

export default AuthPage;