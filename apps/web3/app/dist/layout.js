"use client";
"use strict";
exports.__esModule = true;
exports.fontSans = void 0;
var utils_1 = require("@/lib/utils");
require("./globals.css");
var google_1 = require("next/font/google");
var Navbar_1 = require("@/components/Navbar");
var Footer_1 = require("@/components/Footer");
var head_1 = require("next/head");
var react_query_1 = require("react-query");
var react_redux_1 = require("react-redux");
var store_1 = require("@/store/store");
// Create a client
var queryClient = new react_query_1.QueryClient();
exports.fontSans = google_1.Inter({
    subsets: ["latin"],
    variable: "--font-sans"
});
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement(react_redux_1.Provider, { store: store_1.store },
        React.createElement(react_query_1.QueryClientProvider, { client: queryClient },
            React.createElement("html", { lang: "en" },
                React.createElement(head_1["default"], null,
                    React.createElement("link", { rel: "icon", href: "/favicon.ico" }),
                    React.createElement("title", null, "Yakitate")),
                React.createElement("body", { className: utils_1.cn("min-h-screen bg-background font-sans antialiased flex flex-col", exports.fontSans.variable) },
                    React.createElement(Navbar_1["default"], null),
                    children,
                    React.createElement(Footer_1["default"], null))))));
}
exports["default"] = RootLayout;
