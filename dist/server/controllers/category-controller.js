"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async getAllCategories(ctx) {
        ctx.body = await strapi.plugin('commercetools').service('categoryService').getAllCategories();
    },
});
