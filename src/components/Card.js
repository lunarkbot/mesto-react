import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card.link, props.card.name)
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  return(
    <li className="photo-grid__item">
      <div className="photo-grid__photo-wrap">
        <img src={props.card.link}
             className="photo-grid__photo"
             alt={props.card.name}
             onClick={handleClick}
        />
        {isOwn && <button
                    type="button"
                    className="photo-grid__trash-button"
                    onClick={handleDeleteClick}></button>}
      </div>
      <div className="photo-grid__caption">
        <h2 className="photo-grid__title">{props.card.name}</h2>
        <div className="likes-counter">
          <button
            className={
            `likes-counter__button ${isLiked && 'likes-counter__button_checked'}`
            }
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="likes-counter__result">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}