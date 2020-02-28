const vm = new Vue({
  el: "#app",
  data: {
    products: [],
    product: false,
    cart: [],
    alertMsg:  "item adicionado",
    alertActive: false
  },
  filters: {
    priceTreatment(price) {
      const formatPrice = price.toLocaleString("pt-BR", { style: "currency", currency: "BRL"});
      return formatPrice
    }
  },
  computed: {
    cartTotal() {
      let total = 0

      if(this.cart.length) {
        this.cart.forEach(item => {
          total += item.preco
        })
      }

      return total
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
    },
    showModal(id) {
      this.fetchProduct(id)
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    closeModal({ target, currentTarget }) {
      if( target === currentTarget) this.product = false
    },
    addItem() {
      this.product.estoque--

      const { id, nome, preco } = this.product
      this.cart.push({id, nome, preco})

      this.alert(`${nome} foi adicionado ao carrinho`)
    },
    removeItem(index) {
      this.cart.splice(index, 1)
    },
    checkLocalStorage() {
      const { cart } = window.localStorage

      if(cart) this.cart = JSON.parse(cart)
    },
    alert(message) {
      this.alertMsg = message
      this.alertActive = true

      setTimeout(() => {
        this.alertActive = false
      }, 1500)
    },
    router() {
      const hash = document.location.hash

      if(hash)
        this.fetchProduct(hash.replace('#', ''))
    }
  },
  watch: {
    product() {
      document.title = this.product.nome || "Techno"
      const hash = this.product.id || ""
      history.pushState(null, null, `#${hash}`)
    },
    cart() {
      window.localStorage.cart = JSON.stringify(this.cart)
    }
  },
  created() {
    this.fetchProducts()
    this.checkLocalStorage()
    this.router()
  }
})