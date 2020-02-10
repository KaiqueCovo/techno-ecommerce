const vm = new Vue({
  el: "#app",
  data: {
    products: []
  },
  methods: {
    fetchProducts() {
      fetch("./api/produtos.json")
        .then(result => result.json())
        .then(result => { this.products = result})
    }
  },
  created() {
    this.fetchProducts()
  }
})