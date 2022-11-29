<template>
  <div class="user-view">
    <div class="pic"></div>
    <div class="back" @click="back"></div>
    <div class="text-box">
      <div class="text1">{{ show ? "密码登录" : "手机号验证码登录" }}</div>
      <div class="text2" v-show="!show">短信验证后自动登录</div>
    </div>
    <div class="phone">
      <div class="phone-icon" :class="{ active: show }"></div>
      <input
        class="phone-ipt"
        type="search"
        v-model="value1"
        placeholder="手机号码"
        maxlength="11"
        autofocus
      />
    </div>
    <div class="code" v-if="!show">
      <div class="code-icon"></div>
      <input
        class="code-ipt"
        v-model="value2"
        placeholder="短信验证码"
        maxlength="6"
      />
      <div class="text" ref="code" v-show="!show" @click="getCode">
        发送验证码
      </div>
    </div>

    <div class="password" v-if="show">
      <div class="password-icon"></div>
      <input
        :type="type"
        class="password-ipt"
        v-model="value2"
        placeholder="请输入密码"
        maxlength="15"
      />
      <van-icon
        class="eye"
        :name="isEye"
        size="20px"
        v-show="show"
        @click="eye = !eye"
      />
    </div>

    <div class="forget" v-if="show" @click="forget">忘记密码？</div>

    <div class="check">
      <input
        type="checkbox"
        ref="agree"
      />我已阅读并同意<span>《用户服务协议》</span>和<span>《隐私政策》</span>
    </div>

    <div class="login1" @click="login">登录</div>

    <div class="toggle">
      <div class="log" @click="loginType">
        {{ show ? "验证码登录" : "密码登录" }}
      </div>
      <div class="register" @click="register">注册</div>
    </div>

    <div class="other">其他登录方式</div>
    <div class="icon-list">
      <div class="icon" v-for="i in 3" :key="i"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      show: false,
      eye: false,
      code: "",
      time: 0,
    };
  },

  computed: {
    type() {
      return this.eye ? "text" : "password";
    },

    isEye() {
      return this.eye ? "eye-o" : "closed-eye";
    },
  },

  methods: {
    forget() {
      this.$router.push("/reset");
    },

    loginType() {
      this.show = !this.show;
      this.value2 = "";
    },

    register() {
      this.$router.push("/register");
    },

    back() {
      this.$router.go(-1);
    },

    login() {
      if (this.$refs.agree.checked) {
        let userRegister = localStorage.userRegister;
        let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        let isHas1 = reg.test(this.value1);
        if (!this.show) {
          let isHas2 = this.value2 == this.code;
          if (this.value1 == userRegister && isHas1 && isHas2) {
            localStorage["userLogin"] = this.value1;
            this.$router.replace("/user/userLogin");
          } else {
            this.$toast({
              message: "用户名或验证码错误",
            });
          }
        } else {
          let userPassword = localStorage.userPassword;
          if (
            this.value1 == userRegister &&
            isHas1 &&
            this.value2 == userPassword
          ) {
            localStorage["userLogin"] = this.value1;
            this.$router.replace("/user/userLogin");
          } else {
            this.$toast({
              message: "用户名或密码错误",
            });
          }
        }
      } else {
        this.$toast({
          message: "登录/注册前请先阅读并同意相关协议",
        });
      }
    },

    getCode() {
      if (this.time) {
        return;
      }
      let userRegister = localStorage.userRegister;
      let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      let isHas = reg.test(this.value1);
      if (isHas) {
        if (this.value1 == userRegister) {
          let code = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
          ];
          var codeArr = [];
          for (var i = 0; i < 6; i++) {
            var index = Math.floor(Math.random() * code.length);
            var codeStr = code[index];
            codeArr.push(codeStr);
          }
          this.code = codeArr.join("");
          // console.log(this.code);
          let n = 60;
          let timer = null;
          timer = setInterval(() => {
            n--;
            this.time = n;
            this.$refs.code.textContent = n + "秒后重发";
            if (n == 0) {
              clearInterval(timer);
              this.time = n;
              this.$refs.code.textContent = "发送验证码";
            }
          }, 1000);
        } else {
          this.$toast({
            message: "用户未注册,请先注册",
          });
        }
      } else {
        this.$toast({
          message: "用户名或验证码错误",
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

  .phone-ipt::-webkit-input-placeholder,
  .code-ipt::-webkit-input-placeholder,
  .password-ipt::-webkit-input-placeholder {
    color: #ccc;
    font-size: 14px;
  }

  .phone-ipt,
  .code-ipt,
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

  .phone,
  .code,
  .password {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #ccc;
    margin: 0 30px;
  }

  .phone-icon {
    width: 30px;
    height: 30px;
    background-size: cover;
    background-image: url(@/assets/img/phone_icon.png);
  }

  .code-icon {
    width: 30px;
    height: 30px;
    background-size: cover;
    background-image: url(@/assets/img/phone_verify_code_icon.png);
  }

  .password-icon {
    width: 30px;
    height: 30px;
    background-size: cover;
    background-image: url(@/assets/img/phone_password_icon.png);
  }

  .text {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #333;
    font-weight: 600;
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

  .toggle {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }

  .forget {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    font-size: 14px;
  }

  .check {
    margin-top: 30px;
    font-size: 12px;
    text-align: center;
    color: #999;
    height: 40px;
    line-height: 40px;

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
    margin-top: 40px;
  }

  .icon-list {
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
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

