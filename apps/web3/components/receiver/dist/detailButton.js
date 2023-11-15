"use strict";
exports.__esModule = true;
var stringify_1 = require("../../utils/stringify");
var provider_1 = require("../../service/provider/provider");
var perawallet_1 = require("@/service/perawallet");
function DetailButton(props) {
    var request = function () {
        var _a, _b;
        if (props.amount < 1) {
            alert("Food Unavailable!");
        }
        else {
            if (perawallet_1.peraWallet.isConnected && ((_a = perawallet_1.peraWallet.connector) === null || _a === void 0 ? void 0 : _a.accounts[0])) {
                provider_1.request_food(props.id, (_b = perawallet_1.peraWallet.connector) === null || _b === void 0 ? void 0 : _b.accounts[0]);
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
                        document.getElementById("my_modal_" + props.id).showModal();
                    }
                } }, "Detail"),
            React.createElement("dialog", { id: "my_modal_" + props.id, className: "modal" },
                React.createElement("form", { method: "dialog", className: "modal-box bg-white py-10" },
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
                        React.createElement("div", null,
                            React.createElement("button", { type: "button", className: "btn btn-success w-full mt-6", onClick: request }, "Request"))),
                    React.createElement("button", null, "close")))));
    }
    else {
        return (React.createElement(React.Fragment, null));
    }
}
exports["default"] = DetailButton;
