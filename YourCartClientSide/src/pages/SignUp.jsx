import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material';
import useToast from '../custom hook/useToast';
import { Helmet } from 'react-helmet';


function SignUp() {
    const [signUpform, setSignUp] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [spinner, setSpinner] = useState(false);

    let navigate = useNavigate();
    const showToast=useToast();
    const host=import.meta.env.VITE_BASE_URL 


    const handleOnchange = (e) => {
        setSignUp({ ...signUpform, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (signUpform.password===signUpform.confirmPassword) {
            setSpinner(true)
            const name = signUpform.firstName + " " + signUpform.lastName
            const url = `${host}/auth/createUser`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, email: signUpform.email, password: signUpform.password })
            });
            const json = await response.json();
            const myTimeout = setTimeout(() => {
                setSpinner(false)
            }, 3000);
            if (json.success) {
                //Save the auth token and redirect
                localStorage.setItem("token", json.authToken);
                const myTimeout = setTimeout(() => {
                    navigate("/");
                }, 3000);
                showToast("Account created successfully!","success");
            }
            else {

                json['errors'].forEach(element => {
                    showToast(element.msg,"error");
                });


            }
        }
        else{
                    showToast("Both password are not matching","error");
        }
    };

    return (
        <>
        <Helmet>
            <title>
                Create Account
            </title>
        </Helmet>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-700 to-pink-800">
            <div className='flex flex-col justify-center items-center mb-5'>
                <div className='flex justify-center items-center mb-3'>
                    <Link to={"/"} className='font-extrabold text-xl text-white flex justify-center items-center'><img className='inline-block invert w-[25px] h-[25px]' src="https://img.icons8.com/pastel-glyph/64/shopping-cart--v2.png" alt="shopping-cart--v2" /> <span>YourCart</span></Link>
                </div>
                <h2 className="text-center text-4xl font-semibold text-white">
                    Create an account
                </h2>
            </div>
            <div className="max-w-md w-full bg-white p-8 md:p-11 md:pt-2 shadow-md m-4 md:m-0">

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className='flex mt-4 border-b-2 border-gray-400 focus-within:border-black'>

                        <label htmlFor="first-name" className="mr-3 block text-sm font-medium text-gray-700 flex items-center">
                            <AccountCircleIcon position="start" sx={{ "width": "30px", "height": "30px" }} />
                        </label>
                        <input
                            id="first-name"
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            required
                            className="mt-1 p-2 w-full focus:outline-none placeholder-red-500 "
                            placeholder="First Name"
                            onChange={handleOnchange}
                        />
                    </div>
                    <div className='flex mt-4 border-b-2 border-gray-400 focus-within:border-black'>
                        <label htmlFor="last-name" className="mr-3 block text-sm font-medium text-gray-700 flex items-center">
                            <AccountCircleIcon position="start" sx={{ "width": "30px", "height": "30px" }} />
                        </label>
                        <input
                            id="last-name"
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            required
                            className="mt-1 p-2 w-full focus:outline-none placeholder-red-500"
                            placeholder="Last Name"
                            onChange={handleOnchange}
                        />
                    </div>
                    <div className="mt-4 flex border-b-2 border-gray-400 focus-within:border-black">
                        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 flex items-center mr-3">
                            <EmailIcon position="start" sx={{ "width": "30px", "height": "30px" }} />
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 p-2 w-full focus:outline-none placeholder-red-500"
                            placeholder="Email address"
                            onChange={handleOnchange}
                        />
                    </div>
                    <div className="mt-4 flex border-b-2 border-gray-400 focus-within:border-black ">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center mr-3">
                            <LockIcon position="start" sx={{ "width": "30px", "height": "30px" }} />
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            className="mt-1 p-2 w-full focus:outline-none placeholder-red-500"
                            placeholder="Password"
                            onChange={handleOnchange}
                        />
                        <button
                            type="button"
                            className="ml-2 text-gray-500 focus:outline-none"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className="mt-4 flex border-b-2 border-gray-400 focus-within:border-black">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 flex items-center mr-3">
                            <LockIcon position="start" sx={{ "width": "30px", "height": "30px" }} />
                        </label>
                        <input
                            id="confirm-password"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            className="mt-1 p-2 w-full focus:outline-none placeholder-red-500"
                            placeholder="Confirm Password"
                            onChange={handleOnchange}
                        />
                        <button
                            type="button"
                            className="ml-2 text-gray-500 focus:outline-none"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm">
                            <Link to={"/login"} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:text-black hover:bg-red-600 hover:border-2 hover:border-blue-950 hover:border-solid focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {spinner ?
                                <CircularProgress sx={{ "color": "white" }} /> : "Sign up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default SignUp;




