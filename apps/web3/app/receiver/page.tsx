// Import the necessary components
import React from "react";
import Introduction from "@/components/provider/Introduction";
import { CardWithForm } from "@/components/provider/card";

const Receiver = () => {
  const nft:any = [
    {src:"bread.jpg",name:"Bread"},
    {src:"junkfood.jpg",name:"JunkFood"},
    {src:"protein.jpg",name:"Protein"}
  ]
  return (
    <div className="flex-grow flex flex-col min-h-screen">
      {/* Introduction Section */}
      <section className="bg-gray-800">
        <Introduction />
      </section>
      {/* NFT Table Section */}
      <section className="bg-gray-800">
        <CardWithForm nft={nft}/>
      </section>
    </div>
  );
};

export default Receiver;
