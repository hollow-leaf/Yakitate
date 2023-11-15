"use strict";
exports.__esModule = true;
exports.Wallet = exports.peraWallet = void 0;
var connect_1 = require("@perawallet/connect");
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var userSlice_1 = require("@/store/userSlice");
// Create the PeraWalletConnect instance outside of the component
exports.peraWallet = new connect_1.PeraWalletConnect({ chainId: 416002 });
function Wallet() {
    var _a = react_1.useState(''), accountAddress = _a[0], setAccountAddress = _a[1];
    var isConnectedToPeraWallet = !!accountAddress;
    react_1.useEffect(function () {
        // Reconnect to the session when the component is mounted
        exports.peraWallet.reconnectSession().then(function (accounts) {
            var _a;
            // Setup the disconnect event listener
            (_a = exports.peraWallet.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", handleDisconnectWalletClick);
            if (accounts.length) {
                setAccountAddress(accounts[0]);
                dispatch(userSlice_1.setLogin({ address: accounts[0] }));
            }
        });
    }, []);
    var state = react_redux_1.useSelector(function (state) { return state.user; });
    var dispatch = react_redux_1.useDispatch();
    return (React.createElement("div", { className: "text-white flex items-center space-x-4" },
        React.createElement("div", null,
            React.createElement("p", { onClick: handleCopyClick }, accountAddress)),
        React.createElement("div", null,
            React.createElement("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", onClick: isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick }, isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"))));
    function handleConnectWalletClick() {
        exports.peraWallet
            .connect()
            .then(function (newAccounts) {
            var _a;
            // Setup the disconnect event listener
            (_a = exports.peraWallet.connector) === null || _a === void 0 ? void 0 : _a.on("disconnect", handleDisconnectWalletClick);
            setAccountAddress(newAccounts[0]);
        })["catch"](function (error) {
            var _a;
            // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
            // For the async/await syntax you MUST use try/catch
            if (((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.type) !== "CONNECT_MODAL_CLOSED") {
                // log the necessary errors
            }
        });
    }
    function handleDisconnectWalletClick() {
        exports.peraWallet.disconnect();
        dispatch(userSlice_1.setLogout());
        setAccountAddress("");
    }
    function handleCopyClick() {
        // Create a temporary input element
        var tempInput = document.createElement('textarea');
        tempInput.value = accountAddress;
        // Append the input element to the DOM
        document.body.appendChild(tempInput);
        // Select the text inside the input
        tempInput.select();
        try {
            // Execute the copy command
            document.execCommand('copy');
            alert('Address copied to clipboard!');
        }
        catch (err) {
            console.error('Unable to copy text', err);
        }
        finally {
            // Remove the temporary input element
            document.body.removeChild(tempInput);
        }
    }
}
exports.Wallet = Wallet;
