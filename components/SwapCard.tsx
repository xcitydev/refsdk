"use client";
import { ArrowDown, Settings } from "lucide-react";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenSelectButton } from "./TokenSelect";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useWallet } from "./zustandStore";

export function SwapCard() {
  const [fromToken, setFromToken] = useState<any>(null);
  const [toToken, setToToken] = useState<any>(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { wallet, signedAccountId } = useWallet();



  const swapToken = async () => {
    try {
      const response = await fetch("/api/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signedAccountId, wallet, fromAmount, toAmount }),
      });

      if (response.ok && response.body) {
        console.log("Streaming started");
      } else {
        console.error("Failed to start streaming");
      }
    } catch (error) {}
  };
  const handleSwap = async () => {
    try {
      setLoading(true);
      // Implement swap logic here
      console.log("Swapping tokens...");
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    } catch (error) {
      console.error("Swap failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const isSwapDisabled =
    !fromToken ||
    !toToken ||
    !fromAmount ||
    !toAmount ||
    fromToken === toToken ||
    loading;

  return (
    <Card className="w-full max-w-md mx-auto mt-5">
      <Button onClick={swapToken} className="w-full">SWAP</Button>
      <CardHeader className="flex flex-row items-center justify-between">
        <h2 className="text-2xl font-bold">Swap</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Settings className="w-5 h-5 cursor-pointer hover:text-green-900" />
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  Transaction Settings
                </h4>
                <p className="text-sm text-muted-foreground">
                  Set the transaction settings for the swap.
                </p>
              </div>
              <div className="">
                <p className="text-sm font-medium">Slippage tolerance</p>
                <div className="p-2">
                  <ToggleGroup type="single">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                      0.1%
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                      0.5%
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="strikethrough"
                      aria-label="Toggle strikethrough"
                    >
                      1%
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label>From</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(e.target.value);
                // In a real app, calculate toAmount based on exchange rate
                setToAmount(e.target.value);
              }}
            />
            <TokenSelectButton
              selectedToken={fromToken}
              onSelect={setFromToken}
            />
          </div>
          {fromToken && (
            <div className="text-sm text-muted-foreground">
              Balance: {fromToken.balance} {fromToken.symbol}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={switchTokens}
          >
            <ArrowDown className="h-4 w-4" />
            <span className="sr-only">Switch tokens</span>
          </Button>
        </div>
        <div className="grid gap-2">
          <Label>To</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => {
                setToAmount(e.target.value);
                // In a real app, calculate fromAmount based on exchange rate
                setFromAmount(e.target.value);
              }}
            />
            <TokenSelectButton selectedToken={toToken} onSelect={setToToken} />
          </div>
          {toToken && (
            <div className="text-sm text-muted-foreground">
              Balance: {toToken.balance} {toToken.symbol}
            </div>
          )}
        </div>
        {fromToken && toToken && (
          <div className="text-sm text-muted-foreground">
            {/* In a real app, show actual exchange rate */}1 {fromToken.symbol}{" "}
            = 1 {toToken.symbol}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          size="lg"
          disabled={isSwapDisabled}
          onClick={handleSwap}
        >
          {loading
            ? "Swapping..."
            : !fromToken || !toToken
            ? "Select tokens"
            : "Swap"}
        </Button>
      </CardFooter>
    </Card>
  );
}
