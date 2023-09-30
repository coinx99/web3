"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.log = void 0;
exports.log = console.log, exports.warn = console.warn, exports.error = console.error;
var Std = /** @class */ (function () {
    function Std() {
    }
    Std.isUrl = function (url) {
        try {
            new URL(url);
            return true;
        }
        catch (error) {
            return false;
        }
    };
    return Std;
}());
exports.default = Std;
