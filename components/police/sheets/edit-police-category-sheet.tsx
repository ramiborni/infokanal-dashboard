import {
  Sheet, SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { TwitterScrapperConfig } from "@/types/twitter-config";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Tag } from "@/components/ui/tag-input";
import Keywords from "@/components/modules/keywords";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuid } from "uuid";
import { ScrollArea } from "@/components/ui/scroll-area";
import SpinnerLoader from "@/components/ui/spinner-loader";

interface EditPoliceCategorySheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  twitterSettings: TwitterScrapperConfig;
  currentCategoryName: string;
  updateTwitterSettings: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}

const formSchema = z.object({
  police_municipalities: z.array(z.object({
    id: z.string(),
    text: z.string()
  }))
});

const EditPoliceCategorySheet = ({
                                    open,
                                    setOpen,
                                    twitterSettings,
                                    currentCategoryName,
                                    updateTwitterSettings
                                  }: EditPoliceCategorySheetProps) => {
  const currentCategory = twitterSettings.categories.find(c => c.category_name === currentCategoryName);

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      police_municipalities: []
    }
  });

  useEffect(() => {
    const currentMunicipalities = currentCategory?.police_municipalities.map((k) => ({
      id: uuid(),
      text: k
    }));

    form.setValue("police_municipalities", currentMunicipalities!);

  }, [currentCategory]);

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const filteredResult = {
      police_municipalities: values.police_municipalities.map(k => k.text)
    };

    const updatedCategories = twitterSettings.categories.map(obj => {
      if (obj.category_name === currentCategoryName) {
        return { ...obj ,...filteredResult };
      }
      return obj;
    });

    const updatedConfig = {
      ...twitterSettings,
      categories: updatedCategories
    };



    try {
      setIsLoading(true);
      const res = await axios.post("https://api.infokanal.com/update-config", updatedConfig);
      updateTwitterSettings(updatedConfig);
      toast({
        variant: "default",
        title: "Updated!",
        description: "Rss Category has been updated."
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="min-w-full lg:min-w-[600px] text-start">
        <ScrollArea className="h-full px-4 mt-2">
          <SheetHeader>
            <SheetTitle>Edit Police News Scrapper ({currentCategoryName})</SheetTitle>

          </SheetHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-8">
                <FormField
                  control={form.control}
                  name="police_municipalities"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Keywords inputTitle={"Police Municipalities"} inputName={"police_municipalities"} inputPlaceholder={""}
                                  tags={field.value}
                                  setTags={field.onChange} {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SheetFooter className="pt-6">
                  <Button type="submit">
                    {
                      isLoading ? <SpinnerLoader /> : <>Save changes</>
                    }
                  </Button>
                </SheetFooter>
              </form>
            </Form>

          </div>
        </ScrollArea>

      </SheetContent>

    </Sheet>
  );
};

export default EditPoliceCategorySheet;