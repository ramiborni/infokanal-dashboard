"use client";

import AddModuleDialog from "@/components/modules/add-module-dialog";
import ModulesList from "@/components/modules/modules-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const ModulesPage = () => {
  const [openAddModule, setOpenAddModule] = useState<boolean>(false);

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
            <ModulesList/>
        </div>
      </div>
      <AddModuleDialog open={openAddModule} setOpen={setOpenAddModule} />
    </ScrollArea>
  );
};

export default ModulesPage;
