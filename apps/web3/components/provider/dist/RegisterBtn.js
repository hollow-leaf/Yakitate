"use strict";
exports.__esModule = true;
exports.RegitsterBtn = void 0;
var alert_dialog_for_register_1 = require("@/components/ui/alert-dialog-for-register");
var button_1 = require("@/components/ui/button");
var provider_1 = require("../../service/provider/provider");
var perawallet_1 = require("../../service/perawallet");
function RegitsterBtn() {
    return (React.createElement(alert_dialog_for_register_1.AlertDialog, null,
        React.createElement(alert_dialog_for_register_1.AlertDialogTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline", onClick: function () {
                    var _a, _b;
                    if ((_a = perawallet_1.peraWallet.connector) === null || _a === void 0 ? void 0 : _a.accounts[0]) {
                        try {
                            provider_1.register((_b = perawallet_1.peraWallet.connector) === null || _b === void 0 ? void 0 : _b.accounts[0])["catch"](function (err) {
                                alert("You have registered!");
                            });
                        }
                        catch (err) {
                            alert("You have registered!");
                        }
                    }
                    else {
                        console.log(perawallet_1.peraWallet.isConnected);
                        console.log("not connect");
                    }
                } }, "Register"))));
}
exports.RegitsterBtn = RegitsterBtn;
