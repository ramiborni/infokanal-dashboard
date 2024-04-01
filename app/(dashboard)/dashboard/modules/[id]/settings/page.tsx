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
import { useState } from "react";
import { Tag } from "@/components/ui/tag-input";

const SettingsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [keywords, setKeywords] = useState<Tag[]>([]);
  const [negativeLKeywords, setNegativeKeywords] = useState<Tag[]>([]);

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
            <p className="text-muted-foreground">{id}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="w-full flex-col items-center justify-between space-y-8">
            <ModuleHeader />
            <Card>
              <CardHeader>
                <CardTitle>
                  Keywords
                </CardTitle>
                <CardDescription>
                  Update keywords and negative keywords to help AI providing the right news for you
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-8">
                <div className="flex flex-col gap-y-2">
                  <Keywords inputName="keywords"
                            inputTitle="Keywords"
                            inputPlaceholder="Keywords thats AI use to filter news"
                            setTags={setKeywords}
                            tags={keywords}
                  />
                  <Keywords inputName="negativeKeywords"
                            inputTitle="Negative Keywords"
                            inputPlaceholder="Negative Keywords thats AI use to filter news"
                            setTags={setNegativeKeywords}
                            tags={negativeLKeywords}
                  />
                </div>
                <div className="flex flex-row justify-end">
                  <Button>Save</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default SettingsPage;