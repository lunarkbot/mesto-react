
export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card.link)
  }

  return(
    <li className="photo-grid__item" onClick={handleClick}>
      <div className="photo-grid__photo-wrap">
        <img src={props.card.link}
             className="photo-grid__photo"
             alt={props.card.name}/>
        <button type="button"
                className="photo-grid__trash-button"></button>
      </div>
      <div className="photo-grid__caption">
        <h2 className="photo-grid__title">{props.card.name}</h2>
        <div className="likes-counter">
          <button className="likes-counter__button" type="button"></button>
          <span className="likes-counter__result">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}