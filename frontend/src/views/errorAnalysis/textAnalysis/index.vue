<template>
  <div>
    <div v-if="textArray.length">
      <div>
        <div style="margin: 30px;">
          <ul>
            <li>字上面的标签表示标注值，下方为预测值</li>
          </ul>
        </div>
      </div>
      <div class="tags-container">
        <span
          v-for="(type, index) in types"
          :key="index"
          class="text-tag"
          :style="{ backgroundColor: type.color }"
        >
          {{ type.text }}
        </span>
      </div>
      <div
        v-for="(text, index) in textArray"
        :key="index"
        class="entity-item-box"
      >
        <entity-item-box
          :tags="types"
          :entities="
            annotationArray[currentPage * sentenceCount + index - sentenceCount]
          "
        />
      </div>
      <div class="page">
        <div class="block">
          <el-pagination
            :current-page.sync="currentPage"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="annotationArray.length"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <Empty v-else />
  </div>
</template>

<script>
import EntityItemBox from "../textAnalysis/components/EntityItemBox";
import Empty from "../empty/Empty";

export default {
  name: "Index",
  components: {
    EntityItemBox,
    Empty,
  },
  data() {
    return {
      currentPage: 1, //当前页
      annotationArray: [], //每个字的信息
      types: [], //分类
      sentenceCount: 2, //每页显示句子数
    };
  },
  computed: {
    /**
     * 每页显示的文本
     */
    textArray() {
      let n = this.currentPage;
      let result = [];
      for (
        let i = this.sentenceCount * n - this.sentenceCount;
        i <= this.sentenceCount * n - 1;
        i++
      ) {
        if (this.annotationArray[i]) {
          result.push([]);
        }
      }
      return result;
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    /**
     * 处理每页显示的句子数
     */
    handleSizeChange(val) {
      this.sentenceCount = val;
    },
    /**
     * 获取数据
     */
    fetchData() {
      let temp = this.$store.state.errorAnalysis.entity_type;
      for (let i = 0; i < temp.length; i++) {
        this.types.push({
          text: temp[i],
          color: this.$store.state.errorAnalysis.colorArray[i],
        });
      }
      this.annotationArray = this.$store.state.errorAnalysis.sentences;
    },
  },
};
</script>

<style scoped>
.tags-container {
  margin-left: 30px;
}

.text-tag {
  margin: 10px 10px 10px 0;
  padding: 3px 10px;
  text-align: center;
  display: inline-block;
  border-radius: 15px;
}

.entity-item-box {
  margin: 0 0 100px 30px;
}

.page {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}
</style>
