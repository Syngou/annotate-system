(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25202890"],{"09b7":function(t,e,a){"use strict";a("7362")},"2f84":function(t,e,a){},"354c":function(t,e,a){"use strict";a("c8e3")},5475:function(t,e,a){},5665:function(t,e,a){},"5fd6":function(t,e,a){"use strict";a("5665")},6645:function(t,e,a){"use strict";a("2f84")},7362:function(t,e,a){},8205:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("TopNavigation"),a("Essay"),a("div",{staticClass:"footer"},[t._v(" Copyright © Syngou ")])],1)},s=[],o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"topNavigation"},[a("span",{staticClass:"title"},[t._v("医疗文本标注和处理系统")]),a("a",{on:{click:t.exportData}},[t._v("导出数据")]),a("a",{on:{click:t.saveTamporaryData}},[t._v("暂存数据")]),t.avatar?a("div",{staticClass:"right-menu"},[a("el-dropdown",{staticClass:"avatar-container",attrs:{trigger:"click"}},[a("div",{staticClass:"avatar-wrapper"},[a("img",{staticClass:"user-avatar",attrs:{src:t.avatar,alt:"用户头像"}})]),a("el-dropdown-menu",{staticClass:"user-dropdown",attrs:{slot:"dropdown"},slot:"dropdown"},[a("router-link",{attrs:{to:"/"}},[a("el-dropdown-item",[t._v(" 主控台 ")])],1),a("router-link",{attrs:{to:"/annotateSetting"}},[a("el-dropdown-item",[t._v(" 标注设置 ")])],1),a("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(e){return t.logout(e)}}},[a("span",{staticStyle:{display:"block"}},[t._v("注销")])])],1)],1)],1):a("router-link",{staticStyle:{float:"right"},attrs:{to:"/login"}},[t._v(" 登录 ")]),a("output-options",{ref:"outputOptions"})],1)},i=[],r=a("1da1"),l=a("5530"),c=(a("96cf"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"输出格式",width:"fit-content",visible:t.dialogVisible,modal:!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),a("div",{staticClass:"btn-group"},[a("el-button",{attrs:{type:"primary"},on:{click:t.outputFile}},[t._v(" 确定 ")]),a("el-button",{attrs:{type:"danger"},on:{click:function(e){t.dialogVisible=!1}}},[t._v(" 取消 ")])],1)],1)],1)}),u=[],d=(a("2b3d"),a("d3b7"),a("3ca3"),a("ddb0"),a("99af"),a("2f62")),f={data:function(){return{dialogVisible:!0,options:[{value:"jsonl",label:"jsonl"},{value:"json",label:"json"},{value:"txt",label:"txt"}],value:"jsonl"}},computed:Object(l["a"])({},Object(d["b"])(["annotateData"])),methods:{outputFile:function(){var t=window.URL.createObjectURL(new Blob([JSON.stringify({id:this.$store.state.annotate.essayId,text:this.$store.state.annotate.annotateText,annotations:this.annotateData})])),e=document.createElement("a");e.href=t,e.setAttribute("download","file".concat(this.$store.state.annotate.essayId,".").concat(this.value)),document.body.appendChild(e),e.click()}}},p=f,v=(a("5fd6"),a("2877")),h=Object(v["a"])(p,c,u,!1,null,"8c041cb8",null),g=h.exports,m={name:"TopNavigation",components:{OutputOptions:g},computed:Object(l["a"])({},Object(d["b"])(["avatar","classification"])),methods:{logout:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("user/logout");case 2:case"end":return e.stop()}}),e)})))()},exportData:function(){this.$refs.outputOptions.dialogVisible=!0},saveTamporaryData:function(){this.$message.info("待开发")}}},b=m,w=(a("a9be"),Object(v["a"])(b,o,i,!1,null,"0aeea33c",null)),C=w.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"paper"}},[a("link",{attrs:{rel:"stylesheet",href:"https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css",integrity:"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u",crossorigin:"anonymous"}}),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showDialog,expression:"showDialog"}],ref:"showDialog",staticClass:"optionDialog"},[t._l(t.classification,(function(e,n){return a("button",{key:n,style:{backgroundColor:e.color},on:{click:function(e){return t.annotateText(n+"-"+t.$store.state.annotate.id,n)}}},[t._v(" "+t._s(e.value)+"("+t._s(e.shortcut)+") ")])})),a("button",{on:{click:t.translateText}},[t._v(" 翻译 ")])],2),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showTranslateCard,expression:"showTranslateCard"}],ref:"translateCard",staticClass:"translate-card"},[a("i",{staticClass:"el-message__closeBtn el-icon-close delete-button",on:{click:function(e){t.showTranslateCard=!1}}}),a("TranslateCard",{attrs:{data:t.translateResult}})],1),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-2"},[a("div",{staticClass:"panel panel-default"},[t._m(0),a("div",{staticClass:"panel-body"},[a("div",{staticClass:"side"},[t._l(t.classification,(function(e,n){return a("button",{key:n,style:{backgroundColor:e.color},on:{click:function(e){return t.annotateText(n+"-"+t.$store.state.annotate.id,n)}}},[t._v(" "+t._s(e.value)+"("+t._s(e.shortcut)+") ")])})),a("br"),a("br"),a("router-link",{attrs:{to:"/AnnotateSetting"}},[t._v(" 添加新分类 ")])],2)])])]),a("div",{staticClass:"col-md-10"},[a("div",{staticClass:"panel panel-default"},[t._m(1),a("div",{staticClass:"panel-body"},[a("pre",{staticClass:"essay-content",style:"font-size:"+t.$store.state.annotate.fontSize+"px",attrs:{id:"essay"},domProps:{textContent:t._s(t.$store.state.annotate.annotateText)},on:{mouseup:function(e){return t.getSelection(e)}}})])])])])])])},_=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-heading"},[a("div",{staticClass:"head"},[t._v(" 现有标签 ")]),a("hr"),a("div",{staticClass:"tip"},[t._v(" (选中文本后单击任一标签即可标注) ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"panel-heading"},[a("div",{staticClass:"head"},[t._v(" 文章如下 ")])])}],x=(a("25f0"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card"},[t._v(" "+t._s(t.data.result)+" ")])}),k=[],S={name:"TranslateCard",props:{data:{type:Object,default:function(){return{}}}}},T=S,O=(a("354c"),Object(v["a"])(T,x,k,!1,null,"4ca5c4ef",null)),$=O.exports,j=a("2909"),D=(a("1276"),a("ac1f"),a("498a"),a("4360"));function E(){return"cursor:pointer;margin-left:5px"}function A(t){return"border:5px solid ".concat(D["a"].state.annotate.classification[t].color,";\n          background-color:").concat(D["a"].state.annotate.classification[t].color,";\n          border-radius: 10px;")}function R(t,e){var a=window.getSelection().toString(),n=A(e);if(a.length>0){var s=document.querySelector("#essay"),o=window.getSelection().getRangeAt(0),i=o.cloneRange();i.selectNodeContents(s),i.setEnd(o.startContainer,o.startOffset);var r=Object(j["a"])(i.toString()).length,l=r+Object(j["a"])(o.toString()).length,c={id:t.split("-")[1],label:t.split("-")[0],start_offset:r,end_offset:l,text:a,user:1,updated_at:new Date};D["a"].dispatch("annotate/addToList",{id:t,annotateData:c});var u=document.createElement("i");u.setAttribute("id",t),u.addEventListener("click",(function(){B(t)})),u.setAttribute("class","el-icon-close"),u.setAttribute("style",E());var d=document.createElement("span");d.setAttribute("style",n);var f=window.getSelection().getRangeAt(0);f.surroundContents(d),d.appendChild(u),window.getSelection().removeAllRanges(),D["a"].state.annotate.id++}}function B(t){var e=document.getElementById("essay"),a=document.getElementById(t).parentNode,n=document.createTextNode(a.innerText.trim()),s=a.innerText.trim();e.insertBefore(n,a),e.removeChild(a),D["a"].dispatch("annotate/deleteDataFromList",{type:t,text:s})}var N=a("b775");function P(t){return Object(N["a"])({url:"user/translate/?text=".concat(t),method:"get"})}var V={name:"Essays",components:{TranslateCard:$},data:function(){return{showDialog:!1,selectText:"",showTranslateCard:!1,translateResult:{}}},computed:Object(l["a"])({},Object(d["b"])(["classification"])),created:function(){this.annotateByShortcut()},methods:{setBoxPosition:function(t,e){this.$refs.showDialog.style.left=t-100+"px",this.$refs.showDialog.style.top=e+20+"px",this.$refs.translateCard.style.left=t+10+"px",this.$refs.translateCard.style.top=e+10+"px"},getSelection:function(t){""!==window.getSelection().toString()?(this.selectText=window.getSelection().toString(),this.setBoxPosition(t.pageX,t.pageY),this.$refs.showDialog.style.display="block",this.showDialog=!0):this.showDialog=!1},annotateText:function(t,e){this.showDialog=!1,R(t,e)},annotateByShortcut:function(){var t=this;document.onkeydown=function(e){var a=e.key,n=t.$store.state.annotate.id;t.showDialog=!1;for(var s=0;s<t.$store.state.annotate.classification.length;s++)if(a===t.$store.state.annotate.classification[s].shortcut){R(s+"-"+n,s);break}}},translateText:function(){var t=this;this.showDialog=!1;var e=window.getSelection().toString();P(e).then((function(e){t.translateResult=e.data,t.showTranslateCard=!0}))}}},I=V,L=(a("09b7"),Object(v["a"])(I,y,_,!1,null,"d2459c64",null)),F=L.exports,J={name:"Annotate",components:{TopNavigation:C,Essay:F},mounted:function(){this.isPC()},methods:{isPC:function(){for(var t=["Android","iPhone","Windows Phone","iPad","iPod"],e=navigator.userAgent,a=0;a<t.length;a++)if(e.indexOf(t[a])>0){this.$message.warning({message:"手机是无法进行标注的哦,请使用电脑浏览器。",duration:5e3,showClose:!0});break}}}},z=J,U=(a("6645"),Object(v["a"])(z,n,s,!1,null,"4b4d1c0a",null));e["default"]=U.exports},a9be:function(t,e,a){"use strict";a("5475")},c8e3:function(t,e,a){}}]);