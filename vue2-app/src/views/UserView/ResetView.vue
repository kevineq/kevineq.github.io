<template>
  <div class="user-view">
    <div class="pic"></div>
    <div class="back" @click="back"></div>
    <div class="text-box">
      <div class="text1">重置密码</div>
    </div>
    <div class="phone">
      <div class="phone-icon"></div>
      <input
        class="phone-ipt"
        type="search"
        v-model="value1"
        placeholder="手机号码"
        maxlength="11"
        autofocus
      />
    </div>
    <div class="code">
      <div class="code-icon"></div>
      <input
        class="code-ipt"
        v-model="value2"
        placeholder="短信验证码"
        maxlength="6"
      />
      <div class="text" ref="code" @click="getCode">发送验证码</div>
    </div>

    <div class="check">
      <input
        type="checkbox"
        ref="agree"
      />我已阅读并同意<span>《用户服务协议》</span>和<span>《隐私政策》</span>
    </div>
    <div class="login1" @click="next">下一步</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      code: "",
      time: 0,
      phoneNumber: "",
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },

    next() {
      if (this.$refs.agree.checked) {
        let isHas1 = this.value1 == this.phoneNumber;
        let isHas2 = this.value2 == this.code;
        if (isHas1 && isHas2) {
          this.value1 = "";
          this.value2 = "";
          this.time = 0;
          this.code = "";
          this.$refs.code.textContent = "发送验证码";
          this.$router.push("/reset/resetPassword");
        } else {
          this.$toast({
            message: "用户名或验证码错误",
          });
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
          this.phoneNumber = this.value1;
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
          // console.log(this.code);s
          let n = 60;
          let timer = null;
          timer = setInterval(() => {
            n--;
            this.time = n;
            this.$refs.code.textContent = n + "秒后重新获取";
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
  .code-ipt::-webkit-input-placeholder {
    color: #ccc;
    font-size: 14px;
  }

  .phone-ipt,
  .code-ipt {
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
  .code {
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

  .text {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #333;
    font-weight: 600;
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
}
</style>

