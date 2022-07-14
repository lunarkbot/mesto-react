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
    </main>
  )
}