import ModuleCard from "./module-card";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants/api-url";
import SpinnerLoader from "@/components/ui/spinner-loader";
import { ExtendedModule } from "@/types/module";
import { useToast } from "@/components/ui/use-toast";

interface ModulesListProps{
  isLoading: boolean,
  modules: ExtendedModule[]
}

const ModulesList = ({isLoading, modules}: ModulesListProps) => {



  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 py-10">
      {
        isLoading ? <SpinnerLoader></SpinnerLoader> : modules.map(m => <>
          <ModuleCard key={m._id} module={m} />
        </>)
      }

    </div>
  );
};

export default ModulesList;
