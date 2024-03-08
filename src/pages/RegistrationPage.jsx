import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import conf from '../conf/conf';
import { ErrorComponent } from '../components';
import VerifyOTP from './VerifyOTP';

function RegistrationPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reTypePassword, setReTypePassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showVerifyPage, setShowVerifyPage] = useState(false)

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        setSubmitted(false);
    };

    const handleLastName = (e) => {
        setLastName(e.target.value);
        setSubmitted(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    const handleReTypePassword = (e) => {
        setReTypePassword(e.target.value);
        setSubmitted(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (firstName === "" || lastName === "" || email === "" || password === "" || reTypePassword === "") {
            setError(true);
            setErrorMessage("All fields are required.");
        } else if (password !== reTypePassword) {
            setError(true);
            setErrorMessage("Passwords do not match.");
        }
        else {
            setSubmitted(true);
            fetch(`${conf.baseURL}/verify-email?email=${email}`, {
                method: 'POST',
                mode: 'cors'
            }).then(response => {
                if (response.status === 409) {
                    setError(true);
                    response.json().then(e =>
                        setErrorMessage(e.response)
                    );
                }
                else {
                    setShowVerifyPage(true)           
                }

            }).catch(error => console.log(error));
        }
    };
    
    //SHow the verification page
    if(showVerifyPage){
        let userCredentials = {
            "firstName": `${firstName}`,
            "lastName": `${lastName}`,
            "email": `${email}`,
            "password": `${password}`
        }
        return(
            <>
            <VerifyOTP location={userCredentials}/>
            </>
        )
    }

    return (

        <div className='h-screen flex justify-center pt-40'>
            <div>
                <h2 className='my-3 text-3xl font-font-serif font-bold'>Create Account</h2>
                <form className='h-10 flex flex-row my-2'>
                    <input className="border border-gray-300 rounded-md mr-1 p-2" type='text' placeholder='First Name' onChange={handleFirstName} value={firstName} />
                    <input className="border border-gray-300 rounded-md ml-1 p-2" type='text' placeholder='Last Name' onChange={handleLastName} value={lastName} />
                </form>
                <form className='flex flex-col'>
                    <input className="h-10 border border-gray-300 rounded-md my-2 p-2" type='text' placeholder='Email' onChange={handleEmail} value={email} />
                    <input className="h-10 border border-gray-300 rounded-md my-2 p-2" type='password' placeholder='Password' onChange={handlePassword} value={password} />
                    <input className="h-10 border border-gray-300 rounded-md my-2 p-2" type='password' placeholder='Re-type Password' onChange={handleReTypePassword} value={reTypePassword} />
                    <ErrorComponent error={error} text={errorMessage} />
                    <button className="h-10 rounded-lg bg-black text-white font-font-serif my-2 p-2" onClick={handleSubmit}>Register</button>
                </form>
                <Link to="/login" >
                    <h4 className='p-1 text-md font-font-serif'>Already a member? SignIn</h4>
                </Link>
            </div>
        </div>
    )
}

export default RegistrationPage