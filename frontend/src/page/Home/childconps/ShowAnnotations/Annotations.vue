<template>
  <div class="container">
    <div class="annotation-card">
      <h1>
        关系
        <span style="color: red">共 {{ rLength }} 个</span>
      </h1>
      <ul class="scroll-box">
        <li
          v-for="relationItem of $store.state.relationsMap.values()"
          :key="relationItem"
          style="color: red; line-height: normal"
        >
          {{ relationItem }}
        </li>
      </ul>
    </div>
    <div class="annotation-card">
      <h1>
        疾病名称
        <span style="color: blue">共 {{ nLength }} 个</span>
      </h1>

      <ul class="scroll-box">
        <li
          v-for="nameItem of this.$store.state.nameMap.values()"
          :key="nameItem"
          style="color: blue"
        >
          {{ nameItem }}
        </li>
      </ul>
    </div>
    <div class="annotation-card">
      <h1>
        药物
        <span style="color: green">共 {{ mLength }} 个</span>
      </h1>

      <ul class="scroll-box">
        <li
          v-for="medicineItem in this.$store.state.medicineMap.values()"
          :key="medicineItem"
          style="color: green"
        >
          {{ medicineItem }}
        </li>
      </ul>
    </div>
    <div class="annotation-card">
      <h1>
        医疗器械
        <span style="color: orange">共 {{ tLength }} 个</span>
      </h1>

      <ul class="scroll-box">
        <li
          v-for="toolItem of this.$store.state.toolsMap.values()"
          :key="toolItem"
          style="color: orange"
        >
          {{ toolItem }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "annotations",
  props: ["index"],
  data() {
    return {
      relationsList: [],
      nameList: [],
      medicineList: [],
      toolsList: [],
      rLength: 0,
      nLength: 0,
      mLength: 0,
      tLength: 0,
    };
  },
  mounted() {
    //  同步文本和数字
    this.$bus.$on("showAnnotations", this.showAnnotations);
    this.$bus.$on("delete", this.deleteAnnotations);
  },
  methods: {
    showAnnotations(index) {
      let text = this.$store.state.selectionText;

      switch (index) {
        case 0: {
          this.$store.state.relationsMap.set(
            "relation" + this.$store.state.id,
            text
          );
          this.relationsList = this.$store.state.relationsMap.values();
          this.rLength = this.$store.state.relationsMap.size
          break;
        }
        case 1: {
          this.$store.state.nameMap.set("name" + this.$store.state.id, text);
          this.nameList = this.$store.state.nameMap.values();
          this.nLength = this.$store.state.nameMap.size

          break;
        }
        case 2: {
          this.$store.state.medicineMap.set(
            "medicine" + this.$store.state.id,
            text
          );
          this.mLength = this.$store.state.medicineMap.size

          this.medicineList = this.$store.state.medicineMap.values();

          break;
        }
        case 3: {
          this.$store.state.toolsMap.set("tool" + this.$store.state.id, text);
          this.toolsList = this.$store.state.toolsMap.values();
          this.tLength = this.$store.state.toolsMap.size

          break;
        }
      }
    },
    deleteAnnotations() {
      this.relationsList = this.$store.state.relationsMap.values();
      this.nameList = this.$store.state.nameMap.values();
      this.medicineList = this.$store.state.medicineMap.values();
      this.toolsList = this.$store.state.toolsMap.values();
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
}

.annotation-card {
  width: 50%;
}

.scroll-box {
  overflow: auto;
  flex: auto;
  min-width: 45%;
  white-space: pre-line;
  word-break: break-all;
}
</style>
