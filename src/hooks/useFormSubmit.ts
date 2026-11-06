"use client";

import { useCallback, useState } from "react";

const GENERIC_ERROR = "Something went wrong. Please try again.";

export function useFormSubmit(endpoint: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Call when the form's modal closes so a stale error isn't shown on reopen.
  const reset = useCallback(() => setError(null), []);

  const submit = async (data: Record<string, string>) => {
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
        setError("Too many messages in a short time. Please try again in a few minutes.");
        return false;
      }
      if (res.status === 413) {
        setError("Your message is too long.");
        return false;
      }
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        setError(json?.error || GENERIC_ERROR);
        return false;
      }
      return true;
    } catch {
      setError(GENERIC_ERROR);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, isSubmitting, error, reset };
}
