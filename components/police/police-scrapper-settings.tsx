"use client"

import React, { useEffect, useState } from "react";
import { TwitterScrapperConfig } from "@/types/twitter-config";
import axios from "axios";
import SpinnerLoader from "@/components/ui/spinner-loader";
import PoliceRssCategoriesCard from "@/components/police/police-rss-categories-card";

const PoliceScrapperSettings = () => {
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
            <PoliceRssCategoriesCard twitterConfig={twitterConfig} setTwitterConfig={setTwitterConfig}/>
          </>
        }
      </div>
    </>
  );
};

export default PoliceScrapperSettings;