import algosdk from "algosdk"
import axios from "axios";
import {asset, food} from "../interface";

const host = "https://testnet-api.algonode.cloud"

const algodToken = 'a'.repeat(64);
const algodServer =  "https://testnet-api.algonode.cloud";

const algodClient = new algosdk.Algodv2(algodToken, algodServer);


export async function food_available(provider_list: string[]) {
    console.log(provider_list)
    var foodlist: any[] = [];
    var food_available_count:number[] = [];
    var food_info_res_list: food[] = []
    
    provider_list.forEach(addr=>{
        foodlist.push(food_available_provider(addr))
    })


    await Promise.all(foodlist).then(list=>{
        foodlist = list
    })

    var food_info_list: any[] = []
    foodlist.forEach(foods=>{
        foods.forEach((food: asset)=>{
            food_available_count.push(food.amount)
            food_info_list.push(food_info(food))
        })
    })

    
    await Promise.all(food_info_list).then(list=>{
        food_info_list = list
    })

    for(var i=0; i<food_info_list.length; i++){
        food_info_res_list.push(
            {
                'amount': food_available_count[i],
                'id': food_info_list[i]['index'],
                'name': food_info_list[i]['params']['name'],
                'provider': food_info_list[i]['params']['creator'],
                'total': food_info_list[i]['params']['total'],
                'url': food_info_list[i]['params']['url']
            }
        )
    }

    console.log(food_info_res_list)
    return food_info_res_list

}

export async function food_available_provider(addr: string){
    try {
        const res = await axios({
            method: 'get',
            url: host+"/v2/accounts/"+addr,
            headers: {
                "X-Algo-Api-Token": algodToken
            }
        })
        if(res.data.assets){
            total_amount(res.data.assets)
            return res.data.assets
        }
    }catch (err) {
        console.log("error", err);
    }
}

function total_amount(assets: [asset]){
    var total = 0
    assets.forEach(asset=>{
        total = total + asset.amount
    })
    return total
}

export async function food_info(asset: asset){
    const assetInfo = await algodClient.getAssetByID(asset["asset-id"]).do(); 
    console.log(assetInfo)
    return assetInfo
}