<template>
  <div>
    <Modal v-model="introduceModal" title="功能介绍" :mask-closable="false">
      <p>按下鼠标，滑过文本，松开，即可标注文本,右栏实时显示标注的文本</p>
      <br/>
      <p>也可以选择使用快捷键标注：对应快捷键：</p>
      <br/>
      <p>红：r(red);蓝：b(blue);绿：g(green);橙：o(orange)</p>
      <div
        slot="footer"
        style="display: flex; justify-content: center; align-items: center"
      >
        <Button type="primary" @click="introduceModal = false">我知道了</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "Introduce",
  created() {
    this.$bus.$on("showIntroduce", () => {
      this.introduceModal = true;
    })
  },
  data() {
    return {
      introduceModal: false, //功能介绍
    }
  }
}
</script>

<style scoped>

</style>
