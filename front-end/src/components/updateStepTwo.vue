<template>
  <div>
    <el-row>
      <el-steps :active="1" finish-status="success" align-center>
        <el-step title="校验邮箱"></el-step>
        <el-step title="密码更新"></el-step>
        <el-step title="修改成功"></el-step>
      </el-steps>
    </el-row>
    <el-row>
      <el-form ref="form" :rules="rule" :model="updateMassage">
        <el-row style="margin-top: 20px">
          <el-col :span="6" :offset="1" style="font-size: 22px; margin-top: 5px"
            >新的密码:
          </el-col>
          <el-col :span="11">
            <el-form-item prop="newPassword">
              <el-input
                type="password"
                v-model="updateMassage.newPassword"
                show-password
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="6" :offset="1" style="font-size: 22px; margin-top: 5px"
            >确认密码:
          </el-col>
          <el-col :span="11">
            <el-form-item prop="repeat">
              <el-input
                type="password"
                v-model="updateMassage.repeat"
                show-password
              />
            </el-form-item>
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
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var check = (rule, value, callback) => {
      if (value !== this.updateMassage.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rule: {
        newPassword: [
          { required: true, message: "请输入新的密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        repeat: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            message: "密码不一致",
            validator: check,
            trigger: "blur",
          },
        ],
      },

      updateMassage: {
        newPassword: "",
        repeat: "",
      },
    };
  },
  methods: {
    Go() {
      this.$axios({
        method: "post",
        url: "/api/user/update",
        data: {
          studentId:this.$store.state.student.studentId,
          newPassword: this.updateMassage.newPassword,
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
        if(res.data.success){
          this.$router.push("/update/updateStepThree");
        }else{
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
};
</script>

<style>
</style>