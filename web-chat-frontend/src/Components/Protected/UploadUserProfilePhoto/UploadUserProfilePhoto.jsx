import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../Context/User';
import { URL, uploadUserProfilePhoto } from '../../../Api/User';
import { showSuccessNotification,  showDangerNotification } from '../../CustomToast/CustomToast';
import './UploadUserProfilePhoto.css';
import { useHistory } from "react-router-dom";


const UploadUserProfilePhoto = props => {

    const { user, updateUserProfilePhoto } = useContext(UserContext);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const history = useHistory();

    useEffect(() => {

        console.log(uploadPercentage);

    }, [uploadPercentage]);

    const handleOnChange = e => {
        setProfilePhoto(e.target.files[0]);
    }

    const handleOnFormSubmit = async (e) =>{ 
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePhoto', profilePhoto);
        const res = await uploadUserProfilePhoto(formData, setUploadPercentage);
        if(res.status == 422){
            showDangerNotification("Something went wrong", "You can only upload images");
        }else{
            updateUserProfilePhoto(res.data.file);
            setUploadPercentage(0);
            setProfilePhoto(null);
            showSuccessNotification("Photo updated", "Your profile photo has been updated");
            history.push("/updateprofile");
        }
    }

    return (    
        <div className="container">
            <title>Upload Profile Photo</title>
            <div className="row justify-content-center mt-4">
                <div className="col-md-6 card">
                    <div className="card-header text-center">
                        Change your profile photo
                    </div>
                    <div className="card-body text-center">   
                        <div id="profile-photo">
                            <img src={ URL + user.profilePhoto } alt="It could not load the photo" className="mb-3" />
                            <div className="progress mb-4" style={{display: uploadPercentage > 0 && uploadPercentage < 100 ? "" : "none" }}>
                                <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: uploadPercentage }} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div id="upload-profile-photo">
                            <form encType="multipart/form-data" onSubmit={handleOnFormSubmit}>
                                <div className="custom-file" style={{display: uploadPercentage > 0 && uploadPercentage < 100 ? "none" : "block" }}>
                                    <input type="file" className="custom-file-input"  accept="image/*" onChange={handleOnChange}></input>
                                    <label className="custom-file-label" htmlFor="profilePhoto">Choose photo</label>
                                </div>
                                <button className="btn btn-dark btn-block mt-3" type="submit" disabled={ profilePhoto == null || (uploadPercentage > 0 && uploadPercentage < 100) ? "disabled": "" }>Upload profile photo</button>
                            </form>
                        </div>
                    </div>                         
                </div>
            </div>
        </div>
    )

}

export default UploadUserProfilePhoto;
