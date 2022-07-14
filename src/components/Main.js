import React from "react";
import avatarDefault from '../images/avatar.png';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from '../utils/api';
import Card from "./Card";




export default function Main(props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(false);

  const [userInfo, setUserInfo] = React.useState({
    userName: 'Жак-Ив Кусто',
    userDescription: 'Исследователь океана',
    userAvatar: false,
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserData()
      .then(userInfo => {
        setUserInfo({
          userName: userInfo.name,
          userDescription: userInfo.about,
          userAvatar: userInfo.avatar
        });
      })
  },[])

  React.useEffect(() => {
    api.getCards()
      .then(cards => setCards([...cards]))
  },[])

  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrap">
          <img className="profile__avatar" src={userInfo.userAvatar ? userInfo.userAvatar : avatarDefault} alt="Аватар" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__name-wrap">
            <h1 className="profile__name">{userInfo.userName}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__job">{userInfo.userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="photo-grid" aria-label="Секция с фотографиями">
        <ul className="photo-grid__list">
          {cards.map(card => {
            return <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          })}
        </ul>
      </section>

      <PopupWithForm
        title="Редактировать профиль"
        type="profile"
        buttonText="Сохранить"
        isOpen={props.isOpen.isEditProfilePopupOpen}
        onClose={props.onClose}
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
        isOpen={props.isOpen.isAddPlacePopupOpen}
        onClose={props.onClose}
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
        isOpen={props.isOpen.isEditAvatarPopupOpen}
        onClose={props.onClose}
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

      <ImagePopup onClose={props.onClose} card={props.selectedCard} />
    </main>
  )
}