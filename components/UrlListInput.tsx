"use client";

import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";

interface UrlListInputProps {
  name: string;
  itemLabel: string;
  placeholder?: string;
  defaultValues?: string[];
}

export default function UrlListInput({
  name,
  itemLabel,
  placeholder,
  defaultValues = [],
}: UrlListInputProps) {
  const initialCount = Math.max(defaultValues.length, 1);
  const nextId = useRef(initialCount);
  const [ids, setIds] = useState(() =>
    Array.from({ length: initialCount }, (_, i) => i),
  );
  const inputs = useRef(new Map<number, HTMLInputElement>());
  const focusId = useRef<number>(undefined);

  useEffect(() => {
    if (focusId.current === undefined) return;
    inputs.current.get(focusId.current)?.focus();
    focusId.current = undefined;
  });

  const add = () => {
    const id = nextId.current++;
    focusId.current = id;
    setIds((current) => [...current, id]);
  };

  const remove = (index: number) => {
    focusId.current = ids[index === 0 ? 1 : index - 1];
    setIds((current) => current.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-2">
        {ids.map((id, index) => (
          <li
            key={id}
            className="flex items-center gap-2 rounded-2xl bg-foreground/5 py-2 pr-2 pl-5 transition-shadow focus-within:ring-2 focus-within:ring-brand/50"
          >
            <input
              ref={(el) => {
                if (el) inputs.current.set(id, el);
                else inputs.current.delete(id);
              }}
              type="url"
              name={name}
              defaultValue={defaultValues[id]}
              required
              placeholder={placeholder}
              aria-label={`${itemLabel} ${index + 1}`}
              className="min-w-0 flex-1 bg-transparent py-2 font-mono text-sm outline-none placeholder:text-muted"
            />
            {ids.length > 1 && (
              <Button
                variant="text"
                size="icon"
                aria-label={`Remove ${itemLabel} ${index + 1}`}
                onClick={() => remove(index)}
              >
                <FontAwesomeIcon icon={faXmark} className="text-sm" />
              </Button>
            )}
          </li>
        ))}
      </ul>
      <Button variant="text" className="self-start text-sm" onClick={add}>
        <FontAwesomeIcon icon={faPlus} className="text-xs" />
        Add {itemLabel}
      </Button>
    </div>
  );
}
