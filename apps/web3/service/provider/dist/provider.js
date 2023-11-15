"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.provider_list = exports.isProvider = exports.register = exports.retrieveAsset = exports.transfer_food = exports.request_food = exports.dispatch_food = exports.provide_food = void 0;
var algosdk_1 = require("algosdk");
var perawallet_1 = require("../perawallet");
var algodToken = 'a'.repeat(64);
var algodServer = 'https://testnet-api.algonode.cloud';
var appID = 479617162;
function provide_food(creator, food, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var algodClient, suggestedParams, txn, singleTxnGroups, signedTxn, result, assetIndex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algodClient = new algosdk_1["default"].Algodv2(algodToken, algodServer);
                    return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                case 1:
                    suggestedParams = _a.sent();
                    txn = algosdk_1["default"].makeAssetCreateTxnWithSuggestedParamsFromObject({
                        from: creator,
                        suggestedParams: suggestedParams,
                        defaultFrozen: false,
                        unitName: 'f',
                        assetName: food,
                        manager: creator,
                        reserve: creator,
                        freeze: creator,
                        clawback: creator,
                        assetURL: " ",
                        total: amount,
                        decimals: 0
                    });
                    singleTxnGroups = [{ txn: txn, signers: [creator] }];
                    return [4 /*yield*/, perawallet_1.peraWallet.signTransaction([singleTxnGroups])];
                case 2:
                    signedTxn = _a.sent();
                    return [4 /*yield*/, algodClient.sendRawTransaction(signedTxn)["do"]()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, algosdk_1["default"].waitForConfirmation(algodClient, txn.txID().toString(), 3)];
                case 4:
                    result = _a.sent();
                    assetIndex = result['asset-index'];
                    console.log("Asset ID created: " + assetIndex);
                    return [2 /*return*/, assetIndex];
            }
        });
    });
}
exports.provide_food = provide_food;
function dispatch_food(from, Id, amount, receiver) {
    return __awaiter(this, void 0, void 0, function () {
        var algodClient, suggestedParams, xferTxn, freezeTxn, singleTxnGroups, signedXferTxn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algodClient = new algosdk_1["default"].Algodv2(algodToken, algodServer);
                    return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                case 1:
                    suggestedParams = _a.sent();
                    xferTxn = algosdk_1["default"].makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: from,
                        to: receiver,
                        suggestedParams: suggestedParams,
                        assetIndex: Id,
                        amount: amount
                    });
                    freezeTxn = algosdk_1["default"].makeAssetFreezeTxnWithSuggestedParamsFromObject({
                        from: from,
                        suggestedParams: suggestedParams,
                        assetIndex: Id,
                        // freezeState: false would unfreeze the account's asset holding
                        freezeState: true,
                        // freezeTarget is the account that is being frozen or unfrozen
                        freezeTarget: receiver
                    });
                    singleTxnGroups = [{ txn: xferTxn, signers: [from] }, { txn: freezeTxn, signers: [from] }];
                    return [4 /*yield*/, perawallet_1.peraWallet.signTransaction([singleTxnGroups])];
                case 2:
                    signedXferTxn = _a.sent();
                    return [4 /*yield*/, algodClient.sendRawTransaction(signedXferTxn[0])["do"]()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, algodClient.sendRawTransaction(signedXferTxn[1])["do"]()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, algosdk_1["default"].waitForConfirmation(algodClient, xferTxn.txID().toString(), 3)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, algosdk_1["default"].waitForConfirmation(algodClient, freezeTxn.txID().toString(), 3)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.dispatch_food = dispatch_food;
function request_food(Id, receiver) {
    return __awaiter(this, void 0, void 0, function () {
        var algodClient, suggestedParams, optInTxn, singleTxnGroups, signedOptInTxn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algodClient = new algosdk_1["default"].Algodv2(algodToken, algodServer);
                    return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                case 1:
                    suggestedParams = _a.sent();
                    optInTxn = algosdk_1["default"].makeAssetTransferTxnWithSuggestedParamsFromObject({
                        from: receiver,
                        to: receiver,
                        suggestedParams: suggestedParams,
                        assetIndex: Id,
                        amount: 0
                    });
                    singleTxnGroups = [{ txn: optInTxn, signers: [receiver] }];
                    return [4 /*yield*/, perawallet_1.peraWallet.signTransaction([singleTxnGroups])];
                case 2:
                    signedOptInTxn = _a.sent();
                    return [4 /*yield*/, algodClient.sendRawTransaction(signedOptInTxn)["do"]()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, algosdk_1["default"].waitForConfirmation(algodClient, optInTxn.txID().toString(), 3)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.request_food = request_food;
function transfer_food(from, Id, receiver) {
    return __awaiter(this, void 0, void 0, function () {
        var algodClient, suggestedParams, configTxn, singleTxnGroups, signedXferTxn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algodClient = new algosdk_1["default"].Algodv2(algodToken, algodServer);
                    return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                case 1:
                    suggestedParams = _a.sent();
                    configTxn = algosdk_1["default"].makeAssetConfigTxnWithSuggestedParamsFromObject({
                        from: from,
                        manager: receiver,
                        freeze: from,
                        clawback: from,
                        reserve: undefined,
                        suggestedParams: suggestedParams,
                        assetIndex: Id,
                        // don't throw error if freeze, clawback, or manager are empty
                        strictEmptyAddressChecking: false
                    });
                    singleTxnGroups = [{ txn: configTxn, signers: [from] }];
                    return [4 /*yield*/, perawallet_1.peraWallet.signTransaction([singleTxnGroups])];
                case 2:
                    signedXferTxn = _a.sent();
                    return [4 /*yield*/, algodClient.sendRawTransaction(signedXferTxn)["do"]()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, algosdk_1["default"].waitForConfirmation(algodClient, configTxn.txID().toString(), 3)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.transfer_food = transfer_food;
function retrieveAsset(assetIndex) {
    return __awaiter(this, void 0, void 0, function () {
        var algodClient, assetInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    algodClient = new algosdk_1["default"].Algodv2(algodToken, algodServer);
                    return [4 /*yield*/, algodClient.getAssetByID(assetIndex)["do"]()];
                case 1:
                    assetInfo = _a.sent();
                    console.log("Asset Name: " + assetInfo.params.name);
                    console.log("Asset Params: " + assetInfo.params);
                    return [2 /*return*/];
            }
        });
    });
}
exports.retrieveAsset = retrieveAsset;
function register(from) {
    return __awaiter(this, void 0, void 0, function () {
        var algodClient, suggestedParams, boxATC, boxAccessorMethod, boxKey, result, _i, _a, mr;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    algodClient = new algosdk_1["default"].Algodv2(algodToken, algodServer);
                    return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                case 1:
                    suggestedParams = _b.sent();
                    boxATC = new algosdk_1["default"].AtomicTransactionComposer();
                    boxAccessorMethod = new algosdk_1["default"].ABIMethod({
                        name: 'NewRegister',
                        args: [
                            {
                                "type": "address",
                                "name": "member"
                            }
                        ],
                        returns: { "type": "uint64" }
                    });
                    boxKey = new Uint8Array(Buffer.from('Members'));
                    boxATC.addMethodCall({
                        appID: appID,
                        method: boxAccessorMethod,
                        //address
                        methodArgs: [from],
                        boxes: [
                            {
                                appIndex: appID,
                                name: boxKey
                            }, {
                                appIndex: appID,
                                name: boxKey
                            },
                        ],
                        sender: from,
                        signer: function (unsignedTxns) { return __awaiter(_this, void 0, void 0, function () {
                            var txnGroups;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        txnGroups = unsignedTxns.map(function (t) { return ({ txn: t, signers: [from] }); });
                                        return [4 /*yield*/, perawallet_1.peraWallet.signTransaction([txnGroups])];
                                    case 1: 
                                    // Call the signTransaction method of the peraWallet instance and return the signed transactions
                                    return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); },
                        suggestedParams: suggestedParams
                    });
                    return [4 /*yield*/, boxATC.execute(algodClient, 4)];
                case 2:
                    result = _b.sent();
                    for (_i = 0, _a = result.methodResults; _i < _a.length; _i++) {
                        mr = _a[_i];
                        console.log("" + mr.returnValue);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.register = register;
function isProvider(addr) {
    return __awaiter(this, void 0, void 0, function () {
        var algodClient, suggestedParams, sender, siger, boxATC, boxAccessorMethod, boxKey, result, _i, _a, mr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    algodClient = new algosdk_1["default"].Algodv2(algodToken, algodServer);
                    return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                case 1:
                    suggestedParams = _b.sent();
                    sender = algosdk_1["default"].mnemonicToSecretKey("soldier two kind supply fork bone hamster now language sheriff cinnamon success please vendor carpet whale matrix size media crystal club clump mystery above front");
                    siger = algosdk_1["default"].makeBasicAccountTransactionSigner(sender);
                    boxATC = new algosdk_1["default"].AtomicTransactionComposer();
                    boxAccessorMethod = new algosdk_1["default"].ABIMethod({
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
                        returns: { "type": "bool" }
                    });
                    boxKey = new Uint8Array(Buffer.from('Members'));
                    boxATC.addMethodCall({
                        appID: appID,
                        method: boxAccessorMethod,
                        //address
                        methodArgs: [0, addr],
                        boxes: [
                            {
                                appIndex: appID,
                                name: boxKey
                            }, {
                                appIndex: appID,
                                name: boxKey
                            },
                        ],
                        sender: sender.addr,
                        signer: siger,
                        suggestedParams: suggestedParams
                    });
                    return [4 /*yield*/, boxATC.execute(algodClient, 4)];
                case 2:
                    result = _b.sent();
                    for (_i = 0, _a = result.methodResults; _i < _a.length; _i++) {
                        mr = _a[_i];
                        console.log("" + mr.returnValue);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.isProvider = isProvider;
function provider_list() {
    return __awaiter(this, void 0, void 0, function () {
        var providers_list, algodClient, suggestedParams, sender, siger, provider_number, ATC, AccessorMethod, result, _i, _a, mr, boxATC, boxAccessorMethod, boxKey, i, result_list, _b, _c, mr;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    providers_list = [];
                    algodClient = new algosdk_1["default"].Algodv2(algodToken, algodServer);
                    return [4 /*yield*/, algodClient.getTransactionParams()["do"]()];
                case 1:
                    suggestedParams = _d.sent();
                    sender = algosdk_1["default"].mnemonicToSecretKey("soldier two kind supply fork bone hamster now language sheriff cinnamon success please vendor carpet whale matrix size media crystal club clump mystery above front");
                    siger = algosdk_1["default"].makeBasicAccountTransactionSigner(sender);
                    provider_number = 0;
                    ATC = new algosdk_1["default"].AtomicTransactionComposer();
                    AccessorMethod = new algosdk_1["default"].ABIMethod({
                        name: 'readIndex',
                        args: [],
                        returns: { "type": "uint64" }
                    });
                    ATC.addMethodCall({
                        appID: appID,
                        method: AccessorMethod,
                        //address
                        methodArgs: [],
                        boxes: [],
                        sender: sender.addr,
                        signer: siger,
                        suggestedParams: suggestedParams
                    });
                    return [4 /*yield*/, ATC.execute(algodClient, 4)];
                case 2:
                    result = _d.sent();
                    for (_i = 0, _a = result.methodResults; _i < _a.length; _i++) {
                        mr = _a[_i];
                        console.log("" + mr.returnValue);
                        if (mr.returnValue) {
                            provider_number = Number(mr.returnValue);
                        }
                    }
                    boxATC = new algosdk_1["default"].AtomicTransactionComposer();
                    boxAccessorMethod = new algosdk_1["default"].ABIMethod({
                        name: 'AddressByIndex',
                        args: [
                            {
                                "type": "uint64",
                                "name": "index"
                            }
                        ],
                        returns: { "type": "address" }
                    });
                    boxKey = new Uint8Array(Buffer.from('Members'));
                    for (i = 0; i < provider_number; i++) {
                        boxATC.addMethodCall({
                            appID: appID,
                            method: boxAccessorMethod,
                            //address
                            methodArgs: [i],
                            boxes: [
                                {
                                    appIndex: appID,
                                    name: boxKey
                                }, {
                                    appIndex: appID,
                                    name: boxKey
                                },
                            ],
                            sender: sender.addr,
                            signer: siger,
                            suggestedParams: suggestedParams
                        });
                    }
                    return [4 /*yield*/, boxATC.execute(algodClient, 4)];
                case 3:
                    result_list = _d.sent();
                    for (_b = 0, _c = result_list.methodResults; _b < _c.length; _b++) {
                        mr = _c[_b];
                        providers_list.push(String(mr.returnValue));
                    }
                    console.log(providers_list);
                    return [2 /*return*/, providers_list];
            }
        });
    });
}
exports.provider_list = provider_list;
