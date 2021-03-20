<template>
  <div>
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
        :labels="types"
        :entities="
          annotationArray[currentPage * sentenceCount + index - sentenceCount]
        "
      />
    </div>
    <div class="page">
      <div class="block">
        <el-pagination
          :current-page.sync="currentPage"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="annotationArray.length"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import EntityItemBox from "../textAnalysis/components/EntityItemBox";
import { getText } from "@/api/text";

export default {
  name: "Index",
  components: {
    EntityItemBox,
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
      getText().then((res) => {
        this.types.push(...res.data.labels);
        for (let i = 0; i < this.types.length; i++) {
          if (this.types[i]["text"]) {
            this.types[i]["color"] = this.$store.state.errorAnalysis.colorArray[
              i
            ];
          }
        }
        this.annotationArray = res.data.annotations;
      });
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
