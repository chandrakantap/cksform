/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useState } from 'react';

const getErrors = (element) => {
  const elementDisplayName = element.dataset.displayName || element.name;
  const errors = [];
  const invalidValueEm = `Invalid value provided for ${elementDisplayName}.`;

  if (element.validity.patternMismatch) {
    errors.push(element.dataset.emPatternMismatch || invalidValueEm);
  }
  if (element.validity.rangeOverflow) {
    errors.push(element.dataset.emRangeOverflow || `${elementDisplayName} must be below ${element.max}.`);
  } else if (element.validity.rangeUnderflow) {
    errors.push(element.dataset.emRangeOverflow || `${elementDisplayName} must be atleast ${element.min}.`);
  }

  if (element.validity.stepMismatch) {
    errors.push(element.dataset.emStepMismatch || invalidValueEm);
  }

  if (element.validity.valueMissing) {
    errors.push(element.dataset.emValueMissing || `${elementDisplayName} is required.`);
  }
  if (element.validity.typeMismatch) {
    errors.push(element.dataset.emTypeMismatch || `Please provide a valid ${element.type}.`);
  }

  if (element.validity.tooShort) {
    errors.push(element.dataset.emTooShort || `Length must be atleast ${element.minLength}.`);
  } else if (element.validity.tooLong) {
    errors.push(element.dataset.emTooLong || `Length should not be more than ${element.maxLength}.`);
  }

  if (errors.length === 0 && !element.validity.valid) {
    errors.push('Invalid data.')
  }
  return errors;
};


const useCKSForm = (initialValue = {}) => {
  const [formData, setFormData] = useState({ ...initialValue });
  const [errors, setErrors] = useState({});

  const resetForm = () => setFormData({ ...initialValue });

  const handleSubmit = (callBack) => (event) => {
    const { form } = event.target;
    const isFormValid = form.checkValidity();
    const formErrors = isFormValid
      ? undefined
      : [...form.elements]
        .filter((element) => Boolean(element.name))
        .filter((element) => !element.checkValidity())
        .reduce(
          (elementErrors, element) => ({
            ...elementErrors,
            [element.name]: getErrors(element),
          }),
          {},
        );

    if (formErrors) {
      setErrors(formErrors)
    } else {
      setErrors({});
      callBack && callBack(event, formData);
    }

  };

  const validateField = (event) => {
    if (event.target.name) {
      const element = event.target;
      const formErrors = { ...errors };
      if (element.validity.valid) {
        formErrors[element.name] = undefined;
      } else {
        formErrors[element.name] = getErrors(element);
      }
      setErrors(formErrors);
    }
  };

  const onChangeField = (event) => {
    if (event.target.name) {
      const targetType = (event.target.type || 'UNKNOWN').toUpperCase();
      if (targetType === 'CHECKBOX') {
        const { checked } = event.target;
        const nextValue = checked
          ? [...formData[event.target.name], event.target.value]
          : formData[event.target.name].filter(
            (val) => val !== event.target.value,
          );
        setFormData({ ...formData, [event.target.name]: nextValue });
      } else {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      }
    }
  };

  return {
    formData,
    onChangeField,
    resetForm,
    handleSubmit,
    validateField,
    errors,
    setErrors,
  };
};

export default useCKSForm;
