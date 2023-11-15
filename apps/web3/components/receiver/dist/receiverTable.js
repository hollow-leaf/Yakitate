"use strict";
exports.__esModule = true;
var receiverTableItem_1 = require("./receiverTableItem");
function ReceiverTable(props) {
    console.log(props.foods);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "bg-white" },
            React.createElement("div", { className: "mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8" },
                React.createElement("h2", { className: "sr-only" }, "Food Available"),
                React.createElement("div", { className: "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" }, props.foods.map(function (item) {
                    return React.createElement(receiverTableItem_1["default"], { amount: item.amount, id: item.id, name: item.name, provider: item.provider, total: item.total, url: item.url, key: item.id });
                }))))));
}
exports["default"] = ReceiverTable;
