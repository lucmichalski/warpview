/*! Built with http://stenciljs.com */
warpview.loadBundle("qhgikg7k",["exports","./chunk-4b6cc261.js","./chunk-29c10030.js"],function(t,e,i){var n=window.warpview.h,s=function(){},r=function(){function t(){this.gtsFilter="",this._node={selected:!0,gts:s},this.LOG=new e.Logger(t)}return t.prototype.onGtsFilter=function(t,i){i!==t&&""!==this.gtsFilter&&this.setState(new RegExp(this.gtsFilter,"gi").test(e.GTSLib.serializeGtsMetadata(this._node.gts)))},t.prototype.handleKeyDown=function(t){"a"===t.key&&this.setState(!0),"n"===t.key&&this.setState(!1)},t.prototype.colorizeChip=function(){var t=this.el.getElementsByClassName("normal")[0];this._node.selected?(t.style.setProperty("background-color",e.ColorLib.transparentize(e.ColorLib.getColor(this._node.index),.7)),t.style.setProperty("border-color",e.ColorLib.getColor(this._node.index))):t.style.setProperty("background-color","#eeeeee")},t.prototype.componentWillLoad=function(){this._node=Object.assign({},this.node,{selected:!0})},t.prototype.componentDidLoad=function(){""!==this.gtsFilter&&new RegExp(this.gtsFilter,"gi").test(e.GTSLib.serializeGtsMetadata(this._node.gts))&&this.setState(!1),this.colorizeChip()},t.prototype.lastIndex=function(t,e){return t===this.toArray(e).length-1},t.prototype.toArray=function(t){return void 0===t?[]:Object.keys(t).map(function(e){return{name:e,value:t[e]}})},t.prototype.switchPlotState=function(t){return t.preventDefault(),this.setState(!this._node.selected),!1},t.prototype.setState=function(t){this._node=Object.assign({},this._node,{selected:t,label:e.GTSLib.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["switchPlotState"],this._node),this.colorizeChip(),this.warpViewSelectedGTS.emit(this._node)},t.prototype.render=function(){var t=this;return n("div",null,this._node&&this._node.gts&&this._node.gts.l?n("span",null,n("i",{class:"normal"}),n("span",{class:"gtsInfo",onClick:function(e){return t.switchPlotState(e)}},n("span",{class:"gts-classname"},"  ",this._node.gts.c),n("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.l).map(function(e,i){return n("span",null,n("span",{class:"gts-labelname"},e.name),n("span",{class:"gts-separator"},"="),n("span",{class:"gts-labelvalue"},e.value),n("span",{hidden:t.lastIndex(i,t._node.gts.l)},", "))}),n("span",{class:"gts-separator",innerHTML:" &rcub;"}),this.toArray(this._node.gts.a).length>0?n("span",null,n("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.a).map(function(e,i){return n("span",null,n("span",{class:"gts-attrname"},e.name),n("span",{class:"gts-separator"},"="),n("span",{class:"gts-attrvalue"},e.value),n("span",{hidden:t.lastIndex(i,t._node.gts.a)},", "))}),n("span",{class:"gts-separator",innerHTML:" &rcub;"})):"")):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-chip"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{el:{elementRef:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},index:{type:Number,attr:"index"},name:{type:String,attr:"name"},node:{type:"Any",attr:"node"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"document:keyup",method:"handleKeyDown"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *\n *    Copyright 2016  Cityzen Data\n *\n *    Licensed under the Apache License, Version 2.0 (the \"License\");\n *    you may not use this file except in compliance with the License.\n *    You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n *    Unless required by applicable law or agreed to in writing, software\n *    distributed under the License is distributed on an \"AS IS\" BASIS,\n *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *    See the License for the specific language governing permissions and\n *    limitations under the License.\n *\n */:host .normal{border-radius:50%;background-color:#bbb;display:inline-block;width:120px;height:12px;border:2px solid #454545;margin-top:auto;margin-bottom:auto;vertical-align:middle}"},enumerable:!0,configurable:!0}),t}(),o=function(){function t(){this.theme="light",this.gtsFilter="",this.options=new i.Param,this.hide=!1,this.gtsList={content:[]},this._options=new i.Param,this.LOG=new e.Logger(t),this._isFolded=!1}return t.prototype.onData=function(t,e){t!==e&&this.doRender()},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this._isFolded=!!this.options.foldGTSTree,this.doRender())},t.prototype.onGtsFilter=function(t,e){e!==t&&(this.LOG.debug(["gtsFilter"],t),this.doRender(),this._options.foldGTSTree&&!this._isFolded&&this.foldAll())},t.prototype.componentWillLoad=function(){this.LOG.debug(["componentWillLoad","data"],this.data),this.data&&this.doRender()},t.prototype.doRender=function(){this._options=e.ChartLib.mergeDeep(this._options,this.options);var t=e.GTSLib.getData(this.data).data;this.gtsList=e.GTSLib.gtsFromJSONList(t,""),this.LOG.debug(["doRender","gtsList"],[this.data,this._options.foldGTSTree,this._isFolded]),this._options.foldGTSTree&&!this._isFolded&&this.foldAll()},t.prototype.foldAll=function(){var t=this;this.el?(this.el.querySelector("#root").className="collapsed",this.hide=!0,this._isFolded=!0):window.setTimeout(function(){t.foldAll()},100)},t.prototype.toggleVisibility=function(t){var e=t.currentTarget.firstChild;"expanded"===e.className?(this._isFolded=!0,e.className="collapsed",this.hide=!0):(e.className="expanded",this._isFolded=!1,this.hide=!1)},t.prototype.render=function(){var t=this;return this.gtsList?n("div",null,n("div",{class:"stack-level",onClick:function(e){return t.toggleVisibility(e)}},n("span",{class:"expanded",id:"root"})," Stack"),n("warp-view-tree-view",{gtsList:this.gtsList,branch:!1,theme:this.theme,hidden:this.hide,gtsFilter:this.gtsFilter})):""},Object.defineProperty(t,"is",{get:function(){return"warp-view-gts-tree"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},hide:{state:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},theme:{type:String,attr:"theme"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *\n *    Copyright 2016  Cityzen Data\n *\n *    Licensed under the Apache License, Version 2.0 (the \"License\");\n *    you may not use this file except in compliance with the License.\n *    You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n *    Unless required by applicable law or agreed to in writing, software\n *    distributed under the License is distributed on an \"AS IS\" BASIS,\n *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *    See the License for the specific language governing permissions and\n *    limitations under the License.\n *\n */:host .stack-level{font-size:1em;padding-top:5px;cursor:pointer;color:var(--gts-stack-font-color,#000)}:host .stack-level+div{padding-left:25px}:host .expanded{padding:1px 10px;margin-right:5px;background:var(--gts-tree-expanded-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T82TMW7CQBBF/0g+QOpINEkVCmpaLoBm5COk5QYoaeAY3MDSei2LGu4QKakiBA1tCpTK8kS2sLVe2xSh8XSrnf9m/s4s4c6gO/UYGEBEXlT1bK396bFGIjIJguA7iqJLkVNbYOZXItoQ0QHAzBhz9CCFeAVgCeAjy7Jpmqa/NUBEEgDzktqGuOKKO47j+KsGhGH4lOf5HsDIg5ycyqVYVd+steuGheLAzM9EtPMgW1VdVGWJ6N0YU1gpozVGH+K+gy/uBHR1crXUqNzbQXXhduJ69sd7cxOZ+UFVH5Mk+exb+YGt8n9+5h8up1sReYC0WAAAAABJRU5ErkJggg==));background-position:center left;background-repeat:no-repeat}:host .collapsed{padding:1px 10px;margin-right:5px;background:var(--gts-tree-collapsed-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T6WTUW7CQAxEPQdozxYb9Qb94Aj9gQSoVCp6lMr21doDZFCQiFCU3YDY//d2PeOFPHnwJC+zAlVdA/jp+/6YmZ+1S0qCPxF5HUAAO3fvSpKS4ENEvm6gfUS0c5JiBma2Ibm/QiQPmbmdSqohquoA7GqSxRaapmkBjBkAeHP336t0UWBmHcnb+VcR4XcJpjDJLjPHkS4tleqZubmNiDHU6gumDQDYuvvh7hpV9V9EXgaA5Ka2jbMjmNk7yZOIfEfE8eFVfuSDLda4JDsD3FNdEckTC0YAAAAASUVORK5CYII=));background-repeat:no-repeat;background-position:center left}"},enumerable:!0,configurable:!0}),t}(),a=function(){function t(){}return Object.defineProperty(t,"is",{get:function(){return"warp-view-gts-tree"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},hide:{state:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},theme:{type:String,attr:"theme"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/**style-placeholder:warp-view-gts-tree:**/"},enumerable:!0,configurable:!0}),t}();a.item=-1;var l=function(){function t(){this.branch=!1,this.theme="light",this.hidden=!1,this.gtsFilter="",this.ref=!1,this.hide={}}return t.getIndex=function(t){return a.item++,t.index=a.item,a.item},t.prototype.componentWillLoad=function(){t.LOG.debug(["componentWillLoad"],a.item)},t.prototype.toggleVisibility=function(t,e){var i;"expanded"===(i=t.currentTarget.id?t.currentTarget:t.currentTarget.previousElementSibling).className?(i.className="collapsed",this.hide[e+""]=!0):(i.className="expanded",this.hide[e+""]=!1),this.ref=!this.ref},t.prototype.onGtsFilter=function(t,e){e!==t&&(this.ref=!this.ref)},t.prototype.isHidden=function(t){return!!this.hide.hasOwnProperty(t+"")&&this.hide[t+""]},t.prototype.render=function(){var i=this;return n("div",{class:"list"},this.gtsList&&this.gtsList.content?n("ul",null,this.gtsList.content.map(function(s,r){return n("li",{hidden:i.hidden},e.GTSLib.isGts(s.gts)?n("warp-view-chip",{node:s,index:t.getIndex(s),name:s.gts.c,gtsFilter:i.gtsFilter}):n("span",null,s.content?n("div",null,i.branch?n("div",null,n("span",{class:"expanded",onClick:function(t){return i.toggleVisibility(t,r)},id:e.ChartLib.guid()}),n("span",{onClick:function(t){return i.toggleVisibility(t,r)}},n("small",null,"List of ",s.content.length," item",s.content.length>1?"s":""))):n("div",{class:"stack-level"},n("span",{class:"expanded",onClick:function(t){return i.toggleVisibility(t,r)},id:e.ChartLib.guid()}),n("span",{onClick:function(t){return i.toggleVisibility(t,r)}},0===r?"[TOP]":"["+(r+1)+"]"," ",n("small",null,"List of ",s.content.length," item",s.content.length>1?"s":""))),n("warp-view-tree-view",{gtsList:s,branch:!0,hidden:i.isHidden(r),gtsFilter:i.gtsFilter})):""))})):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-tree-view"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{branch:{type:Boolean,attr:"branch"},el:{elementRef:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},gtsList:{type:"Any",attr:"gts-list"},hidden:{type:Boolean,attr:"hidden"},ref:{state:!0},theme:{type:String,attr:"theme"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *\n *    Copyright 2016  Cityzen Data\n *\n *    Licensed under the Apache License, Version 2.0 (the \"License\");\n *    you may not use this file except in compliance with the License.\n *    You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n *    Unless required by applicable law or agreed to in writing, software\n *    distributed under the License is distributed on an \"AS IS\" BASIS,\n *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *    See the License for the specific language governing permissions and\n *    limitations under the License.\n *\n */warp-view-tree-view ul{margin:0;padding:0;list-style:none;border:none;overflow:hidden}warp-view-tree-view li{color:var(--gts-stack-font-color,#000);position:relative;padding:0 0 0 20px;line-height:20px}warp-view-tree-view li .stack-level{font-size:1em;padding-top:5px}warp-view-tree-view li .stack-level+div{padding-left:25px}warp-view-tree-view li .expanded{padding:1px 10px;margin-right:5px;background:var(--gts-tree-expanded-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T82TMW7CQBBF/0g+QOpINEkVCmpaLoBm5COk5QYoaeAY3MDSei2LGu4QKakiBA1tCpTK8kS2sLVe2xSh8XSrnf9m/s4s4c6gO/UYGEBEXlT1bK396bFGIjIJguA7iqJLkVNbYOZXItoQ0QHAzBhz9CCFeAVgCeAjy7Jpmqa/NUBEEgDzktqGuOKKO47j+KsGhGH4lOf5HsDIg5ycyqVYVd+steuGheLAzM9EtPMgW1VdVGWJ6N0YU1gpozVGH+K+gy/uBHR1crXUqNzbQXXhduJ69sd7cxOZ+UFVH5Mk+exb+YGt8n9+5h8up1sReYC0WAAAAABJRU5ErkJggg==));background-position:center left;background-repeat:no-repeat}warp-view-tree-view li .collapsed{padding:1px 10px;margin-right:5px;background:var(--gts-tree-collapsed-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T6WTUW7CQAxEPQdozxYb9Qb94Aj9gQSoVCp6lMr21doDZFCQiFCU3YDY//d2PeOFPHnwJC+zAlVdA/jp+/6YmZ+1S0qCPxF5HUAAO3fvSpKS4ENEvm6gfUS0c5JiBma2Ibm/QiQPmbmdSqohquoA7GqSxRaapmkBjBkAeHP336t0UWBmHcnb+VcR4XcJpjDJLjPHkS4tleqZubmNiDHU6gumDQDYuvvh7hpV9V9EXgaA5Ka2jbMjmNk7yZOIfEfE8eFVfuSDLda4JDsD3FNdEckTC0YAAAAASUVORK5CYII=));background-repeat:no-repeat;background-position:center left}warp-view-tree-view li .gtsInfo{white-space:normal;word-wrap:break-word}warp-view-tree-view li .gtsInfo[disabled]{color:#aaa;cursor:not-allowed}warp-view-tree-view li .normal{border-radius:50%;background-color:#bbb;display:inline-block;width:12px;height:12px}warp-view-tree-view li i,warp-view-tree-view li span{cursor:pointer}warp-view-tree-view li .selected{background-color:#adf;font-weight:700;padding:1px 5px}warp-view-tree-view .gts-classname{color:var(--gts-classname-font-color,#0074d9)}warp-view-tree-view .gts-labelname{color:var(--gts-labelname-font-color,#19a979)}warp-view-tree-view .gts-attrname{color:var(--gts-labelname-font-color,#ed4a7b)}warp-view-tree-view .gts-separator{color:var(--gts-separator-font-color,#bbb)}warp-view-tree-view .gts-labelvalue{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}warp-view-tree-view .gts-attrvalue{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}"},enumerable:!0,configurable:!0}),t}();l.LOG=new e.Logger(l),t.WarpViewChip=r,t.WarpViewGtsTree=o,t.WarpViewTreeView=l,Object.defineProperty(t,"__esModule",{value:!0})});