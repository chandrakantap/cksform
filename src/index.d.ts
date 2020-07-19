export as namespace CKSForm;

interface iCKSForm {
    handleSubmit: Function,
    onChangeField: Function,
    resetForm: Function,
    validateForm: Function,
    validateField: Function,
    errors: object,
    setErrors: Functions,
}


declare function useCKSForm(defaultValue: object): iCKSForm;
export = useCKSForm;