import React, { useState, useContext } from 'react';
import './LogIn.css';
import useForm from '../useForm';
import { signIn } from '../../Api/User';
import  { validateSignInForm } from '../ValidateForm';
import { useHistory } from "react-router-dom";
import { UserContext } from '../../Context/User';


function LogIn(){

    const [ loginError, setLoginError ] = useState("");
    const { configureUser } = useContext(UserContext);

    const history = useHistory();

    const submit = ({ email, password }) => {

        const credentials = {
            email,
            password
        }

        signIn(credentials)
        .then(res => {
            if(res.status === 403){
                setLoginError(res.data.error);
            }else if(res.status === 200){
                setLoginError("");
                configureUser(res.data);
                history.push('/chat');
            }
        });
    }

    const loginValues = {   
        email: "",
        password: ""
    }

    const { values, handleSubmit, handleChange, errors } = useForm(loginValues, submit, validateSignInForm);

    return (
        <div className="container">
            <title>Sign In</title>
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    {loginError && <div className="alert alert-danger text-center" role="alert">
                         Invalid <strong>email or password</strong>
                    </div>}
                    <div className="card">
                        <div className="card-header bg-dark text-center text-white">
                            Sign In
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input type="text" name="email" id="email" className={ errors.email || loginError ? 'form-control is-invalid': 'form-control' } placeholder="Enter your email" value={values.email} onChange={handleChange} />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Password
                                    </label>
                                    <input type="password" name="password" id="password" className={ errors.password || loginError ? 'form-control is-invalid': 'form-control' } placeholder="Enter your password" value={values.password} onChange={handleChange} />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <button type="submit" className="btn btn-dark btn-block">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default LogIn;