'use client'
// Import the necessary components
import React from "react";
import ReceiverTable from "@/components/receiver/receiverTable";
import { provider_list } from "@/service/provider/provider";
import { food_available } from "@/components/FoodInfo";
import { useQuery } from "react-query";
import Loading from "@/components/loading";

const Receiver = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["get_ton_Asset"],
    queryFn: async () =>
      {
        const list = await provider_list();
        const food_list = await food_available(list);
        return food_list;
      },
      retry: 10,
      cacheTime: 1000*60*5
    });

  return (
    <>
      <div className="flex-grow flex flex-col min-h-screen">
      {isLoading?(
        <Loading />
      ):(
        <ReceiverTable foods={data} />
      )}
      </div>
    </>
    
  );
};

export default Receiver;
