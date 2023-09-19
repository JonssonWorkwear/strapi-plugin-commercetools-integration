"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
exports.default = ({ strapi }) => ({
    async getAllProducts() {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return data_1.DUMMY_DATA;
    },
    async getProductById(id) {
        return data_1.DUMMY_DATA.find((product) => product.id === id);
    },
});
