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
    // 文本
    text: {
      type: String,
      default: "",
      required: true,
    },
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
    sortedEntities() {
      return this.entities
        .slice()
        .sort((a, b) => a.start_offset - b.start_offset);
    },

    chunks() {
      let chunks = [];
      const entities = this.sortedEntities;
      for (const entity of entities) {
        // add entities to chunks.
        chunks.push({
          standardType: entity.standard_label,
          predictType: entity.predict_label,
          standardColor: this.pickColor(entity.standard_type),
          predictColor: this.pickColor(entity.predict_type),
          text: this.text.slice(entity.start_offset, entity.start_offset + 1),
        });
      }
      return chunks;
    },
  },
  methods: {
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
