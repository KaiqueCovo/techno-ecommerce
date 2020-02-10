const vm = new Vue({
  el: "#app",
  data: {
    products: []
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
        .then(result => { this.products = result})
    }
  },
  created() {
    this.fetchProducts()
  }
})