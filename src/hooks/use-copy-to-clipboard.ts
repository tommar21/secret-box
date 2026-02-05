"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";

/**
 * Hook for copying text to clipboard with visual feedback.
 */
export function useCopyToClipboard(resetDelay = 2000) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    (text: string, id: string) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopiedId(id);
          toast.success("Copied to clipboard");
          timeoutRef.current = setTimeout(() => setCopiedId(null), resetDelay);
        })
        .catch(() => toast.error("Failed to copy to clipboard"));
    },
    [resetDelay]
  );

  const isCopied = useCallback((id: string) => copiedId === id, [copiedId]);

  return {
    copiedId,
    copy,
    isCopied,
  };
}
