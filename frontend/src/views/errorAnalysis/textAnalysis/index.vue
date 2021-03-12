<template>
  <div>
    <div>
      <div style="margin: 30px">
        <ul>
          <li>字上面的标签表示标注值，下方为预测值</li>
        </ul>
      </div>
    </div>
    <div class="tags-container">
      <span
        class="text-tag"
        :style="{ backgroundColor: label.color }"
        v-for="(label, index) in labelArray"
        :key="index"
        >{{ label.text }}</span
      >
    </div>

    <div
      class="entity-item-box"
      v-for="(text, index) in textArray"
      :key="index"
    >
      <entity-item-box
        :labels="labelArray"
        :entities="annotationArray[currentPage * 2 + index - 2]"
      />
    </div>
    <div class="page">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="1"
        layout="prev, pager, next, jumper"
        :total="Math.ceil(annotationArray.length / 2)"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import EntityItemBox from "../textAnalysis/components/EntityItemBox";
import { getText } from "@/api/text";

export default {
  name: "index",
  components: {
    EntityItemBox,
  },
  data() {
    return {
      currentPage: 1, //当前页
      annotationArray: [],
      labelArray: [],
    };
  },
  created() {
    getText().then((res) => {
      this.labelArray.push(...res.data.labels);
      for (let i = 0; i < this.labelArray.length; i++) {
        if (this.labelArray[i]["text"]) {
          this.labelArray[i]["color"] = this.$store.state.annotate.colorArray[
            i
          ];
        }
      }

      this.annotationArray = res.data.annotations;
    });
  },
  computed: {
    /**
     * 每页显示的文本
     */
    textArray() {
      let n = this.currentPage;
      let result = [];
      for (let i = 2 * n - 2; i <= 2 * n - 1; i++) {
        if (this.annotationArray[i]) {
          result.push([]);
        }
      }
      return result;
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
