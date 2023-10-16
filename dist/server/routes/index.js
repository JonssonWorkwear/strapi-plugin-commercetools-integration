"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/getAllProducts',
        handler: 'productController.getAllProducts',
        config: {
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/getProductById/:id',
        handler: 'productController.getProductById',
        config: {
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/getAllCategories',
        handler: 'categoryController.getAllCategories',
        config: {
            policies: [],
        },
    },
];
