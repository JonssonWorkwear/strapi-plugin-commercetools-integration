"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async getAllProducts(ctx) {
        ctx.body = await strapi.plugin('commercetools').service('productService').getAllProducts();
    },
    async getProductBySlug(ctx) {
        ctx.body = await strapi
            .plugin('commercetools')
            .service('productService')
            .getProductBySlug(ctx.params.id);
    },
});
