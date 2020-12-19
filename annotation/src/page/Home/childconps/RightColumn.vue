<template>
  <div>
    <div class="card" style="margin-top: 100px">
      <h1>
        关系
        <span style="color: red">共 {{ relationsList.length }} 个</span>
      </h1>
      <ol class="scroll-box">
        <li
          v-for="(relationItem, index) in relationsList"
          :key="relationItem"
          style="color: red; line-height: normal"
        >
          {{ index + 1 + ". " + relationItem }}
        </li>
      </ol>
    </div>
    <div class="card">
      <h1>
        疾病名称
        <span style="color: blue">共 {{ nameList.length }} 个</span>
      </h1>

      <ol class="scroll-box">
        <li
          v-for="(nameItem, index) in nameList"
          :key="nameItem"
          style="color: blue"
        >
          {{ index + 1 + ". " + nameItem }}
        </li>
      </ol>
    </div>
    <div class="card">
      <h1>
        药物
        <span style="color: green">共 {{ medicineList.length }} 个</span>
      </h1>

      <ol class="scroll-box">
        <li
          v-for="(medicineItem, index) in medicineList"
          :key="medicineItem"
          style="color: green"
        >
          {{ index + 1 + ". " + medicineItem }}
        </li>
      </ol>
    </div>
    <div class="card">
      <h1>
        医疗器械
        <span style="color: orange">共 {{ toolsList.length }} 个</span>
      </h1>

      <ol class="scroll-box">
        <li
          v-for="(toolItem, index) in toolsList"
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
  data() {
    return {
      relationsList: [],
      nameList: [],
      medicineList: [],
      toolsList: [],
    };
  },
  methods: {
    //  同步文本和数字
    showAnnotations(index, text) {
      switch (index) {
        case 0: {
          this.relationsList.push(text);

          break;
        }
        case 1: {
          this.nameList.push(text);

          break;
        }
        case 2: {
          this.medicineList.push(text);

          break;
        }
        case 3: {
          this.toolsList.push(text);
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
  /* 文章卡片效果 */
  .card {
    margin-top: 20px;
    padding: 20px;
  }

  .scroll-box {
    overflow: auto;
    flex: auto;
    min-height: 124px;
    max-height: 124px;
    white-space: pre-line;
    word-break: break-all;
  }
</style>
