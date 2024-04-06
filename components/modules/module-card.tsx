import { Link1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";

interface ModuleCardProps {
  id: string;
  name: string;
  rssFeedUrl: string;
}

const ModuleCard = ({ name, rssFeedUrl, id }: ModuleCardProps) => {
  return (
    <Card className="col-span-1 py-2">
      <CardHeader>
        <CardTitle>
          <div className="flex flex-row items-center flex-shrink">
            <span className="flex-1">{name}</span>
            <span>
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={rssFeedUrl} target="_blank">
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
      <CardContent className="grid grid-cols-3 items-center gap-4 text-center px-4 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center gap-1.5">
          <div className="text-sm font-semibold">Sources</div>
          <div className="text-2xl font-semibold">23</div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="text-sm font-semibold">Keywords</div>
          <div className="text-2xl font-semibold">45</div>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="text-sm font-semibold">Negative Keywords</div>
          <div className="text-2xl font-semibold">12</div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-800">
        <Link href={"/dashboard/modules/" + id}>
          <Button>View</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
