<template>
  <div class="form">
    <div>
      <div><strong>标签名:</strong></div>
      <input type="text" v-model="labelInfo.text" />
    </div>
    <div>
      <div>
        <strong
          >快捷键(输入一个字母或者数字,不输入代表不使用快捷键标注):</strong
        >
      </div>
      <input type="text" v-model="labelInfo.shortcut" />
    </div>
    <div>
      <div>
        <strong>标签颜色:</strong>
      </div>
      <el-color-picker
        v-model="labelInfo.color"
        show-alpha
        :predefine="$store.state.errorAnalysis.colorArray"
      />
    </div>
    <div class="button-group">
      <el-button @click="cancel"> 取消</el-button>
      <el-button type="primary" @click="addOrUpdateLabel">确定</el-button>
    </div>
  </div>
</template>

<script>
import { addLabelsApi, updateLabelsApi } from "@/api/annotateData";
export default {
  props: {
    isAddLabel: {
      type: Boolean,
      default: true,
    },
    labelInfo: {
      type: Object,
    },
  },

  methods: {
    cancel() {
      this.labelInfo.text = "";
      this.labelInfo.shortcut = "";
      this.$emit("closeDialog");
    },
    addOrUpdateLabel() {
      if (this.isAddLabel) {
        this.addLabel();
      } else {
        this.updateLabel();
      }

      this.$emit("closeDialog");
    },
    addLabel() {
      addLabelsApi(this.labelInfo).then((res) => {
        this.$store.dispatch("annotate/setLabels", res.data.labels);
      });
    },
    updateLabel() {
      updateLabelsApi(this.labelInfo);
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  div {
    margin-top: 10px;
    input {
      margin-top: 10px;
      outline: none;
      border: 1px 0;
      height: 30px;
    }
  }
  .button-group {
    display: flex;
    justify-content: center;
  }
}
</style>
