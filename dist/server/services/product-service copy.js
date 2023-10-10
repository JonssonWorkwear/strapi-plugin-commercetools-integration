"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./commercetools/client");
const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;
exports.default = ({ strapi }) => ({
    async getAllProducts() {
        const products = await client_1.client.productProjections().get().execute();
        const productsData = products.body.results.map((product) => {
            var _a, _b, _c, _d;
            // TODO: WIP validation
            const name = product.name[CT_DEFAULT_LOCALE];
            const description = (_a = product.description) === null || _a === void 0 ? void 0 : _a[CT_DEFAULT_LOCALE];
            const slug = (_b = product.slug) === null || _b === void 0 ? void 0 : _b[CT_DEFAULT_LOCALE];
            const image = (_c = product.masterVariant.images) === null || _c === void 0 ? void 0 : _c[0].url;
            const price = (_d = product.masterVariant.prices) === null || _d === void 0 ? void 0 : _d[0].value.centAmount;
            return {
                title: name,
                description,
                id: slug,
                image,
                price,
            };
        });
        return productsData;
    },
    async getProductById(id) {
        var _a, _b, _c, _d;
        const product = await client_1.client
            .productProjections()
            .get({
            queryArgs: {
                where: `slug(${CT_DEFAULT_LOCALE}="${id}")`,
            },
        })
            .execute();
        // TODO: WIP validation
        const productData = product.body.results[0];
        if (!productData) {
            return {};
        }
        // TODO: WIP validation
        const name = productData.name[CT_DEFAULT_LOCALE];
        const description = (_a = productData.description) === null || _a === void 0 ? void 0 : _a[CT_DEFAULT_LOCALE];
        const slug = (_b = productData.slug) === null || _b === void 0 ? void 0 : _b[CT_DEFAULT_LOCALE];
        const image = (_c = productData.masterVariant.images) === null || _c === void 0 ? void 0 : _c[0].url;
        const price = (_d = productData.masterVariant.prices) === null || _d === void 0 ? void 0 : _d[0].value.centAmount;
        return {
            title: name,
            description,
            id: slug,
            image,
            price,
        };
    },
});
