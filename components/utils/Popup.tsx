import React, { useContext } from "react";
import usePopupStore from "../../stores/popup";

export default function Popup({ children }: { children: React.ReactNode }) {
  const closePopup = usePopupStore((state) => state.closePopup);

  return (
    <>
      <div id="popup">
        {children}
        <button
          className="btn red cancel"
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
