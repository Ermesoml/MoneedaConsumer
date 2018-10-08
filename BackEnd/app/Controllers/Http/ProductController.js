'use strict'

var axios = require('./axios.js');

class ProductController {
  async getAllProducts({}){
    
    try{
      var moneedaProducts = await axios.get('/BTX/products').then(res => res.data);
    }
    catch (error){
      console.log(error);
    }

    // console.log(moneedaProducts);
    return moneedaProducts;
  }
}

module.exports = ProductController
