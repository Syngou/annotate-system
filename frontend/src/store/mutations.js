const mutations = {
    /**

   * @description 将标注文本添加列表，并上传至后台，（可以不必每次都提交，不然后台压力太大，这里只是演示）
   * @param  state
   * @param  info 对象，存id和文本
   */
    addToList(state, info) {
        let text = info.text;
        let index = parseInt(info.id.charAt(0));
        state.data[index].push(text);
    },
    /**

   * @description 删除list中的标注记录
   * @param  state
   * @param  info 对象，存储需要删除已标注文本的id，文本
   */
    deleteAnnotatedText(state, info) {
        let index = parseInt(info.type.charAt(0));
        for (let i = state.data.length - 1; i >= 0; i--) {
            if (state.data[index][i] == info.text) {
                state.data[index].splice(i, 1);
                break;
            }
        }
    },
};

export default mutations;
