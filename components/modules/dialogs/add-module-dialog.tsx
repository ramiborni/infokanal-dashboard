import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
  FormMessage,
} from "../../ui/form";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import { useToast } from "@/components/ui/use-toast";

interface AddModuleDialogProps {
  open: boolean;
  setOpen: any;
  setOpenSecondStepDialog: any;
  setNewModule: any;
}

const formSchema = z.object({
  name: z.string().min(2),
  rssName: z.string().min(2),
});

const AddModuleDialog = ({ open, setOpen, setOpenSecondStepDialog, setNewModule }: AddModuleDialogProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rssName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try{
        setIsLoading(true);
        const data = {
          name: values.name,
          "slang": values.rssName
        }
        const res = await axios.post(`${API_URL}/feed/modules/`, data);
        setNewModule(data);
        setOpen(false);
        setOpenSecondStepDialog(true);
    }catch(e){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request."
      });
    }finally{
        setIsLoading(false);
    }
  }

  async function handleSubmit(e:any){
    e.preventDefault();
    await form.handleSubmit(onSubmit)(e);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Module</DialogTitle>
            <DialogDescription>
              Add Module and create a specific RSS Feed
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col gap-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tech news, my city news, ... etc"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Name of the module</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rssName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rss name</FormLabel>
                      <FormControl>
                        <Input placeholder="tech-news" {...field} />
                      </FormControl>
                      <FormDescription>
                        It will be as the following:
                        https://services.infokanal.com/feed/rss/
                        {form.getValues().rssName}
                      </FormDescription>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddModuleDialog;
