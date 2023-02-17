import React, { useState } from "react";
import { SendType } from "../utils/form/Form";
import PopupForm from "../utils/PopupForm";
import usePasswordsStore from "../../stores/password";
import Input from "../utils/form/Input";
import Password from "../utils/form/Password";

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
      <PopupForm submitHandler={handleSubmit}>
        <h2 className="heading">Create Password</h2>

        <Input
          value={username}
          setValue={setUsername}
          label="Username"
          required
        />

        <Input value={website} setValue={setWebsite} label="Website" />

        <Password
          value={password}
          setValue={setPassword}
          label="Password"
          required
        />

        <button type="submit" className="btn green">
          Create
        </button>
      </PopupForm>
    </>
  );
}
