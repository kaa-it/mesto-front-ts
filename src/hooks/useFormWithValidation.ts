import React, { useCallback, ChangeEvent, useState } from "react";

interface IUseFormWithValidation<T> {
  values: Partial<T>, 
  errors: Partial<T>, 
  isValid: Boolean,
  handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void, 
  resetFrom: (newValues?: Partial<T>, newErrors?: Partial<T>, newIsValid?: Boolean) => void,
}

export default function useFormWithValidation<T>(): IUseFormWithValidation<T> {
  const [values, setValues] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Partial<T>>({});
  const [isValid, setIsValid] = React.useState<Boolean>(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => { 
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    const form = input.closest("form");
    setIsValid(!!(form && form.checkValidity()));
  };

  const resetFrom = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetFrom, errors, isValid };
}
