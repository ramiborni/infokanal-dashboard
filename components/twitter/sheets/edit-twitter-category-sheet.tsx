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

interface EditTwitterCategorySheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  twitterSettings: TwitterScrapperConfig;
  currentCategoryName: string;
  updateTwitterSettings: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}

const formSchema = z.object({
  category_name: z.string(),
  page_title: z.string(),
  page_title_horizontal: z.string(),
  keywords: z.array(z.object({
    id: z.string(),
    text: z.string()
  })),
  negative_keywords: z.array(z.object({
    id: z.string(),
    text: z.string()
  }))
});

const EditTwitterCategorySheet = ({
                                    open,
                                    setOpen,
                                    twitterSettings,
                                    currentCategoryName,
                                    updateTwitterSettings
                                  }: EditTwitterCategorySheetProps) => {
  const currentCategory = twitterSettings.categories.find(c => c.category_name === currentCategoryName);

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category_name: "",
      page_title: "",
      page_title_horizontal: "",
      keywords: [],
      negative_keywords: []
    }
  });

  useEffect(() => {
    const currentKeywords = currentCategory?.keywords.map((k) => ({
      id: uuid(),
      text: k
    }));

    const currentNegativeKeywords = currentCategory?.negative_keywords.map((k) => ({
      id: uuid(),
      text: k
    }));

    form.setValue("category_name", currentCategoryName);
    form.setValue("page_title", currentCategory?.page_title!);
    form.setValue("page_title_horizontal", currentCategory?.page_title_horizontal!);
    form.setValue("keywords", currentKeywords!);
    form.setValue("negative_keywords", currentNegativeKeywords!);

  }, [currentCategory]);

  async function onSubmit(values: z.infer<typeof formSchema>) {



    const filteredResult = {
      ...values,
      keywords: values.keywords.map(k => k.text),
      negative_keywords: values.negative_keywords.map(k => k.text)
    };

    const updatedCategories = twitterSettings.categories.map(obj => {
      if (obj.category_name === currentCategoryName) {
        return { ...filteredResult };
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
        description: "Rss Category has been added."
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
            <SheetTitle>Edit Rss Category ({currentCategoryName})</SheetTitle>
            <SheetDescription>
              To add a new category to the settings, please enter the category's name. Additionally, provide a title to
              be
              displayed in the vertical iframe, a horizontal title for the horizontal iframe, and specify keywords for
              the
              scrapper to selectively choose from.
            </SheetDescription>
          </SheetHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-8">
                <FormField
                  control={form.control}
                  name="category_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input  {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="page_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title (Vertical)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="page_title_horizontal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title (Horizontal)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="negative_keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Keywords inputTitle={"Negative Keywords"} inputName={"negative_keywords"} inputPlaceholder={""}
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

export default EditTwitterCategorySheet;