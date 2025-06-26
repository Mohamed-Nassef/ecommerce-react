import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  const { setToken, setName } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);




  // Function to handle form submission
  // This function will be called when the form is submitted
  // It will send a POST request to the API with the form values
  // If the registration is successful, it will navigate to the login page
  // If there is an error, it will log the error message to the console
  async function handleLogin(values) {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === 'success') {
        console.log(data.user.name);

        localStorage.setItem('userToken', data.token);
        setToken(data.token)
        localStorage.setItem('userName', data.user.name);
        setName(data.user.name);
        setSuccessMessage("Login successful! Redirecting...");
        formik.resetForm();
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (err) {
      //console.error("API Error:", err.response?.data?.message || err.message);
      setApiError(err.response?.data?.errors?.msg || err.response?.data?.message || err.message);
      // Optionally, you can display the error message to the user
    } finally {
      setIsLoading(false);
    }
  }

  // Validation schema using Yup
  let myValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: myValidationSchema,
    onSubmit: handleLogin,
  })
  return (
    <div className='flex items-center justify-center'>
      <div className=' w-full max-w-md py-20 lg:py-10 my-5 '>
        <div className="p-5 bg-white shadow-md rounded-lg w-full max-w-md">
          <h1 className='mx-auto max-w-md  py-5'> Login Now: </h1>
          {apiError && <p className="text-red-600 mb-4 text-sm text-center">{apiError}</p>}
          {successMessage && (
            <p className="text-green-600 mb-4 text-sm text-center">{successMessage}</p>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email </label>
              {formik.touched.email && formik.errors.email ?
                (<p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"> {formik.errors.email}</p>) : null}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password </label>
              {formik.touched.password && formik.errors.password ?
                (<p id="outlined_error_help" className="mt-2 text-xs text-red-600 dark:text-red-400"> {formik.errors.password}</p>) : null}
            </div>
            <button type="submit" disabled={isLoading} className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-50" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Loading...
                </span>
              ) : "Login"}
            </button>
            <Link to="/Register" className="text-sm text-emerald-600 hover:underline dark:text-emerald-500 block mt-4 text-center">
              Don't have an account? Register now!
            </Link>
          </form>
        </div>
      </div >
    </div>
  );
}