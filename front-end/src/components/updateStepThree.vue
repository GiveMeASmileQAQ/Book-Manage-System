<template>
  <div>
    <el-row>
      <el-steps :active="2" finish-status="success" align-center>
        <el-step title="校验邮箱"></el-step>
        <el-step title="密码更新"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
    </el-row>
    <el-col style="margin-top: 20px">
      <div class="success">修 改 成 功</div>
    </el-col>
    <div>{{ content }}</div>
    <a href="#" @click="Go">点击此处直接跳转</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      totalTime: 6, //记录具体倒计时时间
      timer:""
    };
  },
  methods: {
    Go() {
      sessionStorage.removeItem("update");
      sessionStorage.removeItem("user");
      this.$router.push("/login");
    },
    countDown() {
      this.totalTime--;
      if (this.totalTime == -1) {
        clearInterval(this.timer);
        // this.Go();
      }
      this.content = this.totalTime + "s后回到登录页面";
    },
  },
  created() {
    this.countDown();
    this.timer = window.setInterval(this.countDown, 1000);
  },
};
</script>

<style>
.success {
  font-size: 30px;
  color: #00ff33;
}
</style>