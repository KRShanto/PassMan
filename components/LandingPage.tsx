import React from "react";
import { signIn } from "next-auth/react";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="hero">
        <h1>PassMan</h1>
        <p>Keep all your passwords secure and organized in one place.</p>
      </div>

      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Securely store your passwords</li>
          <li>Generate strong passwords</li>
          <li>Share passwords with others</li>
          <li>Access your passwords from anywhere</li>
        </ul>
      </div>

      <div className="join">
        <button onClick={() => signIn()}>Sign up for free</button>
        <button>Install the browser extension</button>
        <button>Install the mobile app</button>
      </div>
    </div>
  );
}
