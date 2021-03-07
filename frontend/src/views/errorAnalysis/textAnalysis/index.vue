<template>
  <div>
    <div
      class="entity-item-box"
      v-for="(text, index) in textArray"
      :key="index"
    >
      <entity-item-box
        :labels="items"
        :text="text"
        :entities="annotations(index)"
      />
    </div>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
      items: [
        {
          id: 4, //标签id 用于实体选择标签
          text: "B", // 标签显示的文本
          background_color: "#00ff00", // 标签的背景颜色
          text_color: "#ffffff", // 标签的文字颜色
        },
        {
          id: 5,
          text: "O",
          background_color: "#ffffff",
          text_color: "#ffffff",
        },
        {
          id: 6,
          text: "R",
          background_color: "#0000ff",
          text_color: "#000000",
        },
        {
          id: 7,
          text: "I",
          background_color: "#ff0000",
          text_color: "#ffffff",
        },
      ],
    };
  },
  created() {
    getText().then((res) => {
      this.textArr = res.data.items.text;
      this.annotationArray = res.data.items.annotations;
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
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
  },
};
</script>

<style scoped>
  .entity-item-box {
    margin: 0 0px 100px 30px;
  }
  .page {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
  }
</style>
