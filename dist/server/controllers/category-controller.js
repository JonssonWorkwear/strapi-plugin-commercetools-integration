"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;
exports.default = ({ strapi }) => ({
    async getAllCategories(ctx) {
        const categories = await strapi
            .plugin('commercetools')
            .service('categoryService')
            .getAllCategories();
        // Filter down only the necessary fields
        // Throw errors are picked up by the client as 500
        const categoriesData = categories.body.results.map((category) => {
            var _a;
            return {
                name: category.name[CT_DEFAULT_LOCALE],
                slug: (_a = category.slug) === null || _a === void 0 ? void 0 : _a[CT_DEFAULT_LOCALE],
            };
        });
        ctx.body = categoriesData;
    },
});
