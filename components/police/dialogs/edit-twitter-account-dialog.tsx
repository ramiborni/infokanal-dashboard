"use client";

import { TwitterScrapperConfig } from "@/types/twitter-config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SpinnerLoader from "@/components/ui/spinner-loader";
import { useToast } from "@/components/ui/use-toast";

interface EditTwitterAccountDialogProps {
  open: boolean;
  setOpen: any;
  twitterName: string;
  twitterSettings: TwitterScrapperConfig;
  updateTwitterSettings: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}

const formSchema = z.object({
  username: z.string(),
  prefix: z.string(),
  suffix: z.string()
});

const EditTwitterAccountDialog = ({
                                    open,
                                    setOpen,
                                    twitterName,
                                    twitterSettings,
                                    updateTwitterSettings
                                  }: EditTwitterAccountDialogProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentTwitterAccount = twitterSettings.twitter_accounts.find((t) => t.username === twitterName)!;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      prefix: "",
      suffix: ""
    }
  });

  useEffect(() => {
    if(currentTwitterAccount){
      form.setValue("username", currentTwitterAccount.username);
      form.setValue("prefix", currentTwitterAccount.prefix);
      form.setValue("suffix", currentTwitterAccount.suffix);
    }
  }, [currentTwitterAccount]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedtwitterAccounts = twitterSettings.twitter_accounts.map(obj => {
      if (obj.username === twitterName) {
        return { ...values };
      }
      return obj;
    });
    const updatedConfig = {
      ...twitterSettings,
      twitter_accounts: updatedtwitterAccounts
    };
    try {
      setIsLoading(true);
      const res = await axios.post("https://api.infokanal.com/update-config", updatedConfig);
      updateTwitterSettings(updatedConfig);
      toast({
        variant: "default",
        title: "Updated!",
        description: "Twitter Account has been updated."
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

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Twitter Account ({twitterName})</DialogTitle>
            <DialogDescription>
              Make changes to a twitter source. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="elonmusk" {...field} />
                    </FormControl>
                    <FormDescription>
                      Scrapper will use the username as a source to retrieve tweets
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="prefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prefix</FormLabel>
                    <FormControl>
                      <Input placeholder="Elon Musk: " {...field} />
                    </FormControl>
                    <FormDescription>
                      Prefix will be written in the start of every retrieved news
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="suffix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suffix</FormLabel>
                    <FormControl>
                      <Input placeholder="(From Elon Musk) " {...field} />
                    </FormControl>
                    <FormDescription>
                      Suffix will be written in the end of every retrieved news
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="py-4">
                <Button disabled={isLoading} type="submit">
                  {
                    isLoading ? <SpinnerLoader /> : <>Save changes</>
                  }
                </Button>
              </DialogFooter>
            </form>
          </Form>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditTwitterAccountDialog;