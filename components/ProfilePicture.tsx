"use client";

import { faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import Button from "@/components/Button";
import IconCircle from "@/components/IconCircle";

export default function ProfilePicture() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <IconCircle icon={faUser} variant="brand" size="lg" />
      <Button
        variant="light"
        size="icon"
        aria-label="Edit profile picture"
        className="absolute right-0 bottom-0"
        onClick={() => fileInputRef.current?.click()}
      >
        <FontAwesomeIcon icon={faPen} className="text-sm" />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />
    </div>
  );
}
