import { addToRedis, deleteFromRedis, postToBackend } from "@/network/request";

const mutations = {
    /**
     
     * @description 将标注文本添加列表，并上传至后台，（可以不必每次都提交，不然后台压力太大，这里只是演示）
     * @param  state
     * @param  info 对象，存id和文本
     */
    addToList(state, info) {
        let text = info.text;
        if (info.id.indexOf("relation") !== -1) {
            "list ==> " + state.relationsList;
            state.relationsList.push(text);

            addToRedis("relation", info.id, text);
        } else if (info.id.indexOf("name") !== -1) {
            state.nameList.push(text);

            addToRedis("name", info.id, text);
        } else if (info.id.indexOf("medicine") !== -1) {
            state.medicineList.push(text);

            addToRedis("medicine", info.id, text);
        } else if (info.id.indexOf("tool") !== -1) {
            state.toolsList.push(text);

            addToRedis("tool", info.id, text);
        }

        postToBackend([
            state.relationsList,
            state.nameList,
            state.medicineList,
            state.toolsList,
        ]);
    },
    /**
     
     * @description 删除list中的标注记录
     * @param  state
     * @param  info 对象，存id，文本
     */
    deleteAnnotatedText(state, info) {
        if (info.type.indexOf("relation") !== -1) {
            for (let i = 0; i < state.relationsList.length; i++) {
                if (state.relationsList[i] == info.text) {
                    state.relationsList.splice(i, 1);
                    console.log(true);
                    break;
                }
            }

            deleteFromRedis("relation", info.deleteText);
        } else if (info.type.indexOf("name") !== -1) {
            for (let i = 0; i < state.nameList.length; i++) {
                if (state.nameList[i] === info.text + "") {
                    state.nameList.splice(i, 1);
                    break;
                }
            }

            deleteFromRedis("name", info.deleteText);
        } else if (info.type.indexOf("medicine") !== -1) {
            for (let i = 0; i < state.medicineList.length; i++) {
                if (state.medicineList[i] === info.text + "") {
                    state.medicineList.splice(i, 1);
                    break;
                }
            }

            deleteFromRedis("medicine", info.deleteText);
        } else if (info.type.indexOf("tool") !== -1) {
            for (let i = 0; i < state.toolsList.length; i++) {
                if (state.toolsList[i] === info.text + "") {
                    state.toolsList.splice(i, 1);
                    break;
                }
            }

            deleteFromRedis("tool", info.deleteText);
        }
    },
};

export default mutations;
