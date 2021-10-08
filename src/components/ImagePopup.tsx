import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import {CardData} from "../utils/mesto-api";

type ImagePopupProps = {
  card: CardData | null;
  onClose: () => void;
};

const ImagePopup: React.FC<ImagePopupProps> = ({ card, onClose }) => {
  const [data, setData] = useState<CardData | null>(null);
  useEffect(() => {
    if (card) setData(card)
  }, [card]);

  const onClosed = () => setData(null);

  return (
    <Popup
      isOpen={!!card}
      onClose={onClose}
      popupClass='popup_type_image'
      contentClass='popup__content_content_image'
      onAfterClose={onClosed}
    >
      <img
        alt={data ? data.name : ""}
        src={data ? data.link : ""}
        className='popup__image'
      />
      <p className='popup__caption'>{data ? data.name : ""}</p>
    </Popup>
  );
}

export default ImagePopup;
