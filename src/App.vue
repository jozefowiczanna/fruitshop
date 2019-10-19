<template>
  <div id="app">
    <header class="container">

      <nav class="navbar navbar-light fixed-top">
        <div class="navbar-text d-flex ml-auto">
          <div class="dropdown ml-2">
            <button id="cartDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-success dropdown-toggle" :style="sliderState">
              <span class="big-badge badge badge-pill badge-light mr-2">{{cartQty | totalFormat(1)}} kg</span>
              <span>{{cartTotal | totalFormat(2)}} zł</span>
            </button>
            <button class="shopping-card btn btn-outline-success bg-white ml-2"
                  @click="sliderStatus = !sliderStatus">
                <img class="shopping-card__img pb-1" :src="require('@/assets/img/shopping-cart-solid.svg')" alt="shopping card">
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="cartDropdown" :class="checkIfEmpty">

              <div v-for="(item, index) in cart" :key="index">
                <div class="dropdown-item-text text-nowrap d-flex align-items-center">
                  <span class="big-badge badge badge-pill badge-warning align-text-top mr-2 ml-auto">{{item.qty | totalFormat(1)}} kg</span>
                  <span class="">{{item.product.name}}</span>
                  <b class="mx-2">{{item.product.price * item.qty | totalFormat(2)}} zł</b>
                  <button
                    @click.stop="deleteItem(index)"
                    class="remove-btn"
                  ></button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>

    </header>
    <section class="container">
      <h1 class="mt-5 mb-4">Fruit Shop</h1>
      <div class="form-inline my-2">
        <b>Max cena (zł/kg): </b>
        <input class="max-input form-control text-center mx-2" maxlength="3"
          type="text"
          v-model="maxValue">
        <input class="max-range custom-range my-3"
          type="range"
          min="0" max="10"
          v-model="maxValue">
      </div>

      <div class="d-flex mb-5">
        <b class="mr-3">sortuj wg: </b>
        <div class="custom-control custom-radio d-flex">
          <div class="pr-3">
            <input type="radio" id="price" class="custom-control-input"
              value="price" v-model="picked">
            <label for="price" class="custom-control-label">ceny</label>
          </div>
          <div class="pl-4">
            <input type="radio" id="name" class="custom-control-input"
              value="name" v-model="picked">
            <label for="name" class="custom-control-label">nazwy</label>
          </div>
        </div>
      </div>
        
      <div class="row d-flex flex-wrap">
        <div class="col-md-6 col-lg-4 mb-5"
          v-for="(item) in sortProducts"
          :key="item.id"
        >
          <div class="product position-relative">
            <div class="product__img-wrapper">
              <div class="product__img" :style="getImg(item.image)"></div>
            </div>
            <div class="product__description p-4 d-flex flex-column justify-content-between position-relative">
              <div class="product__name mt mb-3">{{item.name}}</div>
              <div class="product__price ml-auto">{{item.price | commaPrice}}<span class="product__currency"> zł</span></div>
              <button class="add-btn" @click="addItem(item)"></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

var products = [ 
        { 
          "id":"1",
          "name":"Pomarańcze",
          "price":"4.90",
          "image":"oranges.jpg"
        },
        { 
          "id":"2",
          "name":"Jabłka",
          "price":"2.50",
          "image":"apples.jpg"
        },
        { 
          "id":"3",
          "name":"Gruszki",
          "price":"2.90",
          "image":"pears.jpg"
        },
        { 
          "id":"4",
          "name":"Banany",
          "price":"5.80",
          "image":"bananas.jpg"
        },
        { 
          "id":"5",
          "name":"Truskawki",
          "price":"6.70",
          "image":"strawberries.jpg"
        },
        { 
          "id":"6",
          "name":"Winogrona",
          "price":"6.90",
          "image":"grapes.jpg"
        },
        { 
          "id":"7",
          "name":"Śliwki",
          "price":"5.50",
          "image":"plums.jpg"
        },
        { 
          "id":"8",
          "name":"Jagody",
          "price":"7.90",
          "image":"blueberries.jpg"
        },
        { 
          "id":"9",
          "name":"Brzoskwinie",
          "price":"7.50",
          "image":"peaches.jpg"
        },
        { 
          "id":"10",
          "name":"Maliny",
          "price":"8.50",
          "image":"raspberries.jpg"
        }   
      ]

export default {
  name: 'app',
  data() {
    return {
      maxValue: 10,
      totalQty: 0,
      picked: "price",
      products: products,
      cart: [],
      sliderStatus: false
    }
  },
  computed: {
    sortProducts() {
      var arrayCopy = this.products.slice();

      if (this.picked === "name") {
        arrayCopy.sort((a, b) => (a.name < b.name) ? -1 : 1);
      } else {
        arrayCopy.sort((a, b) => (parseFloat(a.price) < parseFloat(b.price)) ? -1 : 0);
      }
      var max = this.maxValue;
      return arrayCopy.filter(function(item) {
        return parseInt(item.price) < max;
      })
    },
    sliderState() {
      return this.sliderStatus ? "transform: translateX(150%)" : "transform: translateX(0)";
    },
    checkIfEmpty() {
      return (this.cartQty > 0) ? "visible" : "invisible";
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
    getImg(img) {
      var url = require(`@/assets/img/${img}`);
      return {'background-image': `url('${url}')`};
    },
    addItem(product) {
      var whatProduct = null;
      var existing = this.cart.filter(function(item, index) {
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
  },
  filters: {
    commaPrice(value) {
      return value.replace('.', ',');
    },
    totalFormat(value, nr) {
      return value.toFixed(nr).toString().replace('.', ',');
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
    transition: background-color 0.2s ease-in-out;
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


</style>

