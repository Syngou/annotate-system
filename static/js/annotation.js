/*
 * @Author: Syngou
 * @Date: 2020-11-28 00:11:36
 * @LastEditTime: 2020-11-30 19:28:43
 * @Description:
 * @LastEditor:
 */

/* -------------------------------------------------------------------------- */
/*                                    改变颜色                                    */
/* -------------------------------------------------------------------------- */

function changeColor(obj, target) {
    var txtColor = document.getElementById(target);
    txtColor.style.color = obj.value;
}

/* -------------------------------------------------------------------------- */
/*                                 判断是否是电脑浏览器                                 */
/* -------------------------------------------------------------------------- */

function IsPC() {
    let userAgentInfo = navigator.userAgent;
    let Agents = ["Android", "iPhone", "Windows Phone", "iPad", "iPod"];
    for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            alert(
                "你的浏览器似乎不是桌面版的\n为了获得更好的体验，请用桌面版浏览器"
            );
            break;
        }
    }
}

let index = 0;
let name = 1,
    relations = 1,
    medicine = 1,
    tools = 1;

/* -------------------------------------------------------------------------- */
/*                                    标注功能                                    */
/* -------------------------------------------------------------------------- */

function annotation() {
    let pNodes = document.getElementById("article").getElementsByTagName("p");
    console.log(pNodes);

    let pTextArr = [];
    for (let i = 0; i < pNodes.length; i++) {
        pTextArr.push(pNodes[i].innerHTML);
    }

    let text = window.getSelection().toString();
    if (text.length > 0) {
        for (let i = 0; i < pNodes.length; i++) {
            let pNode = pNodes[i]; //段落节点
            let pText = pTextArr[i]; //每一段的文字
            let values = pText.split(text);
            let colorArray = ["bg-red", "bg-green", "bg-aqua", "bg-yellow"];

            let pNodeText = values.join(
                "<span class=" + colorArray[index] + ">" + text + "</span>"
            );

            pNode.innerHTML = pNodeText;
        }

        console.log("name->", name, "index->", index);

        /* -------------------------------------------------------------------------- */
        /*                                    标签的值加一                                    */
        /* -------------------------------------------------------------------------- */

        switch (index) {
            case 0: {
                document.getElementById("name").innerHTML = name;
                console.log(document.getElementById("name"));
                document.getElementById("float-right-name").innerHTML = name;
                name += 1;
                break;
            }
            case 1: {
                document.getElementById("relations").innerHTML = relations;
                console.log(document.getElementById("relations"));
                document.getElementById(
                    "float-right-relations"
                ).innerHTML = relations;
                relations += 1;
                break;
            }
            case 2: {
                document.getElementById("medicine").innerHTML = medicine;
                console.log(document.getElementById("medicine"));
                document.getElementById(
                    "float-right-medicine"
                ).innerHTML = medicine;
                medicine += 1;
                break;
            }
            case 3: {
                document.getElementById("tools").innerHTML = tools;
                document.getElementById("float-right-tools").innerHTML = tools;
                console.log(document.getElementById("tools"));
                tools += 1;
                break;
            }
        }
        index += 1;
        if (index == 4) {
            index = 0;
        }
    }
}
