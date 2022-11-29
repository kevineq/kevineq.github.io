<template>
    <div class="sound-wave">
      <div
        class="wave-item"
        :class="{ play: playState }"
        v-for="i in count"
        :key="i"
      ></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      playState: Boolean,
    },
    data() {
      return {
        count: 11,
      };
    },
  };
  </script>
  
  
  <style lang="scss" scoped>
  .sound-wave {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    .wave-item {
      width: 3px;
      height: 8px;
      background: #fff;
  
      &:nth-child(6) {
        transform: scaleY(2.5);
      }
  
      &:nth-child(5),
      &:nth-child(7) {
        transform: scaleY(2);
      }
  
      &:nth-child(4),
      &:nth-child(8) {
        transform: scaleY(1.5);
      }
  
      &.play {
        &:nth-child(6) {
          animation: centerAnimate 1s linear infinite;
        }
  
        &:nth-child(5),
        &:nth-child(7) {
          animation: animate57 1s linear infinite;
        }
  
        &:nth-child(4),
        &:nth-child(8) {
          animation: animate48 1s linear infinite;
        }
  
        &:nth-child(3),
        &:nth-child(9) {
          animation: animate57 1s linear infinite;
        }
      }
    }
  }
  
  @keyframes centerAnimate {
    0% {
      transform: scaleY(1);
    }
  
    33% {
      transform: scaleY(1.2);
    }
  
    66% {
      transform: scaleY(3);
    }
  
    100% {
      transform: scaleY(1);
    }
  }
  
  @keyframes animate57 {
    0% {
      transform: scaleY(0.8);
    }
  
    33% {
      transform: scaleY(1.5);
    }
  
    66% {
      transform: scaleY(1.2);
    }
  
    100% {
      transform: scaleY(0.8);
    }
  }
  
  @keyframes animate48 {
    0% {
      transform: scaleY(2.5);
    }
  
    33% {
      transform: scaleY(1.5);
    }
  
    66% {
      transform: scaleY(0.8);
    }
  
    100% {
      transform: scaleY(2.5);
    }
  }
  </style>