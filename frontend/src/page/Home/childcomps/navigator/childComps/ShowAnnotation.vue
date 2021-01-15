<template>
  <div>
    <Drawer :closable="false" width="640" v-model="drawer" class="drawer">
      <p>relation</p>
      <hr/>
      <div class="">
        <ol>
          <li v-for="(relation, index) in $store.state.data[0]" :key="index">
            {{ relation }}
          </li>
        </ol>
      </div>
      <hr/>
      <p>name</p>
      <hr/>
      <div class="">
        <ol>
          <li v-for="(name, index) in $store.state.data[1]" :key="index">
            {{ name }}
          </li>
        </ol>
      </div>
      <hr/>
      <p>medicine</p>
      <hr/>
      <div class="">
        <ol>
          <li v-for="(medicine, index) in $store.state.data[2]" :key="index">
            {{ medicine }}
          </li>
        </ol>
      </div>
      <hr/>
      <p>tool</p>
      <hr/>
      <div class="">
        <ol>
          <li v-for="(tool, index) in $store.state.data[3]" :key="index">
            {{ tool }}
          </li>
        </ol>
      </div>
      <hr/>
    </Drawer>
  </div>
</template>

<script>
export default {
  name: "ShowAnnotation",
  created() {
    this.$bus.$on("showDrawer", () => {
      this.drawer = true;
    })
  },
  data() {
    return {
      drawer: false, //显示标注词语
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
.drawer {
  margin-top: 10px;
}

.drawer p {
  text-align: center;
  font-size: 20px;
  color: red;
  background-color: aqua;
}
</style>
