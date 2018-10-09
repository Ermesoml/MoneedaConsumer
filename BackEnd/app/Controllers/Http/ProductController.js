'use strict'

var axios = require('./axios.js');
var exchangesSuported = require('./exchangesSuported.js');

class ProductController {
  async getAllProducts({}){
    var productsNames = [];

    // Getting all products from suported exchanges.
    for (let i = 0; i < exchangesSuported.length; i++){
      try {
        productsNames.push(await axios.get(`/${exchangesSuported[i].name}/products`).then(res => {
          return (res.data.map((product) => {
            // Mapping to return only the name of the product
            return product.id;
          }))  
        }));
      } catch (error) {
        console.log(error)
        break;
      } 
    }

    // Eliminating the non shared products from suported exchanges.
    var sharedNames = productsNames[0];
    for (let i = 1; i < productsNames.length; i++){
      sharedNames = sharedNames.filter((name, index) => {
        return productsNames[i].indexOf(name) > -1;
      });
    } 

    //returning the shared products
    return sharedNames;
  }

  async getProductPrices({params}){
    const product = params.product;
    var prices = [];

    for (let i = 0; i < exchangesSuported.length; i++) {
      try {
        prices.push({
          exchange: exchangesSuported[i].name,
          price: await axios.get(`/${exchangesSuported[i].name}/ticker?product=${product}`).then(res => res.data)
        });
      } catch (error) {
        prices.push({
          exchange: exchangesSuported[i].name,
          price: 'Unavailable'
        })
      }
    }
 
    return prices;
  }
}

module.exports = ProductController
