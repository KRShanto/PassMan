import React from "react";
import { IPassword } from "../../../models/password";
import Password from "./Password";
import usePasswordsStore from "../../../stores/password";

export default function DisplayPasswords({
  noPasswords,
}: {
  noPasswords: null | boolean;
}) {
  const passwords = usePasswordsStore((state) => state.passwords);

  if (noPasswords === false) {
    return <p id="no-passwords">No passwords to display</p>;
  }

  return (
    <ul id="display-passwords">
      {passwords.map((password: IPassword) => (
        <Password password={password} key={password._id} />
      ))}
    </ul>
  );
}
