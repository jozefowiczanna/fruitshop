<template>
  <div class="container mt-5">
    <navbar :cart="cart" :cartQty="cartQty" :cartTotal="cartTotal"
      ></navbar>
    <section>
      <h1 class="mt-5 pt-5 mb-4">Owocowy sklep</h1>
      <sort-opt></sort-opt>
      <product-list :maxValue="maxValue" :sortProducts="sortProducts"></product-list>
    </section>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import SortOpt from "./SortOpt.vue";
import ProductList from "./ProductList.vue";

export default {
  name: "products",
  props: [
    "sortProducts",
    "maxValue",
    "cart",
    "cartQty",
    "cartTotal",
  ],
  components: {
    Navbar,
    SortOpt,
    ProductList
  },

}
</script>