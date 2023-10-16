"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./commercetools/client");
const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;
exports.default = ({ strapi }) => ({
    async getAllCategories() {
        const categoriesData = await client_1.client.categories().get().execute();
        const categories = categoriesData.body.results.map((category) => {
            var _a;
            return {
                name: category.name[CT_DEFAULT_LOCALE],
                slug: (_a = category.slug) === null || _a === void 0 ? void 0 : _a[CT_DEFAULT_LOCALE],
            };
        });
        return categories;
    },
});
