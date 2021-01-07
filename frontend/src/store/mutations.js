import {
    addToDatabase,
    delFromDatabase,
    postToDatabase,
} from "@/network/request";
const mutations = {
    addToList(state, info) {
        let text = info.text;
        if (info.id.indexOf("relation") !== -1) {
            "list ==> " + state.relationsList;
            state.relationsList.push(text);

            addToDatabase("relation", info.id, text);
        } else if (info.id.indexOf("name") !== -1) {
            state.nameList.push(text);

            addToDatabase("name", info.id, text);
        } else if (info.id.indexOf("medicine") !== -1) {
            state.medicineList.push(text);

            addToDatabase("medicine", info.id, text);
        } else if (info.id.indexOf("tool") !== -1) {
            state.toolsList.push(text);

            addToDatabase("tool", info.id, text);
        }

        postToDatabase([
            state.relationsList,
            state.nameList,
            state.medicineList,
            state.toolsList,
        ]);
    },
    // 删除list中的标注记录
    deleteAnnotatedText(state, info) {
        if (info.type.indexOf("relation") !== -1) {
            for (let i = 0; i < state.relationsList.length; i++) {
                if (state.relationsList[i] == info.text) {
                    state.relationsList.splice(i, 1);
                    console.log(true);
                    break;
                }
            }

            delFromDatabase("relation", info.deleteText);
        } else if (info.type.indexOf("name") !== -1) {
            for (let i = 0; i < state.nameList.length; i++) {
                if (state.nameList[i] === info.text + "") {
                    state.nameList.splice(i, 1);
                    break;
                }
            }

            delFromDatabase("name", info.deleteText);
        } else if (info.type.indexOf("medicine") !== -1) {
            for (let i = 0; i < state.medicineList.length; i++) {
                if (state.medicineList[i] === info.text + "") {
                    state.medicineList.splice(i, 1);
                    break;
                }
            }

            delFromDatabase("medicine", info.deleteText);
        } else if (info.type.indexOf("tool") !== -1) {
            for (let i = 0; i < state.toolsList.length; i++) {
                if (state.toolsList[i] === info.text + "") {
                    state.toolsList.splice(i, 1);
                    break;
                }
            }

            delFromDatabase("tool", info.deleteText);
        }
    },
};

export default mutations;
