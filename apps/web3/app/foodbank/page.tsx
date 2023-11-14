// Import the necessary components
import React from "react";
import Introduction from "@/components/foodbank/Introduction";
import { CardWithForm } from "@/components/foodbank/card";

const Foodbank = () => {

  return (
    <div className="flex-grow flex flex-col min-h-screen">
      {/* Introduction Section */}
      <section className="bg-gray-800">
        <Introduction />
      </section>
      {/* NFT Table Section */}
      <section className="bg-gray-800">
        <CardWithForm/>
      </section>
    </div>
  );
};

export default Foodbank;
