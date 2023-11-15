"use strict";
exports.__esModule = true;
exports.formatAddress = exports.stringify = void 0;
exports.stringify = function (value, replacer, space) {
    return JSON.stringify(value, function (key, value_) {
        var value = typeof value_ === "bigint" ? value_.toString() : value_;
        return typeof replacer === "function" ? replacer(key, value) : value;
    }, space);
};
function formatAddress(address) {
    if (!address) {
        return ""; // If the address is undefined, return an empty string
    }
    if (address.length <= 12) {
        return address; // If the address is shorter than 12 characters, return it as is
    }
    else {
        var prefix = address.slice(0, 6); // Get the first six characters
        var suffix = address.slice(-6); // Get the last six characters
        return prefix + "..." + suffix; // Combine the first six, ..., and last six characters
    }
}
exports.formatAddress = formatAddress;
