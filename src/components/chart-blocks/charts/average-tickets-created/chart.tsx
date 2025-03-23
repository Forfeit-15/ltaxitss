import { getColor } from "@/lib/colors";
import { useAtomValue } from "jotai";
import { ticketChartDataAtom } from "@/lib/atoms";

export default function ChartSpec() {
  const data = useAtomValue(ticketChartDataAtom);

  return {
    type: "line",
    xField: "date",
    yField: "count",
    seriesField: "type",
    data: [{ id: "traffic", values: data }],
    line: {
      style: {
        stroke: getColor("primary"),
        lineWidth: 2,
      },
    },
    point: {
      style: {
        fill: getColor("primary"),
      },
    },
    axes: [
      { orient: "bottom", type: "band", tickStep: 3 },
      { orient: "left", nice: true },
    ],
    tooltip: {
      trigger: ["hover", "click"],
      mark: {
        content: [
          { key: "Date", value: (d) => d?.date },
          { key: "Vehicles", value: (d) => d?.count },
        ],
      },
    },
  };
}
