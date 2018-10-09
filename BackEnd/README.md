# Moneeda Consumer Backend

> An AdonisJS application that “flips around” the data avalilable through Moneeda API.

## Setup

1. Rename the .env.example file to .env;
2. Run npm install;
3. Run npm start.

## Endpoints

There are two endpoints available:

- /products: returns returns all products shared between the exchanges;
- /products/PRODUCT/prices: returns PRODUCT’s prices on all three exchanges.