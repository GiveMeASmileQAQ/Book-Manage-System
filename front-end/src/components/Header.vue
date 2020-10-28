<template>
  <div>
    <el-menu
      class="el-menu-demo"
      :default-active="this.$route.path"
      router
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-row>
        <el-col :span="3">
          <el-menu-item index="/main/index" router>智 慧 文 创 图 书 馆</el-menu-item>
        </el-col>

        <el-col :span="2" :offset="17">
          <el-menu-item index="/main/library">书库</el-menu-item>
        </el-col>

        <el-col :span="2">
          <el-submenu index="">
            <template slot="title">登录</template>
            <el-menu-item index="/main/details">个人信息</el-menu-item>
            <el-menu-item index="/main/record">借阅记录</el-menu-item>
            <el-menu-item index="/main/out">退出登录</el-menu-item>
          </el-submenu>
        </el-col>
      </el-row>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
</style>