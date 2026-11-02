"use client";

import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Children,
  isValidElement,
  type ReactNode,
  useId,
  useState,
} from "react";
import Button from "@/components/Button";

interface ExpandableListProps {
  limit?: number;
  children: ReactNode;
}

export default function ExpandableList({
  limit = 2,
  children,
}: ExpandableListProps) {
  const listId = useId();
  const [expanded, setExpanded] = useState(false);
  const items = Children.toArray(children);
  const hiddenCount = items.length - limit;
  const visible = expanded ? items : items.slice(0, limit);

  return (
    <>
      <ul id={listId} className="flex flex-col gap-3">
        {visible.map((item) => (
          <li key={isValidElement(item) ? item.key : String(item)}>{item}</li>
        ))}
      </ul>
      {hiddenCount > 0 && (
        <Button
          variant="subtle"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((e) => !e)}
          className="w-full text-sm"
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
          <FontAwesomeIcon
            icon={expanded ? faChevronUp : faChevronDown}
            className="text-xs"
          />
        </Button>
      )}
    </>
  );
}
