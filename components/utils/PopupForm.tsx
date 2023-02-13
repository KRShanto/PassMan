import React, { useContext } from "react";
import Popup from "./Popup";
import Form from "./Form";
import { SendType } from "./Form";
import usePopupStore from "../../stores/popup";

export default function PopupForm({
  className,
  submitHandler,
  children,
}: {
  className?: string;
  submitHandler: (send: SendType) => void;
  children: React.ReactNode;
}) {
  const openPopup = usePopupStore((state) => state.openPopup);

  const handleSubmit = async (send: SendType) => {
    submitHandler(send);
    openPopup(null);
  };

  return (
    <Popup>
      <Form submitHandler={handleSubmit} className={className}>
        {children}
      </Form>
    </Popup>
  );
}
