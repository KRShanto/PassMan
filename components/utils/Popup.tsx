import React, { useContext } from "react";
import usePopupStore from "../../stores/popup";

export default function Popup({ children }: { children: React.ReactNode }) {
  const closePopup = usePopupStore((state) => state.closePopup);

  return (
    <>
      <div className="popup">
        {children}
        <button
          className="btn danger"
          onClick={() => {
            closePopup();
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
