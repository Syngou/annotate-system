<template>
  <div>
    <el-row v-for="(item, index) in errorData" :key="index">
      <el-col>
        <el-card>
          <ul>
            <li>标注结果: {{ item.word }}</li>
            <li v-html="highlightSentence(index)"></li>
            <li>使用模型: {{ item.moduleName }}</li>
            <li>错误类型: {{ item.errorType }}</li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    errorData: {
      type: Array,
      default() {
        return [
          {
            word: "你好",
            sentence: "你好吗",
            moduleName: "模型1",
            errorType: "多标注了",
          },
          {
            word: "",
            sentence: "大江东去浪淘尽",
            moduleName: "模型1",
            errorType: "少标注了",
          },
          {
            word: "不",
            sentence: "春眠不觉晓",
            moduleName: "模型1",
            errorType: "标注类型错误",
          },
        ];
      },
    },
  },
  computed: {
    highlightSentence() {
      return (index) => {
        let word = this.errorData[index].word;
        let sentence = this.errorData[index].sentence;

        return word != ""
          ? "所在句子: " +
              sentence.replace(word, `<span class="highlight">${word}</span>`)
          : "所在句子: " + sentence;
      };
    },
  },
};
</script>

<style lang="scss" >
  li {
    margin: 10px 0;
    .highlight {
      background-color: red;
      border-radius: 5px;
      padding: 1px 3px;
    }
  }
</style>