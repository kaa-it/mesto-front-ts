import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUser } from "../store/current-user/selectors";
import { changeLikeCardStatus } from "../store/cards/slice";
import { CardData } from "../utils/mesto-api";

export type CardProps = {
  card: CardData;
  onImageClick: (data: CardData) => void;
  onDelete: (data: CardData) => void;
};

const Card: React.FC<CardProps> = ({
  card,
  onImageClick,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const userId = currentUser?._id;

  function handleImageClick() {
    onImageClick(card);
  }

  const isLiked = card.likes.some((i) => i._id === userId);
  const cardLikeButtonClassName = `card__like-button ${isLiked && "card__like-button_is-active"}`;

  const isOwn = card.owner._id === userId;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  function handleLikeClick() {
    dispatch(
      changeLikeCardStatus({
        id: card._id,
        like: !isLiked,
      })
    );
  }

  function handleDeleteClick() {
    onDelete(card);
  }

  return (
    <div className='card'>
      <div
        className='card__image'
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleImageClick}
      ></div>
      <button
        type='button'
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className='card__description'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__likes'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className='card__like-count'>{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
