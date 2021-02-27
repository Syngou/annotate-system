<template>
  <div class="login">
    <vue-particles
      class="login-bg"
      color="#39AFFD"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#8DD1FE"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <!-- 登录面板 -->
    <div class="login-box">
      <div class="login-box-title">后台管理系统</div>
      <div class="login-box-from">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          class="demo-ruleForm"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              ref="username"
              placeholder="请输入用户名"
              size="medium"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            >
              <el-button slot="prepend" icon="el-icon-user"></el-button>
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
              <el-button slot="prepend" icon="el-icon-key"></el-button>
            </el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="medium"
              :loading="loading"
              style="width: 100%"
              @click.native.prevent="handleLogin"
              >立即登陆</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
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
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    position: relative;

    &-bg {
      width: 100%;
      height: 100%;
      background: #3e3e3e;
    }
    &-box {
      width: 350px;
      /* height: 287px; */
      background: hsla(0, 0%, 100%, 0.3);
      border-radius: 5px;
      box-shadow: 0 0 2px #f7f7f7;
      border: 1px solid #f7f7f7;
      position: absolute;
      left: 50%;
      top: 50%;
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