"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stringUtils_1 = require("./stringUtils");
var example = "hi there";
console.log("Original:", example);
console.log("Capitalized:", (0, stringUtils_1.capitalize)(example));
console.log("Reversed:", (0, stringUtils_1.reverseString)(example));
