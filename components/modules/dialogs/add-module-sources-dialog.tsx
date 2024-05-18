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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlertTriangle, CrossIcon, PlusCircle, XIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AddModuleSourcesDialogProps {
  open: boolean;
  setOpen: any;
  moduleName: string;
  retrieveModules: any;
}

const formSchema = z.object({
  sources: z.object({
    rssName: z.string(),
    rssLink: z.string(),
    scrapeWebsite: z.boolean().default(false),
    isMembership: z.boolean().default(false),
    require_keywords_verification: z.boolean().default(true)

  }).array()
});

const AddModuleSourcesDialog = ({ open, setOpen, moduleName, retrieveModules }: AddModuleSourcesDialogProps) => {

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [sources, setSources] = useState(formSchema.parse({
    sources: []
  }).sources);


  async function saveSources() {
    try {
      setIsLoading(true);

      const data = {
        "sources": sources.map((s) => ({
          "source_name": s.rssName,
          "source_url": s.rssLink,
          "require_login": s.isMembership,
          "summarize_from_rss_feed": s.scrapeWebsite,
          "require_keywords_verification": s.require_keywords_verification
        }))
      };

      const res = await axios.post(`${API_URL}/feed/modules/${moduleName}/sources/`, data);
      setOpen(false);
      retrieveModules();
      toast({
        title: "Module has been added!",
        description: "A module has been added successfully"
      });
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


  const addLocalSource = () => {
    setSources([...sources, {
      rssName: "",
      rssLink: "",
      isMembership: false,
      scrapeWebsite: false,
      require_keywords_verification: false,
    }]);
  };

  const removeSource = (index: number) => {
    const newSources = [...sources]; // create a copy of the sources array
    newSources.splice(index, 1); // remove the item at the specified index
    setSources(newSources); // update the state with the new array
  };

  const updateSources = (event: any, index: number) => {
    const { name, value } = event.target;

    // Make a copy of the sources array
    const newSources = [...sources];

    // Update the object at the specified index with updatedSource
    newSources[index] = { ...newSources[index], [name]: value };

    // Update the state with the new array
    setSources(newSources);


  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="min-w-[800px] w-[800px]">
          <DialogHeader>
            <DialogTitle>Add Sources to Module ({moduleName})</DialogTitle>
            <DialogDescription>
              Add Sources to let the scrapper use them
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex flex-col gap-4 py-4">
            <Alert className="border-yellow-500/70 text-yellow-500 dark:yellow-500 [&>svg]:text-yellow-500">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                <ul className="flex flex-col gap-y-1">
                  <li>• Scrape from Website when it is OFF, it will collect news from RSS body only and it will not
                    scrape from the news page mention in the rss feed.
                  </li>
                  <li>• Require login, should be set ON when the website needs some of payment or membership to access
                    to the web page.
                    to add a website that require login you must contact the developer to add.
                  </li>

                </ul>
              </AlertDescription>
            </Alert>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Rss Name</TableHead>
                  <TableHead className="">Rss Link</TableHead>
                  <TableHead className="w-[120px]">Scrape from Website</TableHead>
                  <TableHead className="w-[120px]">Require Login</TableHead>
                  <TableHead className="w-[40px]">Verify Keywords</TableHead>
                  <TableHead className="w-[30px]">Actions</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  sources.map((s, index) => (<TableRow key={index}>
                      <TableCell className="font-semibold">
                        <Input onChange={(e) => updateSources(e, index)} value={s.rssName} name="rssName" />
                      </TableCell>

                      <TableCell className="font-semibold">
                        <Input onChange={(e) => updateSources(e, index)} value={s.rssLink} name="rssLink" />
                      </TableCell>

                      <TableCell>
                        <Switch checked={s.scrapeWebsite}
                                onCheckedChange={(e) => updateSources({
                                  target: {
                                    "name": "scrapeWebsite",
                                    "value": e
                                  }
                                }, index)} />
                      </TableCell>

                      <TableCell>
                        <Switch checked={s.isMembership}
                                onCheckedChange={(e) => updateSources({
                                  target: {
                                    "name": "isMembership",
                                    "value": e
                                  }
                                }, index)} />
                      </TableCell>

                      <TableCell>
                        <Switch checked={s.require_keywords_verification}
                                onCheckedChange={(e) => updateSources({
                                  target: {
                                    "name": "require_keywords_verification",
                                    "value": e
                                  }
                                }, index)} />
                      </TableCell>


                      <TableCell>
                        <Button onClick={() => removeSource(index)} variant="ghost" size="icon">
                          <XIcon className="text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
            <Button onClick={addLocalSource} size="sm" variant="ghost" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Source
            </Button>
          </div>
          <div className="flex flex-col py-4">
            <Button disabled={isLoading} onClick={saveSources}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddModuleSourcesDialog;
