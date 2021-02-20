<template>
  <div>
    <el-dialog
      :visible.sync="annotateModal"
      title="自动化标注"
      :modal-append-to-body="false"
      width="30%"
    >
      <div style="text-align: center">
        <p></p>
        <el-collapse>
          <el-collapse-item title="使用说明">
            <div>
              一键标注全文，用于机器学习自动标注，后台传来要标注的词，前台进行标注，人工检查是否正确
            </div>
            <div>
              如果每种类型有多个值，请用<span
                style="color: red; font-size: 20px"
              >
                一个
              </span>
              空格隔开<br />
              人工标注时不推荐使用<br /><span
                style="color: red; font-size: 20px"
                >若要使用，需在最开始时使用（即还未进行标注时），否则会有奇怪的结果</span
              >
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <el-input v-model="relation">
        <span slot="prepend"><el-button>关系</el-button></span>
      </el-input>
      <el-input v-model="name">
        <span slot="prepend"><el-button>名称</el-button></span>
      </el-input>
      <el-input v-model="medicine">
        <span slot="prepend"><el-button>药物</el-button></span>
      </el-input>
      <el-input v-model="tool">
        <span slot="prepend"><el-button>器械</el-button></span>
      </el-input>

      <span
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <el-button type="primary" @click="autoAnnotate">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import annotateUtils from "@/utils/annotateUtils";

export default {
  name: "AutoAnnotate",
  created() {
    this.$bus.$on("showAnnotate", () => {
      this.annotateModal = true;
    });
  },
  data() {
    return {
      annotateModal: false, //自动化标注的显示与隐藏
      relation: "",
      name: "",
      medicine: "",
      tool: "",
    };
  },
  methods: {
    /**
     * @description 自动化标注
     */
    autoAnnotate() {
      this.annotateModal = false;
      annotateUtils.autoAnnotate([
        this.relation,
        this.name,
        this.medicine,
        this.tool,
      ]);

      //清空数据
      this.relation = "";
      this.name = "";
      this.medicine = "";
      this.tool = "";
    },
  },
};
</script>

<style scoped>
</style>
