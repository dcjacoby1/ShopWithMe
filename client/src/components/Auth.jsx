import React from 'react'
import { useState } from 'react'
import { Container } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from "react-router-dom"
import { useOutletContext } from 'react-router-dom'
import API_BASE_URL from "./config"

function Auth() {
    const [signup, setSignup] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const context = useOutletContext()
    const setLoggedInUser = context.setLoggedInUser
    const setCartTotal = context.setCartTotal

    function toggleSignup() {
        setSignup((currentSignup) => !currentSignup);
    }

    const fetchCartTotal = () => {
        fetch(`${API_BASE_URL}/cart_total`, {
            credentials: 'include'
        })
          .then(resp => {
            if (resp.ok) {
              resp.json().then(data => setCartTotal(data.total))
            }
          })
      }

    const signupSchema = yup.object().shape({
        first_name: yup.string().required('First Name is required'),
        last_name: yup.string().required('Last Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(5, 'Password too Short!').max(15, 'Password too Long!').required('Password is required'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        phone_number: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits')
    });

    const loginSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const handleSubmit = (values) => {
        const endpoint = signup ? '/signup' : '/login';
        const requestBody = signup ? values : { email: values.email, password: values.password };
        //can take out console.log after testing
        console.log('Attempting login with:', { endpoint, requestBody });
        
        fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(requestBody)
        }).then((resp) => {
            //can take out console.log after testing
            console.log('Login Response Status:', resp.status);
            console.log('Login Response Headers:', Object.fromEntries(resp.headers.entries()));
            
            if (resp.ok) {
                resp.json().then((user) => {
                    //can take out console.log after testing
                    console.log('Login successful - User data:', user);
                    setLoggedInUser(user)
                    setSignup(true)
                    fetchCartTotal()
                    navigate('/')
                });
            } else {
                resp.json().then((error) => {
                    console.log('Login Error:', error);
                    setError(error || 'An error occurred');
                });
            }
        })
        .catch((error) => {
            console.log('Login Fetch Error:', error);
            setError(error);
        });
    };

    //conditionally sends information based on if signup or login
    const initialValues = signup 
        ? {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            phone_number: '',
        } 
        : {
            email: '',
            password: ''
        };
    
    return (
    <div id="login-signup-container">
        <Container>
        <Formik
            initialValues={initialValues}
            validationSchema={signup ? signupSchema : loginSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, values, handleChange }) => (
                <form className='form' onSubmit={handleSubmit}>
                    {signup && (
                        <>
                            <label htmlFor='first_name'>First Name:</label>
                            <input
                                id="first_name"
                                name="first_name"
                                placeholder='First Name'
                                required
                                value={values.first_name}
                                onChange={handleChange}
                            />

                            <label htmlFor='last_name'>Last Name:</label>
                            <input
                                id="last_name"
                                name="last_name"
                                placeholder='Last Name'
                                required
                                value={values.last_name}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    <label htmlFor='email'>Email:</label>
                    <input
                        id="email"
                        name="email"
                        type='email'
                        placeholder="Email"
                        required
                        value={values.email}
                        onChange={handleChange}
                    />
                    

                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        placeholder='Password'
                        required
                        value={values.password}
                        onChange={handleChange}
                    />

                    {signup && (
                        <>
                            <label htmlFor='passwordConfirmation'>Password Confirmation:</label>
                            <input 
                                id="passwordConfirmation" 
                                name="passwordConfirmation"
                                type='password' 
                                placeholder="Password Confirmation"
                                required 
                                value={values.passwordConfirmation}
                                onChange={handleChange}
                            />

                            <label htmlFor='phone_number'>Phone Number:</label>
                            <input
                                id="phone_number"
                                name="phone_number"
                                placeholder='Phone Number'
                                value={values.phone_number}
                                onChange={handleChange}
                            />   
                            
                        </>
                    )}

                    <button type="submit">{signup ? 'Sign Up' : 'Login'}</button>
                    <button onClick={toggleSignup}>{signup ? 'Login instead!' : 'Register for an account'}</button>
                </form>
            )}
        </Formik>
        </Container>
    </div>
    )
}

export default Auth;