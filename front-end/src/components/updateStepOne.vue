<template>
  <div>
    <el-row>
      <el-steps :active="0" finish-status="process" align-center>
        <el-step title="校验邮箱"></el-step>
        <el-step title="密码更新"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="6" :offset="1" style="font-size: 22px; margin-top: 5px"
        >邮箱:
      </el-col>
      <el-col :span="11">
        <el-input type="email" v-model="email" />
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="5" :offset="1" style="font-size: 22px; margin-top: 5px"
        >验证码:
      </el-col>
      <el-col :span="11" :offset="1">
        <el-input type="text" />
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="primary"
          ><i class="el-icon-s-promotion el-icon--left"></i>发送邮件</el-button
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    Go: function () {
      this.$router.push("updateStepTwo");
    },
  },
  created() {
    this.email = this.$store.state.student.studentEmail;
  },
  watch: {
    "this.$store.state.student": function (newValue, oldValue) {
        console.log("1");
      this.email= newValue.studentEmail;
    },
  },
};
</script>

<style>
</style>