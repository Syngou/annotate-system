<template>
  <!-- ----------------------------------------------------------------------- -->
  <!--?                                  头部区域                                   -->
  <!-- ----------------------------------------------------------------------- -->

  <!-- ----------------------------------------------------------------------- -->
  <!--?                                   导航栏                                   -->
  <!-- ----------------------------------------------------------------------- -->
  <div id="app">
    <div class="topNavigation">
      <span class="title">Text Annotation System</span>
      <a href="#" @click="introduce_modal = true">功能介绍</a>
      <a href="#" @click="upload_modal = true">上传文件</a>
      <a href="https://github.com/Syngou/text-annotation.git" target="_blank"
        >Github</a
      >
      <a href="#" @click="paste_content_model = true">输入文本</a>

      <a href="#" style="float: right" @click="login_modal = true">登录</a>
      <span
        style="float: right; margin-top: 12px; color: #fff"
        @click="toggledMode"
      >
        {{ mode }}
        <i-switch></i-switch>
      </span>
      <!-- ------------------------------------------------------------------------------------- -->
      <!--                                     登录模块                                             -->
      <!-- --------------------------------------------------------------------------------------- -->
      <Modal v-model="login_modal" width="24">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" block>
          <span id="login_box">
            <Avatar
              size="large"
              src="https://visualhunt.com/photos/1/nature-red-sun-rocks.jpg?s=s"
            />
          </span>
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
        <!--                                   卡片                                    -->
        <!-- ----------------------------------------------------------------------- -->

        <div class="card" style="margin-top: 25px">
          <h1>
            关系
            <span style="color: rgb(255, 117, 24)">{{ relations }}</span>
          </h1>

          <ol class="scroll-box" style="color: red; margin: 0">
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

          <ol class="scroll-box" style="color: blue">
            <li v-for="(name_item, index) in name_list" :key="name_item">
              {{ index + 1 }}. {{ name_item }}
            </li>
          </ol>
        </div>
        <div class="card">
          <h1>
            药物 <span style="color: red">{{ medicine }}</span>
          </h1>

          <ol class="scroll-box" style="color: aqua">
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

          <ol class="scroll-box" style="color: orange">
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
      mode: "日间模式",
      tools: 0,
      tools_list: [],
      relations: 0,
      relations_list: [],
      upload_modal: false,
      input_content: ` 
      〔摘要〕伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械的生产过程中被广泛使用。在洁净室内的医疗器械使用压缩气体时，应根据其预期用途对控制水平和监测项目做出合理的评定，识别出安全的有关特征，结合受控项目、系统设计和监测工作进行风险分析，以满足《医疗器械生产质量管理规范附录》中对压缩气体提出的要求。

〔关键词〕医疗器械；压缩气体；预期用途；风险分析

压缩气体在医疗器械的生产过程中被广泛使用，主要用途有自动化生产设备的动力用气、清洗工艺中的吹扫用气、保护材料防止氧化的用气等。伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械领域的使用已越来越广泛。虽然医疗器械是在洁净的受控环境中生产，但《医疗器械生产质量管理规范附录》中仍对无菌、植入、体外诊断（invitrodiagnostic，IVD）的各类医疗器械使用压缩气体都提出了验证和控制要求，其目的是为保证医疗器械最终在临床使用的安全和有效。GB/T13277.1-2008是目前可检索到的唯一对气体污染物进行等级划分的国家标准，《医用气体工程技术规范》中对部分医用空气的品质要求也是引用了此标准。结合医疗器械行业的受控环境要求，对压缩气体的污染物控制应至少包含固体、液体、气体及微生物。

1固体污染物

固体污染物主要是指压缩气体中含有的尘埃微粒。控制微粒的核心技术是使用气体过滤器。过滤器的有效过滤滤径、有效过滤效率和有效工作流量直接影响到固体污染物的预期控制效果，保证过滤器的各项性能参数均符合使用工况状态是十分必要的。同一气体过滤器在不同流量状态下监测的过滤效果，见表1。

2液体污染物

液体污染物主要是指压缩气体中含有的液态水和油。液态的水和油聚合后会形成乳状物[1]，固体颗粒物会促使水和油的聚集，乳化后的水和油会附着在管道内壁上；管道内壁被附着后，聚合物会随流动的气流被冲脱造成污染，且长期附着会对管壁表面造成局部腐蚀，生成的腐蚀物导致二次污染。在压缩气体管道中过滤后被冲刷出的污物，见图1。

3气体污染物

有效控制气体污染物需配置化学过滤器，通过吸附实现净化。部分医疗器械在材料焊接或内包装时会使用到氮气，实现排除氧气防止材料的氧化反应。在洁净的受控环境中使用任何气体都应满足《医疗器械生产质量管理规范》的附录要求，检测纯氮气依据的执行标准是GB/T8979-2008，报告见图2。

4微生物污染物

微生物污染物是指压缩气体中的活性微粒。GB/T13277.1-2008中未作等级划分，可根据产品风险确定微生物的限度。医疗器械生产过程使用的压缩气体中微生物限度水平的控制应满足《无菌医疗器具生产管理规范》中的要求[2]，见表2。

5风险分析

压缩气体应用于医疗器械的生产过程会直接或间接地影响医疗器械的安全，当气体直接作用于器械表面时，污染物会附着在器械的表面；当气体扩散到受控环境中或接触工装器具时，会间接污染到医疗器械。识别风险是做好风险管理的第一步，根据压缩气体的预期用途，识别出安全的有关特征，在开展风险管理的工作中是至关重要的。

5.1工作流量

固体污染物和微生物控制的核心技术是气体过滤器，表1的数据证明过滤器的性能受流量状态的影响，在选择过滤器前，精准确定安装点的工作流量至关重要，是保证预期过滤性能的关键参数。

5.2含水量

控制压缩气体中水分含量的意义除评价对医疗器械的影响外，还应考虑对系统管道的影响，图1证明高湿度的气体会腐蚀管道，造成二次污染。

5.3含油量

压缩气体中的油含量受两个方面的影响：（1）气体在压缩过程中被机械的污染，应优先选择无油型的机械及配件；（2）气体在压缩前已经含有较高浓度的油分，应意识到对气源的保护和净化。

5.4氮气的使用

在医疗器械的生产过程中，为防止材料与氧气发生氧化反应，普遍使用纯氮气对材料进行保护。对氮气进行风险控制时，仅需参考图2的检测依据，部分应受控的项目并无验证数据支持。

5.5系统设计

当考虑机房周围环境中是否有污染物时，机房的位置应选择在区域的上风向，必要时加装化学过滤器。压缩气体管道应满足净化等级的要求[3]，管道中的管件应选择化学性能稳定、内表面光滑的材料，避免内表面被腐蚀，避免局部的材质缺陷，应关注管件材料的抗污、防腐性能；安装前应做管件的清洁或钝化处理，必要时在净化等级相当的受控环境中完成前处理工作，控制施工过程中对系统的污染；同时，应在用气设备处安装相应精度的过滤器，避免输送过程中管道内污物脱落造成的污染，确保用气安全。

5.6监测

监测技术应科学，尽量采用通用的试验方法，必要时进行相关验证工作，证明试验操作的可重复性或可靠性；另外，应评价监测点的位置选择和监测时系统的必要状态，保证监测数据具有充分的代表性。

［参考文献］

［1］中华人民共和国国家质量监督检验检疫总局，中国国家标准管理委员会.GB/T13277.1-2008压缩空气第1部分：污染物净化等级[S].北京：中国标准出版社，2009.

［2］北京市食品药品监督管理局.医疗器械工艺用气检查要点指南（2017版）[EB/OL].[2017-09-22].

［3］中华人民共和国住房和城乡建设部.GB50029-2014压缩空气站设计规范[S].北京：中国计划出版社，2014

作者：苏建程 李婧 王会如 单位：北京市医疗器械检验所
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
            this.relations += 1;
            this.relations_list.push(text);

            break;
          }
          case 1: {
            this.names += 1;
            this.name_list.push(text);

            break;
          }
          case 2: {
            this.medicine += 1;
            this.medicine_list.push(text);

            break;
          }
          case 3: {
            this.tools += 1;
            this.tools_list.push(text);
            break;
          }
        }
        this.index += 1;
        if (this.index >= 4) {
          this.index = 0;
        }
      }
    },

    toggledMode() {
      if (this.mode === "日间模式") {
        enableDarkMode({
          brightness: 100,
          contrast: 90,
          sepia: 0,
        });

        disableDarkMode();

        followSystemColorScheme();

        const CSS = collectCSS();
        this.mode = "夜间模式";
      } else {
        this.mode = "日间模式";
        disableDarkMode();
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
        this.$axios.get("./login.json").then(
          (response) => {
            let data = response.data;

            if (
              this.formInline.user == data[0].user_info[0].user_name &&
              this.formInline.password == data[0].user_info[0].password
            ) {
              this.$Message.success("登录成功");
            } else {
              this.$Message.error("账号或密码错误");
            }
          },
          (error) => {
            console.log("false to connect to server");
          }
        );
        console.log(
          "🚀 ~ file: App.vue ~ line 430 ~ this.$axios.get ~ data",
          data
        );
      });
    },
  },
};
</script>
<style scoped>
  @import "./assets/css/app";
</style>
