import React, { useState } from 'react';
import './SignUp.css';
import useForm from '../useForm';
import  { validateSignUpForm } from '../ValidateForm';
import { registerUser } from '../../Api/User';
import SignUpSuccessfulModal from '../SignUpSuccessfulModal/SignUpSuccessfulModal';


function SignUp(){

    const [ successfulSignUp, setSuccessfulSignUp ] = useState(false);

    const submit = ({ lastName, name, email, password }, setErrors, setIsSubmitting) => {
        const user = {
            lastName,
            name,
            email,
            password
        }

        registerUser(user).then(res => {
            if(res.status === 200){
                console.log("Succesfully registered");
                setIsSubmitting(false);
                setErrors({});
                setSuccessfulSignUp(true);
                // history.push("/login");
            }else{
                setIsSubmitting(false);
                setErrors({ email: res.data.error })
            }
        });
        // console.log(user);
    }

    const user = {
        lastName: '',
        name: '',
        email: '',
        password: '',
        conPassword: ''
    }

    const { values, handleSubmit, handleChange, errors, setIsSubmitting } = useForm(user, submit, validateSignUpForm);

    return (
        <div className="container">
            <title>Sign Up</title>
            <div className="row justify-content-center mt-4">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header bg-dark text-center text-white">
                            Sign Up
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Name
                                    </label>
                                    <input type="text" name="name" id="name" className={ errors.name ? 'form-control is-invalid': 'form-control' } placeholder="Enter your name" value={values.name} onChange={handleChange} />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input type="text" name="lastName" id="lastName" className={ errors.lastName ? 'form-control is-invalid': 'form-control' } placeholder="Enter your last name" value={values.lastName} onChange={handleChange} />
                                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input type="text" name="email" id="email" className={ errors.email ? 'form-control is-invalid': 'form-control' } placeholder="Enter your email" value={values.email} onChange={handleChange} />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Password
                                    </label>
                                    <input type="password" name="password" id="password" className={ errors.password ? 'form-control is-invalid': 'form-control' } placeholder="Enter your password" value={values.password} onChange={handleChange} />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="conPassword">
                                        Confirm password
                                    </label>
                                    <input type="password" name="conPassword" id="conPassword" className={ errors.conPassword ? 'form-control is-invalid': 'form-control' } placeholder="Enter your password again" value={values.conPassword} onChange={handleChange} />
                                    {errors.conPassword && <div className="invalid-feedback">{errors.conPassword}</div>}
                                </div>
                                <button type="submit" className="btn btn-dark btn-block">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {successfulSignUp && <SignUpSuccessfulModal></SignUpSuccessfulModal>}
        </div>
    )
}



export default SignUp;