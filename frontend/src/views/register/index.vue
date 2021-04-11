<template>
  <div class="register">
    <!-- 注册面板 -->
    <div class="register-box">
      <div class="register-box-title">
        后台管理系统
      </div>
      <div class="register-box-from">
        <el-form
          ref="registerForm"
          :rules="registerRules"
          :model="registerForm"
          class="demo-ruleForm"
          auto-complete="on"
          label-position="left"
        >
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="registerForm.username"
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
              v-model="registerForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              size="medium"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleRegister"
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
              @click.native.prevent="handleRegister"
            >
              注册
            </el-button>
          </el-form-item>
          <router-link to="/login" class="login-text">
            登录
          </router-link>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  validateRegisterUsername,
  validateRegisterPassword,
} from "@/utils/validate.js";

export default {
  name: "Register",

  data() {
    return {
      //表单数据
      registerForm: {
        username: "",
        password: "",
      },
      //表单验证
      registerRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateRegisterUsername,
            message: "请输入您的昵称",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validateRegisterPassword,
            message: "密码不能小于6位数",
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
     * 注册
     */
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/register", this.registerForm)
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
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url("../../assets/user/login.png");

  &-box {
    width: 350px;

    /* height: 287px; */
    background: rgba(255, 255, 255, 0.9);
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
      color: #000;
      text-align: center;
      border-bottom: 1px solid #312a2a;
    }

    &-from {
      width: 100%;
      height: auto;
      padding: 30px;
      box-sizing: border-box;

      .login-text {
        cursor: pointer;
        float: right;
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
  }
}
</style>
