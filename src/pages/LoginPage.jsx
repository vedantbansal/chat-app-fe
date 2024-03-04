import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setError(true);
            setErrorMessage("All fields are required.");
        }
        else {
            setSubmitted(true);
            setError(false);
        }
    };

    return (
        <div className='h-screen flex justify-center pt-52'>
            <div>
                <h2 className='my-3 text-3xl font-font-serif font-bold'>Login</h2>
                <form className='flex flex-col w-96'>
                    <input className="h-10 border border-gray-300 rounded-md my-2 p-2" type='text' placeholder='Email' onChange={handleEmail} value={email} />
                    <input className="h-10 border border-gray-300 rounded-md my-2 p-2" type='password' placeholder='Password' onChange={handlePassword} value={password} />
                    <label className='text-red-600 p-1' style={{display: error?"":"none",}}>{errorMessage}</label>
                    <button className="h-10 rounded-lg bg-black text-white font-font-serif my-2 p-2" onClick={handleSubmit}>Log In</button>
                </form>
                <Link to="/register">
                    <h4 className='p-1 text-md font-font-serif'>Create an account.</h4>
                </Link>
            </div>
        </div>
    )
}

export default LoginPage