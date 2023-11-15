"use strict";
exports.__esModule = true;
var stringify_1 = require("../../utils/stringify");
var detailButton_1 = require("./detailButton");
function ReceiverTableItem(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "fooditem" },
            React.createElement("div", { className: "aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" },
                React.createElement("img", { 
                    // @ts-ignore
                    src: "bread.jpg", className: "h-full w-full object-cover object-center group-hover:opacity-75" })),
            React.createElement("div", { className: "saletext" },
                React.createElement("p", { className: "mt-1 text-lg font-medium text-gray-900" },
                    "Asset ID: ",
                    props.id),
                React.createElement("p", { className: "mt-1 text-lg font-medium text-gray-900" },
                    "Provider: ",
                    stringify_1.formatAddress(props.provider)),
                React.createElement("p", { className: "mt-1 text-lg font-medium text-gray-900" },
                    "Name: ",
                    props.name),
                React.createElement("p", { className: "mt-1 text-lg font-medium text-gray-900" },
                    "Amount: ",
                    props.amount)),
            React.createElement(detailButton_1["default"], { amount: props.amount, id: props.id, name: props.name, provider: props.provider, total: props.total, url: props.url }))));
}
exports["default"] = ReceiverTableItem;
