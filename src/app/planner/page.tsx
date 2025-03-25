"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { highwayChats } from "@/data/chat";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const accountOptions = [
  "Public Transport",
  "Nearby Schools",
  "Construction Zones",
  "Accident History",
  "Shopping Areas",
  "Peak Hour Load",
];

export default function PlannerPage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(accountOptions);
  const [showResult, setShowResult] = useState(false);
  const [confirmedRegion, setConfirmedRegion] = useState<string | null>(null);


  const selectedChat = highwayChats.find((chat) => chat.highway === confirmedRegion);

  const handleToggleAccount = (option: string) => {
    setSelectedAccounts((prev) =>
      prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
    );
  };

  return (
    <main className="min-h-screen bg-background p-6 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">🛣️ Traffic Planner – AI Debate</h1>

      {/* Step 1: Region selection */}
      <div className="space-y-2 max-w-md">
        <Label>Plan For:</Label>
        <Select onValueChange={(val) => setSelectedRegion(val)} defaultValue={selectedRegion ?? undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Select a region/highway" />
          </SelectTrigger>
          <SelectContent>
            {highwayChats.map((chat) => (
              <SelectItem value={chat.highway} key={chat.highway}>
                {chat.highway}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Step 2: Checkbox filters */}
      <div className="space-y-2 max-w-md">
        <Label>Account For:</Label>
        <div className="grid grid-cols-2 gap-2">
          {accountOptions.map((opt) => (
            <Label key={opt} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedAccounts.includes(opt)}
                onCheckedChange={() => handleToggleAccount(opt)}
              />
              <span>{opt}</span>
            </Label>
          ))}
        </div>
      </div>

      {/* Step 3: Start Debate */}
      <Button
        onClick={() => {
          setConfirmedRegion(selectedRegion);
          setShowResult(true);
        }}
        disabled={!selectedRegion}
        className="mt-4"
      >
        Start Debate
      </Button>


      {/* Step 4: Output */}
      {showResult && selectedChat && (
        <section className="space-y-4 mt-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold">💬 LTA vs ITSS – {confirmedRegion}</h2>
          {selectedChat.conversation.map((msg, idx) => (
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

          {/* HTML Visualisation */}
          <iframe
            src="/nx.html"
            title={`${selectedRegion} Graph`}
            className="w-full h-[600px] border rounded-md mt-4"
          />
        </section>
      )}
    </main>
  );
}
