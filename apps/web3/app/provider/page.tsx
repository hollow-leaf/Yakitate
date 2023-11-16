'use client'
// Import the necessary components
import React, { useEffect, useState } from "react";
import Introduction from "@/components/provider/Introduction";
import { food_available } from "@/components/FoodInfo";
import { useQuery } from "react-query";
import { peraWallet } from "@/service/perawallet";
import { useSelector } from "react-redux";
import Loading from "@/components/loading";
import ProviderTable from "@/components/provider/providerTable";

const Provider = () => {
  const user = useSelector((state: any) => {return state});

  const { isLoading, error, data } = useQuery({
    queryKey: ["get_ton_Asset"],
    queryFn: async () =>
      {
        if( user['user']['wallet']['address']){
          const addr = user['user']['wallet']['address']
          const food_list = await food_available([user['user']['wallet']['address']]);
          var list:any = []
          food_list.forEach(food=>{
            if(food.provider==addr){
              list.push(food)
            }
          })
          return list;
        }else{
          return []
        }
      },
      retry: 10,
      cacheTime: 1000*1*5
    });

  return (
    <div className="flex-grow flex flex-col min-h-screen">
      <>
        {isLoading?(
          <Loading />
        ):(
          <>
            <section className="bg-gray-800">
              {isLoading&&<Loading />}
              {<ProviderTable foods={data} />}
            </section>
            <section className="bg-gray-800">
              <Introduction />
            </section>
          </>
            
        )}
      </>
      
    </div>
    
  );
  
};



export default Provider;
