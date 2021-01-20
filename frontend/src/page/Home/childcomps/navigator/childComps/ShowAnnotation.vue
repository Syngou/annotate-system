<template>
  <div>
    <Drawer :closable="false" width="640" v-model="drawer" class="drawer">
      <div class="list" v-show="$store.state.data[0].length > 0">
        <Button type="primary" long>关系</Button>

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
        <Button type="primary" long>名称</Button>

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
        <Button type="primary" long>药物</Button>

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
        <Button type="primary" long>器械</Button>

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
        <Button type="primary" @click="uploadData">上传数据</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
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
      this.$Message.error({
        content: "服务器失踪了，数据不知道往哪里传...",
        duration: 4,
        closable: true,
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
    position: absolute;
    bottom: 0;
    left: 40%;
  }
</style>
