import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {AppDispatch} from "../store/store";
import { getIsCardSending, getCardSendError } from "../store/cards/selectors";
import { addCard } from "../store/cards/slice";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";


type AddPlacePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PlaceFormData = {
  name: string;
  link: string;
}

const AddPlacePopup: React.FC<AddPlacePopupProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSending = useSelector(getIsCardSending);
  const sendingError = useSelector(getCardSendError);
  const {
    values,
    handleChange,
    resetFrom,
    errors,
    isValid,
  } = useFormWithValidation<PlaceFormData>();

  useEffect(() => {
    resetFrom();
  }, [isOpen, resetFrom]);

  function handleSubmit(evt: React.SyntheticEvent) {
    evt.preventDefault();
    const data = {
      name: values.name || '',
      link: values.link || '',
    }
    dispatch(addCard(data)).then(() => onClose());
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      title='Новое место'
      name='new-card'
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid || isSending}
    >
      <label className='popup__label'>
        <input
          type='text'
          name='name'
          id='place-name'
          className='popup__input popup__input_type_card-name'
          placeholder='Название'
          required
          minLength={1}
          maxLength={30}
          value={values.name || ""}
          onChange={handleChange}
          autoFocus 
        />
        <span className='popup__error' id='place-name-error'>
          {errors.name || ""}
        </span>
      </label>
      <label className='popup__label'>
        <input
          type='url'
          name='link'
          id='place-link'
          className='popup__input popup__input_type_url'
          placeholder='Ссылка на картинку'
          required
          value={values.link || ""}
          onChange={handleChange}
        />
        <span className='popup__error' id='place-link-error'>
          {errors.link || ""}
        </span>
      </label>
      {!!sendingError && (
        <span className='popup__send-error'>{`Ошибка: ${sendingError}`}</span>
      )}
    </PopupWithForm>
  );
}

export default AddPlacePopup;
