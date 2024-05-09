"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CogIcon } from "lucide-react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Keywords from "@/components/modules/keywords";
import { useEffect, useState } from "react";
import { Tag } from "@/components/ui/tag-input";
import { useToast } from "@/components/ui/use-toast";
import { ExtendedModule, Source } from "@/types/module";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import SpinnerLoader from "@/components/ui/spinner-loader";
import ModuleCard from "@/components/modules/module-card";
import { v4 as uuid } from "uuid";
import ModuleSettingsKeywordsCard from "@/components/modules/module-settings/module-settings-keywords-card";
import ModuleSettingsSourcesCard from "@/components/modules/module-settings/module-settings-sources-card";
import { isNil } from "ramda";

const SettingsPage = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();

  const id = params.id;

  const [keywords, setKeywords] = useState<Tag[]>([]);
  const [negativeKeywords, setNegativeKeywords] = useState<Tag[]>([]);

  const [sources, setSources] = useState<Source[]>([]);

  const [module, setModule] = useState<ExtendedModule>();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    const getModules = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(API_URL + "/feed/modules/" + id + "/");
        const currentModule: ExtendedModule = res.data;

        setModule(currentModule);

        console.log(currentModule);

        if (!isNil(currentModule.rss_sources) && !isNil(currentModule.rss_sources)) {
          if (currentModule.rss_sources.sources.length > 0)
            setSources(currentModule.rss_sources.sources);
        }

        if (!isNil(currentModule?.settings) && !isNil(currentModule?.settings.keywords)) {
          if (currentModule?.settings.keywords.length! > 0)
            setKeywords(currentModule?.settings.keywords.map(
              k => {
                return ({
                  "id": uuid(),
                  "text": k
                } as Tag);
              }
            )!);
        }

        if (currentModule?.settings.negative_keywords.length! > 0) {
          setNegativeKeywords(currentModule?.settings.negative_keywords.map(
            k => {
              return ({
                "id": uuid(),
                "text": k
              } as Tag);
            }
          )!);
        }

      } catch (e) {
        console.error(e);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Couldn't fetch Modules, please reload the page."
        });
      } finally {
        setIsLoading(false);
      }
    };

    getModules().then();
  }, []);

  const ModuleHeader = () => {
    return (
      <div className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex-grow">
          <div className="flex flex-col mx-auto flex-1">
            <div className="flex flex-row gap-x-8">
              <h2 className="text-3xl font-bold tracking-tight flex-1">
                Edit Module
              </h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={"/dashboard/modules/" + id}>
                      <Button color="primary" variant="default" size="icon">
                        <ArrowLeftIcon />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Back to Module Page</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground">{module?.name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {
        isLoading ? <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <SpinnerLoader></SpinnerLoader></div> : <ScrollArea className="h-full">
          <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="w-full flex-col items-center justify-between space-y-8">
              <ModuleHeader />
              <ModuleSettingsSourcesCard sources={sources}
                                         setSources={setSources}
                                         slang={id}
              />
              <ModuleSettingsKeywordsCard keywords={keywords}
                                          setKeywords={setKeywords}
                                          negativeKeywords={negativeKeywords}
                                          setNegativeKeywords={setNegativeKeywords}
                                          slang={id}
              />

            </div>
          </div>
        </ScrollArea>
      }
    </>
  );
};

export default SettingsPage;