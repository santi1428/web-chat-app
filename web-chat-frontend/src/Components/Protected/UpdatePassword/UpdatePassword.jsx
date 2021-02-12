import React, { useState, useEffect, useRef, useCallback } from 'react';
import useForm from '../../useForm';
import  { validateUpdatePasswordForm } from '../../ValidateForm';
import { updateUserPassword} from '../../../Api/User';
import { showSuccessNotification,  showDangerNotification } from '../../CustomToast/CustomToast';
import { useHistory } from "react-router-dom";


const UpdatePassword = props => {

    const history = useHistory();

    const formValues = {
        oldPassword: '',
        newPassword: '',
        conNewPassword: ''
    }

    const submit = ({ oldPassword, newPassword, conNewPassword }, setErrors, setIsSubmitting) => {
        
        const passwords = {
            oldPassword,
            newPassword,
            conNewPassword,
        }
        
        updateUserPassword(passwords).then(res => {
            if(res.status === 204){
                console.log("Succesfully user password updated");
                setIsSubmitting(false);
                setErrors({});
                showSuccessNotification("OK", "Your password has been updated");
                goToUpdateProfile();
            }else{
                setIsSubmitting(false);
                setErrors({ oldPassword: res.data.error })
                showDangerNotification("Something went wrong", "Provided data is wrong");
            }
        });
    }
    
    const goToUpdateProfile = () => {
        history.push('/updateprofile');
    }

    const { values, handleSubmit, handleChange, errors } = useForm(formValues, submit, validateUpdatePasswordForm);

    return (

        <div className="container">
            <title>Change Password</title>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header bg-dark text-white text-center">
                            Update Password
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="oldPassword">
                                        Old password
                                    </label>
                                    <input type="password" name="oldPassword" id="oldPassword" className={ errors.oldPassword ? 'form-control is-invalid': 'form-control' } placeholder="Enter your old password" value={values.oldPassword} onChange={handleChange} />
                                    {errors.oldPassword && <div className="invalid-feedback">{errors.oldPassword}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">
                                        New password
                                    </label>
                                    <input type="password" name="newPassword" id="newPassword" className={ errors.newPassword ? 'form-control is-invalid': 'form-control' } placeholder="Enter your new password" value={values.newPassword} onChange={handleChange} />
                                    {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="conNewPassword">
                                        Confirm new password
                                    </label>
                                    <input type="password" name="conNewPassword" id="conNewPassword" className={ errors.conNewPassword ? 'form-control is-invalid': 'form-control' } placeholder="Enter your new password again" value={values.conNewPassword} onChange={handleChange} />
                                    {errors.conNewPassword && <div className="invalid-feedback">{errors.conNewPassword}</div>}
                                </div>
                                <button className="btn btn-dark btn-block"><i className="fas fa-lock mr-2"></i>Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default UpdatePassword;
