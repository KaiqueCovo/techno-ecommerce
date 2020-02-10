const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false
  },
  filters: {
    priceTreatment(price) {
      const formatPrice = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
      return formatPrice
    }
  },
  methods: {
    fetchProducts() {
      fetch("./api/produtos.json")
        .then(result => result.json())
        .then(result => this.products = result)
    },
    fetchProduct(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(result => result.json())
        .then(result => this.product = result)
    }
  },
  created() {
    this.fetchProducts()
  }
})