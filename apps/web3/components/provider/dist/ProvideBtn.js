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
exports.ProvideBtn = void 0;
var alert_dialog_for_Provide_1 = require("@/components/ui/alert-dialog-for-Provide");
var button_1 = require("@/components/ui/button");
var input_1 = require("../ui/input");
var react_1 = require("react");
var provider_1 = require("@/service/provider/provider");
var perawallet_1 = require("@/service/perawallet");
function ProvideBtn() {
    var _this = this;
    var _a = react_1.useState(''), inputcreator = _a[0], setInputcreator = _a[1];
    var _b = react_1.useState(''), inputfood = _b[0], setInputfood = _b[1];
    var _c = react_1.useState(''), inputamount = _c[0], setInputamount = _c[1];
    var _d = react_1.useState(''), assetIndex = _d[0], setAssetIndex = _d[1];
    var handleInputfood = function (e) {
        setInputfood(e.target.value);
    };
    var handleInputamount = function (e) {
        setInputamount(e.target.value);
    };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var numberValue, AssetIndex;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    numberValue = parseInt(inputamount, 10);
                    if (!((_a = perawallet_1.peraWallet.connector) === null || _a === void 0 ? void 0 : _a.accounts[0])) return [3 /*break*/, 2];
                    return [4 /*yield*/, provider_1.provide_food((_b = perawallet_1.peraWallet.connector) === null || _b === void 0 ? void 0 : _b.accounts[0], inputfood, numberValue)];
                case 1:
                    AssetIndex = _c.sent();
                    return [3 /*break*/, 3];
                case 2:
                    alert("Connect Wallet!");
                    _c.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(alert_dialog_for_Provide_1.AlertDialog, null,
        react_1["default"].createElement(alert_dialog_for_Provide_1.AlertDialogTrigger, { asChild: true },
            react_1["default"].createElement(button_1.Button, { variant: "outline" }, "Provide Food")),
        react_1["default"].createElement(alert_dialog_for_Provide_1.AlertDialogContent, null,
            react_1["default"].createElement("div", null,
                "food:",
                react_1["default"].createElement(input_1.Input, { type: "text", onChange: function (e) { return handleInputfood(e); } }),
                "amount:",
                react_1["default"].createElement(input_1.Input, { type: "text", onChange: function (e) { return handleInputamount(e); } }),
                react_1["default"].createElement("br", null)),
            react_1["default"].createElement(alert_dialog_for_Provide_1.AlertDialogFooter, null,
                react_1["default"].createElement(alert_dialog_for_Provide_1.AlertDialogCancel, null, "Cancel"),
                react_1["default"].createElement(alert_dialog_for_Provide_1.AlertDialogAction, { onClick: handleSubmit }, "Submit")))));
}
exports.ProvideBtn = ProvideBtn;
