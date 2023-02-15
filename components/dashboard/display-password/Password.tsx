import { useState } from "react";
import { IPassword } from "../../../models/password";
import { ReturnedJsonType } from "../../../types/json";
import PostButton from "../../utils/PostButton";
import PasswordContent from "./PasswordContent";
import usePasswordsStore from "../../../stores/password";

export default function Password({ password }: { password: IPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [edit, setEdit] = useState(false);
  const [expand, setExpand] = useState(false);

  const [username, setUsername] = useState(password.username);
  const [website, setWebsite] = useState(password.website);
  const [pass, setPass] = useState(password.password);

  const updatePassword = usePasswordsStore((state) => state.updatePassword);
  const removePassword = usePasswordsStore((state) => state.removePassword);

  function showPasswordToggle() {
    setShowPassword(!showPassword);
  }

  function expandToggle() {
    setExpand(!expand);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password.password);
  }

  function editTrue() {
    setEdit(true);
  }

  function afterUpdatePassword(json: ReturnedJsonType, body: any): void {
    if (json.type === "SUCCESS") {
      setUsername(body.username);
      setWebsite(body.website);
      setPass(body.password);
      setEdit(false);

      updatePassword(body);
    } else {
      alert("Error updating password");
      console.log(json);
    }
  }

  function afterDeletePassword(json: ReturnedJsonType): void {
    if (json.type === "SUCCESS") {
      removePassword(password._id);
    } else {
      alert("Error deleting password");
      console.log(json);
    }
  }

  return (
    <li className="password-div">
      <div className="header">
        <PasswordContent
          className="username"
          field="Username"
          value={username}
          setValue={setUsername}
          edit={edit}
          expand={expand}
        />

        <PasswordContent
          className="website"
          field="Website"
          value={website ? website : ""}
          setValue={setWebsite}
          edit={edit}
          expand={expand}
        />

        <button className="toggle-body" onClick={expandToggle}>
          {expand ? "▼" : "▲"}
        </button>
      </div>

      <div
        className="body"
        style={{
          height: expand ? "auto" : "0",
        }}
      >
        <PasswordContent
          className="password"
          field="Password"
          value={pass}
          setValue={setPass}
          edit={edit}
          inputType={showPassword ? "text" : "password"}
          expand={expand}
        >
          <div className="password-options">
            <button className="show" onClick={showPasswordToggle}>
              {showPassword ? "Hide" : "Show"}
            </button>

            <button className="copy" onClick={copyToClipboard}>
              Copy
            </button>
          </div>
        </PasswordContent>

        <div className="options">
          {edit ? (
            <PostButton
              className="update"
              path="/api/password/update"
              body={{
                _id: password._id,
                username,
                website,
                password: pass,
              }}
              afterPost={afterUpdatePassword}
            >
              Update
            </PostButton>
          ) : (
            <button className="edit" onClick={editTrue}>
              Edit
            </button>
          )}
          <PostButton
            className="delete"
            path="/api/password/remove"
            body={{ _id: password._id }}
            afterPost={afterDeletePassword}
          >
            Delete
          </PostButton>
        </div>
      </div>
    </li>
  );
}
