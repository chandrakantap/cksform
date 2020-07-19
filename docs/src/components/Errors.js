import React from 'react';

export default function ({ errors = {}, fieldName }) {
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