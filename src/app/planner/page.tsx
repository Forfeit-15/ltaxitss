"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { highwayChats } from "@/data/chat"; 

export default function PlannerPage() {
  return (
    <main className="min-h-screen bg-background p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-primary">🛣️ Traffic Planner – AI Debate</h1>

      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        {highwayChats.map(({ highway, conversation }) => (
          <AccordionItem value={highway} key={highway}>
            <AccordionTrigger className="text-lg font-semibold">
              {highway} Expressway
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 mt-4">
                {conversation.map((msg, idx) => (
                  <Card
                    key={idx}
                    className={`w-fit max-w-lg ${
                      msg.role === "LTA" ? "ml-auto bg-blue-100 text-blue-900" : "mr-auto bg-green-100 text-green-900"
                    }`}
                  >
                    <CardContent className="p-3">
                      <p className="text-xs font-bold">{msg.role}</p>
                      <p className="text-sm">{msg.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
