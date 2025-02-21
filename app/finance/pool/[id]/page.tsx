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
import { useParams, useRouter } from "next/navigation";
import { AddLiquidity } from "@/components/AddLiquidity";
import Header from "@/components/Header";
const page = () => {
  const router = useRouter()
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
        href="/finance
      "
        className="text-xl font-semibold"
      >
        {"< Pools"}
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
        <div className="max-w-xl w-full mr-3">
          <div className="grid grid-cols-3 gap-2 bg-[#0c171f] p-3 rounded-md">
            <div>
              <p>TVL</p>
              <p>$100,000</p>
            </div>
            <div>
              <p>Volume</p>
              <p>$100,000</p>
            </div>
            <div>
              <p>Fee (24h)</p>
              <p>0.30%</p>
            </div>
          </div>
          <div className="py-4">
            <p className="text-[#4f5f64] text-xl font-semibold py-4">
              Pool Composition
            </p>
            <div className="space-y-5 bg-[#0c171f] p-3 rounded-md">
              <div className="grid grid-cols-3 gap-2">
                <p className="text-[#4f5f64]">Pair</p>
                <p className="text-[#4f5f64]">Amount</p>
                <p className="text-[#4f5f64]">Value</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p>{pool?.token_symbols[0]}</p>
                <p>100%</p>
                <p>100%</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <p>{pool?.token_symbols[1]}</p>
                <p>0%</p>
                <p>0%</p>
              </div>
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
          {true && (
            <div className="flex items-center w-[250px] bg-white p-4 rounded-md h-[100px] my-3">
              <div className="w-[100px] text-black">
                <p className="font-semibold text-sm">Farm APR</p>
                <p className="text-sm">12.87%</p>
              </div>
              <div className="w-[150px] space-y-2">
                <p className="font-semibold text-sm text-black">$2.26k/week</p>
                <Button className="w-full text-white p-3" onClick={()=>{
                  router.push(`/finance/farm/${pool?.id}`)
                }}>
                  <p>Farm Now!</p>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
