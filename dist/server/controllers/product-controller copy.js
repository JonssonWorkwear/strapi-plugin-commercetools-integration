"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async getAllProducts(ctx) {
        ctx.body = await strapi.plugin('commercetools').service('productService').getAllProducts();
    },
    async getProductById(ctx) {
        ctx.body = await strapi
            .plugin('commercetools')
            .service('productService')
            .getProductById(ctx.params.id);
    },
});
