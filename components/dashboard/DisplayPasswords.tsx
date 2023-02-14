import React from "react";
import { IPassword } from "../../models/password";
import usePopupStore from "../../stores/popup";

export default function Passwords({ passwords }: { passwords: IPassword[] }) {
  const openPopup = usePopupStore((state) => state.openPopup);

  return (
    <div>
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

      <ul>
        {passwords.map((password: IPassword, index: number) => (
          <li key={index}>
            <p>Title: {password.title}</p>
            <p>Website: {password.website}</p>
            <p>Password: {password.password}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
