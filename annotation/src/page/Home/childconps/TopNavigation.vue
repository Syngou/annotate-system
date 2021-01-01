<template>
  <div class="topNavigation">
    <span class="title">医疗文本标注平台</span>
    <a href="#" @click="introduceModal = true">功能介绍</a>
    <a href="#" @click="uploadModal = true">上传文件</a>
    <a href="#" @click="pasteContentModal = true">输入文本</a>
    <a href="#" @click="outputContent">输出文本</a>
    <a href="#" @click="showAnnotations">显示标注词语</a>
    <a href="#" @click="loginModal = true">登录1</a>
    <a href="#" @click="loginInNewPage">登录2</a>
    <Icon
      type="md-sunny"
      color="white"
      size="30"
      v-show="darkMode"
      style="cursor: pointer; float: right"
      @click="toggleMode"
    />
    <Icon
      type="ios-moon-outline"
      color="white"
      size="30"
      v-show="!darkMode"
      style="cursor: pointer; float: right"
      @click="toggleMode"
    />

    <!-- ------------------------------------------------------------------------------------- -->
    <!--                                     登录模块                                             -->
    <!-- --------------------------------------------------------------------------------------- -->
    <Modal v-model="loginModal" width="24" :mask-closable="false">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" block>
        <span id="loginBox">
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
    <!-- ------------------------------------------------------------------------------------- -->
    <!--                                  功能介绍模块                                             -->
    <!-- --------------------------------------------------------------------------------------- -->
    <Modal v-model="introduceModal" title="功能介绍" :mask-closable="false">
      <p>按下鼠标，滑过文本，松开，即可标注文本,右栏实时显示标注的文本</p>
      <br />
      <p>也可以选择使用快捷键标注：对应快捷键：</p>
      <br />
      <p>红：r(red);蓝：b(blue);绿：g(green);橙：o(orange)</p>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="introduceModal = false">我知道了</Button>
      </div>
    </Modal>

    <!-- ------------------------------------------------------------------------------------- -->
    <!--                                  上传文件                                              -->
    <!-- --------------------------------------------------------------------------------------- -->

    <Modal v-model="uploadModal" title="上传文件" :mask-closable="false">
      <Upload multiple type="drag" action="127.0.0.1">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或把文件拖到这里</p>
        </div>
      </Upload>

      <!-- ------------------------------------------------------------------------------------- -->
      <!--                                  粘贴文本                                              -->
      <!-- --------------------------------------------------------------------------------------- -->
    </Modal>
    <Modal
      v-model="pasteContentModal"
      title="在这里输入或粘贴你的文本（若不成功，请刷新网页后重试）"
      :mask-closable="false"
    >
      <label>
        <textarea type="text" ref="inputContentId"></textarea>
      </label>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="pasteContent">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { request } from "@/network/request";

import {
  disable as disableDarkMode,
  enable as enableDarkMode,
} from "darkreader";

export default {
  name: "TopNavigation",
  data() {
    return {
      loginModal: false, // 登录提示模块
      introduceModal: false, // 介绍提示模块
      pasteContentModal: false, // 粘贴文本
      uploadModal: false, // 上传文件
      darkMode: false, // 夜间模式
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
    //             粘贴文本

    pasteContent() {
      this.pasteContentModal = false;
      this.$store.state.inputContent = this.$refs.inputContentId.value;
      this.$store.state.nameList = [];
      this.$store.state.relationsList = [];
      this.$store.state.medicineList = [];
      this.$store.state.toolsList = [];
    },

    outputContent() {
      this.$Message.info("功能正在开发...");
    },

    //     日，夜间模式 切换

    toggleMode() {
      if (!this.darkMode) {
        this.darkMode = !this.darkMode;
        enableDarkMode({
          brightness: 150,
          contrast: 90,
          sepia: 0,
        });
      } else {
        this.darkMode = !this.darkMode;
        disableDarkMode();
      }
    },
    showAnnotations() {
      this.$store.state.showAnnotations = !this.$store.state.showAnnotations;
    },
    //  登录，请求本地json
    handleSubmit(name) {
      request({
        url: "/Login.json",
      }).then(
        (res) => {
          this.$refs[name].validate(() => {
            if (
              this.formInline.user === res.data.data.user &&
              this.formInline.password === res.data.data.password
            ) {
              this.$router.push("/user");
              this.loginModal = false;
              this.$Message.success("登录成功");
            } else {
              this.$Message.error("账号或密码错误");
            }
          });
        },
        (err) => {
          console.log(err);
          this.$Message.error("啊偶，无法向服务器发送请求...");
        }
      );
    },
    loginInNewPage() {
      this.$router.push("/login").catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
  .title {
    margin-left: 30px;
    color: red;
    font-size: 22px;
  }

  /* 导航条 */
  .topNavigation {
    position: fixed;
    top: 0;
    overflow: hidden;
    width: 100%;
    padding-right: 20px;
    z-index: 50;
    background-color: #333;
  }

  /* 导航条链接 */
  .topNavigation a {
    display: inline-block;
    padding: 14px 16px;
    background-color: #333;
    color: #f2f2f2;
    text-align: center;
    text-decoration: none;
  }

  /* 链接颜色修改 */
  .topNavigation a:hover {
    background-color: #ddd;
    color: black;
  }

  #loginBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
  }

  textarea {
    width: 100%;
    height: 250px;
    font-size: 20px;
  }
</style>
