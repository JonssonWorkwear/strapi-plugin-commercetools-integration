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
    path: '/getProductBySlug/:id',
    handler: 'productController.getProductBySlug',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/getProductBySku/:id',
    handler: 'productController.getProductBySku',
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
  {
    method: 'POST',
    path: '/url/generate',
    handler: 'urlController.getUrlBySlug',
    config: {
      policies: [],
    },
  },

  {
    method: 'POST',
    path: '/url/validate',
    handler: 'urlController.validateSlug',
    config: {
      policies: [],
    },
  },
];
