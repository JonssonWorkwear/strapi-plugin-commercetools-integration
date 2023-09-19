"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/get',
        handler: 'myController.index',
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: 'GET',
        path: '/getAllProducts',
        handler: 'productController.getAllProducts',
        config: {
            policies: [],
            auth: false,
        },
    },
    {
        method: 'GET',
        path: '/getProductById/:id',
        handler: 'productController.getProductById',
        config: {
            policies: [],
            auth: false,
        },
    },
];
