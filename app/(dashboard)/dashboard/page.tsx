"use client";

import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentNews } from "@/components/recent-news";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/constants/api-url";

export interface AnalyticsDataChart{
  day: number;
  total: number;
}

interface AnalyticsData{
  total_summarized: number;
  total_fetched_news: number;
  created_module: number;
  automated_module: number;
  current_month_summarized_chart: AnalyticsDataChart[];
  recent_news: any
}

export default function page() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AnalyticsData>();
  const getStatics = async () => {
    try{
      setLoading(true);
      const res = await axios.get(API_URL + "/feeds/statistics");
      const result : AnalyticsData = res.data;
      setData(result)
    }catch(e){

    }finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getStatics().then();
  }, []);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 pt-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Summarized News in this month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.total_summarized} News</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Fetched News in this month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.total_fetched_news} News</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Created Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.created_module} Modules</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Automated Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.automated_module} Modules</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Summarized News during this month</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview chartData={data?.current_month_summarized_chart!} />
            </CardContent>
          </Card>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Summarized News</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentNews recent={data?.recent_news}/>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
