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
              style="width: 100%;"
              @click.native.prevent="handleLogin"
              >立即登陆</el-button
            >
          </el-form-item>
          <div class="account-other">
            <span>其它登录方式</span>
            <span class="pwd">忘记密码？</span>

            <div>
              <img
                src="https://file.iviewui.com/admin-pro-dist/img/icon-social-wechat.c69ec08c.svg"
                alt="wechat"
              />
              <img
                src="https://file.iviewui.com/admin-pro-dist/img/icon-social-qq.2cf4276d.svg"
                alt="qq"
              />
              <img
                src="https://file.iviewui.com/admin-pro-dist/img/icon-social-weibo.cbf658a0.svg"
                alt="weibo"
              />
              <router-link to="/register">
                <span class="register"> 注册 </span>
              </router-link>
            </div>
          </div>
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
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("输入的密码不能少于6位数"));
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
          {
            required: true,
            trigger: "blur",
            validator: validateUsername,
            message: "请输入正确的昵称",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
            message: "请输入正确的密码",
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
    /**
     * 显示密码
     */
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
    /**
     * 登录
     */
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
          console.log("提交发生错误!!");
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
img {
  margin: 10px 20px 0 0;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.pwd {
  cursor: pointer;
  float: right;
}
.register {
  cursor: pointer;
  float: right;
  margin-top: 20px;
}
</style>
