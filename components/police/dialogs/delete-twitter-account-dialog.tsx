import { TwitterScrapperConfig } from "@/types/twitter-config";
import {
  Dialog,
  DialogContent,
  DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import SpinnerLoader from "@/components/ui/spinner-loader";

interface DeleteTwitterAccountDialogProps {
  open: boolean,
  setOpen: any,
  twitterName: string,
  twitterSettings: TwitterScrapperConfig
  updateTwitterSettings: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}

const DeleteTwitterAccountDialog = ({
                                    open, setOpen, twitterName, twitterSettings, updateTwitterSettings
                                  }: DeleteTwitterAccountDialogProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteAccount = async () => {
    const accountIndex = twitterSettings.twitter_accounts.findIndex(t => t.username === twitterName);
    twitterSettings.twitter_accounts.splice(accountIndex, 1);

    const updatedConfig = {
      ...twitterSettings,
      twitter_accounts: twitterSettings.twitter_accounts
    };

    try {
      setIsLoading(true);
      const res = await axios.post("https://api.infokanal.com/update-config", updatedConfig);
      updateTwitterSettings(updatedConfig);

      toast({
        variant: "default",
        title: "Deleted!",
        description: "Twitter Account has been deleted."
      });

    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request."
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  }

  const cancel = () => {
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Twitter Account Source?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this twitter account ({twitterName})?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button disabled={isLoading} onClick={deleteAccount} variant="destructive">
              {
                isLoading ? <SpinnerLoader /> : <>Delete</>
              }

            </Button>
            <Button disabled={isLoading} onClick={cancel} variant="outline">Cancel</Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteTwitterAccountDialog;