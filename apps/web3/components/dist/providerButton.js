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
var react_1 = require("react");
var provider_1 = require("@/service/provider/provider");
var FoodInfo_1 = require("./FoodInfo");
var perawallet_1 = require("@/service/perawallet");
function ProvideButton() {
    var _this = this;
    var openModal = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (document) {
                document.getElementById("my_modal").showModal();
            }
            return [2 /*return*/];
        });
    }); };
    function handleProvide() {
        var _a, _b;
        FoodInfo_1.food_available(["X7L25VOSPEVBIXW7Q23BXK4KQH2B56BTOOZV5ZIJP2XWOKYOBNLVAZXL4I", "KECEDZAD6MO22FDOAW3WSUZUJCSROLKDUBZLT346D45VB3HOY3U4LU2ARQ"]);
        if (perawallet_1.peraWallet.isConnected && ((_a = perawallet_1.peraWallet.connector) === null || _a === void 0 ? void 0 : _a.accounts[0])) {
            provider_1.dispatch_food((_b = perawallet_1.peraWallet.connector) === null || _b === void 0 ? void 0 : _b.accounts[0], 478015997, 10, 'SUTRISEIK235VUXAEYRT4NU6Y72TTP7JUF3VSDRMJHUV47KPBSHEEFBG5Y');
        }
        // @ts-ignore
    }
    var _a = react_1.useState(""), provider = _a[0], setProvider = _a[1];
    var _b = react_1.useState(""), powerType = _b[0], setPowerType = _b[1];
    var _c = react_1.useState(0), capacity = _c[0], setCapacity = _c[1];
    var _d = react_1.useState(""), location = _d[0], setLocation = _d[1];
    var _e = react_1.useState(false), loading = _e[0], setLoading = _e[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("button", { className: "btn btn-success mb-10", onClick: openModal }, "Sell Power"),
        React.createElement("dialog", { id: "my_modal", className: "modal" },
            React.createElement("form", { method: "dialog", className: "modal-box text-black sell_modal" },
                React.createElement("h3", { className: "font-bold text-lg text-center" }, "Sell Power"),
                React.createElement("div", { className: "px-16 pb-4 flex flex-col space-y-5 mt-8" },
                    React.createElement("select", { className: "select select-bordered w-full bg-white", onChange: function (e) { return setPowerType(e.target.value); }, defaultValue: 'DEFAULT' },
                        React.createElement("option", null, "Solar"),
                        React.createElement("option", null, "Hydro"),
                        React.createElement("option", null, "Wind")),
                    provider == "" && (React.createElement("input", { type: "text", placeholder: "Food", className: "input input-bordered w-full  bg-white", 
                        // @ts-ignore
                        onChange: function (e) { return setProvider(e.target.value); } })),
                    React.createElement("input", { type: "text", placeholder: "Amount", className: "input input-bordered w-full  bg-white", 
                        // @ts-ignore
                        onChange: function (e) { return setCapacity(e.target.value); } }),
                    React.createElement("input", { type: "text", placeholder: "Date", className: "input input-bordered w-full bg-white", onChange: function (e) { return setLocation(e.target.value); } }),
                    React.createElement("button", { type: "button", className: "btn btn-success mb-10", onClick: handleProvide }, "Provide"))),
            React.createElement("form", { method: "dialog", className: "modal-backdrop" },
                React.createElement("button", null, "close")))));
}
exports["default"] = ProvideButton;
