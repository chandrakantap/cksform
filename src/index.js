import { useState } from 'react';

const getErrors = (element) => {
    const elementDisplayName = element.dataset.displayName || element.name;
    const errors = [];
    if (element.validity.valueMissing) {
        errors.push[`${elementDisplayName} is required`];
    }
    if (element.validity.typeMismatch) {
        errors.push[`Please provide a valid ${element.type}`];
    }
    return errors;
}

const useCKSForm = (initialValue = {}) => {
    const [formData, setFormData] = useState({ ...initialValue });
    const [errors, setErrors] = useState({});

    const resetForm = () => setFormData({ ...initialValue });

    const validate = (form) => {
        const isFormValid = form.checkValidity();
        const formErrors = isFormValid ? undefined : [...form.elements]
            .filter(element => Boolean(element.name))
            .filter(element => !element.checkValidity())
            .reduce((errors, element) => ({ ...errors, [element.name]: getErrors(element) }), {});

        if (formErrors) {
            setErrors(formErrors);
            return false;
        } else {
            setErrors({});
            return true;
        }
    }

    const onChangeField = (event) => {
        if (event.target.name) {
            const targetType = (event.target.type || 'UNKNOWN').toUpperCase();
            if (targetType === "CHECKBOX") {
                const checked = event.target.checked;
                const nextValue = (checked)
                    ? [...formData[event.target.name], event.target.value]
                    : formData[event.target.name].filter(val => val !== event.target.value);
                setFormData({ ...formData, [event.target.name]: nextValue });
            } else {
                setFormData({ ...formData, [event.target.name]: event.target.value });
            }
        }
    }

    return {
        formData,
        onChangeField,
        resetForm,
        validate,
        errors,
        setErrors
    }
}

export default useCKSForm;