import { ExclamationTriangleIcon, Link1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import Link from "next/link";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent
} from "../ui/tooltip";
import { ExtendedModule } from "@/types/module";
import { Badge } from "@/components/ui/badge";

interface ModuleCardProps {
  module: ExtendedModule;
}

const ModuleCard = ({ module }: ModuleCardProps) => {


  return (
    <Card className="col-span-1 py-2">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center flex-shrink">
            <span className="flex-1">
              <div className="flex flex-row items-center">
                {module.name} &nbsp;
                {
                  module.settings && <Badge variant={module.settings.manual_convert ? "secondary" : "default"}>
                    {
                      module.settings && module.settings.manual_convert ? "Manual Mode" : "Auto Mode"
                    }
                  </Badge>
                }

                {
                  !module.settings && <Badge variant="destructive">
                   <ExclamationTriangleIcon/> &nbsp; Uncompleted module
                  </Badge>
                }

              </div>
            </span>
            <span>
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={"https://services.infokanal.com/feed/rss/" + module.slang} target="_blank">
                      <Button variant="ghost" size="icon">
                        <Link1Icon className="h-6 w-6" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent className="my-4">
                    <p>Rss feed link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      {
        (module.settings && module.rss_sources) && <CardContent
          className="grid grid-cols-3 items-center gap-4 text-center px-4 py-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-sm font-semibold">Sources</div>
            <div className="text-2xl font-semibold">{
              module.rss_sources.sources.length
            }</div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-sm font-semibold">Keywords</div>
            <div className="text-2xl font-semibold">{
              module.settings.keywords.length
            }</div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="text-sm font-semibold">Negative Keywords</div>
            <div className="text-2xl font-semibold">{
              module.settings.negative_keywords.length
            }</div>
          </div>
        </CardContent>
      }
      <CardFooter
        className="flex flex-row items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-800">
        <Link href={"/dashboard/modules/" + module.slang}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
