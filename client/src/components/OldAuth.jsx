// import { useState } from 'react';
// import { Container } from '@mui/material';
// import { Formik } from 'formik';
// // import { useOutletContext } from 'react-router-dom';
// import * as yup from 'yup';

// function Auth({loggedInUser, setLoggedInUser}) {
//     const [signup, setSignup] = useState(true);
//     // const context = useOutletContext()
//     // const loggedInUser = context.loggedInUser
//     // const setLoggedInUser = context.setLoggedInUser

//     const signupSchema = yup.object().shape({
//         firstName: yup.string().required('First Name is required'),
//         lastName: yup.string().required('Last Name is required'),
//         email: yup.string().email('Invalid email').required('Email is required'),
//         password: yup.string().min(5, 'Password too Short!').max(15, 'Password too Long!').required('Password is required'),
//         phoneNumber: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits')
//     });

//     const loginSchema = yup.object().shape({
//         email: yup.string().email('Invalid email').required('Email is required'),
//         password: yup.string().required('Password is required')
//     });

//     function toggleSignup() {
//         setSignup((currentSignup) => !currentSignup);
//     }

//     const handleSubmit = (values) => {
//         const endpoint = signup ? '/signup' : '/login';
//         fetch(endpoint, {
//             method: 'POST',
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             body: JSON.stringify(values)
//         }).then((resp) => {
//             if (resp.ok) {
//                 resp.json().then((user) => {
//                     setLoggedInUser(user);
//                     // navigate into site
//                 });
//             } else {
//                 console.log('errors? handle them');
//             }
//         });
//     };

//     return (
        // <Container maxWidth='sm'>
        //     <button onClick={toggleSignup}>{signup ? 'Login instead!' : 'Register for an account'}</button>
        //     <Formik
        //         initialValues={{
        //             firstName: '',
        //             lastName: '',
        //             email: '',
        //             password: '',
        //             phoneNumber: '',
        //         }}
        //         validationSchema={signup ? signupSchema : loginSchema}
        //         onSubmit={handleSubmit}
        //     >
        //         {({ handleSubmit, values, handleChange, errors, touched }) => (
        //             <form className='form' onSubmit={handleSubmit}>
        //                 {signup && (
        //                     <>
        //                         <label htmlFor='firstName'>First Name:</label>
        //                         <input
        //                             id="firstName"
        //                             name="firstName"
        //                             placeholder='First Name'
        //                             required
        //                             value={values.firstName}
        //                             onChange={handleChange}
        //                         />
        //                         {errors.firstName && touched.firstName && <div>{errors.firstName}</div>}

        //                         <label htmlFor='lastName'>Last Name:</label>
        //                         <input
        //                             id="lastName"
        //                             name="lastName"
        //                             placeholder='Last Name'
        //                             required
        //                             value={values.lastName}
        //                             onChange={handleChange}
        //                         />
        //                         {errors.lastName && touched.lastName && <div>{errors.lastName}</div>}
        //                     </>
        //                 )}

        //                 <label htmlFor='email'>Email:</label>
        //                 <input
        //                     id="email"
        //                     name="email"
        //                     type='email'
        //                     placeholder="Email"
        //                     required
        //                     value={values.email}
        //                     onChange={handleChange}
        //                 />
        //                 {errors.email && touched.email && <div>{errors.email}</div>}

        //                 <label htmlFor='password'>Password:</label>
        //                 <input
        //                     id='password'
        //                     name='password'
        //                     type='password'
        //                     placeholder='Password'
        //                     required
        //                     value={values.password}
        //                     onChange={handleChange}
        //                 />
        //                 {errors.password && touched.password && <div>{errors.password}</div>}

        //                 {signup && (
        //                     <>
        //                         <label htmlFor='phoneNumber'>Phone Number:</label>
        //                         <input
        //                             id="phoneNumber"
        //                             name="phoneNumber"
        //                             placeholder='Phone Number'
        //                             value={values.phoneNumber}
        //                             onChange={handleChange}
        //                         />
        //                         {errors.phoneNumber && touched.phoneNumber && <div>{errors.phoneNumber}</div>}
        //                     </>
        //                 )}

        //                 <button type="submit">{signup ? 'Sign Up' : 'Login'}</button>
        //             </form>
        //         )}
        //     </Formik>
        // </Container>
//     );
// }

// export default Auth;