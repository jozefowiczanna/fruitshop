<template>
  <div class="container mt-5 px-0 px-md-3">
    <h1 class="mb-3 px-2 px-md-0">Twoje zakupy</h1>
    <table class="table table-hover w-100" v-if="cart.length">
      <caption class="text-right h3 mx-4">
        <b>Suma: </b>
        <price class="d-block text-success font-weight-light" :value="cartTotal" :suffix="'zł'"></price>
      </caption>
      <thead>
        <tr>
          <th scope="col" class="w-100 pl-2">Produkt</th>
          <th scope="col" class="text-center">Ilość</th>
          <th scope="col" class="text-right">Cena</th>
          <th scope="col" class="text-right pr-2">Suma</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.product.id">
          <td class="w-100 align-middle pl-2">{{item.product.name}}</td>
          <td class="align-middle text-center px-0 px-md-5">
              <div class=" d-flex align-items-center justify-content-between">
                <button @click="$emit('delete', index)" class="btn btn-outline-info">-</button>
                <price :value="item.qty" :precision="1" :suffix="none" class="mx-2 mx-md-4"></price>
                <button @click="$emit('add', item.product, $event)" class="btn btn-outline-info">+</button>
              </div>
          </td>
          <td class="align-middle text-right"><price :value="item.product.price">fdsfsdf</price></td>
          <td class="align-middle text-right pr-2"><price :value="(item.product.price * item.qty)"></price></td>
        </tr>
      </tbody>
    </table>
    <router-link class="btn btn-outline-info text-dark mx-4" to="/">Kupuj dalej</router-link>
  </div>
</template>

<script>
import Price from "./Price.vue";

export default {
  name: "checkout",
  props: ["cart", "cartTotal"],
  components: {
    Price
  }
}
</script>

<style>
  .table {
    width:100%;
  }

  .table td, .table th {
    vertical-align: center !important;
    padding: 0.75rem 1.5rem;
  }

  .table tbody tr:hover {
    background: #f2fdf0;
  }

  @media (max-width: 767px) {
    .table td, .table th {
      padding: 0.75rem 0.25rem;
    }
  }
</style>