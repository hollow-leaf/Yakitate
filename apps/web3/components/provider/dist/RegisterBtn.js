"use strict";
exports.__esModule = true;
exports.RegitsterBtn = void 0;
var alert_dialog_for_register_1 = require("@/components/ui/alert-dialog-for-register");
var button_1 = require("@/components/ui/button");
var input_1 = require("../ui/input");
var provider_1 = require("../../service/provider/provider");
var perawallet_1 = require("../../service/perawallet");
function RegitsterBtn() {
    return (React.createElement(alert_dialog_for_register_1.AlertDialog, null,
        React.createElement(alert_dialog_for_register_1.AlertDialogTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline" }, "Register")),
        React.createElement(alert_dialog_for_register_1.AlertDialogContent, null,
            React.createElement("div", null,
                "Address:",
                React.createElement(input_1.Input, { type: "text" }),
                React.createElement("br", null)),
            React.createElement(alert_dialog_for_register_1.AlertDialogFooter, null,
                React.createElement(alert_dialog_for_register_1.AlertDialogCancel, null, "Cancel"),
                React.createElement(alert_dialog_for_register_1.AlertDialogAction, { onClick: function () {
                        var _a, _b;
                        if ((_a = perawallet_1.peraWallet.connector) === null || _a === void 0 ? void 0 : _a.accounts[0]) {
                            provider_1.register((_b = perawallet_1.peraWallet.connector) === null || _b === void 0 ? void 0 : _b.accounts[0]);
                        }
                        else {
                            console.log(perawallet_1.peraWallet.isConnected);
                            console.log("not connect");
                        }
                    } }, "Submit")))));
}
exports.RegitsterBtn = RegitsterBtn;
