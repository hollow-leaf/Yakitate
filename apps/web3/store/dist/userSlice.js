"use strict";
var _a;
exports.__esModule = true;
exports.setLogout = exports.setLogin = exports.userSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    wallet: {
        address: "",
        login: false
    }
};
exports.userSlice = toolkit_1.createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setLogin: function (state, action) {
            var address = action.payload.address;
            state.wallet = {
                address: address,
                login: true
            };
        },
        setLogout: function (state) {
            state.wallet = initialState;
        }
    }
});
exports.setLogin = (_a = exports.userSlice.actions, _a.setLogin), exports.setLogout = _a.setLogout;
