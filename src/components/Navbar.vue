<template>
  <header class="container">
    <nav class="navbar navbar-light fixed-top">
      <div class="navbar-text d-flex ml-auto">
        <div class="dropdown ml-2">
          <button
            id="cartDropdown"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            class="btn btn-success dropdown-toggle"
            :style="toggleSliderStatus"
          >
            <span
              class="big-badge badge badge-pill badge-light mr-2"
            >{{cartQty | totalFormat(1)}} kg</span>
            <span>{{cartTotal | totalFormat(2)}} zł</span>
          </button>
          <button
            class="shopping-card btn btn-outline-success bg-white ml-2"
            @click="sliderStatus = !sliderStatus"
          >
            <img
              class="shopping-card__img pb-1"
              :src="require('@/assets/img/shopping-cart-solid.svg')"
              alt="shopping card"
            />
          </button>
          <div
            class="dropdown-menu dropdown-menu-right"
            aria-labelledby="cartDropdown"
            :class="toggleVisibility"
          >
            <div v-for="(item, index) in cart" :key="index">
              <div class="dropdown-item-text text-nowrap d-flex align-items-center">
                <span
                  class="big-badge badge badge-pill badge-warning align-text-top mr-2 ml-auto"
                >{{item.qty | totalFormat(1)}} kg</span>
                <span class>{{item.product.name}}</span>
                <b class="mx-2">{{item.product.price * item.qty | totalFormat(2)}} zł</b>
                <button @click.stop="$emit('delete', index)" class="remove-btn"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "navbar",
  props: {
    cart: Array,
    cartQty: Number,
    cartTotal: Number
  },
  data() {
    return {
      sliderStatus: false
    }
  },
  computed: {
    toggleSliderStatus() {
      return this.sliderStatus ? "transform: translateX(150%)" : "transform: translateX(0)";
    },
    toggleVisibility() {
      return (this.cartQty > 0) ? "visible" : "invisible";
    }
  },
  filters: {
    totalFormat(value, nr) {
      return value.toFixed(nr).toString().replace('.', ',');
    }
  }
};
</script>