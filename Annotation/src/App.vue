<template>
  <!-- ----------------------------------------------------------------------- -->
  <!--?                                  头部区域                                   -->
  <!-- ----------------------------------------------------------------------- -->

  <!-- ----------------------------------------------------------------------- -->
  <!--?                                   导航栏                                   -->
  <!-- ----------------------------------------------------------------------- -->
  <div id="app">
    <router-view />
    <div class="topNavigation" style="margin-bottom: 20px">
      <span>
        <span class="title">Text Annotation System</span>
        <a href="#" @click="introduce_modal = true">功能介绍</a>
        <a href="#" @click="upload_modal = true">上传文件</a>
        <a href="https://github.com/Syngou/text-annotation.git" target="_blank"
          >Github</a
        >
        <a href="#" @click="paste_content_model = true">输入文本</a>
        <a href="#" style="float: right" @click="login_modal = true">登录</a>
      </span>
      <!-- ------------------------------------------------------------------------------------- -->
      <!--                                     登录模块                                             -->
      <!-- --------------------------------------------------------------------------------------- -->
      <Modal v-model="login_modal" width="24">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" block>
          <FormItem prop="user">
            <i-Input
              type="text"
              v-model="formInline.user"
              placeholder="Username"
            >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-Input>
          </FormItem>
          <FormItem prop="password">
            <i-Input
              type="password"
              v-model="formInline.password"
              placeholder="Password"
            >
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-Input>
          </FormItem>
        </Form>
        <p slot="header" style="color: #f60; text-align: center">
          <span>登录</span>
        </p>
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
      <Modal v-model="introduce_modal" title="功能介绍">
        <p>按下鼠标，滑过文本，松开，即可标注文本,右栏实时显示标注的文本</p>
      </Modal>

      <!-- ------------------------------------------------------------------------------------- -->
      <!--                                  上传文件                                              -->
      <!-- --------------------------------------------------------------------------------------- -->

      <Modal v-model="upload_modal" title="上传文件">
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
        v-model="paste_content_model"
        title="在这里输入或粘贴你的文本（若不成功，请刷新网页后重试）"
      >
        <textarea
          type="text"
          ref="input_content_id"
          @change="get_content"
        ></textarea>
      </Modal>
    </div>

    <!-- ----------------------------------------------------------------------- -->
    <!--?                                   左栏                                    -->
    <!-- ----------------------------------------------------------------------- -->

    <div class="row">
      <div class="leftColumn">
        <div class="card">
          <h2 style="margin-top: 20px; text-align: center">文本</h2>

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
          <pre
            ref="article"
            @mouseup="annotation"
            style="min-height: 1000px; margin-top: 20px"
          >
            <p ref="current_content" style='overflow: auto'>{{ input_content }}</p>
          </pre>
        </div>
      </div>

      <!-- ----------------------------------------------------------------------- -->
      <!--?                                   右栏                                    -->
      <!--TODO:                             左右栏对齐                                 -->
      <!-- ----------------------------------------------------------------------- -->

      <div class="rightColumn">
        <!-- ----------------------------------------------------------------------- -->
        <!--!                                  右侧标签                                   -->
        <!-- ----------------------------------------------------------------------- -->

        <Tag class="float-right1" color="primary">{{ names }}</Tag>
        <Tag class="float-right2" color="success">{{ medicine }}</Tag>
        <Tag class="float-right3" color="error">{{ tools }}</Tag>
        <Tag class="float-right4" color="warning">{{ relations }}</Tag>

        <!-- ----------------------------------------------------------------------- -->
        <!--                                   卡片                                    -->
        <!-- ----------------------------------------------------------------------- -->

        <div class="card" style="margin-top: 40px">
          <h1>
            关系
            <span style="color: rgb(255, 117, 24)">{{ relations }}</span>
          </h1>
          <label>自定义颜色</label>
          <input type="color" />
          <ol class="scroll-box">
            <li
              v-for="(relation_item, index) in relations_list"
              :key="relation_item"
            >
              {{ index + 1 }}. {{ relation_item }}
            </li>
          </ol>
        </div>
        <div class="card">
          <h1>
            疾病名称
            <span style="color: rgb(255, 117, 24)">{{ names }}</span>
          </h1>

          <label>自定义颜色</label>
          <input type="color" />
          <ol class="scroll-box">
            <li v-for="(name_item, index) in name_list" :key="name_item">
              {{ index + 1 }}. {{ name_item }}
            </li>
          </ol>
        </div>
        <div class="card">
          <h1>
            药物 <span style="color: red">{{ medicine }}</span>
          </h1>
          <label>自定义颜色</label>
          <input type="color" />
          <ol class="scroll-box">
            <li
              v-for="(medicine_item, index) in medicine_list"
              :key="medicine_item"
            >
              {{ index + 1 }}. {{ medicine_item }}
            </li>
          </ol>
        </div>
        <div class="card">
          <h1>
            医疗器械 <span style="color: red">{{ tools }}</span>
          </h1>
          <label>自定义颜色</label>
          <input type="color" />
          <ol class="scroll-box">
            <li v-for="(tool_item, index) in tools_list" :key="tool_item">
              {{ index + 1 }}. {{ tool_item }}
            </li>
          </ol>
        </div>
      </div>
    </div>

    <!-- ----------------------------------------------------------------------- -->
    <!--                                 底部区域                                   -->
    <!-- ----------------------------------------------------------------------- -->
    <div class="footer">
      <p>Copyright © 2020 Syngou</p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      index: 0, //?标注颜色索引，临时变量，只是为了检测标注功能是否有效，后期会删除
      login_modal: false, //?登录提示模块
      introduce_modal: false, //?介绍提示模块
      paste_content_model: false, //?粘贴文本
      names: 0,
      name_list: [],
      medicine: 0,
      medicine_list: [],
      tools: 0,
      tools_list: [],
      relations: 0,
      relations_list: [],
      upload_modal: false,
      input_content: ` 
      [摘要】目的通过介绍临床药师参与临床抗感染多学科协作诊疗(MDT)的实例，为临床药师更好地参与临床提供参考。方法选取典型
      病例，介绍临床药师参与抗感染治疗的方案讨论、制定及调整，并进行分析总结。结果临床药师在抗感染MDT中给予合理建议，患者病情得到有效控制。结
      论临床药师运用自己的专业知识，为临床医师提供合理化用药建议，提高患者的整体治疗质量。
      [关键词】抗感染;临床药师;多学科协作诊疗 
      多学科协作诊疗(multidisciplinaryteam，MDT)是一种新型的临床治疗模式，是指针对一个临床疾病，通过多学科的讨论，制定最合理的规范化、个
      体化治疗，从而提高患者的治愈率和生存质量。2018年，原国家卫生计生委在《关于印发进一步改善医疗服务行动计划(2018至2020年)的通知》中要求医
      疗机构针对肿瘤、多系统多器官疾病、疑难复杂疾病等，建立多学科病例讨论和联合查房相关制度，为住院患者提供多学科诊疗服务［1］。苏州大学附属
      太仓医院于2017年成立了抗菌药物管理小组，针对感染性疾病建立了MDT团队。本文通过介绍临床药师参与的典型感染性病例讨论，对患者抗感染治疗中抗
      菌药物使用情况进行回顾性分析，并提出优化后续抗感染治疗方案的建议与分析，以探究临床药师在抗感染MDT团队中的作用。现报道如下。1参与多重耐药
      菌感染治疗方案的制定 
      1．1病历资料患者，女，58岁，因“发现肝硬化3年余，腹胀10d”于2018年7月30日入院。患者有甲状腺功能减退症、再生障碍性贫血、双下肢丹毒史，有
      青霉素过敏史。入院查体:T37．2℃，P114次/min，R20次/min，BP114/68mmHg。神志清，颈软，双肺呼吸音粗，未闻及干湿啰音，心律齐，腹软，下
      腹部膨隆，全腹无压痛及反跳痛，肝脾肋下未及，移动性浊音阳性，双下肢水肿，右脚足背皮肤发红。腹部B超:血吸虫肝病表现，门静脉海绵样变;胆囊结
      石，胆囊炎;脾肿大;腹腔积液。诊断肝硬化失代偿期、自身免疫性肝炎、甲状腺功能减退症、再生障碍性贫血、丹毒。患者入院当天下午出现高热，T39．
      8℃，右下肢疼痛不适，血常规示白细胞计数3．8×109/L，中性粒细胞0．88;C反应蛋白84mg/L;降钙素原1．01ng/ml。外科会诊考虑丹毒再发，予以莫
      西沙星0．4g静脉滴注每天1次。8月3日血培养提示大肠埃希菌(+)，第3、4代头孢菌素类、氟喹诺酮类耐药，换用美罗培南1g静脉滴注，每8小时1
      次。之后病情无明显好转，为进一步诊治，于2018年8月7日提请全院MDT。
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
    k() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    /* ----------------------------------------------------------------------------------------------*/
    //?                                   标注功能                                                       //
    /* ----------------------------------------------------------------------------------------------*/

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
        switch (this.index) {
          case 0: {
            this.names += 1;
            this.name_list.push(text);
            break;
          }
          case 1: {
            this.medicine += 1;
            this.medicine_list.push(text);
            break;
          }
          case 2: {
            this.tools += 1;
            this.tools_list.push(text);
            break;
          }
          case 3: {
            this.relations += 1;
            this.relations_list.push(text);
            break;
          }
        }
        this.index += 1;
        if (this.index >= 4) {
          this.index = 0;
        }
      }
    },
    /* ----------------------------------------------------------------------------------------------*/
    //?                                 粘贴文本                                                       //
    /* ----------------------------------------------------------------------------------------------*/

    get_content() {
      this.input_content = this.$refs.input_content_id.value;
    },

    /* ----------------------------------------------------------------------------------------------*/
    //?                                   提交登录表单                                                   //
    /* ----------------------------------------------------------------------------------------------*/

    handleSubmit(name) {
      this.$refs[name].validate(() => {
        this.$axios.get("./login.json").then((response) => {
          let data = response.data;
          if (
            this.formInline.user == data[0].user_info[0].user_name &&
            this.formInline.password == data[0].user_info[0].password
          ) {
            this.$Message.success("登录成功");
          } else {
            this.$Message.error("账号或密码错误");
          }
        });
      });
    },
    submitForm(formName) {
      let data = new FormData();
      data.append("username", this.formInline.user);
      data.append("password", this.formInline.password);
      this.$axios
        .post("/api/register/", data)
        .then((res) => {
          console.log("yes");
        })
        .catch((res) => {
          console.log("error submit!!");
          return false;
        });
    },
  },
};
</script>
<style scoped>
  button {
    margin: 10px;
    padding: 5px;
  }
  p {
    word-wrap: break-word;
    word-break: break-all;
  }

  * {
    box-sizing: border-box;
  }

  .title {
    color: aqua;
    left: 100px;
  }

  body {
    font-family: Arial;
    padding: 10px;
    background: #f1f1f1;
  }

  /* 导航条 */
  .topNavigation {
    top: 0;
    overflow: hidden;
    padding-right: 20px;
    background-color: #333;
    width: 100%;
    position: fixed;
    margin-bottom: 50px;
  }

  /* 导航条链接 */
  .topNavigation a {
    display: inline-block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .float-right1 {
    float: right;
    position: fixed;
    top: 50%;
    right: 30px;
    width: 50px;
    margin-top: 15px;

    right: 1px;
  }
  .float-right2 {
    float: right;
    position: fixed;
    top: 45%;
    right: 30px;
    width: 50px;
    margin-top: 15px;

    right: 1px;
  }
  .float-right3 {
    float: right;
    position: fixed;
    top: 55%;
    width: 50px;
    right: 30px;
    margin-top: 15px;

    right: 1px;
  }

  .float-right4 {
    float: right;
    position: fixed;
    width: 50px;
    top: 60%;
    right: 30px;
    margin-top: 15px;

    right: 1px;
  }
  .scroll-box {
    flex: auto;
    max-height: 150px;
    word-break: break-all;
    min-height: 120px;
    white-space: pre-line;
    overflow: auto;
    line-height: 2em;
  }

  textarea {
    height: 150px;
    width: 100%;
    font-size: 20px;
  }
  /* 链接颜色修改 */
  .topNavigation a:hover {
    background-color: #ddd;
    color: black;
  }

  /* 创建两列 */
  /* Left column */
  .leftColumn {
    float: left;
    width: 75%;
  }

  /* 右侧栏 */
  .rightColumn {
    float: left;
    width: 25%;
    background-color: #f1f1f1;
    padding-left: 20px;
  }

  /* 图像部分 */
  .outputArea {
    background-color: #aaa;
    width: 100%;
    padding: 20px;
  }

  /* 文章卡片效果 */
  .card {
    background-color: white;
    padding: 20px;
    margin-top: 20px;
  }

  /* 列后面清除浮动 */
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
  input[text] {
    width: 100%;
    height: 150px;
  }
  /* 底部 */
  .footer {
    padding: 20px;
    text-align: center;
    background: #333;
    color: white;
    margin-top: 20px;
  }

  /* 响应式布局 - 屏幕尺寸小于 800px 时，两列布局改为上下布局 */
  @media screen and (max-width: 800px) {
    .leftColumn,
    .rightColumn {
      width: 100%;
      padding: 0;
    }
  }

  /* 响应式布局 -屏幕尺寸小于 400px 时，导航等布局改为上下布局 */
  @media screen and (max-width: 400px) {
    .topNavigation a {
      float: none;
      width: 100%;
    }
  }
</style>
