'use client'
import React from "react"
import Link from "next/link"
import { CardDemo } from "@/components/provider/card"
import { AlertBtn } from "@/components/provider/alertBtn";
import Introduction from "@/components/provider/Introduction";

export default function Provider(){
    return (
        <div className="">
          <Introduction/>
          <CardDemo/>
          <h2>
            <Link href="/">Back to home</Link>
          </h2>
        </div>
      );
}