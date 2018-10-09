<template>
  <div class="app-main">
    <div class="container-fluid">
      <h1>Wellcome!</h1>
      <v-select v-model="productSelected" @input="showProductPrices" :options="products"></v-select>
      <div class="row m-2">
        <div class="col-md-4" v-for="price in prices">
          <div class="card" style="width: 100%;">
            <!-- <img class="card-img-top" src=".../100px180/" alt="Card image cap"> -->
            <div class="card-body">
              <h5 class="card-title">{{price.exchange}}</h5>
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
      processing: false,
      products: [],
      productSelected: '',
      prices: [],
    }
  },
  mounted(){
    this.axios.get('http://localhost:3333/products').then((res) => {
      this.products = res.data;
    })
  },
  methods: {
    showProductPrices(){
      if (!this.productSelected)
        return;

      this.axios.get(`http://localhost:3333/products/${this.productSelected}/prices`).then((res) => {
        this.prices = res.data;
      })
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
</style>
