"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ComponentProps, useState } from "react";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";

type PasswordInputProps = Omit<
  ComponentProps<typeof TextInput>,
  "type" | "action"
>;

export default function PasswordInput({ label, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <TextInput
      label={label}
      type={visible ? "text" : "password"}
      action={(inputId) => (
        <Button
          variant="text"
          size="icon"
          aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          aria-controls={inputId}
          onClick={() => setVisible((v) => !v)}
        >
          <FontAwesomeIcon
            icon={visible ? faEyeSlash : faEye}
            className="text-sm"
          />
        </Button>
      )}
      {...props}
    />
  );
}
