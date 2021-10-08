import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {AppDispatch} from "../store/store";
import PopupWithForm from "./PopupWithForm";

import {
  getCurrentUser,
  getIsAvatarSending,
  getIsAvatarSendError,
} from "../store/current-user/selectors";
import { sendCurrentUserAvatar } from "../store/current-user/slice";

import useFormWithValidation from "../hooks/useFormWithValidation";

type EditAvatarPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type AvatarFormData = {
  avatar: string;
}

const EditAvatarPopup: React.FC<EditAvatarPopupProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(getCurrentUser);
  const isSending = useSelector(getIsAvatarSending);
  const sendingError = useSelector(getIsAvatarSendError);
  const {
    values,
    handleChange,
    resetFrom,
    errors,
    isValid,
  } = useFormWithValidation<AvatarFormData>();

  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, false);
    }
  }, [currentUser, resetFrom]);

  function handleSubmit(evt: React.SyntheticEvent) {
    evt.preventDefault();
    const data = {
      avatar: values.avatar || ''
    };
    dispatch(sendCurrentUserAvatar(data)).then(() => onClose());
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title='Обновить аватар'
      name='edit-avatar'
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid}
    >
      <label className='popup__label'>
        <input
          type='url'
          name='avatar'
          id='owner-avatar'
          className='popup__input popup__input_type_description'
          placeholder='Ссылка на изображение'
          value={values.avatar || ""}
          onChange={handleChange}
          required
          autoFocus 
        />
        <span className='popup__error' id='owner-avatar-error'>
          {errors.avatar || ""}
        </span>
      </label>
      {!!sendingError && (
        <span className='popup__send-error'>{`Ошибка: ${sendingError}`}</span>
      )}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
