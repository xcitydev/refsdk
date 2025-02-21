"use client";
import React, { useEffect, useState } from "react";
import PoolData from "./PoolData";
import { AreaChartData } from "./AreaChart";

const Pools = () => {
  const [data, setData] = useState([]);
  const getPools = async () => {
    try {
      const pools = await fetch("https://api.ref.finance/list-top-pools");
      const data = await pools.json();

      console.log(data, "data");
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPools();
  }, []);

  return (
    <div>
      <div className="max-w-5xl mx-auto">{/* Chart */}</div>
      {/* Pools */}
      <PoolData data={data} />
    </div>
  );
};

export default Pools;
