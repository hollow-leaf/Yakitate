import algosdk from "algosdk"
import {PeraWalletConnect} from "@perawallet/connect"
import { peraWallet } from "../perawallet";

const algodToken = 'a'.repeat(64);
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = 4001;

const algodClient = new algosdk.Algodv2(algodToken, algodServer);

export async function provide_food(creator: string, food: string, amount: number, url: string){

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
    assetURL: url,
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