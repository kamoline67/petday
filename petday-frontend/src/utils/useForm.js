import { useState } from 'react';

export const useForm = (initialState, validations = {}) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues({
            ...values,
            [name]: type === 'checkbox' ? checked : value
        });

        if (validations[name]) {
            const error = validations[name](value);
            setErrors(prev => ({
                ...prev,
                [name]: error
            }));
        }
    };

    const isValid = () => {
        const newErrors = {};
        Object.keys(validations).forEach(key => {
            const error = validations[key](values[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return { values, errors, handleChange, isValid, setValues };
};