"use client";

import ModuleNewsList from "@/components/modules/module-news-list";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { CogIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ModulePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [module, setModule] = useState();
  const [autoAi, setAutoAI] = useState<boolean>(false);

  useEffect(() => {}, [id]);

  const aiAutoChange = () => {
    setAutoAI(!autoAi);
  }


  const ModuleHeader = () => {
    return (
      <div className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex-grow">
          <div className="flex flex-col mx-auto flex-1">
            <div className="flex flex-row gap-x-8">
              <h2 className="text-3xl font-bold tracking-tight flex-1">
                Manage Module
              </h2>
              <div className="flex flex-row items-center gap-x-2">
                <Switch onCheckedChange={aiAutoChange} checked={autoAi} id="ai-auto" />
                <Label htmlFor="ai-auto">Auto AI Summarize</Label>
              </div>
              <Link href={"/dashboard/modules/" + id + "/settings/"}>
                <Button color="primary" variant="default" size="icon">
                  <CogIcon />
                </Button>
              </Link>
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
          <div className="w-full flex-col items-center justify-between space-y-2">
            <ModuleHeader />
          </div>
          <div>
            <ModuleNewsList/>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default ModulePage;
