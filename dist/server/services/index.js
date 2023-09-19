"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const my_service_1 = __importDefault(require("./my-service"));
const product_service_1 = __importDefault(require("./product-service"));
exports.default = {
    myService: my_service_1.default,
    productService: product_service_1.default,
};
