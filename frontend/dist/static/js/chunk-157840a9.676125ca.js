(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-157840a9"],{"0fac":function(t,e,n){"use strict";n("e2d2")},"4df4":function(t,e,n){"use strict";var r=n("0366"),a=n("7b0b"),o=n("9bdd"),i=n("e95a"),c=n("50c4"),s=n("8418"),l=n("35a1");t.exports=function(t){var e,n,u,d,f,p,y=a(t),h="function"==typeof this?this:Array,v=arguments.length,g=v>1?arguments[1]:void 0,b=void 0!==g,m=l(y),C=0;if(b&&(g=r(g,v>2?arguments[2]:void 0,2)),void 0==m||h==Array&&i(m))for(e=c(y.length),n=new h(e);e>C;C++)p=b?g(y[C],C):y[C],s(n,C,p);else for(d=m.call(y),f=d.next,n=new h;!(u=f.call(d)).done;C++)p=b?o(d,g,[u.value,C],!0):u.value,s(n,C,p);return n.length=C,n}},5545:function(t,e,n){},"840f":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.textArray.length?n("div",[t._m(0),n("div",{staticClass:"tags-container"},t._l(t.types,(function(e,r){return n("span",{key:r,staticClass:"text-tag",style:{backgroundColor:e.color}},[t._v(" "+t._s(e.text)+" ")])})),0),t._l(t.textArray,(function(e,r){return n("div",{key:r,staticClass:"entity-item-box"},[n("entity-item-box",{attrs:{tags:t.types,entities:t.annotationArray[t.currentPage*t.sentenceCount+r-t.sentenceCount]}})],1)})),n("div",{staticClass:"page"},[n("div",{staticClass:"block"},[n("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[1,2,3,4],"page-size":2,layout:"total, sizes, prev, pager, next, jumper",total:t.annotationArray.length},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"size-change":t.handleSizeChange}})],1)])],2):n("Empty")],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticStyle:{margin:"30px"}},[n("ul",[n("li",[t._v("字上面的标签表示标注值，下方为预测值")])])])])}],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"highlight-container highlight-container--bottom-labels"},t._l(t.chunks,(function(t,e){return n("entity-item",{key:e,attrs:{content:t.text,"standard-type":t.standardType,"predict-type":t.predictType,"standard-color":t.standardColor,"predict-color":t.predictColor}})})),1)},i=[],c=(n("a4d3"),n("e01a"),n("d3b7"),n("d28b"),n("3ca3"),n("ddb0"),n("dde1"));function s(t,e){var n="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=Object(c["a"])(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,s=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return i=t.done,t},e:function(t){s=!0,o=t},f:function(){try{i||null==n["return"]||n["return"]()}finally{if(s)throw o}}}}var l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("span",{staticClass:"highlight",staticStyle:{"border-color":"black"}},[n("span",{staticClass:"bottom"},[n("span",{staticClass:"highlight__standard",style:{backgroundColor:t.standardColor,color:"black"},attrs:{"data-label":t.standardType}}),n("span",{staticClass:"highlight__content"},[t._v(t._s(t.content)+" ")]),n("span",{staticClass:"highlight__label",style:{backgroundColor:t.predictColor,color:"black"},attrs:{"data-label":t.predictType}})])])])},u=[],d={props:{content:{type:String,default:"",required:!0},standardType:{type:String,default:""},standardColor:{type:String,default:"64FFDA"},predictColor:{type:String,default:"64FFDA"},predictType:{type:String,default:""}},data:function(){return{showMenu:!1}}},f=d,p=(n("e5c2"),n("0c7c")),y=Object(p["a"])(f,l,u,!1,null,"08f2a4f0",null),h=y.exports,v={components:{EntityItem:h},props:{tags:{type:Array,default:function(){return[]},required:!0},entities:{type:Array,default:function(){return[]},required:!0}},computed:{chunks:function(){var t,e=[],n=this.entities,r=s(n);try{for(r.s();!(t=r.n()).done;){var a=t.value;e.push({standardType:a.standard_label,predictType:a.predict_label,standardColor:this.pickColor(a.standard_type),predictColor:this.pickColor(a.predict_type),text:a.text})}}catch(o){r.e(o)}finally{r.f()}return e}},methods:{pickColor:function(t){var e,n=s(this.tags);try{for(n.s();!(e=n.n()).done;){var r=e.value;if(r.text&&r.text==t)return r.color}}catch(a){n.e(a)}finally{n.f()}return"#ffffff"}}},g=v,b=(n("a66e"),Object(p["a"])(g,o,i,!1,null,"9486463e",null)),m=b.exports,C=n("c453"),A={name:"Index",components:{EntityItemBox:m,Empty:C["a"]},data:function(){return{currentPage:1,annotationArray:[],types:[],sentenceCount:2}},computed:{textArray:function(){for(var t=this.currentPage,e=[],n=this.sentenceCount*t-this.sentenceCount;n<=this.sentenceCount*t-1;n++)this.annotationArray[n]&&e.push([]);return e}},created:function(){this.fetchData()},methods:{handleSizeChange:function(t){this.sentenceCount=t},fetchData:function(){for(var t=this.$store.state.errorAnalysis.entity_type,e=0;e<t.length;e++)this.types.push({text:t[e],color:this.$store.state.errorAnalysis.colorArray[e]});this.annotationArray=this.$store.state.errorAnalysis.sentences}}},_=A,x=(n("ec86"),Object(p["a"])(_,r,a,!1,null,"48e1f9fc",null));e["default"]=x.exports},"95e2":function(t,e,n){},a630:function(t,e,n){var r=n("23e7"),a=n("4df4"),o=n("1c7e"),i=!o((function(t){Array.from(t)}));r({target:"Array",stat:!0,forced:i},{from:a})},a66e:function(t,e,n){"use strict";n("f981")},b680:function(t,e,n){"use strict";function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}n.d(e,"a",(function(){return r}))},c453:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"empty-container"},[n("router-link",{attrs:{to:"/errorAnalysis/fileUpload"}},[n("span",{staticClass:"empty-text"},[t._v(" 点击上传文件 ")])])],1)},a=[],o={},i=o,c=(n("0fac"),n("0c7c")),s=Object(c["a"])(i,r,a,!1,null,"5ca4c832",null);e["a"]=s.exports},d28b:function(t,e,n){var r=n("746f");r("iterator")},dde1:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("fb6a"),n("d3b7"),n("b0c0"),n("a630"),n("3ca3");var r=n("b680");function a(t,e){if(t){if("string"===typeof t)return Object(r["a"])(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Object(r["a"])(t,e):void 0}}},e01a:function(t,e,n){"use strict";var r=n("23e7"),a=n("83ab"),o=n("da84"),i=n("5135"),c=n("861d"),s=n("9bf2").f,l=n("e893"),u=o.Symbol;if(a&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};l(f,u);var p=f.prototype=u.prototype;p.constructor=f;var y=p.toString,h="Symbol(test)"==String(u("test")),v=/^Symbol\((.*)\)[^)]+$/;s(p,"description",{configurable:!0,get:function(){var t=c(this)?this.valueOf():this,e=y.call(t);if(i(d,t))return"";var n=h?e.slice(7,-1):e.replace(v,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:f})}},e2d2:function(t,e,n){},e5c2:function(t,e,n){"use strict";n("5545")},ec86:function(t,e,n){"use strict";n("95e2")},f981:function(t,e,n){},fb6a:function(t,e,n){"use strict";var r=n("23e7"),a=n("861d"),o=n("e8b5"),i=n("23cb"),c=n("50c4"),s=n("fc6a"),l=n("8418"),u=n("b622"),d=n("1dde"),f=n("ae40"),p=d("slice"),y=f("slice",{ACCESSORS:!0,0:0,1:2}),h=u("species"),v=[].slice,g=Math.max;r({target:"Array",proto:!0,forced:!p||!y},{slice:function(t,e){var n,r,u,d=s(this),f=c(d.length),p=i(t,f),y=i(void 0===e?f:e,f);if(o(d)&&(n=d.constructor,"function"!=typeof n||n!==Array&&!o(n.prototype)?a(n)&&(n=n[h],null===n&&(n=void 0)):n=void 0,n===Array||void 0===n))return v.call(d,p,y);for(r=new(void 0===n?Array:n)(g(y-p,0)),u=0;p<y;p++,u++)p in d&&l(r,u,d[p]);return r.length=u,r}})}}]);