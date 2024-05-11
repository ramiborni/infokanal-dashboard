import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import { useRouter } from "next/navigation";

interface DeleteModuleDialogProps {
  id: string,
  open: boolean,
  setOpen: any
}

export function DeleteModuleDialog({ id, open, setOpen }: DeleteModuleDialogProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const deleteModule = async () => {
    let isSucessful = false;
    try {
      setLoading(true);
      await axios.delete(API_URL + "/feed/modules/" + id + "/");
      router.push("/dashboard/modules/")
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      if (isSucessful)
        setOpen(false);
    }
  };

  const closeDialog = () => {
    setOpen(false);
  }

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Remove Module</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this module?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button onClick={closeDialog} disabled={loading} type="button" variant="outline">
            Close
          </Button>
          <Button onClick={deleteModule} disabled={loading} type="button" variant="outline"
                  className="hover:border-red-500 border-red-500 hover:text-red-500 text-red-500 hover:bg-red-100">
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
