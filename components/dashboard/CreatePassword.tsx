import React, { useState } from "react";
import { SendType } from "../utils/Form";
import PopupForm from "../utils/PopupForm";
import usePasswordsStore from "../../stores/password";

export default function CreatePassword() {
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");

  const addPassword = usePasswordsStore((state) => state.addPassword);

  const handleSubmit = async (send: SendType) => {
    // Check if the Username and password are not empty
    if (username === "" || password === "") {
      alert("Username and password cannot be empty"); // TODO: make this custom alert
      return;
    }

    const json = await send("/api/password/create", {
      username,
      website,
      password,
    });

    if (json.type === "SUCCESS") {
      // alert("Password created successfully"); // TODO: make this custom alert

      // Add the password to the store
      addPassword(json.data);
    } else {
      alert("Error creating password"); // TODO: make this custom alert
    }
  };

  // TODO - add a password generator
  // TODO - add a password strength meter
  // TODO - add a password visibility toggle

  return (
    <>
      <PopupForm submitHandler={handleSubmit} className="create-password">
        <h2 className="heading">Create Password</h2>

        <div className="form-wrapper label-input">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-wrapper label-input">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="form-wrapper label-input">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Create</button>
      </PopupForm>
    </>
  );
}
