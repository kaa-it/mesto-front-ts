import React from "react";
import { unwrapResult } from '@reduxjs/toolkit';
import { Link } from "react-router-dom";
import { registerUser } from "../store/auth/slice";
import { getRegisterSending } from "../store/auth/selectors";
import { useSelector, useDispatch } from "react-redux";
import {AppDispatch} from "../store/store";
import useForm from "../hooks/useForm";
import {MessageData} from "./InfoTooltip";

type RegisterProps = {
  setTooltip: (message: MessageData) => void;
};

type FormData = {
  email: string;
  password: string;
};

const Register: React.FC<RegisterProps> = ({ setTooltip }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSenging = useSelector(getRegisterSending);
  const { values, handleChange } = useForm<FormData>();

  function handleSubmit(evt: React.SyntheticEvent) {
    evt.preventDefault();
    const data = {
      email: values.email || '',
      password: values.password || '',
    }
    dispatch(registerUser(data))
      .then(unwrapResult)
      .then(() => {
        setTooltip({
          text: "Вы успешно зарегистрировались",
          iconType: "success",
        });
      })
      .catch((error) => {

        console.log(error.response)

        setTooltip({
          text: `${error.message} Что-то пошло не так! Попробуйте ещё раз.`,
          iconType: "error",
        });
      });
  }

  return (
    <div className='auth-form'>
      <form className='auth-form__form' onSubmit={handleSubmit}>
        <div className='auth-form__wrapper'>
          <h3 className='auth-form__title'>Регистрация</h3>
          <label className='auth-form__input'>
            <input
              type='email'
              name='email'
              id='email'
              className='auth-form__textfield'
              placeholder='Email'
              value={values.email || ''}
              onChange={handleChange}
              required
              autoFocus 
            />
          </label>
          <label className='auth-form__input'>
            <input
              type='password'
              name='password'
              id='password'
              className='auth-form__textfield'
              placeholder='Пароль'
              value={values.password || ''}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className='auth-form__wrapper'>
          <button
            className='auth-form__button'
            type='submit'
            disabled={isSenging}
          >
            {isSenging ? "Регистрация..." : "Зарегистрироваться"}
          </button>
          <p className='auth-form__text'>
            Уже зарегистрированы?{" "}
            <Link className='auth-form__link' to='/signin'>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
