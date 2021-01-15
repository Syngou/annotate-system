import { postToBackend } from "@/network/request";
const mutations = {
    /**
     
     * @description 将标注文本添加列表，并上传至后台，（可以不必每次都提交，不然后台压力太大，这里只是演示）
     * @param  state
     * @param  info 对象，存id和文本
     */
    addToList(state, info) {
        let text = info.text;
        if (info.id.indexOf("relation") !== -1) {
            "list ==> " + state.data[0];
            state.data[0].push(text);
        } else if (info.id.indexOf("name") !== -1) {
            state.data[1].push(text);
        } else if (info.id.indexOf("medicine") !== -1) {
            state.data[2].push(text);
        } else if (info.id.indexOf("tool") !== -1) {
            state.data[3].push(text);
        }

        postToBackend([
            state.data[0],
            state.data[1],
            state.data[2],
            state.data[3],
        ]);
    },
    /**
     
     * @description 删除list中的标注记录
     * @param  state
     * @param  info 对象，存id，文本
     */
    deleteAnnotatedText(state, info) {
        if (info.type.charAt(0) === "0") {
            for (let i = 0; i < state.data[0].length; i++) {
                if (state.data[0][i] == info.text) {
                    state.data[0].splice(i, 1);
                    break;
                }
            }
        } else if (info.type.charAt(0) === "1") {
            for (let i = 0; i < state.data[1].length; i++) {
                if (state.data[1][i] === info.text + "") {
                    state.data[1].splice(i, 1);
                    break;
                }
            }
        } else if (info.type.charAt(0) === "2") {
            for (let i = 0; i < state.data[2].length; i++) {
                if (state.data[2][i] === info.text + "") {
                    state.data[2].splice(i, 1);
                    break;
                }
            }
        } else if (info.type.charAt(0) === "3") {
            for (let i = 0; i < state.data[3].length; i++) {
                if (state.data[3][i] === info.text + "") {
                    state.data[3].splice(i, 1);
                    break;
                }
            }
        }
    },
};

export default mutations;
