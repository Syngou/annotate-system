<template>
  <div class="highlight-container highlight-container--bottom-labels">
    <entity-item
      v-for="(chunk, i) in chunks"
      :key="i"
      :content="chunk.text"
      :standardType="chunk.standardType"
      :predictType="chunk.predictType"
      :standardColor="chunk.standardColor"
      :predictColor="chunk.predictColor"
    />
  </div>
</template>

<script>
import EntityItem from "./EntityItem";
export default {
  components: {
    EntityItem,
  },
  props: {
    // 所有的标签
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    // 每个字信息
    entities: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    chunks() {
      let chunks = [];
      const entities = this.entities;
      for (const entity of entities) {
        chunks.push({
          standardType: entity.standard_label,
          predictType: entity.predict_label,
          standardColor: this.pickColor(entity.standard_type),
          predictColor: this.pickColor(entity.predict_type),
          text: entity.value,
        });
      }
      return chunks;
    },
  },
  methods: {
    /**
     * 获取标签的样式，没有则显示白色
     * @param type 标签类型
     * @returns {string|*} 颜色
     */
    pickColor(type) {
      for (const label of this.labels) {
        if (label.text === type) {
          return label.color;
        }
      }
      return "#ffffff";
    },
  },
};
</script>

<style scoped>
  .highlight-container.highlight-container--bottom-labels {
    align-items: flex-start;
  }
  .highlight-container {
    line-height: 42px !important;
    display: flex;
    flex-wrap: wrap;
    white-space: pre-wrap;
    cursor: default;
  }
  .highlight-container.highlight-container--bottom-labels {
    margin-top: 6px;
  }
</style>
