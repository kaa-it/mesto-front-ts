import React from "react";
import Popup from "./Popup";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";

const ICONS = {
  success: SuccessIcon,
  error: ErrorIcon,
};

export interface MessageData {
  iconType: keyof typeof ICONS;
  text: string;
}

type InfoTooltipProps = {
  isOpen: boolean;
  onClose: () => void;
  status?: MessageData;
};

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  isOpen,
  onClose,
  status = {iconType: 'success', text: ''}

}) => {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <img className='popup__icon' src={ICONS[status.iconType]} alt={status.text} />
      <p className='popup__status-message'>{status.text}</p>
    </Popup>
  );
};

export default InfoTooltip;
