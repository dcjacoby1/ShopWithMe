import { useOutletContext } from "react-router-dom"
import { Formik } from 'formik'
import * as yup from 'yup'



function EditProfile({ handleEditSubmit, error, showEditForm, setShowEditForm, setError }) {
    const context = useOutletContext()
    const loggedInUser = context.loggedInUser

    const signupSchema = yup.object().shape({
        first_name: yup.string().required('First Name is required'),
        last_name: yup.string().required('Last Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().min(5, 'Password too Short!').max(15, 'Password too Long!').required('Password is required'),
        passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
        phone_number: yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits')
    });
    
    const initialValues = {
        first_name: loggedInUser.first_name,
        last_name: loggedInUser.last_name,
        email: loggedInUser.email,
        password: '',
        passwordConfirmation: '',
        phone_number: loggedInUser.phone_number,
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={(values, { setSubmitting }) => {
                handleEditSubmit(values)
                    .finally(() => setSubmitting(false))
            }}
        >
            {({ handleSubmit, values, handleChange, errors, isSubmitting }) => (
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor='first_name'>First Name:</label>
                    <input
                        id="first_name"
                        name="first_name"
                        placeholder='First Name'
                        required
                        value={values.first_name}
                        onChange={handleChange}
                    />
                    {errors.first_name && <div>{errors.first_name}</div>}

                    <label htmlFor='last_name'>Last Name:</label>
                    <input
                        id="last_name"
                        name="last_name"
                        placeholder='Last Name'
                        required
                        value={values.last_name}
                        onChange={handleChange}
                    />
                    {errors.last_name && <div>{errors.last_name}</div>}

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
                    {errors.email && <div>{errors.email}</div>}

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
                    {errors.password && <div>{errors.password}</div>}

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
                    {errors.passwordConfirmation && <div>{errors.passwordConfirmation}</div>}

                    <label htmlFor='phone_number'>Phone Number:</label>
                    <input
                        id="phone_number"
                        name="phone_number"
                        placeholder='Phone Number'
                        value={values.phone_number}
                        onChange={handleChange}
                    />
                    {errors.phone_number && <div>{errors.phone_number}</div>}
                    
                    <button type="submit" disabled={isSubmitting}>Edit Profile</button>

                    {showEditForm && (
                    <button type="submit" onClick={() => { setShowEditForm(false); setError(""); }}>
                        Cancel
                    </button>
                )}
                    {error && <div>{error}</div>}
                </form>
            )}
        </Formik>
    );
}

export default EditProfile
