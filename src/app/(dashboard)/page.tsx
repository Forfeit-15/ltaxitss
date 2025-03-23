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

import { trafficData } from "@/data/priority";

function TrafficTable() {
  return (
    <Container className="mb-6">
      <br></br>
      <h2 className="text-lg font-semibold mb-4">Live Traffic Overview</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area</TableHead>
            <TableHead>Vehicles</TableHead>
            <TableHead>Weather</TableHead>
            <TableHead>Speed</TableHead>
            <TableHead>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trafficData.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.area}</TableCell>
              <TableCell>{row.vehicles}</TableCell>
              <TableCell>{row.weather}</TableCell>
              <TableCell>{row.speed}</TableCell>
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
