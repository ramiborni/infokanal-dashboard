import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../../ui/form";
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import { useToast } from "@/components/ui/use-toast";
import Keywords from "@/components/modules/keywords";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddModuleDialogProps {
  open: boolean;
  setOpen: any;
  setOpenThirdStepDialog: any;
  moduleName: string;
}

const formSchema = z.object({
  keywords: z.array(
    z.object({
      id: z.string(),
      text: z.string()
    })
  ),
  negativeKeywords: z.array(
    z.object({
      id: z.string(),
      text: z.string()
    })
  )
});

const AddModuleKeywordsDialog = ({ open, setOpen, moduleName, setOpenThirdStepDialog }: AddModuleDialogProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: [],
      negativeKeywords: []
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const data = {
        "keywords": values.keywords.map(k => k.text),
        "negative_keywords": values.negativeKeywords.map(k => k.text),
        "manual_convert": false
      };
      const res = await axios.post(`${API_URL}/feed/modules/${moduleName}/settings/`, data);
      setOpen(false);
      setOpenThirdStepDialog(true);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request."
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    await form.handleSubmit(onSubmit)(e);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:min-w-[600px]">
          <ScrollArea className="rounded-md h-[calc(80vh-220px)] px-2">
            <DialogHeader>
              <DialogTitle>Add Keywords to Module ({moduleName})</DialogTitle>
              <DialogDescription>
                Add Module and create a specific RSS Feed
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={handleSubmit} className="max-w-full">
                <div className="w-full flex flex-col gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Keywords inputTitle={"Keywords"} inputName={"keywords"} inputPlaceholder={""}

                                    tags={field.value}
                                    setTags={field.onChange} {...field}
                          />
                        </FormControl>
                        <FormDescription>Name of the module</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="negativeKeywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Keywords inputTitle={"Negative Keywords"} inputName={"negativeKeywords"}
                                    inputPlaceholder={""} tags={field.value}
                                    setTags={field.onChange} {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col py-4">
                  <Button disabled={isLoading} type="submit">Submit</Button>
                </div>
              </form>
            </Form>
          </ScrollArea>

        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddModuleKeywordsDialog;
