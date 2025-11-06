import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import './AuthPage.css';

// The component now accepts setIsAdmin
const AuthPage = ({ setIsLoggedIn, setIsAdmin }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className="auth-page-body">
            <div className={`auth-container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
                <SignUpForm />
                {/* Pass both state setters to SignInForm */}
                <SignInForm setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" onClick={() => setIsSignUp(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start your journey with us</p>
                            <button className="ghost" onClick={() => setIsSignUp(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;