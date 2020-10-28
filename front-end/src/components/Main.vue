<template>
  <div>
    <el-row>
      <el-col :span="24">
        <Header></Header>
      </el-col>
    </el-row>

    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  components: { Header },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>