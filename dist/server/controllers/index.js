"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_controller_1 = __importDefault(require("./my-controller"));
const product_controller_1 = __importDefault(require("./product-controller"));
exports.default = {
    myController: my_controller_1.default,
    productController: product_controller_1.default,
};
