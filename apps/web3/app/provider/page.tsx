'use client'
// Import the necessary components
import React, { useEffect, useState } from "react";
import Introduction from "@/components/provider/Introduction";
import ReceiverTable from "@/components/receiver/receiverTable";
import { food_available } from "@/components/FoodInfo";
import { useQuery } from "react-query";
import { peraWallet } from "@/service/perawallet";
import { useDispatch } from "react-redux";
import { setLogin } from "@/store/userSlice";
import Loading from "@/components/loading";
import ProviderTable from "@/components/provider/providerTable";

const Provider = () => {
  
  console.log(peraWallet.isConnected)
  const { isLoading, error, data } = useQuery({
    queryKey: ["get_ton_Asset"],
    queryFn: async () =>
      {
        if(true){
          const food_list = await food_available(["S6SFLVQ4FNIQ2QVQ46YGYM46DTD62YJIOPIYWETLF4JFMUYNBH73KVBM6Y"]);
          return food_list;
        }
      },
      retry: 10,
      cacheTime: 1000*60*5
    });

  return (
    <div className="flex-grow flex flex-col min-h-screen">
      <>
        {isLoading?(
          <Loading />
        ):(
            <section className="bg-gray-800">
              <ProviderTable foods={data} />
            </section>
        )}
      </>
      <section className="bg-gray-800">
        <Introduction />
      </section>
    </div>
    
  );
  
};



export default Provider;
