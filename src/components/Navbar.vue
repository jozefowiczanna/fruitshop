<template>
  <header>
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
            <price class="big-badge badge badge-pill badge-light mr-2"
              :value="cartQty" :precision="1" :suffix="'kg'"></price>
            <price :value="cartTotal" :suffix="'zł'"></price>
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
                <price class="big-badge badge badge-pill badge-warning align-text-top mr-2 ml-auto"
                  :value="item.qty"
                  :suffix="'kg'"
                  :precision="1"
                ></price>
                <span class>{{item.product.name}}</span>
                <price class="font-weight-bold mx-2"
                  :value="item.product.price * item.qty"
                  :suffix="'zł'"
                ></price>
                <button @click.stop="$parent.$emit('delete', index)" class="remove-btn"></button>
              </div>
            </div>
            <router-link
              class="btn btn-sm btn-outline-info text-dark float-right mr-4 mt-2"
              to="/checkout"
            >Do kasy</router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import Price from "./Price.vue";

export default {
  name: "navbar",
  props: {
    cart: Array,
    cartQty: Number,
    cartTotal: Number
  },
  components: { Price },
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