import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Keywords from "@/components/modules/keywords";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag-input";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { Source } from "@/types/module";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, PlusCircle, XIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface ModuleSettingsSourcesCardProps {
  slang: string;
  sources: Source[],
  setSources: Dispatch<SetStateAction<Source[]>>
}

const formSchema = z.object({
  sources: z.object({
    source_name: z.string(),
    source_url: z.string(),
    require_login: z.boolean().default(false),
    summarize_from_rss_feed: z.boolean().default(false),
    require_keywords_verification: z.boolean().default(true)
  }).array()
});

const ModuleSettingsSourcesCard = ({ slang, sources, setSources }: ModuleSettingsSourcesCardProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);


  const addLocalSource = () => {
    setSources([...sources, {
      source_name: "",
      source_url: "",
      require_login: false,
      summarize_from_rss_feed: false,
      require_keywords_verification: true,
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

  const saveData = async () => {
    if (sources.length > 0) {
      return await updateData();
    }
    try {
      setIsLoading(true);

      const data = {
        "sources": sources.map((s) => ({
          "source_name": s.source_name,
          "source_url": s.source_url,
          "require_login": s.require_login,
          "summarize_from_rss_feed": s.summarize_from_rss_feed,
          "require_keywords_verification": s.require_keywords_verification
        }))
      };

      const res = await axios.post(`${API_URL}/feed/modules/${slang}/sources/`, data);
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
  };

  const updateData = async () => {
    try {
      setIsLoading(true);

      const data = {
        "sources": sources.map((s) => ({
          "source_name": s.source_name,
          "source_url": s.source_url,
          "require_login": s.require_login,
          "summarize_from_rss_feed": s.summarize_from_rss_feed,
          "require_keywords_verification": s.require_keywords_verification
        }))
      };

      const res = await axios.put(`${API_URL}/feed/modules/${slang}/sources/`, data);
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
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Sources
        </CardTitle>
        <CardDescription>
          Update scrapper sources to be used by AI to fetch the right news for you
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
          <Alert className="border-yellow-500/70 text-yellow-500 dark:yellow-500 [&>svg]:text-yellow-500">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              <ul className="flex flex-col gap-y-1">
                <li>• Scrape from Website when it is OFF, it will collect news from RSS body only and it will not
                  scrape from the news page mention in the rss feed.
                </li>
                <li>• Require login, should be set ON when the website needs some of payment or membership to access to
                  the web page.
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
                sources.map((s, index) => (<TableRow>
                    <TableCell className="font-semibold">
                      <Input onChange={(e) => updateSources(e, index)} value={s.source_name} name="source_name" />
                    </TableCell>
                    <TableCell className="font-semibold">
                      <Input onChange={(e) => updateSources(e, index)} value={s.source_url} name="source_url" />
                    </TableCell>
                    <TableCell>
                      <Switch checked={s.summarize_from_rss_feed}
                              onCheckedChange={(e) => updateSources({
                                target: {
                                  "name": "summarize_from_rss_feed",
                                  "value": e
                                }
                              }, index)} />
                    </TableCell>
                    <TableCell>
                      <Switch checked={s.require_login}
                              onCheckedChange={(e) => updateSources({
                                target: {
                                  "name": "require_login",
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
          <Button disabled={isLoading} onClick={addLocalSource} size="sm" variant="ghost" className="gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            Add Source
          </Button>
        </div>
        <div className="flex flex-row justify-end">
          <Button disabled={isLoading} onClick={saveData}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleSettingsSourcesCard;