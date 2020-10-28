<template>
  <div>
    <el-row>
      <el-steps :active="1" finish-status="success" align-center>
        <el-step title="校验邮箱"></el-step>
        <el-step title="密码更新"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
    </el-row>
    <el-row></el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      updateMassage: {
        oldPassword: "",
        newPassowrd: "",
      },
    };
  },
};
</script>

<style>
</style>