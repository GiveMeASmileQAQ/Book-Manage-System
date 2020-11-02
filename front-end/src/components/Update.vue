<template>
  <div>
    <el-row>
      <el-col :span="9" :offset="8">
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style>
.el-card{
  height: 300px;
}
</style>