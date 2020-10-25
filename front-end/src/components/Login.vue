<template>
  <div class="writeFarming">
    <div class="container">
    <h1>欢 迎 进 入 XiliXili</h1>
    <div style="padding:15px"></div>
      <div class="flip" :class="{ flipd: toggle }">
        <div class="front">
          <el-card style="border-radius: 25px;box-shadow: 0px 5px 5px #888888;">
            <h3>登录</h3>
            <div style="margin: 30px"></div>
            <el-form :model="formData_login" :rules="loginRule" ref="loginForm">
              <el-form-item prop="username">
                <el-input
                  type="text"
                  v-model="formData_login.username"
                  placeholder="用户名"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="formData_login.password"
                  placeholder="密码"
                />
              </el-form-item>
            </el-form>
            <el-button icon="el-icon-search" circle @click="login"></el-button>
            <p>如果没有账号,可以点击 <a href="#" @click="flip">进行注册</a></p>
          </el-card>
        </div>

        <div class="back">
          <el-card style="border-radius: 25px;box-shadow: 0px 5px 5px #888888;">
            <h3>注册</h3>
            <div style="margin: 30px"></div>
            <el-form
              :model="formData_register"
              :rules="registerRule"
              ref="registerForm"
            >
              <el-form-item prop="username">
                <el-input
                  type="text"
                  v-model="formData_register.username"
                  placeholder="用户名"
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  v-model="formData_register.password"
                  placeholder="密码"
                />
              </el-form-item>
              <el-form-item prop="repassword">
                <el-input
                  type="password"
                  v-model="formData_register.repassword"
                  placeholder="确认密码"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <el-button
              icon="el-icon-search"
              circle
              @click="register"
            ></el-button>
            <p>如果已有账号,可以点击 <a href="#" @click="flip">进行登录</a></p>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var userPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData_register.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
      registerRule: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, validator: userPassWord, trigger: "blur" },
        ],
      },
      formData_login: {
        username: "",
        password: "",
      },

      formData_register: {
        username: "",
        password: "",
        repassword: "",
      },
      toggle: "true",
    };
  },
  methods: {
    flip: function () {
      this.toggle = !this.toggle;
      this.$refs.loginForm.resetFields();
      this.$refs.registerForm.resetFields();
    },
    login: function () {
      this.$axios
        .post("/api/user/login", {
          username: this.formData_login.username,
          password: this.formData_login.password,
        })
        .then((res) => {
          console.log(res.data);
        });
    },
    register: function () {
      this.$axios
        .post("/api/user/register", {
          username: this.formData_register.username,
          password: this.formData_register.password,
        })
        .then((res) => {
          console.log(res.data);
        });
    },
  },
  created() {},
};
</script>

<style>
.writeFarming {
  background: linear-gradient(-45deg, #2d8cf0, #19be6b, #ff9900, #ed3f14);
  animation: gradientBG 10s ease infinite;
  background-size: 400% 400%;
  height: 100%;
  width: 100%;
  position: fixed;
  
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.flip {
  position: relative;
}
.front,
.back {
  position: absolute;
  top: 0px;
  left: 0px;
}
.container {
  margin: 0 auto;
  margin-top: 10%;
  perspective: 1000;
  transform-style: preserve-3d;
}
.container,
.front,
.back {
  
  width: 400px;
  height: 320px;
}
.flip {
  position: relative;
  transition: 0.6s;
  transform-style: preserve-3d;
}
.front,
.back {
  position: absolute;
  top: 0px;
  left: 0px;
  backface-visibility: hidden;
}
.front {
  z-index: 2;
}
.front {
  transform: rotateY(-180deg);
}
.flipd {
  transform: rotateY(180deg);
}
</style>