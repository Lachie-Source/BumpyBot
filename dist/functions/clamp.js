"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
function clamp(num, min, max) {
    return num > max ? max : num < min ? min : num;
}
exports.clamp = clamp;
