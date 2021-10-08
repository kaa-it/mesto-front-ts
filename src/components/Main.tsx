import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";

import { getCurrentUser } from "../store/current-user/selectors";
import { getCards, getIsCardsLodaing, getCardsLoadError } from "../store/cards/selectors";

import { deleteCard, loadCards } from "../store/cards/slice";
import { loadCurrentUser } from "../store/current-user/slice";

import Card from "./Card";
import Preloader from "./Preloader";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CardData } from "../utils/mesto-api";

const Main: React.FC = () => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isPlacePopupOpen, setIsPlacePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [cardForDelete, setCardForDelete] = useState<CardData | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const handleEditProfileClick = () => setIsProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsAvatarPopupOpen(true);
  const handleCardClick = (card: CardData | null) => setSelectedCard(card);

  const handleCardDeleteRequest = (card: CardData | null) => setCardForDelete(card);

  useEffect(() => {
    dispatch(loadCards());
    dispatch(loadCurrentUser());
  }, [dispatch]);

  const handleCardDelete = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    if (!cardForDelete) return;
    dispatch(deleteCard(cardForDelete._id))
      .catch(() => console.log("delete error"))
      .finally(() => setCardForDelete(null));
  };

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setSelectedCard(null);
    setCardForDelete(null);
  }

  const currentUser = useSelector(getCurrentUser);
  const cards = useSelector(getCards);
  const isCardsLoading = useSelector(getIsCardsLodaing);
  const isCardsError = useSelector(getCardsLoadError);

  return (
    <>
      <main className='content'>
        <section className='profile page__section'>
          <div
            className='profile__image'
            onClick={handleEditAvatarClick}
            style={{ backgroundImage: `url(${currentUser?.avatar})` }}
          ></div>
          <div className='profile__info'>
            <h1 className='profile__title'>{currentUser?.name}</h1>
            <button
              className='profile__edit-button'
              type='button'
              onClick={handleEditProfileClick}
            ></button>
            <p className='profile__description'>{currentUser?.about}</p>
          </div>
          <button
            className='profile__add-button'
            type='button'
            onClick={handleAddPlaceClick}
          ></button>
        </section>

        <section className='places page__section'>
          {isCardsLoading && <Preloader />}
          {isCardsError && <p className='places__loading'>isCardsError</p>}
          {!isCardsLoading && !isCardsError && (
            <div className='places__list'>
              {cards.map((data) => (
                <Card
                  key={data._id}
                  card={data}
                  onImageClick={handleCardClick}
                  onDelete={handleCardDeleteRequest}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <EditProfilePopup isOpen={isProfilePopupOpen} onClose={closeAllPopups} />
      <AddPlacePopup isOpen={isPlacePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup isOpen={isAvatarPopupOpen} onClose={closeAllPopups} />
      <PopupWithForm
        isOpen={!!cardForDelete}
        title='Вы уверены?'
        name='remove-card'
        buttonText='Да'
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
};

export default Main;
