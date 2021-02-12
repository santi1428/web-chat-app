import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../Context/User';
import useForm  from '../../useForm';
import  { validateUpdateProfileForm } from '../../ValidateForm';
import { URL, updateUserProfile } from '../../../Api/User';
import { useHistory } from "react-router-dom";
import { showSuccessNotification,  showDangerNotification } from '../../CustomToast/CustomToast';
import './UpdateProfile.css';

const UpdateProfile = props => {

    const { user, updateUser } = useContext(UserContext);

    const submit = ({ lastName, name, email }, setErrors, setIsSubmitting) => {

        const user = {
            lastName,
            name,
            email,
        }
        
        updateUserProfile(user).then(res => {
            if(res.status === 204){
                setIsSubmitting(false);
                setErrors({});
                updateUser(user);
                showSuccessNotification("OK", "Your profile has been updated");
            }else{
                setIsSubmitting(false);
                setErrors({ email: res.data.error })
                showDangerNotification("Something went wrong", "Please check your data");
            }
        });
    }
    
    const { values, handleSubmit, handleChange, errors } = useForm(user, submit, validateUpdateProfileForm);

    const history = useHistory();

    const goToUploadUserProfilePhoto = e => {
        history.push('/uploaduserprofilephoto');
    }

    const goToUpdatePassword = e => {
        history.push('/updatepassword');
    }

    const goToDeleteAccount = e => {
        history.push('/deleteaccount');
    }

    return (
        <React.Fragment>
            <title>Profile</title>
            <div className="container">
                <div className="row justify-content-center mt-3">
                    <form className="col-md-5 card card-body" noValidate onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col text-center">
                                <img src={ URL + user.profilePhoto } id="userProfilePhoto" alt="" onClick={goToUploadUserProfilePhoto} />
                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-sm btn-light" onClick={goToUploadUserProfilePhoto} >Change profile photo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Name
                                    </label>
                                    <input type="text" name="name" id="name" className={ errors.name ? 'form-control is-invalid': 'form-control' } placeholder="Enter your name" value={values.name} onChange={handleChange} />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>        
                            </div>
                            <div className="col">
                                <div className="form-group">
                                        <label htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input type="text" name="lastName" id="lastName" className={ errors.lastName ? 'form-control is-invalid': 'form-control' } placeholder="Enter your last name" value={values.lastName} onChange={handleChange} />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email
                                    </label>
                                    <input type="text" name="email" id="email" className={ errors.email ? 'form-control is-invalid': 'form-control' } placeholder="Enter your email" value={values.email} onChange={handleChange} />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <button type="submit" className="btn btn-success btn-block" id="update-profile-button"><i className="fas fa-user-edit mr-2"></i>Update Profile</button>
                                <button className="btn btn-dark btn-block" onClick={goToUpdatePassword}><i className="fas fa-lock mr-2"></i>Change Password</button>
                                <button className="btn btn-danger btn-block" id="delete-profile-account" onClick={goToDeleteAccount}><i className="fas fa-trash-alt mr-2"></i>Delete Account</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateProfile;