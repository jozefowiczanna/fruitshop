<template>
  <span>{{ formatData }}</span>
</template>

<script>
export default {
  name: "price",
  props: {
    value: [String, Number],
    precision: {
      type: Number,
      default: 2
    },
    suffix: {
      type: String,
      default: "none"
    }
  },
  computed: {
    formatData() {
      let val = this.value + "";
      val = val.replace(',', '.');

      val = parseFloat(val).toFixed(this.precision).replace('.', ',');
      return (this.suffix === "none") ? val : (val + " " + this.suffix);
    }
  }
}
</script>