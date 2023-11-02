"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./commercetools/client");
exports.default = () => ({
    async getAllCategories() {
        return client_1.client.categories().get().execute();
    },
});
