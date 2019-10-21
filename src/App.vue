<template>
  <div id="app">
    <router-view
      :cart="cart"
      :cartQty="cartQty"
      :cartTotal="cartTotal"
      :maxValue.sync="maxValue"
      :products="products"
      :sortProducts="sortProducts"
      :picked.sync="picked"
      @add="addItem"
      @delete="deleteItem"
    ></router-view>
  </div>
</template>

<script>
import productsData from "./assets/data/productsData.json";

export default {
  name: 'app',
  data() {
    return {
      maxValue: 10,
      totalQty: 0,
      picked: "price",
      products: productsData,
      cart: []
    }
  },
  computed: {
    sortProducts() {
      const arrayCopy = this.products.slice();

      if (this.picked === "name") {
        arrayCopy.sort((a, b) => (a.name < b.name) ? -1 : 1);
      } else {
        arrayCopy.sort((a, b) => (parseFloat(a.price) < parseFloat(b.price)) ? -1 : 0);
      }
      const max = this.maxValue;
      return arrayCopy.filter(function(item) {
        return parseInt(item.price) < max;
      })
    },
    cartTotal() {
      let sum = 0;
      for (let key in this.cart) {
        sum = sum + (parseFloat(this.cart[key].product.price) * parseFloat(this.cart[key].qty));
      }
      return sum;
    },
    cartQty() {
      let qty = 0;
      for (let key in this.cart) {
        qty = qty + this.cart[key].qty;
      }
      return qty;
    }
  },
  methods: {
    addItem(product, e) {
      e.target.classList.add("active");
      setTimeout(() => {
        e.target.classList.remove("active");
      }, 100);

      let whatProduct = null;
      const existing = this.cart.filter(function(item, index) {
        if (item.product.id === product.id) {
          whatProduct = index;
          return true;
        } else {
          return false;
        }
      })

      if (existing.length) {
        this.cart[whatProduct].qty += 0.5;
      } else {
        this.cart.push({product: product, qty: 0.5})
      }
    },
    deleteItem(index) {
      if (this.cart[index].qty > 0.5) {
        this.cart[index].qty -= 0.5;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:600&display=swap');

  .big-badge {
    font-size: 15px !important;
  }

  .shopping-card__img {
    width: 20px;
    height: 20px;
  }

  #cartDropdown {
    transition: 0.3s ease-in-out;
  }

  .product {
    box-shadow: 0 10px 50px -25px #89a08d;
    font-family: 'Montserrat', sans-serif;
    border-radius: 5px;
  }

  .product__img-wrapper {
    position: relative;
    height: 270px;
    transition: 0.5s;
    overflow: hidden;
    border-radius: 5px 5px 0 0;
  }

  .product:hover .product__img-wrapper {
    background-size: 103%;
  }

  .product__img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .product__img {
    transform: scale(1);
    transition: all 0.3s;
  }

  .product:hover .product__img {
    transform: scale(1.05);
  }

  .product__name {
    font-size: 21px;
  }

  .product__price {
    font-family: 'Montserrat', sans-serif;
    font-size: 25px;
    border: 3px solid #28a745;
    border-radius: 5px;
    padding: 5px 10px;
    background: white;
    z-index: 50;
  }

  .product__basket {
    border-radius: 10px;
  }

  .add-btn {
    position: absolute;
    top: -28px;
    right: 20px;
    width: 56px;
    height: 56px;
    font-size: 25px;
    background-color: #28a745;
    z-index: 50;
    border: 4px solid white;
    border-radius: 50%;
    transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
    outline: none !important;
  }

  .add-btn:hover {
    background-color: #218838;
  }

  .add-btn::before {
    position: absolute;
    content: '+';
    font-size: 30px;
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .add-btn.active {
    transform: scale(0.93);
  }

  .remove-btn {
    border: 0;
    background: #DC3545;
    color: white;
    width: 20px;
    height: 20px;
    font-size: 20px !important;
    position: relative;
    display: block;
    border-radius: 5px;
    transition: 0.2s ease-in-out;
    outline: none !important;
  }

  .remove-btn:hover {
    background: #af2c38;
  }

  .remove-btn::before {
    content: '-';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }

  .product__currency {
    font-size: 0.7em;
  }

  .max-input {
    width: 60px !important;
  }

  .max-range {
    max-width: 200px !important;
  }

@media (max-width: 767px) {
  .product-wrapper {
    border-radius: 0;
    border-bottom: 1px solid hsla(134, 61%, 41%, 0.3);
  }

  .product {
    box-shadow: none;
  }

  .product-wrapper:hover {
    background: #f2fdf0;
  }

  .product__name {
    font-size: 17px;
  }

  .product__price {
    font-size: 18px;
    border: none;
    padding: 0;
    background: none;
  }

  .product__currency {
    font-size: 1em;
  }

  .add-btn {
    position: relative;
    top: 0;
    right: 0;
    width: 36px;
    height: 36px;
    border: none;
    transition: 0.1s;
  }
}

</style>

