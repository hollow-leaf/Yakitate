import { food } from "@/interface";
import { formatAddress } from "../../utils/stringify";
import { useState } from "react";
import {request_food} from "../../service/provider/provider"
import { peraWallet } from "@/service/perawallet";


function DetailButton(props: food) {
  
  const request = () => {
    if(props.amount<1){
        alert("Food Unavailable!")
    }else{
        if(peraWallet.isConnected&&peraWallet.connector?.accounts[0]){
            request_food(props.id, peraWallet.connector?.accounts[0])
        }else{
            alert("Connect Wallet!")
        }
    }
  }
  if(props.amount>0){
    return (
        <div key={props.id}>
        <button
            className="saledetail font-medium text-gray-900" style={{textAlign:"center"}}
            // @ts-ignore
            onClick={() => {
            if (document) {
                (
                document.getElementById(
                    `my_modal_${props.id}`
                ) as HTMLFormElement
                ).showModal();
            }
            }}
        >
            Detail
        </button>
        <dialog id={`my_modal_${props.id}`} className="modal">
            <form method="dialog" className="modal-box bg-white py-10">
            <h3 className="font-bold text-lg" style={{textAlign:"center"}}>DETAIL</h3>
            <div className="px-16 mt-8 flex flex-col space-y-3">
                <div className="flex">
                <p>Provider</p>
                <p className="ml-auto">{formatAddress(props.provider)}</p>
                </div>
                <div className="flex ">
                <p>Name</p>
                <p className="ml-auto">{props.name}</p>
                </div>
                <div className="flex ">
                <p>Amount</p>
                <p className="ml-auto">{props.amount}</p>
                </div>
                <div>
                <button type="button" className="btn btn-success w-full mt-6" onClick={request}>Request</button>
                </div>
            </div>
            <button>close</button>
            </form>
            
        </dialog>
        </div>
    );
  }else{
    return(
        <>
        </>
    )
  }
  
}

export default DetailButton;