"use client";
import SectionTitle from "./SectionTitle";
import { ProvideBtn } from "./ProvideBtn";
import { RegitsterBtn } from "./RegisterBtn";

const Introduction = () => {

  return (
    <section
      id="what"
      className="relative z-10 py-16 md:py-20 lg:py-28 bg-white h-screen"
    >
      <div className="container mx-auto">
        <SectionTitle
          title="Register to be Provider"
          paragraph="In Yakitate, to become a food provider, you must register first. Please click the <Register> button below and provide your account address to complete the registration process. After registration, you will be able to click the <Provide> button below to offer your food."
          center
          mb="80px"
        />
        <div className="flex justify-center items-center mx-auto">
        <div className="w-1/5">
          <RegitsterBtn/>
          </div>
          <div className="">
          <ProvideBtn/>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;