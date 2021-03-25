<template>
  <div>
    <el-dialog
      :visible.sync="annotateModal"
      title="自动化标注"
      :modal-append-to-body="false"
      :width="width"
    >
      <el-collapse>
        <el-collapse-item title="说明">
          <div>
            一键标注全文，用于机器学习自动标注，后台传来要标注的词，前台进行标注，人工检查是否正确
          </div>
          <hr />
          <div>
            如果每种类型有多个值，请用<span
              style="color: red; font-size: 20px;"
            >
              一个
            </span>
            空格隔开<br />
            <hr />
            <span style="color: red; font-size: 20px;">
              需在最开始时使用（即还未进行标注时），否则会有奇怪的结果
            </span>
            <hr />
            <span>因为只用于自动化标注，所以部署时此选项不可见</span>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div v-for="(type, index) in typesInfo" :key="index">
        <el-input v-model="inputValues[index]">
          <span slot="prepend">
            <el-button>
              {{ type.value }}
            </el-button>
          </span>
        </el-input>
      </div>
      <span
        slot="footer"
        style="display: flex; justify-content: center; align-items: center;"
      >
        <el-button type="primary" @click="autoAnnotate">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import annotateUtils from "@/utils/annotateUtils";
import { mapGetters } from "vuex";

export default {
  name: "AutoAnnotate",
  data() {
    return {
      annotateModal: false, //自动化标注的显示与隐藏
      inputValues: [], //输入的值
      width: "",
    };
  },
  computed: {
    ...mapGetters(["typesInfo"]),
  },
  created() {
    this.$bus.$on("autoAnnotate", () => {
      this.annotateModal = true;
    });
  },

  mounted() {
    let width = window.innerWidth;
    if (width <= 450) {
      this.width = "80%";
    } else {
      this.width = "30%";
    }
  },
  methods: {
    /**
     * @description 自动化标注
     */
    autoAnnotate() {
      this.annotateModal = false;
      annotateUtils.autoAnnotate(this.inputValues);
      this.inputValues = [];
      //清空数据
    },
  },
};
</script>
