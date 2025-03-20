import dynamic from "next/dynamic";
import Container from "@/components/container";
import { MapPin } from "lucide-react";
import ChartTitle from "@/components/chart-title";

// Dynamically import the Map component to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

export default function MapPage() {
  return (
    <Container className="py-6">
      <ChartTitle title="Interactive Map" icon={MapPin} />
      <MapComponent />
    </Container>
  );
}
