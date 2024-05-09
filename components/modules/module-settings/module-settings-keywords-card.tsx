import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Keywords from "@/components/modules/keywords";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag-input";
import { Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { API_URL } from "@/constants/api-url";

interface ModuleSettingsKeywordsCardProps {
  slang: string;
  keywords: Tag[];
  setKeywords: Dispatch<SetStateAction<Tag[]>>;
  negativeKeywords: Tag[];
  setNegativeKeywords: Dispatch<SetStateAction<Tag[]>>;
}


const ModuleSettingsKeywordsCard = ({
                                      slang,
                                      keywords,
                                      setKeywords,
                                      negativeKeywords,
                                      setNegativeKeywords
                                    }: ModuleSettingsKeywordsCardProps) => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const saveData = async () => {

    if (keywords.length > 0 || negativeKeywords.length > 0) {
      return await updateData();
    }

    try {
      setLoading(true);
      const data = {
        "keywords": keywords.map(k => k.text),
        "negative_keywords": negativeKeywords.map(k => k.text)
      };
      const res = await axios.post(`${API_URL}/feed/modules/${slang}/settings/`, data);
      toast({
        title: "Updated!",
        description: "Keywords has been updated successfully"
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't update Keywords, please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const updateData = async () => {
    try {
      setLoading(true);
      const data = {
        "keywords": keywords.map(k => k.text),
        "negative_keywords": negativeKeywords.map(k => k.text)
      };
      const res = await axios.put(`${API_URL}/feed/modules/${slang}/settings/`, data);
      toast({
        title: "Updated!",
        description: "Keywords has been updated successfully"
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Couldn't update Keywords, please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
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
                    tags={negativeKeywords}
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button disabled={loading} onClick={saveData}>Save</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleSettingsKeywordsCard;