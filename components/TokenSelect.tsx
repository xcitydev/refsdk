"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance?: string;
}

interface TokenSelectButtonProps {
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
}

// Sample token list - in a real app, this would come from an API or contract
const tokens: Token[] = [
  {
    symbol: "NEAR",
    name: "NEAR Protocol",
    icon: "/placeholder.svg?height=32&width=32",
    balance: "100.00",
  },
  {
    symbol: "wNEAR",
    name: "Wrapped NEAR",
    icon: "/placeholder.svg?height=32&width=32",
    balance: "50.00",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    icon: "/placeholder.svg?height=32&width=32",
    balance: "1000.00",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "/placeholder.svg?height=32&width=32",
    balance: "1000.00",
  },
];

export function TokenSelectButton({
  selectedToken,
  onSelect,
}: TokenSelectButtonProps) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) ||
      token.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-3 hover:bg-muted"
        >
          {selectedToken ? (
            <>
              <Image
                src={selectedToken.icon || "/placeholder.svg"}
                alt={selectedToken.symbol}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span>{selectedToken.symbol}</span>
            </>
          ) : (
            "Select Token"
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Input
            placeholder="Search by name or symbol"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ScrollArea className="h-[300px]">
            <div className="grid gap-2">
              {filteredTokens.map((token) => (
                <Button
                  key={token.symbol}
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    onSelect(token);
                    setOpen(false);
                  }}
                >
                  <Image
                    src={token.icon || "/placeholder.svg"}
                    alt={token.symbol}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{token.symbol}</span>
                    <span className="text-xs text-muted-foreground">
                      {token.name}
                    </span>
                  </div>
                  {token.balance && (
                    <div className="ml-auto text-right">
                      <span className="text-sm font-medium">
                        {token.balance}
                      </span>
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
