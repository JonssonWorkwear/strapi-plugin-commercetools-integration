"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = __importDefault(require("./product-controller"));
const category_controller_1 = __importDefault(require("./category-controller"));
exports.default = {
    productController: product_controller_1.default,
    categoryController: category_controller_1.default,
};
