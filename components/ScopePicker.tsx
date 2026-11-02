"use client";

import {
  faChevronDown,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useId, useState } from "react";
import Checkbox from "@/components/Checkbox";
import EmptyState from "@/components/EmptyState";
import type { ScopeGroup } from "@/lib/scopes";

interface ScopePickerProps {
  name: string;
  groups: ScopeGroup[];
  defaultSelected?: string[];
}

const matches = (group: ScopeGroup, needle: string) =>
  group.scopes.filter(
    (scope) =>
      !needle ||
      scope.value.toLowerCase().includes(needle) ||
      scope.description.toLowerCase().includes(needle) ||
      group.application.toLowerCase().includes(needle),
  );

export default function ScopePicker({
  name,
  groups,
  defaultSelected = [],
}: ScopePickerProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>(defaultSelected);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const needle = query.trim().toLowerCase();
  const visibleGroups = groups
    .map((group) => ({ ...group, scopes: matches(group, needle) }))
    .filter((group) => group.scopes.length > 0);
  const visibleCount = visibleGroups.reduce(
    (total, group) => total + group.scopes.length,
    0,
  );

  const toggleScope = (value: string) =>
    setSelected((current) =>
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    );

  const setGroupOpen = (application: string, open: boolean) =>
    setOpenGroups((current) =>
      open
        ? [...new Set([...current, application])]
        : current.filter((a) => a !== application),
    );

  const search = (value: string) => {
    setQuery(value);
    const next = value.trim().toLowerCase();
    if (!next) {
      setOpenGroups([]);
      return;
    }
    const matching = groups
      .filter((group) => matches(group, next).length > 0)
      .map((group) => group.application);
    setOpenGroups((current) => [...new Set([...current, ...matching])]);
  };

  return (
    <div className="flex flex-col gap-4">
      {selected.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="px-1 text-xs tracking-wide text-muted uppercase">
            Selected ({selected.length})
          </p>
          <ul aria-label="Selected scopes" className="flex flex-wrap gap-2">
            {selected.map((value) => (
              <li
                key={value}
                className="flex max-w-full items-center gap-1 rounded-full bg-brand/15 py-1 pr-1 pl-3 text-brand"
              >
                <code className="truncate text-xs">{value}</code>
                <button
                  type="button"
                  aria-label={`Remove ${value}`}
                  onClick={() => toggleScope(value)}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-brand/20 hover:text-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xs" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 rounded-2xl bg-foreground/5 px-5 py-3 transition-shadow focus-within:ring-2 focus-within:ring-brand/50">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-muted" />
          <label htmlFor={searchId} className="sr-only">
            Search scopes
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => search(e.target.value)}
            placeholder="Search scopes or applications"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted"
          />
        </div>
        <p aria-live="polite" className="px-1 text-xs text-muted">
          {visibleCount} {visibleCount === 1 ? "scope" : "scopes"}
          {needle ? " found" : " available"}
        </p>
      </div>

      {visibleGroups.length > 0 ? (
        <ul className="rounded-3xl bg-foreground/[0.03] p-2">
          {visibleGroups.map((group) => {
            const total = groups.find(
              (g) => g.application === group.application,
            )?.scopes;
            const selectedCount =
              total?.filter((scope) => selected.includes(scope.value)).length ??
              0;
            return (
              <li
                key={group.application}
                className="border-t border-foreground/10 first:border-t-0"
              >
                <details
                  open={openGroups.includes(group.application)}
                  onToggle={(e) =>
                    setGroupOpen(group.application, e.currentTarget.open)
                  }
                  className="group"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-4 py-4 transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
                    <span className="font-medium">{group.application}</span>
                    <span className="flex items-center gap-3">
                      <span
                        className={`text-xs ${
                          selectedCount > 0 ? "text-brand" : "text-muted"
                        }`}
                      >
                        {selectedCount} of {total?.length ?? 0} selected
                      </span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-xs text-muted transition-transform group-open:rotate-180"
                      />
                    </span>
                  </summary>
                  <fieldset className="pb-2">
                    <legend className="sr-only">
                      {group.application} scopes
                    </legend>
                    <ul>
                      {group.scopes.map((scope) => (
                        <li
                          key={scope.value}
                          className="border-t border-foreground/5 first:border-t-0"
                        >
                          <Checkbox
                            label={
                              <code className="text-sm break-all">
                                {scope.value}
                              </code>
                            }
                            description={scope.description}
                            checked={selected.includes(scope.value)}
                            onChange={() => toggleScope(scope.value)}
                          />
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                </details>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState>No scopes match “{query.trim()}”.</EmptyState>
      )}

      {selected.map((value) => (
        <input key={value} type="hidden" name={name} value={value} />
      ))}
    </div>
  );
}
