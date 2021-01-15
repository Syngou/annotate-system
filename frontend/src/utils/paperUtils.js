import store from "@/store/index";
function buttonStyle() {
    console.log(store.commit);
    return `height:20px;
        width:20px;
        text-align:center;
        line-height:20px;
        border-radius:30px;
        margin-left:5px;
        outline: none;
        cursor:pointer;
        background-color:white`;
}
/**
 * @description 标注
 * @param id 给button标签的id，用于删除时查找
 * @param index 标注颜色索引
 */
function annotate(id, index) {
    let colorArray = ["red", "blue", "green", "orange"]; // 标注颜色
    let text = store.state.selectionText;
    store.commit("addToList", { id, text });
    // 按钮样式   TODO：样式美化
    // 标注文本样式
    let annotatedTestStyle =
        ";border:5px solid " +
        colorArray[index] +
        `
      ;border-radius: 10px;
      padding: 0 5px 0 3px;`;

    // 选中不为空
    if (text.length > 0) {
        // 按钮添加事件
        let button = document.createElement("button");
        button.setAttribute("id", id);
        button.addEventListener("click", () => {
            deleteById(id);
        });

        button.setAttribute("style", buttonStyle());
        let span = document.createElement("span");
        span.setAttribute(
            "style",
            "background-color:" + colorArray[index] + annotatedTestStyle
        );

        let TextRange = window.getSelection().getRangeAt(0);
        TextRange.surroundContents(span);
        span.appendChild(button);
        //移除选中状态，否则很难看
        window.getSelection().removeAllRanges();
        store.state.id++;
    }
}
/**
 * @description 删除样式
 */
function deleteById(id) {
    let essay = document.getElementById("essay");
    let span = document.getElementById(id).parentNode;
    // 获取文本，将其插入当前节点前，再删除节点
    let textNode = document.createTextNode(span.innerText);
    let text = span.innerText;
    essay.insertBefore(textNode, span);
    essay.removeChild(span);
    store.commit("deleteAnnotatedText", { type: id, text });
}
/**
 * @description 自动标注
 */
function autoAnnotate(data) {
    let essay = document.getElementById("essay");
    let text = essay.innerHTML;
    for (let i = 0; i < data.length; i++) {
        if (data[i].length != 0) {
            store.state.data[i].push(...data[i].split(" "));
        }
    }
    let array = [];
    let annotatedTestStyle = "";
    let colorArray = ["red", "blue", "green", "orange"]; // 标注颜色
    for (let i = 0; i < store.state.data.length; i++) {
        for (let j = 0; j < store.state.data[i].length; j++) {
            if (store.state.data[i][j].length != 0) {
                array = text.split(store.state.data[i][j]);
                essay.innerHTML = array.join(
                    "<font style='color:red'>" +
                        store.state.data[i][j] +
                        "</font>"
                );
                array = [];
            }
        }
        for (let k = 0; k < essay.childNodes.length; k++) {
            if (essay.childNodes[k].nodeName === "FONT") {
                annotatedTestStyle =
                    ";border:5px solid " +
                    colorArray[i] +
                    `;border-radius: 10px;padding: 0 5px 0 3px;`;

                let button = document.createElement("button");
                let innerText = document.createTextNode(
                    essay.childNodes[k].innerText
                );
                button.id = i + "" + store.state.id++;
                button.onclick = () => {
                    deleteById(button.id);
                };
                button.setAttribute("style", buttonStyle());
                let span = document.createElement("span");
                span.appendChild(innerText);
                span.appendChild(button);
                span.setAttribute(
                    "style",
                    "background-color:" + colorArray[i] + annotatedTestStyle
                );
                essay.childNodes[k].parentNode.replaceChild(
                    span,
                    essay.childNodes[k]
                );
            }
        }
    }
}
export { buttonStyle, annotate, deleteById, autoAnnotate };
