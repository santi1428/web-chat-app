import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './SignUpSuccessfulModal.css';

function SignUpSuccessfulModal(){


    useEffect(() => {        
            window.$('#myModal').modal({
                backdrop: 'static',
                keyboard: false
            });   
    }, []);

    const history = useHistory();

    const redirectToLogin = () => {
        history.push("/login");
    }


    return (
        <div className="modal animated fadeIn" tabIndex="-1" role="dialog" id="myModal">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header px-3 pb-3 pb-1 bg-success border border-success">
                        <div className="text-center w-100">
                            <h5 className="text-white m-0">You have signed up successfully</h5>
                        </div>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={redirectToLogin}>
                            <span aria-hidden="true" className="text-white">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-auto text-success"><i className="fas fa-check-circle fa-5x"></i></div>
                                <div className="col align-self-end">
                                    <h5 className="text-center">Now you can sign in and start using our chat</h5>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
             </div>
    </div>
)
}

export default SignUpSuccessfulModal;