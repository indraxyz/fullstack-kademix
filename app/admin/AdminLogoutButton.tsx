"use client";

import { useRef, useState } from "react";
import { logout } from "@/app/src/features/auth/actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

interface AdminLogoutButtonProps {
  onTriggerClick?: () => void;
  showLabel?: boolean;
  alwaysShowLabel?: boolean;
}

export function AdminLogoutButton({
  onTriggerClick,
  showLabel = true,
  alwaysShowLabel = false,
}: AdminLogoutButtonProps = {}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleConfirm = () => {
    setOpen(false);
    formRef.current?.requestSubmit();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <form ref={formRef} action={logout} className="hidden" />
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="default"
          className="gap-2"
          onClick={() => onTriggerClick?.()}
        >
          <LogOut className="h-4 w-4" />
          {showLabel && (
            <span className={alwaysShowLabel ? "" : "hidden sm:inline"}>
              Logout
            </span>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Log out?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to access the admin area.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} type="button">
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
