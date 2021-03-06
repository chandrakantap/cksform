# cksform

Simple react form library using hook

[![Build Status](https://travis-ci.com/chandrakantap/cksform.svg?branch=master)](https://travis-ci.com/chandrakantap/cksform)

```js
npm install cksform
```

# Qucik Start

```js
import React from 'react';
import useCKSForm from 'cksform';

const initialValue = {
    title: '',
    name: '',
    age: '',
    dob: '',
    email_id: '',
    mobile_no: ''
}
const Errors = ({ errors = {}, fieldName }) {
    const fieldErrors = errors[fieldName];
    if (!Array.isArray(fieldErrors) || fieldErrors.length === 0) {
        return null;
    }
    return (
        <ul className="error">
            {fieldErrors.map((error, index) => (<li key={index}>{error}</li>))}
        </ul>
    )
}

export default function () {
    const { formData, onChangeField, errors, handleSubmit, validateField } = useCKSForm(initialValue);

    return (
        <form noValidate autoComplete="off">
            <label>Title: </label>
            <div>
                <input type="text" name="title"
                    required minLength={3}
                    value={formData.title}
                    onChange={onChangeField}
                    onBlur={validateField}
                    data-display-name="Title" />
                <Errors errors={errors} fieldName="title" />
            </div>

            <label>Name: </label>
            <div>
                <input type="text" name="name" required
                    data-display-name="Name"
                    onChange={onChangeField}
                    value={formData.name} />
                <Errors errors={errors} fieldName="name" />
            </div>

            <label>Age: </label>
            <div>
                <input type="number" name="age"
                    required min="18" max="65"
                    value={formData.age}
                    onChange={onChangeField}
                    onBlur={validateField}
                    data-display-name="Age" />
                <Errors errors={errors} fieldName="age" />
            </div>

            <label>Date of Birth: </label>
            <div>
                <input type="date" name="dob"
                    required min="2018-09-01" max="2025-02-04"
                    value={formData.dob}
                    onChange={onChangeField}
                    onBlur={validateField}
                    data-display-name="Date of birth" />
                <Errors errors={errors} fieldName="dob" />
            </div>

            <label>Email: </label>
            <div>
                <input type="email" name="email_id"
                    required minLength="10"
                    value={formData.email_id}
                    onChange={onChangeField}
                    onBlur={validateField}
                    data-em-type-mismatch="Invalid email id provided"
                    data-display-name="Email ID" />
                <Errors errors={errors} fieldName="email_id" />
            </div>

            <label>Contact No: </label>
            <div>
                <input type="text" name="mobile_no"
                    required min="2018-09-01" max="2025-02-04"
                    value={formData.mobile_no}
                    onChange={onChangeField}
                    onBlur={validateField}
                    data-display-name="Mobile No" />
                <Errors errors={errors} fieldName="mobile_no" />
            </div>

            <p />
            <input type="button" value="Submit" onClick={handleSubmit()} />
        </form>
    )
}
```
