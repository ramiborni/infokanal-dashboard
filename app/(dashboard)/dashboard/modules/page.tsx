"use client";

import AddModuleDialog from "@/components/modules/dialogs/add-module-dialog";
import ModulesList from "@/components/modules/modules-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import AddModuleKeywordsDialog from "@/components/modules/dialogs/add-module-keywords-dialog";
import { ExtendedModule, Module } from "@/types/module";
import AddModuleSourcesDialog from "@/components/modules/dialogs/add-module-sources-dialog";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import { useToast } from "@/components/ui/use-toast";

const ModulesPage = () => {
  const { toast } = useToast();

  const [openAddModule, setOpenAddModule] = useState<boolean>(false);
  const [openAddModuleKeywords ,setOpenAddModuleKeywords] = useState<boolean>(false);
  const [openAddModuleSources ,setOpenAddModuleSources] = useState<boolean>(false);

  const [newModule, setNewModule] = useState<Module>();

  const [modules, setModules] = useState<ExtendedModule[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    retrieveModules().then().catch();
  }, []);


  const retrieveModules = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(API_URL + "/feed/modules/");

      const data = res.data;

      setModules(data);
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
  }

  const openAddModuleDialog = () => {
    setOpenAddModule(true);
  }  

  const ModulesHeader = () => {
    return (
      <div className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex-grow">
          <div className="flex flex-col mx-auto flex-1">
            <h2 className="text-3xl font-bold tracking-tight">Modules</h2>
            <p className="text-muted-foreground">
              Create a module to generate a unique RSS feed.
            </p>
          </div>
        </div>

        <Button onClick={openAddModuleDialog}>
          <PlusIcon />
          &nbsp; Add Module
        </Button>
      </div>
    );
  };
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="w-full flex-col items-center justify-between space-y-2">
            <ModulesHeader/>
            <ModulesList isLoading={isLoading} modules={modules}/>
        </div>
      </div>
      <AddModuleDialog open={openAddModule} setOpen={setOpenAddModule} setOpenSecondStepDialog={setOpenAddModuleKeywords} setNewModule={setNewModule} />
      <AddModuleKeywordsDialog open={openAddModuleKeywords} setOpen={setOpenAddModuleKeywords} setOpenThirdStepDialog={setOpenAddModuleSources} moduleName={newModule?.slang!}/>
      <AddModuleSourcesDialog open={openAddModuleSources} setOpen={setOpenAddModuleSources} moduleName={newModule?.slang!} retrieveModules={retrieveModules} />

    </ScrollArea>
  );
};

export default ModulesPage;
