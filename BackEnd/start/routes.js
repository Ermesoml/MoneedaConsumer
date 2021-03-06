'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { API: 'Moneeda consumer API' }
})

Route.post('/autenticate', 'AuthController.autenticate');
Route.get('/products/', 'ProductController.getAllProducts');
Route.get('/products/:product/prices', 'ProductController.getProductPrices');
