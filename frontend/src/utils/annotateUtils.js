import { annotateDataUpload } from "@/api/annotate";
import store from "@/store/index";
import annotate from "@/store/modules/annotate";
export default {
  /**
   *  按钮样式
   */
  buttonStyle() {
    return "cursor:pointer;margin-left:5px";
  },
  /**
   *
   * @description 返回标注文本样式
   * @param index 标注颜色索引
   */
  textStyle(index) {
    return `border:5px solid ${annotate.state.classification[index].color};background-color:${annotate.state.classification[index].color};border-radius: 10px;`;
  },
  /**
   *
   * @description 标注
   * @param id 给button标签的id，用于删除时查找
   * @param index 标注颜色索引
   */
  annotate(id, index) {
    let text = window.getSelection().toString();

    // 按钮样式
    // TODO：样式美化
    // 标注文本样式
    let annotatedTestStyle = this.textStyle(index);
    // 选中不为空
    if (text.length > 0) {
      // 获取起始索引和结束索引
      let essay = document.querySelector("#essay");
      const range = window.getSelection().getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(essay);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
      let start = [...preSelectionRange.toString()].length;
      let end = start + [...range.toString()].length;

      let annotateData = {
        label: id.split("-")[0],
        start_offset: start,
        end_offset: end,
        text: text, // 主要是为了删除标注，可以使用其他删除方法
        user: 1, // TODO 暂时设为1
        updated_at: new Date(),
      };

      store.dispatch("annotate/addToList", { id, annotateData });
      // 按钮添加事件
      let button = document.createElement("i");
      button.setAttribute("id", id);
      button.addEventListener("click", () => {
        this.deleteById(id);
      });

      button.setAttribute("class", "el-icon-close");
      button.setAttribute("style", this.buttonStyle());
      let span = document.createElement("span");
      span.setAttribute("style", annotatedTestStyle);

      let TextRange = window.getSelection().getRangeAt(0);
      TextRange.surroundContents(span);
      span.appendChild(button);
      //移除选中状态，否则很难看
      window.getSelection().removeAllRanges();
      store.state.annotate.id++;

      // 上传数据
      let data = JSON.stringify({
        id: annotate.state.essayId,
        text: annotate.state.annotateText,
        annotations: annotate.state.annotateData,
      });
      annotateDataUpload(data);
    }
  },

  /**
   *
   * @description 删除样式
   * @id ==> 按钮的id，用于查找
   */
  deleteById(id) {
    let essay = document.getElementById("essay");
    let span = document.getElementById(id).parentNode;
    // 获取文本，将其插入当前节点前，再删除节点
    let textNode = document.createTextNode(span.innerText.trim());
    let text = span.innerText.trim();
    essay.insertBefore(textNode, span);
    essay.removeChild(span);
    store.dispatch("annotate/deleteDataFromList", { type: id, text });
  },

  /**
   *
   * @description 机器学习自动化标注
   * @params data ==> 后台传来的数据，一维字符串数组
   */
  // TODO 获取每个字的起始索引
  // autoAnnotate(data) {
  //   let essay = document.getElementById("essay");
  //   let array = [];
  //   //把字符串分割
  //   for (let i = 0; i < data.length; i++) {
  //     if (data[i]) {
  //       array.push(...data[i].split(" "));
  //     }
  //     //把分割出来的字符串分别标注
  //     for (let j = 0; j < array.length; j++) {
  //       if (array[j].length !== 0) {
  //         annotate.state.annotateData[i].push(array[j]);
  //         essay.innerHTML = essay.innerHTML.replaceAll(
  //           array[j],
  //           `<span style='${this.textStyle(i)}'>${
  //             array[j]
  //           }<i class='deleteButtonTemp el-icon-close' style='${this.buttonStyle()}'></i> </span>`
  //         );

  //         let buttons = Array.from(
  //           document.getElementsByClassName("deleteButtonTemp")
  //         );
  //         //查找按钮并添加删除事件，这种方法很low，但是有效
  //         //如果你有更好的想法，欢迎修改
  //         //TODO：优化代码
  //         for (let k = 0; k < buttons.length; k++) {
  //           buttons[k].id = i + "-" + store.state.annotate.id++;
  //           buttons[k].onclick = () => {
  //             this.deleteById(buttons[k].id);
  //           };
  //         }
  //       }
  //     }
  //     array = [];
  //   }
  // },
};
