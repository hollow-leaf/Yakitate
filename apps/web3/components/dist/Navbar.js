'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@headlessui/react");
var outline_1 = require("@heroicons/react/24/outline");
var link_1 = require("next/link");
var image_1 = require("next/image");
var perawallet_1 = require("@/service/perawallet");
var navigation = [
    { name: 'Provider', href: '/provider', current: true },
    { name: 'Receiver', href: '/receiver', current: false },
    { name: 'Food Bank', href: '/foodbank', current: false },
];
function Navbar() {
    return (react_1["default"].createElement(react_2.Disclosure, { as: "nav", className: "bg-gray-800" }, function (_a) {
        var open = _a.open;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" },
                react_1["default"].createElement("div", { className: "relative flex h-16 items-center justify-between" },
                    react_1["default"].createElement("div", { className: "absolute inset-y-0 left-0 flex items-center sm:hidden" },
                        react_1["default"].createElement(react_2.Disclosure.Button, { className: "relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" },
                            react_1["default"].createElement("span", { className: "absolute -inset-0.5" }),
                            react_1["default"].createElement("span", { className: "sr-only" }, "Open main menu"),
                            open ? (react_1["default"].createElement(outline_1.XMarkIcon, { className: "block h-6 w-6", "aria-hidden": "true" })) : (react_1["default"].createElement(outline_1.Bars3Icon, { className: "block h-6 w-6", "aria-hidden": "true" })))),
                    react_1["default"].createElement("div", { className: "flex flex-1 items-center justify-center sm:items-stretch sm:justify-start" },
                        react_1["default"].createElement("div", { className: "flex flex-shrink-0 items-center text-white" },
                            react_1["default"].createElement(image_1["default"], { src: '/logo.svg', alt: "Logo", width: 40, height: 40 }),
                            react_1["default"].createElement(link_1["default"], { href: '/' }, "Yakitate")),
                        react_1["default"].createElement("div", { className: "hidden sm:ml-6 sm:block" },
                            react_1["default"].createElement("div", { className: "flex space-x-4" },
                                navigation.map(function (item) { return (react_1["default"].createElement("a", { key: item.name, href: item.href, className: 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium', "aria-current": item.current ? 'page' : undefined }, item.name)); }),
                                react_1["default"].createElement(perawallet_1.Wallet, null))))))));
    }));
}
exports["default"] = Navbar;
