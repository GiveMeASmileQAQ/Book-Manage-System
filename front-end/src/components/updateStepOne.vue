<template>
  <div>
    <el-row>
      <el-steps :active="0" finish-status="process" align-center>
        <el-step title="校验邮箱"></el-step>
        <el-step title="密码更新"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
    </el-row>
    <el-form :model="formData" :rules="rule" ref="form">
      <el-row style="margin-top: 20px">
        <el-col :span="6" :offset="1" style="font-size: 22px; margin-top: 5px"
          >邮箱:
        </el-col>
        <el-col :span="11">
          <el-form-item prop="email">
            <el-input
              type="email"
              v-model="formData.email"
              :readonly="justRead ? 'readonly' : false"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="5" :offset="1" style="font-size: 22px; margin-top: 5px"
          >验证码:
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item prop="valid">
            <el-input type="text" v-model="formData.valid"/>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click="sendEmail"
            ><i class="el-icon-s-promotion el-icon--left"></i
            >发送邮件</el-button
          >
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col>
          <el-button type="primary" @click="Go"
            ><i class="el-icon-right el-icon--left"></i>下一步</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var check = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.validate) {
        callback(new Error("验证码错误!"));
      } else {
        callback();
      }
    };
    return {
      rule: {
        valid: [
          { required: true, validator: check, trigger: "blur" },
        ],
      },
      formData: {
        email: "",
        valid: "",
      },
      validate:"",
      justRead: false,
    };
  },
  methods: {
    Go: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          sessionStorage.setItem("update",this.formData.email);
          this.$router.push("updateStepTwo");
        } else {
          this.$message({
            type: "warning",
            showClose: true,
            message: "验证码错误",
            center: true,
          });
        }
      });
    },
    sendEmail() {
      this.$axios({
        method: "post",
        url: "/api/student/email",
        data: {
          email: this.formData.email,
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
        if (res.data.success) {
          this.validate = res.data.data;
          console.log(this.validate);
        } else {
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
  created() {
    this.formData.email = this.$store.state.student.studentEmail;
  },
  mounted() {
    this.justRead = true;
  },
  computed: {
    getEmail() {
      return this.$store.state.student.studentEmail;
    },
  },
  watch: {
    getEmail(val) {
      this.formData.email = val;
    },
  },
};
</script>

<style>
</style>