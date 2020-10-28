<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card shadow="always" body-style="text-align: left;">
          <div>学号: {{ this.student.studentId }}</div>
          <div>姓名: {{ this.student.studentName }}</div>
          <div>性别: {{ this.student.studentGender }}</div>
          <div>邮箱：{{ this.student.studentEmail }}</div>
          <div>出生日期: {{ this.student.studentAge }}</div>
          <div>所在年级: {{ this.student.studentGrade }}</div>
          <div>所在系别: {{ this.student.studentDept }}</div>
          <div>所在班级: {{ this.student.studentMajor }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      student: {
        studentId: "",
        studentName: "",
        studentGender: "",
        studentAge: "",
        studentEmail: "",
        studentGrade: "",
        studentContact: "",
        studentDept: "",
        studentMajor: "",
      },
    };
  },
  methods: {},
  created() {
    this.student = this.$store.state.student;
  },
};
</script>

<style>
</style>