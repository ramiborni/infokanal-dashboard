import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { TwitterScrapperConfig } from "@/types/twitter-config";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import SpinnerLoader from "@/components/ui/spinner-loader";

const formSchema = z.object({
  within_time: z.string(),
  show_items: z.coerce.number()
})
interface GeneralSettingsCardProps{
  twitterConfig?: TwitterScrapperConfig
}

const GeneralSettingsCard = ({twitterConfig} : GeneralSettingsCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      within_time: twitterConfig?.within_time || "",
      show_items: twitterConfig?.show_items || 0
    },
  });

  async function  onSubmit(values: z.infer<typeof formSchema>) {
    try{
      setIsLoading(true);
      const res = await axios.post<TwitterScrapperConfig>(
        "https://api.infokanal.com/update-config", {
          ...twitterConfig,
          show_items: values.show_items,
          within_time: values.within_time,
        }
      );
      toast({
        variant: "default",
        title: "Updated!",
        description: "Twitter Settings has been updated.",
      })
    }catch(e){
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <Card className="col-span-6 lg:col-span-3">
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="within_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scrapper Within Time *</FormLabel>
                  <FormControl>
                    <Input placeholder="10h, 1h, ... etc" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="show_items"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scrapper Within Time *</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Setting this field to 0 will disable it in the scraper. If you set a different number, it will establish a priority for this field, causing the scraper to disregard the 'Within Time' parameter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end">
              <Button type="submit">
                {
                  isLoading ? <SpinnerLoader/> : "Submit"
                }
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default GeneralSettingsCard;
