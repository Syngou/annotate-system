<template>
  <div>
    <el-drawer
      :visible.sync="drawer"
      class="drawer"
      :modal-append-to-body="false"
      :show-close="false"
      title="title"
      size="40%"
      :with-header="false"
    >
      <div v-for="(item, index) in type" :key="index">
        <div class="list" v-show="data[index].length > 0">
          <button class="btn" :style="{ backgroundColor: colorArray[index] }">
            {{ item }}
          </button>
          <div>
            <ol>
              <li
                class="list-item"
                v-for="(relation, i) in data[index]"
                :key="i"
              >
                {{ relation }}
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div v-show="!isShow" style="font-size: 24px">
        只有标注了才会在这里显示哦👨🏻‍🔬
      </div>
      <div class="upload-button" v-show="isShow">
        <el-button type="primary" @click="uploadData">上传数据</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import request from "@/api/annotatePageApi";
export default {
  name: "ShowAnnotation",
  created() {
    this.$bus.$on("showDrawer", () => {
      this.drawer = true;
    });
  },
  data() {
    return {
      colorArray: this.$store.state.annotate.colorArray,
      data: this.$store.state.annotate.data,
      type: this.$store.state.annotate.type,
      drawer: false, //显示标注词语
      relation: "",
      disease: "",
      medicine: "",
      tool: "",
    };
  },
  computed: {
    isShow() {
      for (let item of this.data) {
        if (item.length > 0) {
          return true;
        }
      }
      return false;
    },
  },

  methods: {
    /**
     * @description: 标注数据上传后台
     */
    uploadData() {
      request.postToBackend(this.$store.state.annotate.data).then(() => {
        this.$message.success("上传成功");
        this.drawer = false;
      });
    },
  },
};
</script>

<style scoped>
  .drawer {
    margin-top: 10px;
  }

  .drawer li {
    margin-left: 20px;
    list-style-position: inside;
    padding-left: 10px;
    margin-left: 0;
  }
  .btn {
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
    outline: none;
  }
  .list {
    margin-bottom: 20px;
  }

  .list-item:nth-child(odd) {
    background-color: #c1c8d8;
    margin-top: 2px;
    border-radius: 10px;
  }
  .list-item:nth-child(even) {
    background-color: #c4d2f3;
    margin-top: 2px;
    border-radius: 10px;
  }
  .upload-button {
    position: fixed;
    bottom: 0;
    left: 75%;
  }
</style>
