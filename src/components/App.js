
import '../pages/index.css';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletion from "./ConfirmDeletion";

function App() {
  const avatarRef = React.useRef();

  const [cards, setCards] = React.useState([]);

  const [cardToDelete, setCardToDelete] = React.useState(null);

  const [animationClass, setAnimationClass] = React.useState('');

  const [isOpen, setIsOpen] = React.useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isConfirmationPopupOpen: false,
  })

  const [currentUser, setCurrentUser] = React.useState({
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: false,
  });

  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    link: null
  });

  function handleEditAvatarClick() {
    setIsOpen({
      ...isOpen,
      isEditAvatarPopupOpen: true
    });
  }

  function handleEditProfileClick() {
    setIsOpen({
      ...isOpen,
      isEditProfilePopupOpen: true
    });
  }

  function handleAddPlaceClick() {
    setIsOpen({
      ...isOpen,
      isAddPlacePopupOpen: true
    });
  }

  function handleCardClick(link, name) {
    setSelectedCard({
      isOpen: true,
      link: link,
      name: name,
    });
  }

  function closeAllPopups(e) {
    if (e.target.classList.contains('popup')
      || e.target.classList.contains('popup__close-button')
      || e.type === 'submit') {

      setIsOpen({
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        isEditAvatarPopupOpen: false,
        isConfirmationPopupOpen: false,
      })

      setSelectedCard({
        link: null,
        name: null,
        isOpen: false,
      });
    }
  }

  function handleUpdateUser(user, form) {
    api.setUserData(user.name, user.about)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          name: res.name,
          about: res.about
        })
        closeAllPopups(form)
      })
  }

  function handleUpdateAvatar(avatar, form) {
    api.setAvatar(avatar)
      .then((res) => {
        avatarRef.current.src = res.avatar;
        closeAllPopups(form);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.updateLikes(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => {
          return c._id === card._id ? newCard : c;
        }));
      });
  }

  function handleConfirmation(card) {
    setIsOpen({
      ...isOpen,
      isConfirmationPopupOpen: true
    });
    setCardToDelete(card);
  }

  function handleCardDelete(form) {
    api.deleteCard(cardToDelete._id)
      .then((res) => {
        setCards((state) => state.filter((c) => {
          return c._id !== cardToDelete._id;
        }))
        setCardToDelete(null);
        closeAllPopups(form)
      })
  }

  function handleAddPlace(card, form) {
    api.addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups(form);
      });
  }


  React.useEffect(() => {
    api.getCards()
      .then(cards => setCards([...cards]))
  },[])

  React.useEffect(() => {
    api.getUserData()
      .then(userInfo => {
        setCurrentUser({
          ...userInfo
        })
      })
  },[]);

  React.useEffect(() => {
    setAnimationClass(' popup_animated');
  }, [currentUser])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onCardClick={handleCardClick}
            selectedCard={selectedCard}
            avatarRef={avatarRef}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmation}
        />

        <EditProfilePopup
          isOpen={isOpen.isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          animationClass={animationClass}
        ></EditProfilePopup>

        <AddPlacePopup
          isOpen={isOpen.isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          animationClass={animationClass}
        ></AddPlacePopup>

        <EditAvatarPopup
          isOpen={isOpen.isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          animationClass={animationClass}
        ></EditAvatarPopup>

        <ConfirmDeletion
          isOpen={isOpen.isConfirmationPopupOpen}
          onClose={closeAllPopups}
          animationClass={animationClass}
          onConfirmClick={handleCardDelete}
        ></ConfirmDeletion>

        <ImagePopup onClose={closeAllPopups} card={selectedCard} animationClass={animationClass} />
        <Footer/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
