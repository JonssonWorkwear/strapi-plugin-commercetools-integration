export default [
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
