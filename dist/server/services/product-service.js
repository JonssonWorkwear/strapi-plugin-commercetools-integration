"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("./data");
const client_1 = require("./commercetools/client");
exports.default = ({ strapi }) => ({
    async getAllProducts() {
        const products = await client_1.client.products().get().execute();
        const productsData = products.body.results.map((product) => {
            var _a, _b, _c;
            const name = product.masterData.current.name['en-ZA'];
            const description = (_a = product.masterData.current.description) === null || _a === void 0 ? void 0 : _a['en-ZA'];
            const sku = product.key;
            const image = (_b = product.masterData.current.masterVariant.images) === null || _b === void 0 ? void 0 : _b[0].url;
            const price = (_c = product.masterData.current.masterVariant.prices) === null || _c === void 0 ? void 0 : _c[0].value.centAmount;
            return {
                title: name,
                description,
                id: sku,
                image,
                price,
            };
        });
        return productsData;
    },
    async getProductById(id) {
        var _a, _b, _c;
        const product = await client_1.client.products().withKey({ key: id }).get().execute();
        console.log(product);
        const name = product.body.masterData.current.name['en-ZA'];
        const description = (_a = product.body.masterData.current.description) === null || _a === void 0 ? void 0 : _a['en-ZA'];
        const sku = product.body.key;
        const image = (_b = product.body.masterData.current.masterVariant.images) === null || _b === void 0 ? void 0 : _b[0].url;
        const price = (_c = product.body.masterData.current.masterVariant.prices) === null || _c === void 0 ? void 0 : _c[0].value.centAmount;
        return {
            title: name,
            description,
            id: sku,
            image,
            price,
        };
        return data_1.DUMMY_DATA.find((product) => product.id === id);
    },
});
