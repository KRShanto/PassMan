import React from "react";
import usePopupStore from "../../stores/popup";
import CreatePassword from "./CreatePassword";

export default function Popup() {
  const popup = usePopupStore((state) => state.popup);

  return <>{popup === "CreatePassword" && <CreatePassword />}</>;
}
