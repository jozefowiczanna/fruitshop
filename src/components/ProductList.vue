<template>
  <div class="row d-flex flex-wrap">
    <div
      class="product-wrapper col-md-6 col-lg-4 mb-md-5"
      v-for="(item) in sortProducts"
      :key="item.id"
    >
      <div class="product position-relative">
        <div class="product__img-wrapper d-none d-md-block">
          <div class="product__img" :style="getImg(item.image)"></div>
        </div>
        <div
          class="product__description p-md-4 py-3 d-flex flex-md-column justify-content-between align-items-center position-relative"
        >
          <div class="product__name mb-md-3 mr-auto">{{item.name}}</div>
          <div class="product__price ml-2 ml-md-auto flex-shrink-0">
            {{item.price | commaPrice}}
            <span class="product__currency">zł</span>
          </div>
          <button class="add-btn ml-3 flex-shrink-0" @click="$emit('add', item, $event)"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-list",
  props: ["sortProducts"],
  methods: {
    getImg(img) {
      const url = require(`@/assets/img/${img}`);
      return {'background-image': `url('${url}')`};
    }
  },
  filters: {
    commaPrice(value) {
      return value.replace('.', ',');
    }
  }
};
</script>