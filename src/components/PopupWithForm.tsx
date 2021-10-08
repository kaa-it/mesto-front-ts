import React from "react";
import Popup from "./Popup";


type PopupWithFormProps = {
  title: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onSubmit: (evt: React.SyntheticEvent) => void;
  buttonText?: string;
  isDisabled?: boolean;
};

const PopupWithForm: React.FC<PopupWithFormProps> = ({
  title,
  name,
  isOpen,
  onClose,
  children,
  onSubmit,
  buttonText = "Сохранить",
  isDisabled = false,
}) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className='popup__form' name={name} noValidate onSubmit={onSubmit}>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        {children}
        <button
          type='submit'
          className={`button popup__button ${
            isDisabled && "popup__button_disabled"
          }`}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
