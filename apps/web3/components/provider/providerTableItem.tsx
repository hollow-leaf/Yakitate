import { food } from "@/interface";
import { formatAddress } from "../../utils/stringify";
import ProviderDetailButton from "./providerdetailButton"

function ProviderTableItem(props: food) {

  return (
    <>
        <div className="fooditem">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                    // @ts-ignore
                    src={"bread.jpg"}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
            </div>
            <div className="saletext">
                <p className="mt-1 text-lg font-medium text-gray-900">Asset ID: {props.id}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">Provider: {formatAddress(props.provider)}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">Name: {props.name}</p>
                <p className="mt-1 text-lg font-medium text-gray-900">Amount: {props.amount}</p>
            </div>
            <ProviderDetailButton amount={props.amount} id={props.id} name={props.name} provider={props.provider} total={props.total} url={props.url}/>
        </div>
    </>
  );
}

export default ProviderTableItem;