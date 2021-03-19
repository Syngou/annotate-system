<template>
  <div class="login">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particle-opacity="0.7"
      :particles-number="100"
      shape-type="circle"
      :particle-size="4"
      lines-color="#8DD1FE"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    />
    <!-- 登录面板 -->
    <div class="login-box">
      <div class="login-box-title">后台管理系统</div>
      <div class="login-box-from">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="demo-ruleForm"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="medium"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            >
              <el-button slot="prepend" icon="el-icon-user" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              size="medium"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            >
              <el-button slot="prepend" icon="el-icon-key" />
            </el-input>
            <span class="show-pwd" @click="showPwd">
              <SvgIcon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              :loading="loading"
              style="width: 100%;"
              @click.native.prevent="handleLogin"
            >
              注册
            </el-button>
          </el-form-item>
          <router-link to="/login" class="register">登录</router-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Register",

  data() {
    const validateUsername = (rule, value, callback) => {
      rule;
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      rule;
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
            message: "请输入您的昵称",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
            message: "请输入密码",
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("提交错误!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
img {
  margin: 10px 20px 0 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.register {
  cursor: pointer;
  float: right;
}
.login {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #2d3a4b;

  &-bg {
    width: 100%;
    height: 100%;
    background: #565856;
  }
  &-box {
    width: 350px;
    /* height: 287px; */
    background: rgba(255, 255, 255, 0.3);
    border-radius: 5px;
    box-shadow: 0 0 2px #f7f7f7;
    border: 1px solid #f7f7f7;
    position: absolute;
    left: 50%;
    top: 40%;
    margin-left: -175px;
    margin-top: -150px;

    &-title {
      line-height: 50px;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      border-bottom: 1px solid #ffffff;
    }
    &-from {
      width: 100%;
      height: auto;
      padding: 30px;
      box-sizing: border-box;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 0;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
}
</style>
