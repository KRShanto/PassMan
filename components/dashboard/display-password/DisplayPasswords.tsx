import React from "react";
import { IPassword } from "../../../models/password";
import Password from "./Password";

export default function DisplayPasswords({
  passwords,
}: {
  passwords: IPassword[];
}) {
  return (
    <ul className="display-passwords">
      {passwords.map((password: IPassword, index: number) => (
        <Password password={password} key={index} />
      ))}
    </ul>
  );
}
