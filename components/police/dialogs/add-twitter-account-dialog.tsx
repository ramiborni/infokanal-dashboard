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

interface AddTwitterAccountDialogProps {
  open: boolean;
  setOpen: any;
  twitterSettings: TwitterScrapperConfig;
  updateTwitterSettings: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}

const formSchema = z.object({
  username:  z.string(),
  prefix:  z.string(),
  suffix:  z.string(),

});

const AddTwitterAccountDialog = ({
                                   open,
                                   setOpen,
                                   twitterSettings,
                                   updateTwitterSettings
                                 }: AddTwitterAccountDialogProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      prefix: "",
      suffix: ""
    }
  });


  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {


    try {
      setIsLoading(true);
      const res = await axios.post("https://api.infokanal.com/update-config", twitterSettings);
      updateTwitterSettings(twitterSettings);
      toast({
        variant: "default",
        title: "Updated!",
        description: "Twitter Account has been added."
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
            <DialogTitle>Add New Twitter Account</DialogTitle>
            <DialogDescription>
              Add a new twitter source for the scrapper. Click save when you're done.
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
                <Button type="submit">
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

export default AddTwitterAccountDialog;