<template>
  <div>
    <Modal
      v-model="remind"
      class="remind-title"
      title="温馨提示"
      :mask-closable="false"
    >
      <p class="remind-message">您有还未上传的数据哦</p>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="introduceModal = false">仍要离开</Button
        ><Button type="primary" @click="introduceModal = false"
          >上传并离开</Button
        ><Button type="primary" @click="introduceModal = false"
          >继续标注</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remind: false,
    };
  },
  mounted() {
    this.isUpload();
    this.isPC();
  },
  methods: {
    /**
     * @description 浏览器关闭时提示，待开发
     *
     */
    //TODO 开发此功能，不能也不强求
    isUpload() {
      window.onbeforeunload = function () {
        if (!this.$store.state.isUpload) {
          this.remind = true;
        }
      };
    },
    /**
     * @description 判断是否是电脑
     */
    isPC() {
      let userAgentInfo = navigator.userAgent;
      let Agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          this.$Message.info({
            content: "手机是无法进行标注的哦,请使用电脑浏览器。",
            duration: 10,
            closable: true,
          });
          break;
        }
      }
    },
  },
};
</script>

<style scoped>
  .remind-title {
    text-align: center;
  }
  .remind-message {
    text-align: center;
    font-size: 20px;
    color: red;
    font-weight: bold;
  }
</style>