"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;
exports.default = ({ strapi }) => ({
    async getAllProducts(ctx) {
        console.log('controller!');
        const products = await strapi
            .plugin('commercetools')
            .service('productService')
            .getAllProducts();
        // Filter down only the necessary fields
        // Throw errors are picked up by the client as 500
        const productsData = products.body.results.map((product) => {
            var _a, _b, _c, _d;
            return {
                title: product.name[CT_DEFAULT_LOCALE],
                description: (_a = product.description) === null || _a === void 0 ? void 0 : _a[CT_DEFAULT_LOCALE],
                slug: (_b = product.slug) === null || _b === void 0 ? void 0 : _b[CT_DEFAULT_LOCALE],
                image: (_c = product.masterVariant.images) === null || _c === void 0 ? void 0 : _c[0].url,
                price: (_d = product.masterVariant.prices) === null || _d === void 0 ? void 0 : _d[0].value.centAmount,
            };
        });
        ctx.body = productsData;
    },
    async getProductBySlug(ctx) {
        var _a, _b, _c, _d;
        const product = await strapi
            .plugin('commercetools')
            .service('productService')
            .getProductBySlug(ctx.params.id);
        const productData = product.body.results[0];
        if (!productData) {
            return {};
        }
        // Filter down only the necessary fields
        // Throw errors are picked up by the client as 500
        return {
            title: productData.name[CT_DEFAULT_LOCALE],
            description: (_a = productData.description) === null || _a === void 0 ? void 0 : _a[CT_DEFAULT_LOCALE],
            slug: (_b = productData.slug) === null || _b === void 0 ? void 0 : _b[CT_DEFAULT_LOCALE],
            image: (_c = productData.masterVariant.images) === null || _c === void 0 ? void 0 : _c[0].url,
            price: (_d = productData.masterVariant.prices) === null || _d === void 0 ? void 0 : _d[0].value.centAmount,
        };
    },
});
