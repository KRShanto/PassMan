import { useEffect, useState } from "react";
// import { IPassword } from "../../../models/password";
import { PasswordType } from "../../../types/password";
import { ReturnedJsonType } from "../../../types/json";
import PostButton from "../../utils/PostButton";
import PasswordContent from "./PasswordContent";
import usePasswordsStore from "../../../stores/password";
import Image from "next/image";

import ArrowUp from "../../../public/arrow-up.svg";
import ArrowDown from "../../../public/arrow-down.svg";

const ICON_SIZE = 50;

export default function Password({ password }: { password: PasswordType }) {
  const [showPassword, setShowPassword] = useState(false);
  const [edit, setEdit] = useState(false);
  const [expand, setExpand] = useState(false);

  const [username, setUsername] = useState(password.username);
  const [website, setWebsite] = useState(password.website);
  const [pass, setPass] = useState(password.password);
  const [recentlyCopied, setRecentlyCopied] = useState(false);

  const updatePassword = usePasswordsStore((state) => state.updatePassword);
  const removePassword = usePasswordsStore((state) => state.removePassword);

  useEffect(() => {
    if (recentlyCopied) {
      setTimeout(() => {
        setRecentlyCopied(false);
      }, 2000);
    }
  }, [recentlyCopied]);

  function showPasswordToggle() {
    setShowPassword(!showPassword);
  }

  function expandToggle() {
    if (expand) {
      // turn off the edit mode
      cancelEdit();
    }

    setExpand(!expand);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(password.password);
    setRecentlyCopied(true);
  }

  function editTrue() {
    setEdit(true);
  }

  function cancelEdit() {
    setEdit(false);
    setUsername(password.username);
    setWebsite(password.website);
    setPass(password.password);
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
    <li className={`password-div ${expand ? "expand" : ""}`}>
      <div className="contents">
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
              <button className="show btn orange" onClick={showPasswordToggle}>
                {showPassword ? "Hide" : "Show"}
              </button>

              <button
                className={`copy btn ${recentlyCopied ? "green" : "orange"}`}
                onClick={copyToClipboard}
              >
                {recentlyCopied ? "Copied" : "Copy"}
              </button>
            </div>
          </PasswordContent>

          <div className="options">
            {edit ? (
              <>
                <PostButton
                  className="update btn green"
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
                <button className="cancel btn red" onClick={cancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit btn blue" onClick={editTrue}>
                Edit
              </button>
            )}
            <PostButton
              className="delete btn red"
              path="/api/password/remove"
              body={{ _id: password._id }}
              afterPost={afterDeletePassword}
            >
              Delete
            </PostButton>
          </div>
        </div>
      </div>

      <button
        className="toggle-button"
        onClick={expandToggle}
        style={{
          height: expand ? "23rem" : "auto",
        }}
      >
        {expand ? (
          <Image
            src={ArrowUp}
            alt="arrow up"
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        ) : (
          <Image
            src={ArrowDown}
            alt="arrow down"
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        )}
      </button>
    </li>
  );
}
