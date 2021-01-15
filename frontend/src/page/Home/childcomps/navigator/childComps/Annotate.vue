<template>
  <div>
    <Modal v-model="annotateModal" title="一键标注" :mask-closable="false">
      <div style="text-align: center">
        <p>一键标注全文，主要用于机器学习自动标注</p>
        <p>存在未知bug，每次只能输入一个，之后就无效了（无法删除）</p>
      </div>

      <i-input v-model="relation">
        <span slot="prepend"><Button>关系</Button></span>
      </i-input>
      <i-input v-model="name">
        <span slot="prepend"><Button>名称</Button></span>
      </i-input>
      <i-input v-model="medicine">
        <span slot="prepend"><Button>药物</Button></span>
      </i-input>
      <i-input v-model="tool">
        <span slot="prepend"><Button>器械</Button></span>
      </i-input>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="autoAnnotate">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Annotate",
  created() {
    this.$bus.$on("showAnnotate", () => {
      this.annotateModal = true;
    });
  },
  data() {
    return {
      annotateModal: false, //一键标注
      relation: "",
      name: "",
      medicine: "",
      tool: "",
    };
  },
  methods: {
    /**
     * @description 一键标注
     */
    autoAnnotate() {
      this.annotateModal = false;
      this.$bus.$emit("autoAnnotate", [
        this.relation,
        this.name,
        this.medicine,
        this.tool,
      ]);
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
