import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../Context/User';



const ProtectedRoute = ({component: Component, ...rest}) => {
    const { user } = useContext(UserContext);


    return <Route {...rest} render={
        props => {
            if(user.isLoggedIn){
                return <Component {...props} />
            }else{
                return <Redirect to={
                    {
                        pathname: "/login",
                        state: {
                            from: props.location
                        }
                    }
                } 
                />
            }
        }
    } />
}

export default ProtectedRoute;