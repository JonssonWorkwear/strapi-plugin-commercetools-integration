"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: 'ProductGrid',
        plugin: 'commercetools',
        type: 'text',
        inputSize: {
            default: 12,
            isResizable: false,
        },
    });
    strapi.customFields.register({
        name: 'CategoryList',
        plugin: 'commercetools',
        type: 'enumeration',
    });
};
