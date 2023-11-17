import { food } from "@/interface";
import { formatAddress } from "../../utils/stringify";
import ProviderDetailButton from "./providerdetailButton";
import Image from "next/image";

function ProviderTableItem(props: food) {
  return (
    <div className="fooditem border border-blue-200 shadow-lg backdrop-blur-lg backdrop-filter rounded-lg p-6">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <Image
          src={"bread.jpg"}
          alt="bread"
          width={300}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="saletext">
        <p className="mt-1 text-lg font-medium text-gray-900">Asset ID: {props.id}</p>
        <p className="mt-1 text-lg font-medium text-gray-900">Provider: {formatAddress(props.provider)}</p>
        <p className="mt-1 text-lg font-medium text-gray-900">Name: {props.name}</p>
        <p className="mt-1 text-lg font-medium text-gray-900">Amount: {props.amount}</p>
      </div>
      <ProviderDetailButton amount={props.amount} id={props.id} name={props.name} provider={props.provider} total={props.total} url={props.url} />
    </div>
  );
}

export default ProviderTableItem;
