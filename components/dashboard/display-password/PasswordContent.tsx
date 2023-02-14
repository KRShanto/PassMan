import React from "react";

export default function PasswordContent({
  className,
  field,
  value,
  setValue,
  edit,
  inputType = "text",
  children,
}: {
  className: string;
  field: string;
  value: string;
  setValue: (value: string) => void;
  edit: boolean;
  inputType?: "text" | "password";
  children?: React.ReactNode;
}) {
  return (
    <div className={className}>
      <p className="field">{field}</p>
      <input
        type={inputType}
        value={value}
        readOnly={!edit}
        className={edit ? "value" : "value read-only"}
        onChange={(e) => setValue(e.target.value)}
      />

      {children}
    </div>
  );
}
