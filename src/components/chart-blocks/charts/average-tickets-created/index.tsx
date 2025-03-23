"use client";

import { BarChart } from "lucide-react";
import { VChart } from "@visactor/react-vchart";
import { DateRangePicker } from "@/components/date-range-picker";
import ChartSpec from "./chart";
import ChartTitle from "@/components/chart-title";

export default function AverageTicketsCreated() {
  const spec = ChartSpec();

  return (
    <section className="flex flex-col gap-4">
      <ChartTitle title="Vehicle Count by Date Range" icon={BarChart} />
      <DateRangePicker />
      <VChart spec={spec} className="h-[300px]" />
    </section>
  );
}
