<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">
        更新
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { userInfoUpdateApi } from "@/api/user";
import { setToken } from "@/utils/auth";
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
        };
      },
    },
  },
  methods: {
    /**
     * 更新用户信息
     */
    submit() {
      if (this.user.name == "") {
        this.$message.error("用户名不能为空");
      } else {
        userInfoUpdateApi(this.user).then((res) => {
          setToken(res.data.token);
          this.$store.dispatch("user/setName", this.user.name);
          this.$message({
            message: "用户信息更新成功",
            type: "success",
            duration: 5 * 1000,
          });
        });
      }
    },
  },
};
</script>
