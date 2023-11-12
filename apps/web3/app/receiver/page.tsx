'use client'
import React from "react"
import Link from "next/link"
import Loading from "@/components/loading";
import ProvideButton from "@/components/providerButton";

export default function Receiver(){



  const isLoading = false

  return (
    <>
    {isLoading?(
      <Loading />
    ):(
      <div className="flex mx-auto my-10">
        <div>
          <div className="mb-5">
            <ProvideButton />
          </div>
        </div>
      </div>
    )}
    </>
  );
}