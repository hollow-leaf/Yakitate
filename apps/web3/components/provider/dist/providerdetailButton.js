"use strict";
exports.__esModule = true;
var stringify_1 = require("../../utils/stringify");
var perawallet_1 = require("@/service/perawallet");
var provider_1 = require("@/service/provider/provider");
function ProviderDetailButton(props) {
    var request = function () {
        var _a, _b;
        if (props.amount < 1) {
            alert("Food Unavailable!");
        }
        else {
            if (perawallet_1.peraWallet.isConnected && ((_a = perawallet_1.peraWallet.connector) === null || _a === void 0 ? void 0 : _a.accounts[0])) {
                provider_1.dispatch_food((_b = perawallet_1.peraWallet.connector) === null || _b === void 0 ? void 0 : _b.accounts[0], props.id, 1, "");
            }
            else {
                alert("Connect Wallet!");
            }
        }
    };
    if (props.amount > 0) {
        return (React.createElement("div", { key: props.id },
            React.createElement("button", { className: "saledetail font-medium text-gray-900", style: { textAlign: "center" }, 
                // @ts-ignore
                onClick: function () {
                    if (document) {
                        document.getElementById("my_modal_" + props.id + "_" + props.provider).showModal();
                    }
                } }, "Detail"),
            React.createElement("dialog", { id: "my_modal_" + props.id + "_" + props.provider, className: "modal" },
                React.createElement("form", { method: "dialog", className: "modal-box bg-white py-10", style: { background: "rgb(255, 255, 255, 0.95)", borderRadius: "1rem" } },
                    React.createElement("h3", { className: "font-bold text-lg", style: { textAlign: "center" } }, "DETAIL"),
                    React.createElement("div", { className: "px-16 mt-8 flex flex-col space-y-3" },
                        React.createElement("div", { className: "flex" },
                            React.createElement("p", null, "Provider"),
                            React.createElement("p", { className: "ml-auto" }, stringify_1.formatAddress(props.provider))),
                        React.createElement("div", { className: "flex " },
                            React.createElement("p", null, "Name"),
                            React.createElement("p", { className: "ml-auto" }, props.name)),
                        React.createElement("div", { className: "flex " },
                            React.createElement("p", null, "Amount"),
                            React.createElement("p", { className: "ml-auto" }, props.amount)),
                        React.createElement("div", { className: "flex " },
                            React.createElement("p", null, "Total"),
                            React.createElement("p", { className: "ml-auto" }, props.total)),
                        React.createElement("div", { className: "flex " },
                            React.createElement("p", null, "Used Rate"),
                            React.createElement("p", { className: "ml-auto" }, props.amount / props.total)),
                        React.createElement("div", { style: { padding: "3%" } },
                            React.createElement("button", { className: "button-1 btn btn-success w-full mt-6 " }, "close")))))));
    }
    else {
        return (React.createElement(React.Fragment, null));
    }
}
exports["default"] = ProviderDetailButton;
