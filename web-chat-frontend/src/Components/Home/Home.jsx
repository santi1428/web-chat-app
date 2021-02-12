import React from 'react';
import { useHistory } from "react-router-dom";


const Home = props => {

    const history = useHistory();
    
    const goToSignUp = () => {
        history.push('/signup');
    }

    const goToLogin = () => {
        history.push('/login');
    }
 
    return (
        <div className="container">
            <title>Home</title>
            <div className="row">
                <div className="col">
                <div className="jumbotron">
                    <h1 className="display-4"><i class="fas fa-users mr-2"></i>Welcome to a simple webchat!</h1>
                    <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur alias dolores dolorum placeat impedit. Inventore, dolorem, nesciunt earum nihil facere, molestiae nemo reiciendis ex eum ipsam culpa nobis cum fugiat.</p>
                    <hr className="my-4"></hr>
                    <button className="btn btn-dark btn-lg" href="#" role="button" onClick={goToSignUp}>Sign Up</button><span className="ml-2">or if you already have an account</span><button className="btn btn-dark btn-lg ml-2" href="#" role="button" onClick={goToLogin}>Sign In</button>
                </div>
                </div>
            </div>
        </div>
    )
    
}

export default Home;