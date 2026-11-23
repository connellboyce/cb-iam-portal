"use client";

import { useEffect } from "react";

// setTimeout overflows past this many milliseconds (~24.8 days)
const MAX_DELAY = 2 ** 31 - 1;

interface SessionExpiryProps {
  /** Milliseconds since the epoch */
  expiresAt: number;
}

// Reloads the page once the session expires, so the proxy can send the user
// back through sign-in instead of leaving a dead session on screen
export default function SessionExpiry({ expiresAt }: SessionExpiryProps) {
  useEffect(() => {
    const delay = Math.min(Math.max(expiresAt - Date.now(), 0), MAX_DELAY);
    const timer = setTimeout(() => window.location.reload(), delay);
    return () => clearTimeout(timer);
  }, [expiresAt]);

  return null;
}
