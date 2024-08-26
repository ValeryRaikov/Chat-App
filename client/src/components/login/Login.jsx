import { useState } from 'react';

import { login, signup, resetPassword } from '../config/firebase';

import './Login.css';
import assets from '../../assets/assets';

export default function Login() {
    const [currState, setCurrState] = useState('Sign up');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const usernameChangeHandler = (e) => {
        setUsername(e.target.value);
    }

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (currState === 'Sign up') {
            signup(username, email, password);
        } else {
            login(email, password);
        }
    }

    return (
        <div className="login">
            <img src={assets.logo_big} alt={assets.logo_big.toString()} className="logo" />
            <form onSubmit={submitHandler} className="login-form">
                <h2>{currState}</h2>
                {currState === 'Sign up' &&
                    <input 
                        onChange={usernameChangeHandler}
                        value={username}
                        type="text" 
                        placeholder="Username" 
                        className="form-input" 
                        required 
                    />
                }
                <input 
                    onChange={emailChangeHandler}
                    value={email}
                    type="email" 
                    placeholder="Email address" 
                    className="form-input" 
                    required 
                />
                <input 
                    onChange={passwordChangeHandler}
                    value={password}
                    type="password" 
                    placeholder="Password" 
                    className="form-input" 
                    required 
                />
                <button type="submit">{currState === 'Sign up' ? 'Create account' : 'Login'}</button>
                <div className="login-term">
                    <input type="checkbox" />
                    <p>Agree to the terms of use & privacy policy.</p>
                </div>
                <div className="login-forgot">
                    {currState === 'Sign up'
                        ? <p className="login-toggle">Already have an account <span onClick={() => setCurrState('Login')}>Login here</span></p>
                        : <p className="login-toggle">Create an account <span onClick={() => setCurrState('Sign up')}>Click here</span></p>
                    }
                    {currState === 'Login' 
                        ? <p className="login-toggle">Forgot Password? <span onClick={() => resetPassword(email)}>Reset here</span></p>
                        : null
                    }
                </div>
            </form>
        </div>
    );
}