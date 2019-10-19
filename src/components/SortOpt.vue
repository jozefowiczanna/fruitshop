<template>
  <div>
    <div class="form-inline my-2">
      <b>Max cena (zł/kg): </b>
      <input class="max-input form-control text-center mx-2" maxlength="3"
        type="text"
        v-model="maxValue"
        @change="$emit('update:maxValue', maxValue)"
      >
      <input class="max-range custom-range my-3"
        type="range"
        min="0" max="10"
        v-model="maxValue"
        @input="$emit('update:maxValue', maxValue)"
      >
    </div>
    <div class="d-flex mb-5">
      <b class="mr-3">sortuj wg: </b>
      <div class="custom-control custom-radio d-flex">
        <div class="pr-3">
          <input
            type="radio" id="price" class="custom-control-input"
            value="price"
            v-model="picked"
            @change="$emit('update:picked', picked)"
          >
          <label for="price" class="custom-control-label">ceny</label>
        </div>
        <div class="pl-4">
          <input type="radio" id="name" class="custom-control-input"
            value="name"
            v-model="picked"
            @change="$emit('update:picked', picked)"
          >
          <label for="name" class="custom-control-label">nazwy</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sort-opt",
  data() {
    return {
      maxValue: 10,
      picked: "price"
    }
  }
}
</script>