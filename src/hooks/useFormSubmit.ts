"use client";

import { useCallback, useRef, useState } from "react";

const GENERIC_ERROR = "Something went wrong. Please try again.";

export function useFormSubmit(endpoint: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Bumped by reset() and by each submit, so a response that arrives after
  // the form was closed (or re-submitted) is ignored instead of leaving a
  // stale error behind.
  const generation = useRef(0);

  // Call when the form's modal closes.
  const reset = useCallback(() => {
    generation.current++;
    setError(null);
    setIsSubmitting(false);
  }, []);

  const submit = async (data: Record<string, string>) => {
    const gen = ++generation.current;
    const current = () => generation.current === gen;
    const fail = (message: string) => {
      if (current()) setError(message);
      return false;
    };

    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      // nginx answers these itself, with HTML rather than JSON.
      if (res.status === 429) {
        return fail("Too many messages in a short time. Please try again in a few minutes.");
      }
      if (res.status === 413) {
        return fail("Your message is too long.");
      }
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        return fail(json?.error || GENERIC_ERROR);
      }
      return current();
    } catch {
      return fail(GENERIC_ERROR);
    } finally {
      if (current()) setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error, reset };
}
