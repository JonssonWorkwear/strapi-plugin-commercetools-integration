"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./commercetools/client");
exports.default = () => ({
    async createCustomObject({ container, key, value, }) {
        return client_1.client
            .customObjects()
            .post({
            body: {
                container,
                key,
                value,
            },
        })
            .execute();
    },
});
