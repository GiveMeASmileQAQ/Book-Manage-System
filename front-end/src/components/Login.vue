<template>
  <div class="writeFarming">
    <div class="container">
      <h1>欢 迎 进 入 XiliXili</h1>
      <div style="padding: 15px"></div>
      <div class="flip" :class="{ flipd: toggle }">
        <div class="front">
          <el-card style="border-radius: 25px; box-shadow: 0px 5px 5px #888888">
            <h3>登录</h3>
            <div style="margin: 30px"></div>
            <el-form :model="formData_login" :rules="loginRule" ref="loginForm">
              <el-form-item prop="studentId">
                <el-input
                  type="text"
                  v-model="formData_login.studentId"
                  placeholder="学号"
                >
                </el-input>
              </el-form-item>
              <el-form-item prop="userPassword">
                <el-input
                  type="password"
                  v-model="formData_login.userPassword"
                  placeholder="密码"
                />
              </el-form-item>
            </el-form>
            <el-button
              icon="el-icon-user-solid"
              circle
              @click="login"
            ></el-button>
            <p>如果没有账号,可以点击 <a href="#" @click="flip">进行注册</a></p>
          </el-card>
        </div>

        <div class="back">
          <el-card style="border-radius: 25px; box-shadow: 0px 5px 5px #888888">
            <h3>注册</h3>
            <div style="margin: 30px"></div>
            <el-form
              :model="formData_register"
              :rules="registerRule"
              ref="registerForm"
            >
              <el-form-item prop="studentId">
                <el-input
                  type="text"
                  v-model="formData_register.studentId"
                  placeholder="学号"
                />
              </el-form-item>
              <el-form-item prop="userPassword">
                <el-input
                  type="password"
                  v-model="formData_register.userPassword"
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
            <el-button icon="el-icon-user" circle @click="register"></el-button>
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
    var check = (rule, value, callback) => {
      this.$axios({
        method: "post",
        url: "/api/user/isExist",
        data: {
          studentId: this.formData_register.studentId,
        },
        transformRequest: [
          function (data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            ret = ret.substring(0, ret.lastIndexOf("&"));
            return ret;
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((res) => {
        if (!res.data.success) {
          callback(new Error("此学号暂无注册资格"));
        }
      });
    };
    var userPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formData_register.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginRule: {
        studentId: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "blur",
          },
        ],
        userPassword: [
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
        studentId: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "blur",
          },
          { required: true, validator: check, trigger: "blur" },
        ],
        userPassword: [
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
        studentId: "",
        userPassword: "",
      },

      formData_register: {
        studentId: "",
        userPassword: "",
        repassword: "",
      },

      toggle: "false",
    };
  },
  methods: {
    //翻面事件
    flip: function () {
      this.toggle = !this.toggle;
      this.$refs.loginForm.resetFields();
      this.$refs.registerForm.resetFields();
    },

    //登录事件
    login: function () {
      this.$axios
        .post("/api/user/login", {
          studentId: this.formData_login.studentId,
          userPassword: this.formData_login.userPassword,
        })
        .then((res) => {
          if (res.data.success) {
            sessionStorage.setItem("user", JSON.stringify(res.data.data));
            this.$router.push("/index");
          } else {
            //1.清空表单
            this.$refs.loginForm.resetFields();
            //2.输出错误信息
            this.$message({
              type: "warning",
              showClose: true,
              message: res.data.msg,
              center: true,
            });
          }
        });
    },

    //注册事件
    register: function () {
      this.$axios
        .post("/api/user/register", {
          studentId: this.formData_register.studentId,
          userPassword: this.formData_register.userPassword,
        })
        .then((res) => {
          if (res.data.success) {
            //1.显示注册成功
            this.$message({
              type: "success",
              showClose: true,
              message: res.data.msg,
              center: true,
            });
            //2.跳转回登录界面
            this.flip();
          } else {
            //1.清空表单
            this.$refs.registerForm.resetFields();
            //2.提示注册失败
            this.$message({
              type: "warning",
              showClose: true,
              message: res.data.msg,
              center: true,
            });
          }
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
  transform: rotateY(180deg);
}
.flipd {
  transform: rotateY(180deg);
}
</style>