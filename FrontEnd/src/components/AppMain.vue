<template>
  <div class="app-main">
    <div class="container-fluid">
      
      <h1>Wellcome to Moneeda Consumer Frontend!</h1>
      <p>All products shared between Bittrex, Binance and Bitfinex</p>

      <div class="alert alert-primary m-2" v-if="loadingProducts">
        <i class="fa fa-sync-alt fa-spin"></i> Loading products
      </div>
      <v-select v-model="productSelected" @input="showProductPrices" :options="products" placeholder="Search for products" v-else></v-select>

      <div class="alert alert-primary m-2" v-if="loadingPrices">
        <i class="fa fa-sync-alt fa-spin"></i> Loading prices
      </div>
      <div class="row m-2" v-else>
        <div class="col-md-4" v-for="price in prices">
          <div :class="getProductCardClass(price)" style="width: 100%;">
            <div class="card-header">
              <h4 class="my-0 font-weight-normal">{{price.exchange}}</h4>
            </div>
            <div class="card-body">
              <p class="card-text">{{price.price.price}}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppMain',
  data () {
    return {
      loadingProducts: false,
      loadingPrices: false,
      products: [],
      productSelected: '',
      prices: [],
      minPrice: {},
      maxPrice: {},
    }
  },
  mounted(){
    this.loadingProducts = true;
    this.axios.get('http://localhost:3333/products').then((res) => {
      this.products = res.data;
      this.loadingProducts = false;
    })
  },
  methods: {
    showProductPrices(){
      this.loadingPrices = true;
      this.clearValues();
      if (!this.productSelected){
        this.loadingPrices = false;
        return;
      }

      this.axios.get(`http://localhost:3333/products/${this.productSelected}/prices`).then((res) => {
        this.maxPrice = res.data.reduce((prev, current) => (prev.price.price > current.price.price) ? prev : current)
        this.minPrice = res.data.reduce((prev, current) => (prev.price.price <= current.price.price) ? prev : current)
        this.prices = res.data;
        this.loadingPrices = false;
      })
    },
    getProductCardClass(price){
      let commonClasses = 'card mb-4 shadow-sm ';
      commonClasses += price.exchange === this.maxPrice.exchange ? 'max-price' : price.exchange === this.minPrice.exchange ? 'min-price' : 'common-price';
      return commonClasses;
    },
    clearValues(){
      this.prices = [];
      this.minPrice = {};
      this.maxPrice = {};
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app-main{
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif    
  }

  .card {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 40%;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }

  .container {
    padding: 2px 16px;
  }

  .min-price{
    color: red;
  }

  .max-price{
    color: green;
    border-color: green;
  }

  .container-fluid {
    text-align:center;
    padding: auto;
    margin: 20% auto;
  }

  .v-select{
    max-width: 300px;
    margin: 0 auto;
  }
</style>
