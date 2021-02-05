import React, { useContext } from 'react';
import { UserContext } from '../../../Context/User';
import useForm from '../../useForm';
import  {  validateDeleteAccountForm } from '../../ValidateForm';
import { deleteUserAccount } from '../../../Api/User';
import { showWarningNotification,  showDangerNotification } from '../../CustomToast/CustomToast';
import { useHistory } from "react-router-dom";

const DeleteAccount = props => {

    const { removeUser } = useContext(UserContext);  

    const history = useHistory();

    const formValues = {
        password: ''
    }

    const logout = () => {
        removeUser();
        history.push('/login');
      }  
    
    const submit = ({ password }, setErrors, setIsSubmitting) => {
        
        deleteUserAccount(password).then(res => {
            if(res.status === 204){
                console.log("Succesfully account deleted");
                setIsSubmitting(false);
                setErrors({});
                showWarningNotification("OK", "Your account has been deleted");
                logout();
            }else{
                setIsSubmitting(false);
                setErrors({ password: res.data.error })
                showDangerNotification("Something went wrong", "Provided data is wrong");
            }
        });
    }
                
    const { values, handleSubmit, handleChange, errors } = useForm(formValues, submit, validateDeleteAccountForm);
    
    return (
        <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header bg-danger text-white text-center">
                            Delete Account
                        </div>
                        <div className="card-body">
                            <p> <strong className="text-danger">Disclaimer: </strong>If you delete your account, you are gonna lose all of your conversations</p>
                            <hr/>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <input type="password" name="password" id="password" className={ errors.password ? 'form-control text-center is-invalid': 'form-control text-center' } placeholder="Enter your account password" value={values.password} onChange={handleChange} />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                                <button className="btn btn-danger btn-block"><i className="fas fa-trash-alt mr-2"></i>Delete Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default DeleteAccount;