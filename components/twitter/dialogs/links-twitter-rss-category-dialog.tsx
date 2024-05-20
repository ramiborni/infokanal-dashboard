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
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";

interface LinksTwitterRssCategoryDialogProps {
  open: boolean,
  setOpen: any,
  categoryName: string,
  twitterSettings: TwitterScrapperConfig
  updateTwitterSettings: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}

const LinksTwitterRssCategoryDialog = ({
                                    open, setOpen, categoryName, twitterSettings, updateTwitterSettings
                                  }: LinksTwitterRssCategoryDialogProps) => {


  const cancel = () => {
    setOpen(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rss {categoryName} Links</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="flex flex-col gap-y-4">
              <a href={`https://www.infokanal.com/admin/${categoryName}.html`} target="_blank">
                <Button>
                  Rss {categoryName} vertical page
                </Button>
              </a>
              <a href={`https://www.infokanal.com/admin/${categoryName}_horizontal.html`} target="_blank">
                <Button>
                  Rss {categoryName} horizontal page
                </Button>
              </a>
              <a href={`https://www.infokanal.com/${categoryName}_rss.xml`} target="_blank">
                <Button>
                  Rss {categoryName} feed
                </Button>
              </a>
            </div>
          </DialogBody>
          <DialogFooter>

            <Button onClick={cancel} variant="outline">Cancel</Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LinksTwitterRssCategoryDialog;