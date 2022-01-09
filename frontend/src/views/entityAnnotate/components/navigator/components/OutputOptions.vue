<template>
  <div>
    <el-dialog
      title="输出选项"
      width="fit-content"
      :visible.sync="dialogVisible"
      :modal="false"
    >
      <el-form>
        <!-- 文件名 -->
        <el-form-item label="文件名">
          <el-input
            v-model="fileName"
            placeholder="请输入文件名，默认为 output"
          />
        </el-form-item>
        <!-- 后缀名 -->
        <el-form-item label="后缀名">
          <el-select v-model="fileFormat" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <div class="btn-group">
        <el-button type="primary" @click="outputFile"> 确定 </el-button>
        <el-button type="danger" @click="dialogVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      options: [
        {
          value: "jsonl",
          label: "jsonl",
        },
        {
          value: "json",
          label: "json",
        },
        {
          value: "txt",
          label: "txt",
        },
      ],
      fileName: "output",
      fileFormat: "json",
    };
  },
  computed: {
    ...mapGetters(["annotateData"]),
  },
  methods: {
    outputFile() {
      this.dialogVisible = false;
      const url = window.URL.createObjectURL(
        new Blob([
          JSON.stringify({
            id: this.$store.state.annotate.essayId,
            text: this.$store.state.annotate.annotateText,
            annotations: this.annotateData,
          }),
        ])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${this.fileName}.${this.fileFormat}`);
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group {
  margin-top: 20px;
  display: block;
}
</style>
