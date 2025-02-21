"use client";
import Header from "@/components/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const WithdrawPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 20; // Total number of items in the carousel
  const itemsToShow = 6; // Number of items to show at once

  // Function to go to the next item
  const nextItem = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (totalItems - itemsToShow + 1)
    );
  };

  // Function to go to the previous item
  const previousItem = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + totalItems) % (totalItems - itemsToShow + 1)
    );
  };

  // Automatically scroll the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextItem, 500); // Change 3000 to your desired interval in milliseconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <div className="h-[15vh]">
        <Header />
      </div>
      <div className="max-w-4xl mx-auto">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-4xl"
        >
          <CarouselContent>
            {Array.from({ length: totalItems }).map((_, index) => (
              <CarouselItem
                key={index}
                className={`md:basis-[9rem] lg:basis-[9rem] ${
                  index >= currentIndex && index < currentIndex + itemsToShow
                    ? "block"
                    : "hidden"
                }`} // Show items based on current index
              >
                <div className="p-1">
                  <Card className="cursor-pointer hover:bg-gray-100">
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="max-w-3xl mx-auto py-[3rem] bg-[#03080ae6]/30 mt-5">
        <div className="max-w-2xl mx-auto flex flex-col justify-center items-center">
          <p className="text-2xl font-bold text-white font-neuton">
            Withdraw your Earnings
          </p>
          <p className="text-white text-sm">
            Pick a token and then select the amount you want to withdraw.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-4 my-5 items-center w-full max-w-2xl mx-auto">
            <div className="text-white flex-1">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Token to withdraw" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Token to withdraw</SelectLabel>
                    <SelectItem value="xRef">Stake xRef</SelectItem>
                    <SelectItem value="burrow">
                      Deposit into Burrow Pool
                    </SelectItem>
                    <SelectItem value="burrow">
                      Deposit into Burrow Pool
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="max-w-[20rem] w-full text-white bg-[#03080ae6]/70 py-2 text-center">
              <p className="text-sm">xREF Balance</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
          <div className="flex gap-4 my-5 items-center max-w-2xl mx-auto">
            <Input type="number" placeholder="0" className="w-full max-w-xl py-6 border-2 mx-auto text-white border-white rounded-md" />
          </div>
        </div>
        <div className="max-w-2xl flex mx-auto">
          <Button className="w-full max-w-xl mx-auto p-6 bg-green-500 text-white font-bold hover:bg-green-600">Withdraw</Button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
