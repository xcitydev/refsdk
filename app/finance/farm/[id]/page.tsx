"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AddLiquidity } from "@/components/AddLiquidity";
import Header from "@/components/Header";
const page = () => {
  const params = useParams();
  const id = params.id as string;
  const [pool, setPool] = useState<any>(null);
  const fetchPoolById = async (id: string) => {
    if (!id) return;
    try {
      const res = await fetch(
        `https://api.ref.finance/list-pools-by-ids?ids=${id}`
      );
      const data = await res.json();
      console.log(data[0]);
      setPool(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPoolById(id);
  }, [id]);
  return (
    <div className="text-white max-w-4xl mx-auto p-7">
      <div className="h-[20vh]">
        <Header />
      </div>
      <Link
        href={`/finance/pool/${id}`}
        className="text-sm font-semibold"
      >
        {"< Farms"}
      </Link>
      <div className="flex justify-between max-w-xl py-3 items-center">
        <p className="text-3xl font-semibold">
          {pool?.token_symbols[0]}-{pool?.token_symbols[1]}{" "}
          {pool?.farm && <span>Farms</span>}
        </p>
        <div>
          <p className=" text-[#4f5f64]">Fee</p>
          <p className="font-semibold">0.30%</p>
        </div>
        <div>
          <p className=" text-[#4f5f64]">Current Price</p>
          <p className="font-semibold">1 USDC = 1 NEAR</p>
        </div>
      </div>
      <div className="flex max-w-3xl pt-6 ">
        <div className="max-w-xl w-full mr-3 space-y-4">
          <div className=" bg-[#0c171f] p-3 rounded-md">
            <div className="space-y-3 p-4">
              <p className="text-sm text-[#4f5f64]">Your Power</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
            <div className="flex justify-between max-w-sm p-4">
              <div className="space-y-3">
                <p className="text-sm text-[#4f5f64]">Value</p>
                <p className="text-2xl font-semibold">$0</p>
              </div>
              <div className="space-y-3">
                <p className="text-sm text-[#4f5f64]">Your Share</p>
                <p className="text-2xl font-semibold">0%</p>
              </div>
            </div>
          </div>
          <div className="space-y-5 bg-[#0c171f] p-6 rounded-md">
            <p className="text-[#4f5f64] text-sm font-semibold py-4">
              Unclaimed Rewards
            </p>
            <div>
              <p className="text-2xl font-semibold">$0</p>
            </div>
          </div>
        </div>
        <div>
          <Card className="w-[250px]">
            <CardHeader>
              <CardTitle>Add Liquidity</CardTitle>
              <CardDescription>
                Add liquidity to the pool to start trading.
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-between">
              <AddLiquidity
                poolType1={pool?.token_symbols[0]}
                poolType2={pool?.token_symbols[1]}
              />
            </CardFooter>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default page;
