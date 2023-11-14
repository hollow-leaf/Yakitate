import axios from "axios";
const host = "https://testnet-api.algonode.cloud"

export async function getAssets(address:string) {
    try {
        const res = await axios({
            method: 'get',
            url: host + `/v2/accounts/${address}`,
            data: {
                address:address
            }
        })
        const assetId = res.data.assets.map((asset: { [x: string]: any; })=>asset['asset-id'])
    return assetId
    }
    catch (err) {
        console.log("error", err);
    }
}

export async function getCreateAssets(address: string) {
    try {
      const res = await axios({
        method: 'get',
        url: host + `/v2/accounts/${address}`,
        data: {
          address: address,
        },
      });
  
      const createdAssets = res.data["created-assets"];
      
      const assetNames = createdAssets.map((asset: any) => asset.params.name);
  
      return assetNames;
    } catch (err) {
      console.log("error", err);
    }
  }
  