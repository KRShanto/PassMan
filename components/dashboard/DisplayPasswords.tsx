import React from "react";
import { IPassword } from "../../models/password";

export default function Passwords({ passwords }: { passwords: IPassword[] }) {
  return (
    <div>
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
