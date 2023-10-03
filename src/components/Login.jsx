import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

function Login() {
    const [signInForm, setSignIn] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleOnChange = (e) => {
        setSignIn({ ...signInForm, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign-in logic here
        console.log('Email:', signInForm.email);
        console.log('Password:', signInForm.password);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-700 to-pink-800">
            <div className="flex flex-col justify-center items-center mb-5">
                <div className="flex justify-center items-center mb-3">
                    <Link to={"/"} className="font-extrabold text-xl text-white flex justify-center items-center">
                        <img className="inline-block invert w-[25px] h-[25px]" src="https://img.icons8.com/pastel-glyph/64/shopping-cart--v2.png" alt="shopping-cart--v2" />
                        <span>YourCart</span>
                    </Link>
                </div>
                <h2 className="text-center text-4xl font-semibold text-white">
                    Sign in to your account
                </h2>
            </div>
            <div className="max-w-md w-full bg-white p-8 md:p-11 md:pt-2 shadow-md m-4 md:m-0">
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mt-4 flex border-b-2 border-gray-400 focus-within:border-black">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 flex items-center mr-3">
                            <EmailIcon position="start" sx={{ width: '30px', height: '30px' }} />
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 p-2 w-full focus:outline-none placeholder-red-500"
                            placeholder="Email address"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mt-4 flex border-b-2 border-gray-400 focus-within:border-black">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center mr-3">
                            <LockIcon position="start" sx={{ width: '30px', height: '30px' }} />
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            className="mt-1 p-2 w-full focus:outline-none placeholder-red-500"
                            placeholder="Password"
                            onChange={handleOnChange}
                        />
                        <button
                            type="button"
                            className="ml-2 text-gray-500 focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign up
                        </button>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  bg-white  hover:bg-red-500 text-black hover:text-white border-1 border-red-500 border-solid focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
