import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import KeyImg from "../public/key.svg";
import GlobeImg from "../public/globe.svg";
import PasswordImg from "../public/password.svg";
import ShareImg from "../public/share.svg";
import SaveImg from "../public/save.svg";

const ICON_SIZE = 30;

export default function LandingPage() {
  return (
    <div id="LandingPage">
      <div className="hero">
        <div className="logo">
          <Image src={KeyImg} alt="Key" width={70} height={70} />
          <h1 className="text">PassMan</h1>
        </div>
        <p className="short-details">
          Keep all your passwords secure and organized in one place.
        </p>
      </div>

      <div className="features">
        <h2 className="header">Features</h2>
        <ul>
          <li>
            <Image
              src={SaveImg}
              alt="Save"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <p className="text">Securely store your passwords</p>
          </li>

          <li>
            <Image
              src={PasswordImg}
              alt="Password"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <p className="text">Generate strong passwords</p>
          </li>

          <li>
            <Image
              src={GlobeImg}
              alt="Globe"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <p className="text">Access your passwords from anywhere</p>
          </li>

          <li>
            <Image
              src={ShareImg}
              alt="Share"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
            <p className="text">
              Share passwords with others
              <span className="future"> (coming soon)</span>
            </p>
          </li>
        </ul>
      </div>

      <div className="options">
        <button className="btn blue" onClick={() => signIn()}>
          Sign up for free
        </button>
        <button className="btn disable">Install the browser extension</button>
        <button className="btn disable">Install the mobile app</button>
      </div>
    </div>
  );
}
