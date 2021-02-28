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
      <div class="list" v-show="$store.state.data[0].length > 0">
        <button class="btn" style="background-color: red; margin-top: 0">
          关系
        </button>

        <div>
          <ol>
            <li
              class="list-item"
              v-for="(relation, index) in $store.state.data[0]"
              :key="index"
            >
              {{ relation }}
            </li>
          </ol>
        </div>
      </div>

      <div class="list" v-show="$store.state.data[1].length > 0">
        <button
          class="btn"
          style="background-color: blue"
          type="primary"
          size="medium"
        >
          名称
        </button>

        <div>
          <ol>
            <li
              class="list-item"
              v-for="(name, index) in $store.state.data[1]"
              :key="index"
            >
              {{ name }}
            </li>
          </ol>
        </div>
      </div>
      <div class="list" v-show="$store.state.data[2].length > 0">
        <button
          class="btn"
          style="background-color: green"
          type="success"
          size="medium"
        >
          药物
        </button>

        <div>
          <ol>
            <li
              class="list-item"
              v-for="(medicine, index) in $store.state.data[2]"
              :key="index"
            >
              {{ medicine }}
            </li>
          </ol>
        </div>
      </div>
      <div class="list" v-show="$store.state.data[3].length > 0">
        <button
          class="btn"
          style="background-color: orange"
          type="warning"
          size="medium"
        >
          器械
        </button>

        <div>
          <ol>
            <li
              class="list-item"
              v-for="(tool, index) in $store.state.data[3]"
              :key="index"
            >
              {{ tool }}
            </li>
          </ol>
        </div>
      </div>
      <div
        style="font-size: 30px"
        v-show="
          $store.state.data[0].length == 0 &&
          $store.state.data[1].length == 0 &&
          $store.state.data[2].length == 0 &&
          $store.state.data[3].length == 0
        "
      >
        只有标注了才会在这里显示哦👨🏻‍🔬
      </div>
      <div class="upload-button">
        <el-button
          type="primary"
          @click="uploadData"
          v-show="
            $store.state.data[0].length != 0 ||
            $store.state.data[1].length != 0 ||
            $store.state.data[2].length != 0 ||
            $store.state.data[3].length != 0
          "
          >上传数据</el-button
        >
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
      drawer: false, //显示标注词语
      relation: "",
      name: "",
      medicine: "",
      tool: "",
    };
  },

  methods: {
    /**
     * @description: 标注数据上传后台
     */
    uploadData() {
      request.postToBackend(this.$store.state.data).then(() => {
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
