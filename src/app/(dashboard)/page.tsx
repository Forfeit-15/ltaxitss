import {
  AverageTicketsCreated,
  Conversions,
  CustomerSatisfication,
  Metrics,
  TicketByChannels,
} from "@/components/chart-blocks";
import Container from "@/components/container";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TrafficData } from "@/data/priority";

function TrafficTable() {
  const trafficRows = Object.entries(TrafficData).map(([area, data]) => ({
    area,
    pixelSpeed: data.pixel_speed.average_relative.toFixed(2),
    trafficDensity: data.traffic_density.average_relative.toFixed(2),
    vehicles: data.num_vehicles.average_average.toFixed(2),
    rainfall: data.average_rainfall.toFixed(2),
    priority: data.priority,
  }));

  return (
    <Container className="mb-6">
      <br></br>
      <h2 className="text-lg font-semibold mb-4">Live Traffic Overview</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Relative Pixel Speed</TableHead>
            <TableHead>Relative Traffic Density</TableHead>
            <TableHead>Avg Vehicles Detected</TableHead>
            <TableHead>Avg Rainfall</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trafficRows.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.area}</TableCell>
              <TableCell>{row.pixelSpeed}</TableCell>
              <TableCell>{row.trafficDensity}</TableCell>
              <TableCell>{row.vehicles}</TableCell>
              <TableCell>{row.rainfall}</TableCell>
              <TableCell>{row.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}



export default function Home() {
  return (
    <div>
      <TrafficTable /> 

      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-2">
          <AverageTicketsCreated />
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <Conversions />
        </Container>
      </div>

      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-2 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-1">
          <TicketByChannels />
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <CustomerSatisfication />
        </Container>
      </div>
    </div>
  );
}
