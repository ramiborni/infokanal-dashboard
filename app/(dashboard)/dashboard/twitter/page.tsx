import { ScrollArea } from "@/components/ui/scroll-area";
import TwitterScrapperSettings from "@/components/twitter/twitter-scrapper-settings";

const TwitterPage = () => {
  const ModuleHeader = () => {
    return (
      <div className="flex flex-row items-center justify-between gap-x-4">
        <div className="flex-grow">
          <div className="flex flex-col mx-auto flex-1">
            <div className="flex flex-row gap-x-8">
              <h2 className="text-3xl font-bold tracking-tight flex-1">
                Edit Twitter Scrapper
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 py-6">
        <div className="w-full flex-col items-center justify-between space-y-8">
          <ModuleHeader/>
          <TwitterScrapperSettings></TwitterScrapperSettings>
        </div>
      </div>
    </ScrollArea>
  );
}

export default TwitterPage;