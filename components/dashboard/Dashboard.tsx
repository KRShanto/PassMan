import React, { useEffect, useState } from "react";
import DisplayPasswords from "./display-password/DisplayPasswords";
import useLoadingStore from "../../stores/loading";
import usePasswordsStore from "../../stores/password";
import Popup from "./Popup";
import { ReturnedJsonType } from "../../types/json";
import Options from "./Options";

export default function Dashboard() {
  const turnOn = useLoadingStore((state) => state.turnOn);
  const turnOff = useLoadingStore((state) => state.turnOff);

  const passwords = usePasswordsStore((state) => state.passwords);
  const addMultiplePasswords = usePasswordsStore(
    (state) => state.addMultiplePasswords
  );

  const fetchePasswords = async () => {
    turnOn();

    const res = await fetch("/api/password/get");
    const json: ReturnedJsonType = await res.json();

    turnOff();

    if (json.type === "SUCCESS") {
      addMultiplePasswords(json.data);
    }
  };

  useEffect(() => {
    fetchePasswords();
  }, []);

  return (
    <>
      <Popup />
      <Options />
      <DisplayPasswords passwords={passwords} />
    </>
  );
}
