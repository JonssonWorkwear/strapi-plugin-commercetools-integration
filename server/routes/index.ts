export default [
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