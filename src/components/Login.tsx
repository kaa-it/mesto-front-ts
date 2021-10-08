import React from "react";
import {useHistory} from "react-router";
import { unwrapResult } from '@reduxjs/toolkit';
import { loginUser } from "../store/auth/slice";
import { getLoginSending } from "../store/auth/selectors";
import { useSelector, useDispatch } from "react-redux";
import {AppDispatch} from "../store/store";
import useForm from "../hooks/useForm";
import {MessageData} from "./InfoTooltip";

type LoginProps = {
  setTooltip: (message: MessageData) => void;
};

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = ({ setTooltip }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSenging = useSelector(getLoginSending);
  const { values, handleChange } = useForm<FormData>();
  const history = useHistory();

  function handleSubmit(evt: React.SyntheticEvent) {
    evt.preventDefault();
    const data = {
      email: values.email || '',
      password: values.password || '',
    }
    dispatch(loginUser(data))
      .then(unwrapResult)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setTooltip({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          iconType: "error",
        });
      });
  }

  return (
    <div className='auth-form'>
      <form className='auth-form__form' onSubmit={handleSubmit}>
        <div className='auth-form__wrapper'>
          <h3 className='auth-form__title'>Вход</h3>
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
        <button
          className='auth-form__button'
          type='submit'
          disabled={isSenging}
        >
          {isSenging ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default Login;
