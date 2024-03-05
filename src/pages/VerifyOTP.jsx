import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ErrorComponent } from '../components';
import conf from '../conf/conf';

function VerifyOTP() {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const location = useLocation();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // functional to store the otp, and move to next input in otp form
    const handleInputChange = (event, index) => {
        const newOtp = [...otp];
        newOtp[index] = event.target.value;
        setOtp(newOtp);

        if (event.target.value.length === 1) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp[0] === '' || otp[1] === '' || otp[2] === '' || otp[3] === '') {
            setError(true);
            setErrorMessage("All fields are required.");
        }
        else {
            setSubmitted(true);

            let userCredentials = {
                ...location.state.userCredentials,
                "otp": parseInt(otp.join(''))
            }

            //Verify otp and register user
            fetch(`${conf.baseURL}/register`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials)
            }).then(response => {
                if (response.status === 403) {
                    setError(true);
                    response.json().then(e =>
                        setErrorMessage(e.response)
                    );
                }
                else {
                    response.json().then(data => {
                        
                        delete data.response
                        localStorage.setItem("session", JSON.stringify(data))
                    })
                    navigate("/chats");
                }
            }).catch(error => console.log(error));
        }
    };

    const handleResend = async (e) => {
        fetch(`${conf.baseURL}/verify-email?email=${location.state.userCredentials.email}`, {
            method: 'POST',
            mode: 'cors'
        }).then(response => {
            if (response.status === 409) {
                setError(true);
                response.json().then(e =>
                    setErrorMessage(e.response)
                );
            }
        }).catch(error => console.log(error));
        setError(true);
        setErrorMessage("OTP sent");
    }

    return (
        <div className='h-screen flex justify-center pt-32'>
            <div className='w-3/5 p-5'>
                <h1 className='text-4xl font-font-serif font-bold  p-4'>Verify Email</h1>
                <p className='text-lg font-font-serif p-2'>The verification code was sent to this email address: . When you get the code, type the code into the field to confirm your identity.</p>
                <div className='h-16 flex flex-row justify-center'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)} // Store ref in array
                            id={`otp-${index + 1}`}
                            type="text"
                            className="w-12 text-center border border-gray-700 m-1 rounded-md"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                    ))}
                </div>
                <div className='flex justify-center'>
                    <ErrorComponent error={error} text={errorMessage} />
                </div>
                <div className='flex justify-center m-2 '>
                    <button className="h-10 w-24 rounded-lg bg-black text-white font-font-serif my-2 p-2" onClick={handleSubmit}>Verify</button>
                </div>
                <div className='flex justify-center m-2'>
                    <h4 className='cursor-pointer text-md font-font-serif' onClick={handleResend}>Resend OTP</h4>
                </div>
            </div>
        </div>
    )
}

export default VerifyOTP