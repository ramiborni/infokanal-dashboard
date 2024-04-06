"use client"

import React, { useEffect, useState } from "react";
import GeneralSettingsCard from "@/components/twitter/general-settings-card";
import { TwitterScrapperConfig } from "@/types/twitter-config";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import TwitterAccountsSettingsCard from "@/components/twitter/twitter-accounts-settings-card";
import { Skeleton } from "../ui/skeleton";
import { Card } from "@/components/ui/card";
import SpinnerLoader from "@/components/ui/spinner-loader";
import TwitterRssCategoriesCard from "@/components/twitter/twitter-rss-categories-card";

const TwitterScrapperSettings = () => {
  const [twitterConfig, setTwitterConfig] = useState<TwitterScrapperConfig>();

  const getConfig = async () => {
    const result = await axios.get("https://api.infokanal.com/get-config");
    setTwitterConfig(result.data);
  };

  useEffect(() => {
    getConfig().then(r =>  null);
  }, []);


  return (
    <>
      <div className="grid grid-cols-6  gap-y-12 gap-x-4 w-full">
        {
          twitterConfig === undefined ? <SpinnerLoader/> : <>
            <GeneralSettingsCard twitterConfig={twitterConfig}/>
            <TwitterRssCategoriesCard twitterConfig={twitterConfig} setTwitterConfig={setTwitterConfig}/>
            <TwitterAccountsSettingsCard twitterConfig={twitterConfig} setTwitterConfig={setTwitterConfig}/>
          </>
        }
      </div>
    </>
  );
};

export default TwitterScrapperSettings;