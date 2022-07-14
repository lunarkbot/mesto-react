
import '../pages/index.css';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";


function App() {
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

  function handleCardClick(link) {
    setSelectedCard({
      isOpen: true,
      link: link
    });
  }

  function closeAllPopups(e) {
    if (e.target.classList.contains('popup')
      || e.target.classList.contains('popup__close-button')) {

      setIsOpen({
        isEditProfilePopupOpen: false,
        isAddPlacePopupOpen: false,
        isEditAvatarPopupOpen: false
      })

      setSelectedCard(false);
    }
  }

  const [isOpen, setIsOpen] = React.useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false
  })

  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    link: null
  });


  return (
    <div className="page">
      <Header />
      <Main
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          isOpen={isOpen}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
      />
      <Footer/>
    </div>
  );
}

export default App;
