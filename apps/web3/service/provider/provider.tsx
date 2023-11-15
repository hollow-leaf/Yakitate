import algosdk from "algosdk"
import {PeraWalletConnect} from "@perawallet/connect"
import { peraWallet } from "../perawallet";

const algodToken = 'a'.repeat(64);
const algodServer = 'https://testnet-api.algonode.cloud';

const appID = 479617162;

export async function provide_food(creator: string, food: string, amount: number){
    const algodClient = new algosdk.Algodv2(algodToken, algodServer);

    const suggestedParams = await algodClient.getTransactionParams().do();
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    from: creator,
    suggestedParams,
    defaultFrozen: false,
    unitName: 'f',
    assetName: food,
    manager: creator,
    reserve: creator,
    freeze: creator,
    clawback: creator,
    assetURL: " ",
    total: amount,
    decimals: 0,
    });

    const singleTxnGroups = [{txn: txn, signers: [creator]}];

    const signedTxn = await peraWallet.signTransaction([singleTxnGroups]);
    await algodClient.sendRawTransaction(signedTxn).do();
    const result = await algosdk.waitForConfirmation(
        algodClient,
        txn.txID().toString(),
        3
    );

    
    const assetIndex = result['asset-index'];
    console.log(`Asset ID created: ${assetIndex}`);
    return assetIndex;
    
}

export async function dispatch_food(from: string, Id: number, amount: number, receiver: string){
    const algodClient = new algosdk.Algodv2(algodToken, algodServer);

    const suggestedParams = await algodClient.getTransactionParams().do();
    const xferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: from,
        to: receiver,
        suggestedParams,
        assetIndex:Id,
        amount: amount,
    });

    const freezeTxn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
        from: from,
        suggestedParams,
        assetIndex: Id,
        // freezeState: false would unfreeze the account's asset holding
        freezeState: true,
        // freezeTarget is the account that is being frozen or unfrozen
        freezeTarget: receiver,
    });
      
    const singleTxnGroups = [{txn: xferTxn, signers: [from]}, {txn: freezeTxn, signers: [from]}];

    const signedXferTxn = await peraWallet.signTransaction([singleTxnGroups]);
    await algodClient.sendRawTransaction(signedXferTxn[0]).do();
    await algodClient.sendRawTransaction(signedXferTxn[1]).do();
    await algosdk.waitForConfirmation(algodClient, xferTxn.txID().toString(), 3);
    await algosdk.waitForConfirmation(algodClient, freezeTxn.txID().toString(), 3);
}

export async function request_food(Id: number, receiver: string){
    const algodClient = new algosdk.Algodv2(algodToken, algodServer);

    const suggestedParams = await algodClient.getTransactionParams().do();
    // opt-in is simply a 0 amount transfer of the asset to oneself
    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: receiver,
        to: receiver,
        suggestedParams,
        assetIndex: Id,
        amount: 0,
    });

    const singleTxnGroups = [{txn: optInTxn, signers: [receiver]}];

    const signedOptInTxn = await peraWallet.signTransaction([singleTxnGroups]);
    await algodClient.sendRawTransaction(signedOptInTxn).do();
    await algosdk.waitForConfirmation(algodClient, optInTxn.txID().toString(), 3);

}

export async function transfer_food(from: string, Id: number, receiver: string){
    const algodClient = new algosdk.Algodv2(algodToken, algodServer);

    const suggestedParams = await algodClient.getTransactionParams().do();
    const configTxn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({
        from: from,
        manager: receiver,
        freeze: from,
        clawback: from,
        reserve: undefined,
        suggestedParams,
        assetIndex: Id,
        // don't throw error if freeze, clawback, or manager are empty
        strictEmptyAddressChecking: false,
      });
      
    const singleTxnGroups = [{txn: configTxn, signers: [from]}];
    const signedXferTxn = await peraWallet.signTransaction([singleTxnGroups]);
    await algodClient.sendRawTransaction(signedXferTxn).do();
    await algosdk.waitForConfirmation(algodClient, configTxn.txID().toString(), 3);
    
}

export async function retrieveAsset(assetIndex:number){
    const algodClient = new algosdk.Algodv2(algodToken, algodServer);
    
    const assetInfo = await algodClient.getAssetByID(assetIndex).do();
    console.log(`Asset Name: ${assetInfo.params.name}`);
    console.log(`Asset Params: ${assetInfo.params}`);
    
}


export async function register(from: string){
    const algodClient = new algosdk.Algodv2(algodToken, algodServer);
    const suggestedParams = await algodClient.getTransactionParams().do();

    const boxATC = new algosdk.AtomicTransactionComposer();

    const boxAccessorMethod = new algosdk.ABIMethod({
        name: 'NewRegister',
        args: [
            {
                "type": "address",
                "name": "member"
            }
        ],
        returns: { "type": "uint64" },
      });

    const boxKey = new Uint8Array(Buffer.from('Members'));
    boxATC.addMethodCall({
        appID: appID,
        method: boxAccessorMethod,
        //address
        methodArgs: [from],
        boxes: [
        {
            appIndex: appID,
            name: boxKey,
        },{
            appIndex: appID,
            name: boxKey,
        },
        ],
        sender: from,
        signer: async (unsignedTxns) => {
            // Create an array of transaction groups with the unsigned transactions and the signers
            const txnGroups = unsignedTxns.map((t) => ({txn: t, signers: [from]}));
            // Call the signTransaction method of the peraWallet instance and return the signed transactions
            return await peraWallet.signTransaction([txnGroups]);
        },
        suggestedParams,
    });
    const result = await boxATC.execute(algodClient, 4);
  for (const mr of result.methodResults) {
    console.log(`${mr.returnValue}`);
  }
}


export async function isProvider(addr: string){

    const algodClient = new algosdk.Algodv2(algodToken, algodServer);
    const suggestedParams = await algodClient.getTransactionParams().do();
    const sender = algosdk.mnemonicToSecretKey("soldier two kind supply fork bone hamster now language sheriff cinnamon success please vendor carpet whale matrix size media crystal club clump mystery above front")
    const siger = algosdk.makeBasicAccountTransactionSigner(sender)

    const boxATC = new algosdk.AtomicTransactionComposer();

    const boxAccessorMethod = new algosdk.ABIMethod({
        name: 'IsRegister',
        args: [
            {
                "type": "uint64",
                "name": "offset"
              },
              {
                "type": "address",
                "name": "addr"
              }
        ],
        returns: { "type": "bool" },
      });

    const boxKey = new Uint8Array(Buffer.from('Members'));
    boxATC.addMethodCall({
        appID: appID,
        method: boxAccessorMethod,
        //address
        methodArgs: [0, addr],
        boxes: [
        {
            appIndex: appID,
            name: boxKey,
        },{
            appIndex: appID,
            name: boxKey,
        },
        ],
        sender: sender.addr,
        signer: siger,
        suggestedParams,
    });
    const result = await boxATC.execute(algodClient, 4);
    for (const mr of result.methodResults) {
        console.log(`${mr.returnValue}`);
    }
}

export async function provider_list(){
    var providers_list: string[] = [];

    const algodClient = new algosdk.Algodv2(algodToken, algodServer);
    const suggestedParams = await algodClient.getTransactionParams().do();
    const sender = algosdk.mnemonicToSecretKey("soldier two kind supply fork bone hamster now language sheriff cinnamon success please vendor carpet whale matrix size media crystal club clump mystery above front")
    const siger = algosdk.makeBasicAccountTransactionSigner(sender)

    //Providers number
    var provider_number: number = 0;
    const ATC = new algosdk.AtomicTransactionComposer();
    const AccessorMethod = new algosdk.ABIMethod({
        name: 'readIndex',
        args: [],
        returns: { "type": "uint64" },
      });

    ATC.addMethodCall({
        appID: appID,
        method: AccessorMethod,
        //address
        methodArgs: [],
        boxes: [],
        sender: sender.addr,
        signer: siger,
        suggestedParams,
    });
    const result = await ATC.execute(algodClient, 4);
    for (const mr of result.methodResults) {
        console.log(`${mr.returnValue}`);
        if(mr.returnValue){
            provider_number = Number(mr.returnValue)
        }
    }

    //ask for provider list
    const boxATC = new algosdk.AtomicTransactionComposer();

    const boxAccessorMethod = new algosdk.ABIMethod({
        name: 'AddressByIndex',
        args: [
            {
                "type": "uint64",
                "name": "index"
            }
        ],
        returns: { "type": "address" },
      });

    const boxKey = new Uint8Array(Buffer.from('Members'));

    for(var i=0; i<provider_number; i++){
        boxATC.addMethodCall({
            appID: appID,
            method: boxAccessorMethod,
            //address
            methodArgs: [i],
            boxes: [
            {
                appIndex: appID,
                name: boxKey,
            },{
                appIndex: appID,
                name: boxKey,
            },
            ],
            sender: sender.addr,
            signer: siger,
            suggestedParams,
        });
    }
    
    const result_list = await boxATC.execute(algodClient, 4);
    for (const mr of result_list.methodResults) {
        providers_list.push(String(mr.returnValue))
    }

    console.log(providers_list)
    return providers_list;
}