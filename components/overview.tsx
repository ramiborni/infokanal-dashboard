"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AnalyticsDataChart } from "@/app/(dashboard)/dashboard/page";

function getCurrentMonth() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // January is 0, so we add 1 to get the actual month number
  return currentMonth;
}

function generateMonthlyData(month:number) {
  const daysInMonth = new Date(2024, month, 0).getDate(); // Get the number of days in the specified month
  const monthlyData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dailyTotal = Math.floor(Math.random() * 25) + 1;
    monthlyData.push({
      day: day,
      total: dailyTotal
    });
  }

  return monthlyData;
}

interface OverviewProps {
  chartData:  AnalyticsDataChart[]
}
export function Overview({chartData}: OverviewProps) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <Tooltip />
        <XAxis
          dataKey="day"
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value) => `${value}/${getCurrentMonth()}`}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#00929E" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
