<template>
  <div>
    <Modal v-model="loginModal" width="24" :mask-closable="false">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" block>
        <span id="loginBox">
          <!-- 用户头像，可以自行修改或者使用数据库动态修改 -->
          <Avatar
            size="large"
            src="https://visualhunt.com/photos/1/nature-red-sun-rocks.jpg?s=s"
          />
        </span>
        <FormItem prop="user">
          <i-Input
            type="text"
            v-model="formInline.user"
            placeholder="输入您的账号"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-Input>
        </FormItem>
        <FormItem prop="password">
          <i-Input
            type="password"
            v-model="formInline.password"
            placeholder="输入您的密码"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </i-Input>
        </FormItem>
      </Form>

      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="handleSubmit('formInline')"
          >登录
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { login } from "@/network/request";

export default {
  name: "Login",
  created() {
    this.$bus.$on("showLogin", () => {
      this.loginModal = true;
    });
  },
  data() {
    return {
      loginModal: false, // 登录提示模块
      // 登录表单内容
      formInline: {
        user: "",
        password: "",
      },

      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /**
     * @description 登录,将用户名和密码传入即可
     */
    handleSubmit() {
      let name = this.formInline.user;
      let password = this.formInline.password;
      login(name, password).then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
          this.$Message.error("啊偶，无法向服务器发送请求...");
        }
      );
    },
  },
};
</script>

<style scoped>
  /* 登录盒子 */
  #loginBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }
</style>
