import { useState, useEffect } from 'react';

const useForm = (userValues, callback, validateForm) => {

    const [values, setValues] = useState(userValues);

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        let { value, name } = e.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validateForm(values));
        setIsSubmitting(true);
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
          callback(values, setErrors, setIsSubmitting);
        }
    }, [errors]);

    return { values, handleSubmit, handleChange, errors, isSubmitting }
}

export default useForm;