import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const Overlay = () => {
  const { showModal, handleCloseModal } = useAuthContext();
  const _onCloseModal = (e) => {
    e?.stopPropagation();
    handleCloseModal();
    console.log("close");
  };
  return (
    <div
      className={`modal-backdrop fade ${showModal ? "show" : ""} `}
      onClick={_onCloseModal}
    />
  );
};

export default Overlay;
