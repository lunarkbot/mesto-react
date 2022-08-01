import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function ConfirmDeletion(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onConfirmClick(e);
  }

  return(
    <PopupWithForm
      title="Вы уверены?"
      type="confirmation"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      animationClass={props.animationClass}
      onSubmit={handleSubmit}
    />
  );
}