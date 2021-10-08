import React from "react";
import ReactModal from "react-modal";

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  popupClass?: string;
  contentClass?: string;
  onAfterClose?: () => void;
};


const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  popupClass = "",
  contentClass = "",
  onAfterClose
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={`popup ${popupClass}`}
      className={`popup__content ${contentClass}`}
      closeTimeoutMS={200}
      onAfterClose={onAfterClose}
      ariaHideApp={false}
    >
      <button type='button' className='popup__close' onClick={onClose}></button>
      {children}
    </ReactModal>
  );
}

export default Popup;
