<template>
  <div>
    <el-dialog
      title="输出格式"
      width="fit-content"
      :visible.sync="dialogVisible"
      :modal="false"
    >
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="btn-group">
        <el-button type="primary" @click="outputFile">
          确定
        </el-button>
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters }from "vuex";
export default {
  data() {
    return {
      dialogVisible: true,
      options: [
        {
          value: "jsonl",
          label: "jsonl"
        },
        {
          value: "json",
          label: "json"
        },
        {
          value: "txt",
          label: "txt"
        }
      ],
      value: "jsonl"
    };
  },
  computed: {
    ...mapGetters(["annotateData"])
  },
  methods: {
    outputFile() {
      const url = window.URL.createObjectURL(
        new Blob([
          JSON.stringify({
            id: this.$store.state.annotate.essayId,
            text: this.$store.state.annotate.annotateText,
            annotations: this.annotateData
          })
        ])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `file${this.$store.state.annotate.essayId}.${this.value}`
      );
      document.body.appendChild(link);
      link.click();
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-group {
  margin-top: 20px;
  display:block;
}
</style>
