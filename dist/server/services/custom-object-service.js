"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./commercetools/client");
exports.default = ({ strapi }) => ({
    async createCustomObject({ container, key, value, }) {
        console.log('createCustomObject', {
            container,
            key,
            value,
        });
        const customObject = await client_1.client
            .customObjects()
            .post({
            body: {
                container,
                key,
                value,
            },
        })
            .execute();
        // Thrown errors are caught by the admin error handler
        return {
            id: customObject.body.id,
            container: customObject.body.container,
            key: customObject.body.key,
            value: customObject.body.value,
        };
    },
});
