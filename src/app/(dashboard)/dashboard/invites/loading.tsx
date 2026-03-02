import { Skeleton } from "@/components/ui/skeleton";
import { Bell } from "lucide-react";

export default function InvitesLoading() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Bell className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Invitations</h1>
          <Skeleton className="mt-1 h-4 w-48" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
