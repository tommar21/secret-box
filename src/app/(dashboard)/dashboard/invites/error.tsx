"use client";

import { Button } from "@/components/ui/button";

export default function InvitesError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-sm text-muted-foreground">Failed to load invitations.</p>
      <Button variant="outline" size="sm" className="mt-4" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
