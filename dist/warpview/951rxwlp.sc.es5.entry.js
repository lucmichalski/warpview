warpview.loadBundle("951rxwlp",["exports","./chunk-75c5f765.js","./chunk-b86fec15.js"],function(t,e,i){var s=window.warpview.h,n=function(){function t(){this.gtsFilter="",this.options=new i.Param,this.hiddenData=[],this.debug=!1,this.kbdLastKeyPressed=[],this.hide=!1,this.gtsList=[],this._options=new i.Param}return t.prototype.onData=function(t,e){i.deepEqual(t,e)||(this.LOG.debug(["options"],t,e),this.doRender())},t.prototype.onOptions=function(t,e){i.deepEqual(t,e)||(this.LOG.debug(["options"],t,e),this.doRender(),this._options.foldGTSTree&&!this.hide&&this.foldAll())},t.prototype.onGtsFilter=function(t,e){e!==t&&(this.LOG.debug(["gtsFilter"],t),this.doRender())},t.prototype.onHideData=function(t,e){i.deepEqual(t,e)||(this.LOG.debug(["hiddenData"],t),this.doRender())},t.prototype.componentWillLoad=function(){this.LOG=new e.Logger(t,this.debug)},t.prototype.componentDidLoad=function(){this.LOG.debug(["componentDidLoad","data"],this.data),this.data&&this.doRender(),void 0!==this._options.foldGTSTree&&this._options.foldGTSTree&&!this.hide&&this.foldAll()},t.prototype.doRender=function(){if(this.LOG.debug(["doRender","gtsList"],this.data),this._options=i.ChartLib.mergeDeep(this._options,this.options),this.data){var t=e.GTSLib.getData(this.data).data;this.LOG.debug(["doRender","gtsList","dataList"],t),t&&(this.gtsList=e.GTSLib.flattenGtsIdArray(t,0).res,this.LOG.debug(["doRender","gtsList"],this.gtsList,this._options.foldGTSTree,this.hide))}},t.prototype.foldAll=function(){var t=this;this.root?this.hide=!0:window.setTimeout(function(){t.foldAll()},100)},t.prototype.toggleVisibility=function(){this.hide=!this.hide},t.prototype.render=function(){var t=this;return this.gtsList?s("div",null,s("div",{class:"stack-level",onClick:function(){return t.toggleVisibility()}},s("span",{class:{expanded:!this.hide,collapsed:this.hide},ref:function(e){return t.root=e}})," Stack"),s("warp-view-tree-view",{gtsList:this.gtsList,branch:!1,hidden:this.hide,debug:this.debug,hiddenData:this.hiddenData,gtsFilter:this.gtsFilter,kbdLastKeyPressed:this.kbdLastKeyPressed})):""},Object.defineProperty(t,"is",{get:function(){return"warp-view-gts-tree"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},debug:{type:Boolean,attr:"debug"},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},hide:{state:!0},kbdLastKeyPressed:{type:"Any",attr:"kbd-last-key-pressed"},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host .stack-level{font-size:1em;padding-top:5px;cursor:pointer;color:var(--gts-stack-font-color,#000)}:host .stack-level+div{padding-left:25px}:host .expanded{background-image:var(--gts-tree-expanded-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T82TMW7CQBBF/0g+QOpINEkVCmpaLoBm5COk5QYoaeAY3MDSei2LGu4QKakiBA1tCpTK8kS2sLVe2xSh8XSrnf9m/s4s4c6gO/UYGEBEXlT1bK396bFGIjIJguA7iqJLkVNbYOZXItoQ0QHAzBhz9CCFeAVgCeAjy7Jpmqa/NUBEEgDzktqGuOKKO47j+KsGhGH4lOf5HsDIg5ycyqVYVd+steuGheLAzM9EtPMgW1VdVGWJ6N0YU1gpozVGH+K+gy/uBHR1crXUqNzbQXXhduJ69sd7cxOZ+UFVH5Mk+exb+YGt8n9+5h8up1sReYC0WAAAAABJRU5ErkJggg==))}:host .collapsed,:host .expanded{padding:1px 10px;margin-right:5px;background-position:0;background-repeat:no-repeat}:host .collapsed{background-image:var(--gts-tree-collapsed-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T6WTUW7CQAxEPQdozxYb9Qb94Aj9gQSoVCp6lMr21doDZFCQiFCU3YDY//d2PeOFPHnwJC+zAlVdA/jp+/6YmZ+1S0qCPxF5HUAAO3fvSpKS4ENEvm6gfUS0c5JiBma2Ibm/QiQPmbmdSqohquoA7GqSxRaapmkBjBkAeHP336t0UWBmHcnb+VcR4XcJpjDJLjPHkS4tleqZubmNiDHU6gumDQDYuvvh7hpV9V9EXgaA5Ka2jbMjmNk7yZOIfEfE8eFVfuSDLda4JDsD3FNdEckTC0YAAAAASUVORK5CYII=))}"},enumerable:!0,configurable:!0}),t}(),r=function(){function t(){this.branch=!1,this.hidden=!1,this.gtsFilter="",this.hiddenData=[],this.debug=!1,this.kbdLastKeyPressed=[],this.ref=0,this.hide={}}return t.prototype.toggleVisibility=function(t,e){var i;"expanded"===(i=t.currentTarget.id?t.currentTarget:t.currentTarget.previousElementSibling).className?(i.className="collapsed",this.hide[e+""]=!0):(i.className="expanded",this.hide[e+""]=!1),this.ref++},t.prototype.onGtsFilter=function(t,e){e!==t&&this.ref++},t.prototype.onHideData=function(t,e){this.LOG.debug(["hiddenData"],t),this.ref++},t.prototype.isHidden=function(t){return!!this.hide.hasOwnProperty(t+"")&&this.hide[t+""]},t.prototype.componentWillLoad=function(){this.LOG=new e.Logger(t,this.debug)},t.prototype.render=function(){var t=this;return s("div",{class:"list"},this.gtsList?s("ul",null,this.gtsList.map(function(n,r){return s("li",{hidden:t.hidden},e.GTSLib.isGts(n)?s("warp-view-chip",{node:{gts:n},name:n.c,gtsFilter:t.gtsFilter,debug:t.debug,hiddenData:t.hiddenData,kbdLastKeyPressed:t.kbdLastKeyPressed}):s("span",null,n?s("div",null,t.branch?s("div",null,s("span",{class:"expanded",onClick:function(e){return t.toggleVisibility(e,r)},id:i.ChartLib.guid()}),s("span",{onClick:function(e){return t.toggleVisibility(e,r)}},s("small",null,"List of ",n.length," item",n.length>1?"s":""))):s("div",{class:"stack-level"},s("span",{class:"expanded",onClick:function(e){return t.toggleVisibility(e,r)},id:i.ChartLib.guid()}),s("span",{onClick:function(e){return t.toggleVisibility(e,r)}},0===r?"[TOP]":"["+(r+1)+"]"," ",s("small",null,"List of ",n.length," item",n.length>1?"s":""))),s("warp-view-tree-view",{gtsList:n,branch:!0,hidden:t.isHidden(r),debug:t.debug,gtsFilter:t.gtsFilter,kbdLastKeyPressed:t.kbdLastKeyPressed})):""))})):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-tree-view"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{branch:{type:Boolean,attr:"branch"},debug:{type:Boolean,attr:"debug"},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},gtsList:{type:"Any",attr:"gts-list"},hidden:{type:Boolean,attr:"hidden"},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},kbdLastKeyPressed:{type:"Any",attr:"kbd-last-key-pressed"},ref:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */warp-view-tree-view ul{margin:0;padding:0;list-style:none;border:none;overflow:hidden}warp-view-tree-view li{color:var(--gts-stack-font-color,#000);position:relative;padding:0 0 0 20px;line-height:20px}warp-view-tree-view li .stack-level{font-size:1em;padding-top:5px}warp-view-tree-view li .stack-level+div{padding-left:25px}warp-view-tree-view li .expanded{background-image:var(--gts-tree-expanded-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T82TMW7CQBBF/0g+QOpINEkVCmpaLoBm5COk5QYoaeAY3MDSei2LGu4QKakiBA1tCpTK8kS2sLVe2xSh8XSrnf9m/s4s4c6gO/UYGEBEXlT1bK396bFGIjIJguA7iqJLkVNbYOZXItoQ0QHAzBhz9CCFeAVgCeAjy7Jpmqa/NUBEEgDzktqGuOKKO47j+KsGhGH4lOf5HsDIg5ycyqVYVd+steuGheLAzM9EtPMgW1VdVGWJ6N0YU1gpozVGH+K+gy/uBHR1crXUqNzbQXXhduJ69sd7cxOZ+UFVH5Mk+exb+YGt8n9+5h8up1sReYC0WAAAAABJRU5ErkJggg==))}warp-view-tree-view li .collapsed,warp-view-tree-view li .expanded{padding:1px 10px;margin-right:5px;background-position:0;background-repeat:no-repeat}warp-view-tree-view li .collapsed{background-image:var(--gts-tree-collapsed-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T6WTUW7CQAxEPQdozxYb9Qb94Aj9gQSoVCp6lMr21doDZFCQiFCU3YDY//d2PeOFPHnwJC+zAlVdA/jp+/6YmZ+1S0qCPxF5HUAAO3fvSpKS4ENEvm6gfUS0c5JiBma2Ibm/QiQPmbmdSqohquoA7GqSxRaapmkBjBkAeHP336t0UWBmHcnb+VcR4XcJpjDJLjPHkS4tleqZubmNiDHU6gumDQDYuvvh7hpV9V9EXgaA5Ka2jbMjmNk7yZOIfEfE8eFVfuSDLda4JDsD3FNdEckTC0YAAAAASUVORK5CYII=))}warp-view-tree-view li .gtsInfo{white-space:normal;word-wrap:break-word}warp-view-tree-view li .gtsInfo[disabled]{color:#aaa;cursor:not-allowed}warp-view-tree-view li .normal{border-radius:50%;background-color:#bbb;display:inline-block}warp-view-tree-view li i,warp-view-tree-view li span{cursor:pointer}warp-view-tree-view li .selected{background-color:#adf;font-weight:700;padding:1px 5px}"},enumerable:!0,configurable:!0}),t}();t.WarpViewGtsTree=n,t.WarpViewTreeView=r,Object.defineProperty(t,"__esModule",{value:!0})});