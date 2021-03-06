<template>
  <div>
    <div v-for="(data, index) in errorData" :key="index" class="error-display">
      <span v-html="data.sentence"> </span>
    </div>
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
            sentence:
              "本台记者报道： 某糖尿病患者在一位国际著名医生的帮助下康复,他十分感激这位医生，并向我们推荐了一种药物",
            moduleName: "模型1",
            results: [
              {
                startOffset: 3,
                endOffset: 5,
                standardResult: "疾病",
                predictResult: "药物",
              },
            ],
          },
        ];
      },
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
  .error-display {
    height: 200px;
    line-height: 40px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 30px 0;
    &-highlight {
      border: 1px solid black;
      background-color: red;
      margin: 30px;
    }
  }
</style>