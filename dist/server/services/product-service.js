"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./commercetools/client");
const { CT_DEFAULT_LOCALE = 'en-ZA' } = process.env;
exports.default = () => ({
    getAllProducts() {
        return client_1.client.productProjections().get().execute();
    },
    getProductBySlug(slug) {
        return client_1.client
            .productProjections()
            .get({
            queryArgs: {
                where: `slug(${CT_DEFAULT_LOCALE}="${slug}")`,
            },
        })
            .execute();
    },
    updateProductById(id, body) {
        return client_1.client
            .products()
            .withId({ ID: id })
            .post({
            body,
        })
            .execute();
    },
});
