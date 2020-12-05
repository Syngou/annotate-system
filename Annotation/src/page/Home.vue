<template>
  <!-- ----------------------------------------------------------------------- -->
  <!--?                                  头部区域                                 -->
  <!-- ----------------------------------------------------------------------- -->

  <!-- ----------------------------------------------------------------------- -->
  <!--?                                导航栏                                   -->
  <!-- ----------------------------------------------------------------------- -->
  <div id="app">
    <div class="topNavigation">
      <span class="title">医疗文本标注平台</span>
      <a href="#" @click="introduceModal = true">功能介绍</a>
      <a href="#" @click="uploadModal = true">上传文件</a>
      <a href="https://github.com/Syngou/text-annotation.git" target="_blank"
        >Github</a
      >
      <a href="#" @click="pasteContentModal = true">输入文本</a>

      <a href="#" style="float: right" @click="loginModal = true">登录</a>
      <span
        style="float: right; margin-top: 12px; color: #fff"
        @click="toggledMode"
      >
        {{ mode }}
        <i-switch true-color="#13ce66" false-color="blue"></i-switch>
      </span>
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
            >登录</Button
          >
        </div>
      </Modal>
      <!-- ------------------------------------------------------------------------------------- -->
      <!--                                  功能介绍模块                                             -->
      <!-- --------------------------------------------------------------------------------------- -->
      <Modal v-model="introduceModal" title="功能介绍" :mask-closable="false">
        <p>按下鼠标，滑过文本，松开，即可标注文本,右栏实时显示标注的文本</p>
        <div
          slot="footer"
          style="display: flex; justify-content: center; align-items: center"
        >
          <Button type="primary" @click="introduceModal = false">确定</Button>
        </div>
      </Modal>

      <!-- ------------------------------------------------------------------------------------- -->
      <!--                                  上传文件                                              -->
      <!-- --------------------------------------------------------------------------------------- -->

      <Modal v-model="uploadModal" title="上传文件" :mask-closable="false">
        <Upload multiple type="drag" action="127.0.0.1">
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
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
        <textarea
          type="text"
          ref="inputContentId"
          @change="getContent"
        ></textarea>
        <div
          slot="footer"
          style="display: flex; justify-content: center; align-items: center"
        >
          <Button type="primary" @click="pasteContentModal = false"
            >确定</Button
          >
        </div>
      </Modal>
    </div>

    <!-- ----------------------------------------------------------------------- -->
    <!--?                                   左栏                                    -->
    <!-- ----------------------------------------------------------------------- -->

    <div class="row">
      <div class="leftColumn">
        <div class="card">
          <!-- ----------------------------------------------------------------------- -->
          <!--?                                  下拉菜单                                   -->
          <!--                          TODO:超级拖拽，显示行数,快捷键标记                      -->
          <!-- ----------------------------------------------------------------------- -->
          <Dropdown style="margin-left: 20px; margin-top: 20px">
            <a href="javascript:void(0)">
              功能
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem disabled>待开发</DropdownItem>
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem divided>待开发</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown style="margin-left: 20px">
            <a href="javascript:void(0)">
              翻译
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem disabled>待开发</DropdownItem>
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem divided>待开发</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown style="margin-left: 20px">
            <a href="javascript:void(0)">
              工具
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem disabled>待开发</DropdownItem>
              <DropdownItem>待开发</DropdownItem>
              <DropdownItem divided>待开发</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <!-- ---------------------------------------------------------------------------------- -->
          <!--                        拾色器 按钮                                                 -->
          <!-- ---------------------------------------------------------------------------------- -->

          <!-- ----------------------------------------------------------------------- -->
          <!--?                                   文本框                                     -->
          <!--                              TODO: 快捷键标注颜色                              -->
          <!-- ----------------------------------------------------------------------- -->
          <pre ref="article" @mouseup="annotation" class="input-content">
            <p ref="currentContent" style='overflow: auto'>{{ inputContent }}</p>
          </pre>
        </div>
      </div>

      <!-- ----------------------------------------------------------------------- -->
      <!--?                                   右栏                                    -->
      <!--TODO:                             左右栏对齐                                 -->
      <!-- ----------------------------------------------------------------------- -->

      <div class="rightColumn">
        <!-- ----------------------------------------------------------------------- -->
        <!--                                   卡片                                    -->
        <!-- ----------------------------------------------------------------------- -->

        <div class="card" style="margin-top: 25px">
          <h1>
            关系
            <span style="color: red">共 {{ relationsList.length }} 个</span>
          </h1>
          <ol class="scroll-box" style="color: red; margin: 0">
            <li
              v-for="(relationItem, index) in relationsList"
              :key="relationItem"
            >
              {{ index + 1 + "." + relationItem }}
            </li>
          </ol>
        </div>
        <div class="card">
          <h1>
            疾病名称
            <span style="color: blue">共 {{ nameList.length }} 个</span>
          </h1>

          <ol class="scroll-box" style="color: blue">
            <li v-for="(nameItem, index) in nameList" :key="nameItem">
              {{ index + 1 + "." + nameItem }}
            </li>
          </ol>
        </div>
        <div class="card">
          <h1>
            药物
            <span style="color: aqua">共 {{ medicineList.length }} 个</span>
          </h1>

          <ol class="scroll-box" style="color: aqua">
            <li
              v-for="(medicineItem, index) in medicineList"
              :key="medicineItem"
            >
              {{ index + 1 + "." + medicineItem }}
            </li>
          </ol>
        </div>
        <div class="card">
          <h1>
            医疗器械
            <span style="color: orange">共 {{ toolsList.length }} 个</span>
          </h1>

          <ol class="scroll-box" style="color: orange">
            <li v-for="(toolItem, index) in toolsList" :key="toolItem">
              {{ index + 1 + "." + toolItem }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------------------------------------- -->
    <!--                                 底部区域                                   -->
    <!-- ----------------------------------------------------------------------- -->
    <div class="footer">Copyright © 2020 Syngou</div>
  </div>
</template>


<script>
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  auto as followSystemColorScheme,
  exportGeneratedCSS as collectCSS,
} from "darkreader";
enableDarkMode({
  brightness: 150,
  contrast: 90,
  sepia: 0,
});

const CSS = collectCSS();
this.mode = "夜间模式";

export default {
  name: "Home",
  data() {
    return {
      index: 0, //?标注颜色索引，临时变量，只是为了检测标注功能是否有效，后期会删除
      loginModal: false, //?登录提示模块
      introduceModal: false, //?介绍提示模块
      pasteContentModal: false, //?粘贴文本
      nameList: [],
      medicineList: [],
      mode: "夜间模式",
      toolsList: [],
      relationsList: [],
      uploadModal: false,
      inputContent: ` 
      〔摘要〕伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械的生产过程中被广泛使用。在洁净室内的医疗器械使用压缩气体时，应根据其预期用途对控制水平和监测项目做出合理的评定，识别出安全的有关特征，结合受控项目、系统设计和监测工作进行风险分析，以满足《医疗器械生产质量管理规范附录》中对压缩气体提出的要求。

〔关键词〕医疗器械；压缩气体；预期用途；风险分析

压缩气体在医疗器械的生产过程中被广泛使用，主要用途有自动化生产设备的动力用气、清洗工艺中的吹扫用气、保护材料防止氧化的用气等。伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械领域的使用已越来越广泛。虽然医疗器械是在洁净的受控环境中生产，但《医疗器械生产质量管理规范附录》中仍对无菌、植入、体外诊断（invitrodiagnostic，IVD）的各类医疗器械使用压缩气体都提出了验证和控制要求，其目的是为保证医疗器械最终在临床使用的安全和有效。GB/T13277.1-2008是目前可检索到的唯一对气体污染物进行等级划分的国家标准，《医用气体工程技术规范》中对部分医用空气的品质要求也是引用了此标准。结合医疗器械行业的受控环境要求，对压缩气体的污染物控制应至少包含固体、液体、气体及微生物。

1固体污染物

固体污染物主要是指压缩气体中含有的尘埃微粒。控制微粒的核心技术是使用气体过滤器。过滤器的有效过滤滤径、有效过滤效率和有效工作流量直接影响到固体污染物的预期控制效果，保证过滤器的各项性能参数均符合使用工况状态是十分必要的。同一气体过滤器在不同流量状态下监测的过滤效果，见表1。


            `,

      //?登录表单内容
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
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    //?      标注功能

    annotation() {
      let pNodes = this.$refs.article.getElementsByTagName("p");

      let pTextArr = [];
      for (let i = 0; i < pNodes.length; i++) {
        pTextArr.push(pNodes[i].innerHTML);
      }
      let text = window.getSelection().toString();
      if (text.length > 0) {
        for (let i = 0; i < pNodes.length; i++) {
          let pNode = pNodes[i]; //?段落节点
          let pText = pTextArr[i]; //?每一段的文字
          let values = (pText || "").split(text);
          let colorArray = ["red", "blue", "aqua", "orange"]; //?标注颜色

          let pNodeText = values.join(
            "<span style='color:" +
              colorArray[this.index] +
              "'>" +
              text +
              "</span>"
          );

          pNode.innerHTML = pNodeText;
        }
        //? 同步文本和数字
        switch (this.index) {
          case 0: {
            this.relationsList.push(text);

            break;
          }
          case 1: {
            this.nameList.push(text);

            break;
          }
          case 2: {
            this.medicineList.push(text);

            break;
          }
          case 3: {
            this.toolsList.push(text);
            break;
          }
        }
        this.index += 1;
        if (this.index >= 4) {
          this.index = 0;
        }
      }
    },
    //?    日，夜间模式 切换

    toggledMode() {
      if (this.mode === "日间模式") {
        enableDarkMode({
          brightness: 150,
          contrast: 90,
          sepia: 0,
        });

        const CSS = collectCSS();
        this.mode = "夜间模式";
      } else {
        this.mode = "日间模式";
        disableDarkMode();
      }
    },
    //                BUG:即使用户想放弃修改，文本内容还是会修改,添加本地存储，防止刷新后文本被修改
    //?            粘贴文本

    getContent() {
      this.inputContent = this.$refs.inputContentId.value;
    },

    //?     提交登录表单,等后台搭好再取消注释

    // handleSubmit(name) {
    //   this.$refs[name].validate(() => {
    //     this.$axios.get("./login.json").then(
    //       (response) => {
    //         let data = response.data;

    //         if (
    //           this.formInline.user === data[0].userInfo[0].userName &&
    //           this.formInline.password === data[0].userInfo[0].password
    //         ) {
    //           this.$Message.success("登录成功");
    //           this.$router.push("/login");
    //         } else {
    //           this.$Message.error("账号或密码错误");
    //         }
    //       },
    //       (error) => {
    //         console.log("false to connect to server");
    //         this.$Message.error({
    //           content: "连接服务器失败，请稍后再试。",
    //           duration: 4,
    //           closable: true,
    //         });

    //       }
    //     );
    //     console.log(
    //       "🚀 ~ file: App.vue ~ line 430 ~ this.$axios.get ~ data",
    //       data
    //     );
    //   });
    // },
    handleSubmit(name) {
      this.$refs[name].validate(
        () => {
          if (
            this.formInline.user === "Syngou" &&
            this.formInline.password === "hello"
          ) {
            this.$router.push("/login");
            this.$Message.success("登录成功");
          } else {
            this.$Message.error("账号或密码错误");
          }
        },
        (error) => {
          console.log("false to connect to server");
          this.$Message.error({
            content: "连接服务器失败，请稍后再试。",
            duration: 4,
            closable: true,
          });
        }
      );
    },
  },
};
</script>
<style scoped>
  @import "../assets/css/Home.css";
</style>
