(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0107d04d"],{"064c":function(t,e,n){},"06c5":function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("fb6a"),n("d3b7"),n("b0c0"),n("a630"),n("3ca3");var a=n("6b75");function o(t,e){if(t){if("string"===typeof t)return Object(a["a"])(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(a["a"])(t,e):void 0}}},"1fa7":function(t,e,n){},"4e3f":function(t,e,n){"use strict";n("1fa7")},"4fdd":function(t,e,n){"use strict";n("7a51")},"6b75":function(t,e,n){"use strict";function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}n.d(e,"a",(function(){return a}))},"74ac":function(t,e,n){"use strict";n("064c")},"7a51":function(t,e,n){},8205:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("TopNavigation"),n("Essay"),n("div",{staticClass:"footer"},[t._v(" Copyright © Syngou ")])],1)},o=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"topNavigation"},[n("span",{staticClass:"title"},[t._v("医疗文本标注平台")]),n("a",{on:{click:function(e){return t.$bus.$emit("autoAnnotate")}}},[t._v("自动化标注")]),n("a",{on:{click:t.uploadData}},[t._v("上传")]),n("a",{on:{click:t.saveTamporaryData}},[t._v("暂存数据")]),t.avatar?n("div",{staticClass:"right-menu"},[n("el-dropdown",{staticClass:"avatar-container",attrs:{trigger:"click"}},[n("div",{staticClass:"avatar-wrapper"},[n("img",{staticClass:"user-avatar",attrs:{src:t.avatar+"?imageView2/1/w/80/h/80",alt:"用户头像"}})]),n("el-dropdown-menu",{staticClass:"user-dropdown",attrs:{slot:"dropdown"},slot:"dropdown"},[n("router-link",{attrs:{to:"/"}},[n("el-dropdown-item",[t._v(" 主控台 ")])],1),n("router-link",{attrs:{to:"/text/setting"}},[n("el-dropdown-item",[t._v(" 标注设置 ")])],1),n("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(e){return t.logout(e)}}},[n("span",{staticStyle:{display:"block"}},[t._v("注销")])])],1)],1)],1):n("router-link",{staticStyle:{float:"right"},attrs:{to:"/login"}},[t._v(" 登录 ")]),n("AutoAnnotate")],1)},r=[],i=n("1da1"),l=n("5530"),c=(n("96cf"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-dialog",{attrs:{visible:t.annotateModal,title:"自动化标注","modal-append-to-body":!1,width:t.width},on:{"update:visible":function(e){t.annotateModal=e}}},[n("el-collapse",[n("el-collapse-item",{attrs:{title:"说明"}},[n("div",[t._v(" 一键标注全文，用于机器学习自动标注，后台传来要标注的词，前台进行标注，人工检查是否正确 ")]),n("hr"),n("div",[t._v(" 如果每种类型有多个值，请用"),n("span",{staticStyle:{color:"red","font-size":"20px"}},[t._v(" 一个 ")]),t._v(" 空格隔开"),n("br"),n("hr"),n("span",{staticStyle:{color:"red","font-size":"20px"}},[t._v(" 需在最开始时使用（即还未进行标注时），否则会有奇怪的结果 ")]),n("hr"),n("span",[t._v("因为只用于自动化标注，所以部署时此选项不可见")])])])],1),t._l(t.typesInfo,(function(e,a){return n("div",{key:a},[n("el-input",{model:{value:t.inputValues[a],callback:function(e){t.$set(t.inputValues,a,e)},expression:"inputValues[index]"}},[n("span",{attrs:{slot:"prepend"},slot:"prepend"},[n("el-button",[t._v(" "+t._s(e.value)+" ")])],1)])],1)})),n("span",{staticStyle:{display:"flex","justify-content":"center","align-items":"center"},attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary"},on:{click:t.autoAnnotate}},[t._v("确定")])],1)],2)],1)}),u=[],d=n("6b75");function p(t){if(Array.isArray(t))return Object(d["a"])(t)}n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("a630");function f(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}var v=n("06c5");function h(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function m(t){return p(t)||f(t)||Object(v["a"])(t)||h()}n("99af"),n("25f0"),n("498a"),n("1276"),n("ac1f");var g=n("4360"),y=n("dd44"),b={buttonStyle:function(){return"cursor:pointer;margin-left:5px"},textStyle:function(t){return"border:5px solid ".concat(y["a"].state.typesInfo[t].color,";background-color:").concat(y["a"].state.typesInfo[t].color,";border-radius: 10px;")},annotate:function(t,e){var n=this,a=window.getSelection().toString();g["a"].dispatch("annotate/addToList",{id:t,text:a});var o=this.textStyle(e);if(a.length>0){var s=document.createElement("i");s.setAttribute("id",t),s.addEventListener("click",(function(){n.deleteById(t)})),s.setAttribute("class","el-icon-close"),s.setAttribute("style",this.buttonStyle());var r=document.createElement("span");r.setAttribute("style",o);var i=window.getSelection().getRangeAt(0);i.surroundContents(r),r.appendChild(s),window.getSelection().removeAllRanges(),g["a"].state.annotate.id++}},deleteById:function(t){var e=document.getElementById("essay"),n=document.getElementById(t).parentNode,a=document.createTextNode(n.innerText.trim()),o=n.innerText.trim();e.insertBefore(a,n),e.removeChild(n),g["a"].dispatch("annotate/deleteDataFromList",{type:t,text:o})},autoAnnotate:function(t){for(var e=this,n=document.getElementById("essay"),a=[],o=0;o<t.length;o++){var s;if(t[o])(s=a).push.apply(s,m(t[o].split(" ")));for(var r=0;r<a.length;r++)0!==a[r].length&&function(){y["a"].state.annotateData[o].push(a[r]),n.innerHTML=n.innerHTML.replaceAll(a[r],"<span style='".concat(e.textStyle(o),"'>").concat(a[r],"<i class='deleteButtonTemp el-icon-close' style='").concat(e.buttonStyle(),"'></i> </span>"));for(var t=Array.from(document.getElementsByClassName("deleteButtonTemp")),s=function(n){t[n].id=o+"-"+g["a"].state.annotate.id++,t[n].onclick=function(){e.deleteById(t[n].id)}},i=0;i<t.length;i++)s(i)}();a=[]}}},w=n("2f62"),_={name:"AutoAnnotate",data:function(){return{annotateModal:!1,inputValues:[],width:""}},computed:Object(l["a"])({},Object(w["b"])(["typesInfo"])),created:function(){var t=this;this.$bus.$on("autoAnnotate",(function(){t.annotateModal=!0}))},mounted:function(){var t=window.innerWidth;this.width=t<=450?"80%":"30%"},methods:{autoAnnotate:function(){this.annotateModal=!1,b.autoAnnotate(this.inputValues),this.inputValues=[]}}},C=_,x=n("2877"),T=Object(x["a"])(C,c,u,!1,null,"edd3f382",null),k=T.exports,S=n("bc3a"),A=n.n(S),j=n("5c96"),O=A.a.create({baseURL:"http://localhost:8000",timeout:5e3});O.interceptors.response.use((function(t){var e=t.data;return 2e4!==e.code?(Object(j["Message"])({type:"error",showClose:!0,message:e.message||"Error",duration:3e3}),Promise.reject(new Error(e.message||"请求发生错误"))):e}),(function(t){return Object(j["Message"])({message:"网络请求发生错误，请检查您的网络状态或联系管理员",showClose:!0,type:"error",duration:3e3}),Promise.reject(t)}));var $=O,E={postToBackend:function(t){return $({url:"upload/",method:"POST",data:t})},translate:function(t){return $({url:"translate/?text=".concat(t),method:"get"})}},D={name:"TopNavigation",components:{AutoAnnotate:k},computed:Object(l["a"])({},Object(w["b"])(["avatar","annotateData","typesInfo"])),methods:{logout:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("user/logout");case 2:case"end":return e.stop()}}),e)})))()},uploadData:function(){for(var t=this,e={},n=0;n<this.annotateData.length;n++)e[this.typesInfo[n].value]=this.annotateData[n];E.postToBackend(e).then((function(){t.$message.success("上传成功"),t.drawer=!1}))},saveTamporaryData:function(){}}},I=D,B=(n("4e3f"),Object(x["a"])(I,s,r,!1,null,"67afdcb8",null)),P=B.exports,R=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"paper"}},[n("link",{attrs:{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css",integrity:"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u",crossorigin:"anonymous"}}),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showDialog,expression:"showDialog"}],ref:"showDialog",staticClass:"optionDialog"},[t._l(t.typesInfo,(function(e,a){return n("button",{key:a,style:{backgroundColor:e.color},on:{click:function(e){return t.annotateText(a+"-"+t.$store.state.annotate.id,a)}}},[t._v(" "+t._s(e.value)+" ")])})),n("button",{on:{click:t.translateText}},[t._v(" 翻译 ")])],2),n("div",{directives:[{name:"show",rawName:"v-show",value:t.showTranslateCard,expression:"showTranslateCard"}],ref:"translateCard",staticClass:"translate-card"},[n("i",{staticClass:"el-message__closeBtn el-icon-close delete-button",on:{click:function(e){t.showTranslateCard=!1}}}),n("TranslateCard",{attrs:{result:t.translateResult}})],1),n("div",{staticClass:"container"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-2"},[n("div",{staticClass:"panel panel-default"},[t._m(0),n("div",{staticClass:"panel-body"},[n("div",{staticClass:"side"},[t._l(t.typesInfo,(function(e,a){return n("button",{key:a,style:{backgroundColor:e.color},on:{click:function(e){return t.annotateText(a+"-"+t.$store.state.annotate.id,a)}}},[t._v(" "+t._s(e.value)+" ")])})),n("br"),n("br"),n("router-link",{attrs:{to:"/text/setting"}},[t._v(" 添加新分类 ")])],2)])])]),n("div",{staticClass:"col-md-10"},[n("div",{staticClass:"panel panel-default"},[t._m(1),n("div",{staticClass:"panel-body"},[n("pre",{staticClass:"essay-content",style:"font-size:"+t.$store.state.annotate.fontSize+"px",attrs:{id:"essay"},domProps:{textContent:t._s(t.$store.state.annotate.annotateText)},on:{mouseup:function(e){return t.getSelection(e)}}})])])])])])])},M=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel-heading"},[n("div",{staticClass:"head"},[t._v(" 现有标签 ")]),n("hr"),n("div",{staticClass:"tip"},[t._v(" (选中文本后单击任一标签即可标注) ")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel-heading"},[n("div",{staticClass:"head"},[t._v(" 文章如下 ")])])}],N=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-card",{attrs:{shadow:"hover"}},[n("ul",[n("li",[t._v(t._s(t.result.code))]),n("li",[t._v(t._s(t.result.data))])])])],1)},V=[],L={name:"TranslateCard",props:{result:{type:Object,default:function(){return{}}}}},z=L,H=Object(x["a"])(z,N,V,!1,null,"36674309",null),J=H.exports,U={name:"Essays",components:{TranslateCard:J},data:function(){return{showDialog:!1,selectText:"",showTranslateCard:!1,translateResult:{}}},computed:Object(l["a"])({},Object(w["b"])(["typesInfo"])),methods:{setBoxPosition:function(t,e){this.$refs.showDialog.style.left=t-100+"px",this.$refs.showDialog.style.top=e+20+"px",this.$refs.translateCard.style.left=t+10+"px",this.$refs.translateCard.style.top=e+10+"px"},getSelection:function(t){""!==window.getSelection().toString()?(this.selectText=window.getSelection().toString(),this.setBoxPosition(t.clientX,t.clientY+document.documentElement.scrollTop),this.$refs.showDialog.style.display="block",this.showDialog=!0):this.showDialog=!1},annotateText:function(t,e){this.showDialog=!1,b.annotate(t,e)},translateText:function(){var t=this;this.showDialog=!1;var e=window.getSelection().toString();E.translate(e).then((function(e){t.translateResult=e,t.showTranslateCard=!0}))}}},Y=U,F=(n("74ac"),Object(x["a"])(Y,R,M,!1,null,"3728d511",null)),K=F.exports,W={name:"Home",components:{TopNavigation:P,Essay:K},mounted:function(){this.isPC()},methods:{isPC:function(){for(var t=["Android","iPhone","Windows Phone","iPad","iPod"],e=navigator.userAgent,n=0;n<t.length;n++)if(e.indexOf(t[n])>0){this.$message.warning({message:"手机是无法进行标注的哦,请使用电脑浏览器。",duration:5e3,showClose:!0});break}}}},G=W,X=(n("4fdd"),Object(x["a"])(G,a,o,!1,null,"2c8cfee2",null));e["default"]=X.exports}}]);