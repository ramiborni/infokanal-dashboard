"use client";

import ModuleNewsList from "@/components/modules/module-news-list";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { CogIcon, TrashIcon, DeleteIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ExtendedModule } from "@/types/module";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import { useToast } from "@/components/ui/use-toast";
import SpinnerLoader from "@/components/ui/spinner-loader";
import { DeleteModuleDialog } from "@/components/modules/dialogs/delete-module-dialog";

const ModulePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { toast } = useToast();


  const [module, setModule] = useState<ExtendedModule>();

  const [autoAi, setAutoAI] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  const aiAutoChange = async () => {
    setAutoAI(!autoAi);
    try {
      const data = {
        "manual_convert": autoAi
      };

      const res = await axios.put(`${API_URL}/feed/modules/${id}/settings/`, data);
      toast({
        title: "Updated!",
        description: "Auto AI Summarize has been updated successfully"
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't update Auto AI Summarize, please try again."
      });
    } finally {

    }
  };

  useEffect(() => {

    const getModules = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(API_URL + "/feed/modules/"+id+"/");
        console.log(res.data)
        const data: ExtendedModule = res.data;

        setModule(data);
        setAutoAI(!data.settings.manual_convert);

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

  const openDialogConfirmDelete = () => {
    setOpenDeleteDialog(true);
  }



  const ModuleHeader = () => {
    return (
      <div className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex-grow">
          <div className="flex flex-col mx-auto flex-1">
            <div className="flex flex-row gap-x-4">
              <h2 className="text-3xl font-bold tracking-tight flex-1">
                Manage Module
              </h2>
              <div className="flex flex-row items-center gap-x-2">
                <Switch onCheckedChange={aiAutoChange} checked={autoAi} id="ai-auto" />
                <Label htmlFor="ai-auto">Auto AI Summarize</Label>
              </div>
              <Button onClick={openDialogConfirmDelete} className="hover:border-red-500 border-red-500 hover:text-red-500 text-red-500 hover:bg-red-100" variant="outline" size="icon" >
                <TrashIcon></TrashIcon>
              </Button>
              <Link href={"/dashboard/modules/" + id + "/settings/"}>
                <Button color="primary" variant="default" size="icon">
                  <CogIcon />
                </Button>
              </Link>

            </div>
            <p className="text-muted-foreground">{module?.name}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {
            isLoading ?
              <SpinnerLoader></SpinnerLoader> : <>
                <div className="w-full flex-col items-center justify-between space-y-2">
                  <ModuleHeader />
                </div>
                <div>
                  <ModuleNewsList isAuto={autoAi} id={id} sources={module?.rss_sources.sources!} />
                </div>
              </>
          }

        </div>
      </ScrollArea>
      <DeleteModuleDialog id={id} open={openDeleteDialog} setOpen={setOpenDeleteDialog}/>
    </>
  );
};

export default ModulePage;
