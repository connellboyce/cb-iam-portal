"use client";

import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type FormEvent, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Field from "@/components/Field";
import TextInput from "@/components/TextInput";

interface EditableFieldProps {
  label: string;
  name: string;
  defaultValue: string;
  autoComplete?: string;
}

export default function EditableField({
  label,
  name,
  defaultValue,
  autoComplete,
}: EditableFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [draft, setDraft] = useState(defaultValue);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const toggled = useRef(false);

  useEffect(() => {
    if (!toggled.current) return;
    if (editing) inputRef.current?.focus();
    else editButtonRef.current?.focus();
  }, [editing]);

  const startEditing = () => {
    toggled.current = true;
    setDraft(value);
    setEditing(true);
  };

  const stopEditing = () => {
    setError(undefined);
    setEditing(false);
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) {
      setError(`${label} can't be empty.`);
      inputRef.current?.focus();
      return;
    }
    setValue(trimmed);
    stopEditing();
  };

  if (!editing) {
    return (
      <Field
        label={label}
        value={value}
        action={
          <Button
            ref={editButtonRef}
            variant="text"
            size="icon"
            aria-label={`Edit ${label}`}
            onClick={startEditing}
          >
            <FontAwesomeIcon icon={faPen} className="text-sm" />
          </Button>
        }
      />
    );
  }

  return (
    <form onSubmit={handleSave}>
      <TextInput
        ref={inputRef}
        label={label}
        name={name}
        value={draft}
        autoComplete={autoComplete}
        error={error}
        onChange={(e) => {
          setDraft(e.target.value);
          setError(undefined);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") stopEditing();
        }}
        action={() => (
          <Button type="submit" size="icon" aria-label={`Save ${label}`}>
            <FontAwesomeIcon icon={faCheck} className="text-sm" />
          </Button>
        )}
      />
    </form>
  );
}
