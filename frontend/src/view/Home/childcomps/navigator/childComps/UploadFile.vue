<template>
  <div>
    <Modal v-model="uploadModal" title="上传文件" :mask-closable="false">
      <Upload multiple type="drag" action="127.0.0.1">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>点击或把文件拖到这里</p>
        </div>
      </Upload>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "UploadFile",
  created() {
    this.$bus.$on("showUpload", () => {
      this.uploadModal = true;
    })
  },
  data() {
    return {
      uploadModal: false, // 上传文件
    }
  }
}
</script>

<style scoped>

</style>
