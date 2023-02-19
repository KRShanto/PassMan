import React from "react";
import usePopupStore from "../../stores/popup";
import { signOut } from "next-auth/react";

export default function Options() {
  const openPopup = usePopupStore((state) => state.openPopup);

  return (
    <div id="options">
      <button
        className="btn blue"
        onClick={() => {
          openPopup("CreatePassword");
        }}
      >
        Create Password
      </button>

      <button
        className="btn red"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
