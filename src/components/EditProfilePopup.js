import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [value, setValue] = React.useState({
    name: '',
    job: ''
  });

  React.useEffect(() => {
    setValue({
      name: currentUser.name,
      job: currentUser.about
    })
  }, [currentUser]);

  function handleChange(e) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: value.name,
      about: value.job
    }, e);
  }

  return(
    <PopupWithForm
      title="Редактировать профиль"
      type="profile"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      animationClass={props.animationClass}
    >
      <label className="form__field">
        <input type="text"
               name="name"
               id="name-input"
               placeholder="Имя"
               required
               minLength="2"
               maxLength="40"
               value={value.name}
               onChange={handleChange}
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
               value={value.job}
               onChange={handleChange}
               className="form__text-input form__text-input_type_job"/>
        <span className="job-input-error form__input-error">Проверка</span>
      </label>
    </PopupWithForm>
  );
}