import React from "react";
import usePopupStore from "../../stores/popup";

export default function Options() {
  const openPopup = usePopupStore((state) => state.openPopup);

  return (
    <div className="options">
      <button
        className="btn blue"
        onClick={() => {
          openPopup("CreatePassword");
        }}
      >
        Create Password
      </button>
    </div>
  );
}
