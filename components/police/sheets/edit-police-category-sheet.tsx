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
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { PoliceMunicipalities } from "@/constants/police-municipalities";

interface EditPoliceCategorySheetProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  twitterSettings: TwitterScrapperConfig;
  currentCategoryName: string;
  updateTwitterSettings: React.Dispatch<React.SetStateAction<TwitterScrapperConfig | undefined>>;
}

const formSchema = z.object({
  police_municipalities: z.array(z.object(
    {
      value: z.string(),
      label: z.string(),
      group: z.string(),
    }
  ))
});


const OPTIONS: Option[] = [];

PoliceMunicipalities.forEach(municipality => {
  municipality.cities.forEach(city => {
    OPTIONS.push({ label: city, value: city, group: municipality.county });
  });
});


const EditPoliceCategorySheet = ({
                                   open,
                                   setOpen,
                                   twitterSettings,
                                   currentCategoryName,
                                   updateTwitterSettings
                                 }: EditPoliceCategorySheetProps) => {
  const [selected, setSelected] = useState<string[]>([]);

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

    // @ts-ignore
    return form.setValue("police_municipalities", currentCategory?.police_municipalities?.map(
      (p) => ({
        "label": p,
        "value": p,
        "group": OPTIONS.find(o => o.value === p)?.group
      })
    ));

  }, [currentCategory]);

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const filteredResult = {
      police_municipalities: values.police_municipalities.map((p) => p.value),
    };

    const updatedCategories = twitterSettings.categories.map(obj => {
      if (obj.category_name === currentCategoryName) {
        return { ...obj, ...filteredResult };
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="police_municipalities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Municipalities</FormLabel>
                      <FormControl>
                        <MultipleSelector
                          {...field}
                          defaultOptions={OPTIONS}
                          placeholder="Select municipalities you want for setting the scrapper.."
                          emptyIndicator={
                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                              no results found.
                            </p>
                          }
                          groupBy="group"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} type="submit">
                  Submit
                </Button>
              </form>
            </Form>

          </div>
        </ScrollArea>

      </SheetContent>

    </Sheet>
  );
};

export default EditPoliceCategorySheet;