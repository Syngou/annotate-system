<template>
  <div class="container">
    <div class="annotation-card">
      <h1>
        关系
        <span style="color: red"
        >共 {{ $store.state.relationsList.length }} 个</span
        >
      </h1>
      <ol class="scroll-box">
        <li
          v-for="(relationItem, index) in $store.state.relationsList"
          :key="relationItem"
          style="color: red; line-height: normal"
        >
          {{ index + 1 + ". " + relationItem }}
        </li>
      </ol>
    </div>
    <div class="annotation-card">
      <h1>
        疾病名称
        <span style="color: blue"
        >共 {{ $store.state.nameList.length }} 个</span
        >
      </h1>

      <ol class="scroll-box">
        <li
          v-for="(nameItem, index) in $store.state.nameList"
          :key="nameItem"
          style="color: blue"
        >
          {{ index + 1 + ". " + nameItem }}
        </li>
      </ol>
    </div>
    <div class="annotation-card">
      <h1>
        药物
        <span style="color: green"
        >共 {{ $store.state.medicineList.length }} 个</span
        >
      </h1>

      <ol class="scroll-box">
        <li
          v-for="(medicineItem, index) in $store.state.medicineList"
          :key="medicineItem"
          style="color: green"
        >
          {{ index + 1 + ". " + medicineItem }}
        </li>
      </ol>
    </div>
    <div class="annotation-card">
      <h1>
        医疗器械
        <span style="color: orange"
        >共 {{ $store.state.toolsList.length }} 个</span
        >
      </h1>

      <ol class="scroll-box">
        <li
          v-for="(toolItem, index) in $store.state.toolsList"
          :key="toolItem"
          style="color: orange"
        >
          {{ index + 1 + ". " + toolItem }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightColumn",
  props: ["index"],
  mounted() {
    //  同步文本和数字
    this.$bus.$on("showAnnotations", this.showAnnotations);
  },
  methods: {
    showAnnotations(index) {
      let text = this.$store.state.selectionText;
      switch (index) {
        case 0: {
          this.$store.state.relationsList.push(text);

          break;
        }
        case 1: {
          this.$store.state.nameList.push(text);

          break;
        }
        case 2: {
          this.$store.state.medicineList.push(text);

          break;
        }
        case 3: {
          this.$store.state.toolsList.push(text);
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-wrap: wrap
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
