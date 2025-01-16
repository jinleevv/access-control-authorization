"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface HomeFullStatsType {
  data: { date: string; personnel: number; vehicle: number }[];
}

const chartData = [
  { date: "2024-12-01", personnel: 222, vehicle: 150 },
  { date: "2024-12-02", personnel: 97, vehicle: 180 },
  { date: "2024-12-03", personnel: 167, vehicle: 120 },
  { date: "2024-12-04", personnel: 242, vehicle: 260 },
  { date: "2024-12-05", personnel: 373, vehicle: 290 },
  { date: "2024-12-06", personnel: 301, vehicle: 340 },
  { date: "2024-12-12", personnel: 245, vehicle: 180 },
  { date: "2024-12-08", personnel: 409, vehicle: 320 },
  { date: "2024-12-09", personnel: 59, vehicle: 110 },
  { date: "2024-12-10", personnel: 261, vehicle: 190 },
  { date: "2024-12-11", personnel: 327, vehicle: 350 },
  { date: "2024-12-12", personnel: 292, vehicle: 210 },
  { date: "2024-12-13", personnel: 342, vehicle: 380 },
  { date: "2024-12-14", personnel: 137, vehicle: 220 },
  { date: "2024-12-15", personnel: 120, vehicle: 170 },
  { date: "2024-12-16", personnel: 138, vehicle: 190 },
  { date: "2024-12-17", personnel: 446, vehicle: 360 },
  { date: "2024-12-18", personnel: 364, vehicle: 410 },
  { date: "2024-12-19", personnel: 243, vehicle: 180 },
  { date: "2024-12-20", personnel: 89, vehicle: 150 },
  { date: "2024-12-21", personnel: 137, vehicle: 200 },
  { date: "2024-12-22", personnel: 224, vehicle: 170 },
  { date: "2024-12-23", personnel: 138, vehicle: 230 },
  { date: "2024-12-24", personnel: 387, vehicle: 290 },
  { date: "2024-12-25", personnel: 215, vehicle: 250 },
  { date: "2024-12-26", personnel: 75, vehicle: 130 },
  { date: "2024-12-27", personnel: 383, vehicle: 420 },
  { date: "2024-12-28", personnel: 122, vehicle: 180 },
  { date: "2024-12-29", personnel: 315, vehicle: 240 },
  { date: "2024-12-30", personnel: 454, vehicle: 380 },
  { date: "2025-01-01", personnel: 165, vehicle: 220 },
  { date: "2025-01-02", personnel: 293, vehicle: 310 },
  { date: "2025-01-03", personnel: 247, vehicle: 190 },
  { date: "2025-01-04", personnel: 385, vehicle: 420 },
  { date: "2025-01-05", personnel: 481, vehicle: 390 },
  { date: "2025-01-06", personnel: 498, vehicle: 520 },
  { date: "2025-01-07", personnel: 388, vehicle: 300 },
  { date: "2025-01-08", personnel: 149, vehicle: 210 },
  { date: "2025-01-09", personnel: 227, vehicle: 180 },
  { date: "2025-01-10", personnel: 293, vehicle: 330 },
  { date: "2025-01-11", personnel: 335, vehicle: 270 },
  { date: "2025-01-12", personnel: 197, vehicle: 240 },
  { date: "2025-01-13", personnel: 197, vehicle: 160 },
  { date: "2025-01-14", personnel: 448, vehicle: 490 },
  { date: "2025-01-15", personnel: 473, vehicle: 380 },
  { date: "2025-01-16", personnel: 338, vehicle: 400 },
  { date: "2025-01-17", personnel: 499, vehicle: 420 },
  { date: "2025-01-18", personnel: 315, vehicle: 350 },
  { date: "2025-01-19", personnel: 235, vehicle: 180 },
  { date: "2025-01-20", personnel: 177, vehicle: 230 },
  { date: "2025-01-21", personnel: 82, vehicle: 140 },
  { date: "2025-01-22", personnel: 81, vehicle: 120 },
  { date: "2025-01-23", personnel: 252, vehicle: 290 },
  { date: "2025-01-24", personnel: 294, vehicle: 220 },
  { date: "2025-01-25", personnel: 201, vehicle: 250 },
  { date: "2025-01-26", personnel: 213, vehicle: 170 },
  { date: "2025-01-27", personnel: 420, vehicle: 460 },
  { date: "2025-01-28", personnel: 233, vehicle: 190 },
  { date: "2025-01-29", personnel: 78, vehicle: 130 },
  { date: "2025-01-30", personnel: 340, vehicle: 280 },
  { date: "2025-01-31", personnel: 178, vehicle: 230 },
  { date: "2025-02-01", personnel: 178, vehicle: 200 },
  { date: "2025-02-02", personnel: 470, vehicle: 410 },
  { date: "2025-02-03", personnel: 103, vehicle: 160 },
  { date: "2025-02-04", personnel: 439, vehicle: 380 },
  { date: "2025-02-05", personnel: 88, vehicle: 140 },
  { date: "2025-02-06", personnel: 294, vehicle: 250 },
  { date: "2025-02-07", personnel: 323, vehicle: 370 },
  { date: "2025-02-08", personnel: 385, vehicle: 320 },
  { date: "2025-02-09", personnel: 438, vehicle: 480 },
  { date: "2025-02-10", personnel: 155, vehicle: 200 },
  { date: "2025-02-11", personnel: 92, vehicle: 150 },
  { date: "2025-02-12", personnel: 492, vehicle: 420 },
  { date: "2025-02-13", personnel: 81, vehicle: 130 },
  { date: "2025-02-14", personnel: 426, vehicle: 380 },
  { date: "2025-02-15", personnel: 312, vehicle: 350 },
  { date: "2025-02-16", personnel: 371, vehicle: 310 },
  { date: "2025-02-17", personnel: 475, vehicle: 520 },
  { date: "2025-02-18", personnel: 112, vehicle: 170 },
  { date: "2025-02-19", personnel: 341, vehicle: 290 },
  { date: "2025-02-20", personnel: 408, vehicle: 450 },
  { date: "2025-02-21", personnel: 169, vehicle: 210 },
  { date: "2025-02-22", personnel: 317, vehicle: 270 },
  { date: "2025-02-23", personnel: 480, vehicle: 530 },
  { date: "2025-02-24", personnel: 132, vehicle: 180 },
  { date: "2025-02-25", personnel: 141, vehicle: 190 },
  { date: "2025-02-26", personnel: 434, vehicle: 380 },
  { date: "2025-02-27", personnel: 448, vehicle: 490 },
  { date: "2025-02-28", personnel: 149, vehicle: 200 },
  { date: "2025-02-29", personnel: 103, vehicle: 160 },
  { date: "2025-02-30", personnel: 446, vehicle: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  personnel: {
    label: "Personnel",
    color: "hsl(var(--chart-1))",
  },
  vehicle: {
    label: "Vehicle",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function HomeFullStats({ data }: HomeFullStatsType) {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });

  return (
    <Card className="h-2/6 mt-3">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Applications Chart</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[125px] 2xl:h-[210px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPersonnel" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color personnel)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color personnel)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillVehicle" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-vehicle)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-vehicle)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="personnel"
              type="natural"
              fill="rgba(66, 153, 225, 0.5)" // Direct color code for the fill
              stroke="#3b82f6"
              stackId="a"
            />
            <Area
              dataKey="vehicle"
              type="natural"
              fill="rgba(173, 216, 230, 0.5)" // Direct color code for the fill
              stroke="#2563eb"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
