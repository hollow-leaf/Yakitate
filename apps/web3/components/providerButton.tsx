import { useState } from "react";
import Loading from "./loading";
import { dispatch_food, provide_food, request_food, transfer_food } from "@/service/provider/provider";
import { food_available_provider, food_available, food_info } from "./FoodInfo";
import algosdk from "algosdk"
import { PeraWalletConnect } from "@perawallet/connect";
import { peraWallet } from "@/service/perawallet";

function ProvideButton() {
  const openModal = async () => {
    if (document) {
        (document.getElementById(`my_modal`) as HTMLFormElement).showModal();
        }
  };

  function handleProvide() {
    food_available(["X7L25VOSPEVBIXW7Q23BXK4KQH2B56BTOOZV5ZIJP2XWOKYOBNLVAZXL4I", "KECEDZAD6MO22FDOAW3WSUZUJCSROLKDUBZLT346D45VB3HOY3U4LU2ARQ"])
    if(peraWallet.isConnected&&peraWallet.connector?.accounts[0]){
        dispatch_food(peraWallet.connector?.accounts[0], 478015997, 10,'SUTRISEIK235VUXAEYRT4NU6Y72TTP7JUF3VSDRMJHUV47KPBSHEEFBG5Y')
    }
    // @ts-ignore
  }

  const [provider, setProvider] = useState("");
  const [powerType, setPowerType] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  

  return (
    <>
      <button className="btn btn-success mb-10" onClick={openModal}>
        Sell Power
      </button>
      <dialog id="my_modal" className="modal">
        <form method="dialog" className="modal-box text-black sell_modal">
          <h3 className="font-bold text-lg text-center">Sell Power</h3>
          <div className="px-16 pb-4 flex flex-col space-y-5 mt-8">
            <select
              className="select select-bordered w-full bg-white"
              onChange={(e) => setPowerType(e.target.value)}
              defaultValue={'DEFAULT'}
            >
              <option>Solar</option>
              <option>Hydro</option>
              <option>Wind</option>
            </select>
            {provider==""&&(<input
              type="text"
              placeholder="Food"
              className="input input-bordered w-full  bg-white"
              // @ts-ignore
              onChange={(e) => setProvider(e.target.value)}
            />)}
            <input
              type="text"
              placeholder="Amount"
              className="input input-bordered w-full  bg-white"
              // @ts-ignore
              onChange={(e) => setCapacity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Date"
              className="input input-bordered w-full bg-white"
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="button" className="btn btn-success mb-10" onClick={handleProvide}>
              Provide
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ProvideButton;