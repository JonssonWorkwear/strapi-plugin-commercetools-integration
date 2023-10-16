"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("./product-service"));
const category_service_1 = __importDefault(require("./category-service"));
exports.default = {
    productService: product_service_1.default,
    categoryService: category_service_1.default,
};
