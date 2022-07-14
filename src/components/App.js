
import '../pages/index.css';
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


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

  function handleCardClick(link, name) {
    setSelectedCard({
      isOpen: true,
      link: link,
      name: name,
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

      setSelectedCard({
        link: '',
        name: '',
        isOpen: false,
      });
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
          selectedCard={selectedCard}
      />
      <PopupWithForm
        title="Редактировать профиль"
        type="profile"
        buttonText="Сохранить"
        isOpen={isOpen.isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__field">
          <input type="text"
                 name="name"
                 id="name-input"
                 placeholder="Имя"
                 required
                 minLength="2"
                 maxLength="40"
                 className="form__text-input form__text-input_type_name"/>
          <span className="name-input-error form__input-error">Проверка</span>
        </label>
        <label className="form__field form__field_last">
          <input type="text"
                 name="job"
                 id="job-input"
                 placeholder="О себе"
                 required
                 minLength="2"
                 maxLength="200"
                 className="form__text-input form__text-input_type_job"/>
          <span className="job-input-error form__input-error">Проверка</span>
        </label>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        type="card"
        buttonText="Сохранить"
        isOpen={isOpen.isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__field">
          <input type="text"
                 name="name"
                 id="photo-name-input"
                 placeholder="Название"
                 required
                 minLength="2"
                 maxLength="30"
                 className="form__text-input form__text-input_type_photo-name"/>
          <span className="photo-name-input-error form__input-error">Проверка</span>
        </label>
        <label className="form__field form__field_last">
          <input type="url"
                 name="link"
                 id="photo-link-input"
                 placeholder="Ссылка на картинку"
                 required
                 className="form__text-input form__text-input_type_photo-link"/>
          <span className="photo-link-input-error form__input-error">Проверка</span>
        </label>
      </PopupWithForm>


      <PopupWithForm
        title="Обновить аватар"
        type="avatar"
        buttonText="Сохранить"
        isOpen={isOpen.isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="form__field form__field_last">
          <input type="url"
                 name="avatar-url"
                 id="avatar-input"
                 placeholder="Ссылка на картинку"
                 required
                 className="form__text-input form__text-input_type_photo-link"/>
          <span className="avatar-input-error form__input-error">Проверка</span>
        </label>
      </PopupWithForm>


      <PopupWithForm
        title="Вы уверены?"
        type="confirmation"
        buttonText="Да"
      >
        <input type="hidden" name="item-id" value=""/>
      </PopupWithForm>

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      <Footer/>
    </div>
  );
}

export default App;
