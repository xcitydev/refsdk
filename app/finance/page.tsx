import React from "react";
import { RepeatIcon, RocketIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Pools from "@/components/Pools";
import Swap from "@/components/Swap";
import { SwapCard } from "@/components/SwapCard";

const Finance = () => {
  return (
    <div>
      <div className="h-[20vh]">
        <Header />
      </div>
      <Tabs defaultValue="Pools" className="w-full">
        <TabsList className="grid max-w-xl mx-auto grid-cols-2 my-2">
          <TabsTrigger value="Pools" className="space-x-2">
            <RocketIcon className="w-4 h-4" />
            <p>Pools</p>
          </TabsTrigger>
          <TabsTrigger value="swap">
            <RepeatIcon className="w-4 h-4" />
            <p>Swap</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Pools">
          <Pools />
        </TabsContent>
        <TabsContent value="swap">
          {/* <SwapCard/> */}
          <Swap/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
