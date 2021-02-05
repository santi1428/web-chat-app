    const validateSignUpForm =  values => {
        let errors = {}

        if(values.name.length < 2){
            errors.name = "This field is required"
        }else if(!/^([a-zA-Z ]){2,30}$/.test(values.name)){
            errors.name = "This field can't contain any number or symbol";
        }

        if(values.lastName.length < 2){
            errors.lastName = "This field is required"
        }else if(!/^([a-zA-Z ]){2,30}$/.test(values.lastName)){
            errors.lastName = "This field can't contain any number or symbol";
        }

        if(!values.email){
            errors.email = "This field is required"
        }else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)){
            errors.email = "It must be a valid email"
        }
        
        if(values.password.length < 6){
            errors.password = "Password must be at least 6 characters in length"
        }
        
        if(values.conPassword !== values.password){
            errors.conPassword = "Passwords don't match";
        }

        return errors;
    }

    const validateUpdateProfileForm = values => {
        let errors = {}

        if(values.name.length < 2){
            errors.name = "This field is required"
        }else if(!/^([a-zA-Z ]){2,30}$/.test(values.name)){
            errors.name = "This field can't contain any number or symbol";
        }

        if(values.lastName.length < 2){
            errors.lastName = "This field is required"
        }else if(!/^([a-zA-Z ]){2,30}$/.test(values.lastName)){
            errors.lastName = "This field can't contain any number or symbol";
        }

        if(!values.email){
            errors.email = "This field is required"
        }else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)){
            errors.email = "It must be a valid email"
        }
        
        return errors;
    }

    const validateSignInForm = values => {
        let errors = {}
        
        if(!values.email){
            errors.email = "This field is required"
        }else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(values.email)){
            errors.email = "It must be a valid email"
        }
        
        if(values.password.length < 6){
            errors.password = "Password must be at least 6 characters in length"
        }

        return errors;
    }

    const validateUpdatePasswordForm = values => {
        
        let errors = {}

        if(values.oldPassword.length < 6){
            errors.oldPassword = "Password must be at least 6 characters in length"
        }

        if(values.newPassword.length < 6){
            errors.newPassword = "Password must be at least 6 characters in length"
        }
        
        if(values.conNewPassword.length < 6){
            errors.conNewPassword = "Password must be at least 6 characters in length"
        }

        if(values.conNewPassword !== values.newPassword){
            errors.conNewPassword = "Passwords don't match";
        }

        return errors;

    }

    const validateDeleteAccountForm = values => {
        let errors = {}

        if(values.password.length < 6){
            errors.password = "Password must be at least 6 characters in length";
        }

        return errors;
    }

    export {
        validateSignUpForm,
        validateSignInForm,
        validateUpdateProfileForm,
        validateUpdatePasswordForm,
        validateDeleteAccountForm
    }

