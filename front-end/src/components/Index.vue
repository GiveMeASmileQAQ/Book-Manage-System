<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1 class="title">智 慧 文 创 图 书 馆</h1>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px">
      <el-col :span="6" :offset="9">
        <el-input size="large" v-model="input" clearable> </el-input>
      </el-col>
      <el-col :span="1">
        <el-button>搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
    };
  },
  methods: {},
};
</script>

<style>
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 650px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>