import React from "react";
import { IPassword } from "../../../models/password";
import Password from "./Password";

export default function DisplayPasswords({
  passwords,
}: {
  passwords: IPassword[];
}) {
  return (
    <ul id="display-passwords">
      {passwords.map((password: IPassword) => (
        <Password password={password} key={password._id} />
      ))}
    </ul>
  );
}
