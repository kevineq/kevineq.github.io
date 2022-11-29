<template>
  <div class="user-view">
    <div class="pic"></div>
    <div class="back" @click="back"></div>
    <div class="text-box">
      <div class="text1">请设置新密码</div>
    </div>
    <div class="password">
      <div class="password-icon"></div>
      <input
        :type="type1"
        class="password-ipt"
        v-model="value1"
        placeholder="请输入密码"
        minlength="6"
        maxlength="20"
      />
      <van-icon class="eye" :name="isEye1" size="20px" @click="eye1 = !eye1" />
    </div>

    <div class="password">
      <div class="password-icon"></div>
      <input
        :type="type2"
        class="password-ipt"
        v-model="value2"
        placeholder="请输入密码"
        minlength="6"
        maxlength="20"
      />
      <van-icon class="eye" :name="isEye2" size="20px" @click="eye2 = !eye2" />
    </div>
    <div class="info">
      <div class="text">1.为了您的账号安全，新旧密码必须不同</div>
      <div class="text">2.密码由6-20位英文、数字、或符号组成</div>
    </div>
    <div class="login1" @click="determine">确定</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      eye1: false,
      eye2: false,
    };
  },

  computed: {
    type1() {
      return this.eye1 ? "text" : "password";
    },

    isEye1() {
      return this.eye1 ? "eye-o" : "closed-eye";
    },

    type2() {
      return this.eye2 ? "text" : "password";
    },

    isEye2() {
      return this.eye2 ? "eye-o" : "closed-eye";
    },
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    determine() {
      // console.log(this.value1);
      if (
        this.value1 == this.value2 &&
        this.value1.length >= 6 &&
        this.value1.length <= 20
      ) {
        localStorage["userPassword"] = this.value1;
        this.$router.go(-2);
        this.$toast({
          message: "重置密码成功",
          position: "bottom",
        });
      } else {
        this.$toast({
          message: "两次密码输入不同",
          position: "bottom",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-view {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  z-index: 50;

  .back {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
  }

  .pic {
    width: 100%;
    height: calc(100% / 4);
    background-size: cover;
    background-image: url(@/assets/img/one.jpg);
    margin-bottom: 40px;
  }

  .text-box {
    font-size: 14px;
    margin: 0 30px;
    margin-bottom: 20px;

    .text1 {
      height: 24px;
      line-height: 24px;
    }

    .text2 {
      height: 24px;
      line-height: 24px;
      color: #999;
    }
  }

  .password-ipt::-webkit-input-placeholder {
    color: #ccc;
    font-size: 14px;
  }

  .password-ipt {
    flex: 1;
    height: 18px;
    outline: none;
    border: none;
    padding: 0;
    font-size: 14px;
    margin-right: 10px;
    margin-left: 10px;
  }

  .password {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ccc;
    margin: 0 30px;
  }

  .password-icon {
    width: 30px;
    height: 30px;
    background-size: cover;
    background-image: url(@/assets/img/phone_password_icon.png);
  }

  .eye {
    margin-right: 20px;
  }

  input[type="password"]::-ms-reveal {
    display: none;
  }

  .login1 {
    text-align: center;
    padding: 15px 0;
    margin: 0 30px;
    background-color: #a6a6a6;
    border-radius: 10px;
    font-size: 14px;
    color: #eee;
  }

  .info {
    padding: 40px 30px 10px;
    font-size: 14px;
    color: #ccc;

    .text {
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }
}
</style>

