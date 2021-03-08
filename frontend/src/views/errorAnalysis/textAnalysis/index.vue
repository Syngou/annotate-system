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
      currentPage: 1, //当前页
      textArr: [],
      annotationArray: [],
      labelArray: [],
      colorArray: [
        //标签颜色
        "#fa0404",
        "#fd0dad",
        "#8406f3",
        "#d462ee",
        "#ff9b06",
        "#e3fc07",
        "#058f32",
        "#10f0fc",
        "#83fa07",
        "#66ee66",
        "#c0e97d",
        "#ee777d",
        "#2e0bf3",
        "#0af0e1",
        "#0baff5",
        "#1f74c9",
        "#8985ec",
        "#761616",
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
    /**
     * 每页显示的文本
     */
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
     */
    annotations() {
      return (index) => {
        if (this.annotationArray && this.textArray) {
          let result = [];
          //BUG 这里好像有bug 如果传来的数据开始索引没有按顺序，就会出错
          let annotations = this.annotationArray[index]
            .slice()
            .sort((a, b) => a.start_offset - b.start_offset);

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
