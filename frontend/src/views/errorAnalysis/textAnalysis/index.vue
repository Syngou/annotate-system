<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <div style="width: 100%; text-align: center">使用说明</div>
        </template>
        <ul>
          <li>字上面的标签表示标注型，下方为预测型</li>
        </ul>
      </el-collapse-item>
    </el-collapse>
    <div
      class="entity-item-box"
      v-for="(text, index) in textArray"
      :key="index"
    >
      <div class="tags-container">
        <span
          class="text-tag"
          :style="{ backgroundColor: label.color }"
          v-for="(label, index) in labelArray"
          :key="index"
          >{{ label.text }}</span
        >
      </div>
      <entity-item-box
        :text="text"
        :labels="labelArray"
        :entities="annotations(index)"
      />
    </div>
    <div class="page">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="1"
        layout="prev, pager, next, jumper"
        :total="Math.ceil(textArr.length / 2)"
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
      currentPage: 1,
      textArr: [],
      annotationArray: [],
      labelArray: [],
      colorArray: [
        "#fa0404",
        "#ff9b06",
        "#e3fc07",
        "#07fa54",
        "#ee777d",
        "#fa0ada",
        "#0af0e1",
        "#f33e3e",
        "#c0e97d",
        "#0eeb8b",
        "#82fb08",
        "#0baff5",
        "#761616",
        "#ff14b8",
        "#10f0fc",
        "#1f74c9",
        "#605bdf",
        "#fd0dad",
        "#2e0bf3",
        "#e70cf7",
      ],
    };
  },
  created() {
    getText().then((res) => {
      let temp = [];
      let index = 0;
      temp.push(...res.data.labels);
      for (let i = 0; i < temp.length; i++) {
        if (temp.indexOf(temp[i]) === i) {
          this.labelArray.push({
            text: temp[i],
            color: this.colorArray[index++],
          });
        }
      }
      this.textArr = res.data.text;
      this.annotationArray = res.data.annotations;
    });
  },
  computed: {
    textArray() {
      let n = this.currentPage;
      let result = [];
      for (let i = 2 * n - 2; i <= 2 * n - 1; i++) {
        if (this.textArr[i]) {
          result.push(this.textArr[i]);
        }
      }
      return result;
    },
    /**
     * 标签信息
     */ annotations() {
      return (index) => {
        if (this.annotationArray && this.textArray) {
          let result = [];
          let annotations = this.annotationArray[index];
          let entityItemNum = this.annotationArray[index].length;
          let i = 0;
          for (let start = 0; start < this.textArray[index].length; start++) {
            if (
              start < annotations[i].start_offset ||
              start > annotations[i].start_offset
            ) {
              result.push({
                start_offset: start,
                end_offset: start + 1,
                standardType: 5,
                predictType: 5,
                standard_type: "",
                predict_type: "",
                standard_label: "O",
                predict_label: "O",
              });
            } else {
              result.push(annotations[i]);
              if (i <= entityItemNum - 2) {
                i++;
              }
            }
          }
          return result;
        }
      };
    },
  },
};
</script>

<style scoped>
  .tags-container {
    display: flex;
    margin-left: 20px;
  }
  .text-tag {
    margin: 20px 10px 20px 0;
    text-align: center;
    flex: 1;
    border-radius: 31px;
  }
  .entity-item-box {
    margin: 0 0px 100px 30px;
  }
  .page {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
  }
</style>
