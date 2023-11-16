"use strict";
exports.__esModule = true;
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var userSlice_1 = require("./userSlice");
//store
exports.store = toolkit_1.configureStore({
    reducer: {
        //key: value
        user: userSlice_1.userSlice.reducer
    }
});
