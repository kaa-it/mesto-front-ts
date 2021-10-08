import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {AppDispatch} from "../store/store";
import {
  getCurrentUser,
  getIsInfoSending,
  getIsInfoSendError,
} from "../store/current-user/selectors";
import { sendCurrentUserInfo } from "../store/current-user/slice";

import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

type EditProfilePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ProfileFormData = {
  name: string;
  about: string;
}

const EditProfilePopup: React.FC<EditProfilePopupProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(getCurrentUser);
  const isSending = useSelector(getIsInfoSending);
  const sendingError = useSelector(getIsInfoSendError);
  const {
    values,
    handleChange,
    resetFrom,
    errors,
    isValid,
  } = useFormWithValidation<ProfileFormData>();

  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom]);

  function handleSubmit(evt: React.SyntheticEvent) {
    evt.preventDefault();
    const data = {
      name: values.name || '',
      about: values.about || '',
    }
    dispatch(sendCurrentUserInfo(data)).then(() => onClose());
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title='Редактировать профиль'
      name='edit'
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid || isSending}
    >
      <label className='popup__label'>
        <input
          type='text'
          name='name'
          id='owner-name'
          className='popup__input popup__input_type_name'
          placeholder='Имя'
          required
          minLength={2}
          maxLength={40}
          pattern='[a-zA-Zа-яА-Я -]{1,}'
          value={values.name || ""}
          onChange={handleChange}
          autoFocus 
        />
        <span className='popup__error' id='owner-name-error'>
          {errors.name || ""}
        </span>
      </label>
      <label className='popup__label'>
        <input
          type='text'
          name='about'
          id='owner-description'
          className='popup__input popup__input_type_description'
          placeholder='Занятие'
          required
          minLength={2}
          maxLength={200}
          value={values.about || ""}
          onChange={handleChange}
        />
        <span className='popup__error' id='owner-description-error'>
          {errors.about || ""}
        </span>
      </label>
      {!!sendingError && (
        <span className='popup__send-error'>{`Ошибка: ${sendingError}`}</span>
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
