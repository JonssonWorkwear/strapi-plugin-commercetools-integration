'use strict';

const axios = require('axios').default;

module.exports = () => ({
  async getAllProducts() {
    const response = await axios.get('https://fakestoreapi.com/products');

    return response.data;
  },
});
