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

  const addMultiplePasswords = usePasswordsStore(
    (state) => state.addMultiplePasswords
  );

  const [noPasswords, setNoPasswords] = useState<null | boolean>(null);

  const fetchePasswords = async () => {
    turnOn();

    const res = await fetch("/api/password/get");
    const json: ReturnedJsonType = await res.json();

    turnOff();

    if (json.type === "SUCCESS") {
      addMultiplePasswords(json.data);
      if (json.data.length === 0) setNoPasswords(true);
    }
  };

  useEffect(() => {
    fetchePasswords();
  }, []);

  return (
    <>
      <Options />
      {<DisplayPasswords noPasswords={noPasswords} />}
    </>
  );
}
