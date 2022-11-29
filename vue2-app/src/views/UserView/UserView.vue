<template>
  <div class="user-view">
    <div class="pic"></div>
    <div class="set" @click="set"></div>
    <div class="login" @click="login"></div>
    <div class="register" @click="register">还没有账号？ 点击注册</div>
    <div class="check">
      <input
        type="checkbox"
        ref="checkbox"
      />我已阅读并同意<span>《用户服务协议》</span>和<span>《隐私政策》</span>
    </div>
    <div class="other">其他登录方式</div>
    <div class="icon-list">
      <div class="icon" v-for="i in 3" :key="i"></div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      let userLogin = localStorage.userLogin;
      // console.log(userLogin);
      if (userLogin) {
        vm.$router.replace("/user/userLogin");
      }
    });
  },
  data() {
    return {};
  },

  methods: {
    register() {
      if (this.$refs.checkbox.checked) {
        this.$router.push("/register");
      } else {
        this.$toast({
          message: "登录/注册前请先阅读并同意相关协议",
          position: "bottom",
        });
      }
    },

    set() {
      this.$router.push("/share");
    },

    login() {
      if (this.$refs.checkbox.checked) {
        this.$router.push("/login");
      } else {
        this.$toast({
          message: "登录/注册前请先阅读并同意相关协议",
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
  width: 100vw;
  height: calc(100vh - 55px);
  background-color: #f4f3f8;
  top: 0;
  z-index: 50;

  .pic {
    width: 100%;
    height: calc(100% / 2.3);
    background-size: cover;
    background-image: url(@/assets/img/login.jpg);
  }

  .set {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
  }

  .login {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-top: 70px;
    background-size: cover;
    background-image: url(@/assets/img/sign_up.png);
  }

  .register {
    text-align: center;
    margin: 20px 0;
    font-size: 14px;
    color: #000;
    font-weight: 600;
  }

  .check {
    font-size: 12px;
    text-align: center;
    color: #999;

    input {
      width: 14px;
      height: 14px;
      margin: 0;
      transform: translateY(2px);
      margin-right: 5px;
    }

    span {
      color: #000;
    }
  }

  .other {
    font-size: 13px;
    text-align: center;
    color: #999;
    margin-top: 50px;
  }

  .icon-list {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 10px;

    .icon {
      width: 30px;
      height: 30px;
      background-size: cover;
    }

    .icon:nth-of-type(1) {
      background-image: url(@/assets/img/share/bubble_wechat.png);
    }

    .icon:nth-of-type(2) {
      background-image: url(@/assets/img/bubble_weibo.png);
    }

    .icon:nth-of-type(3) {
      background-image: url(@/assets/img/share/bubble_qq.png);
    }
  }
}
</style>

