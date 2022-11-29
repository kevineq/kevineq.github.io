<template>
  <div
    class="line"
    :style="{
      backgroundColor: color,
      margin: margin,
      top: offsetY,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "black",
    },
    margin: {
      type: String,
      default: "0",
    },
    offsetY: {
      type: String,
      default: "0",
    },
  },
};
</script>

<style lang="scss" scoped>
.line {
  position: relative;
  flex: 1;
  height: 1px;

  @media screen and (-webkit-min-device-pixel-ratio: 1.5) {
    transform: scaleY(0.75);
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    transform: scaleY(0.5);
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    transform: scaleY(0.33);
  }
}
</style>