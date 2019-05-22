import{h}from"../warpview.core.js";import{a as GTSLib,b as Logger}from"./chunk-58f6b44e.js";import{a as ColorLib}from"./chunk-bf214dd1.js";var GTS=function(){},WarpViewChip=function(){function t(){this.gtsFilter="x",this.hiddenData=[],this.debug=!1,this.kbdLastKeyPressed=[],this.refreshCounter=0,this._node={selected:!0,gts:GTS}}return t.prototype.onGtsFilter=function(t,e){e!=t&&(""!==this.gtsFilter.slice(1)?this.setState(new RegExp(this.gtsFilter.slice(1),"gi").test(GTSLib.serializeGtsMetadata(this._node.gts))):this.setState(!0))},t.prototype.onHideData=function(t){this.LOG.debug(["hiddenData"],t),this._node=Object.assign({},this._node,{selected:-1===this.hiddenData.indexOf(this._node.gts.id),label:GTSLib.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["hiddenData"],this._node),this.colorizeChip()},t.prototype.handleKeyDown=function(t){"a"===t[0]&&this.setState(!0),"n"===t[0]&&this.setState(!1)},t.prototype.colorizeChip=function(){this.chip&&(this._node.selected?(this.chip.style.setProperty("background-color",ColorLib.transparentize(ColorLib.getColor(this._node.gts.id))),this.chip.style.setProperty("border-color",ColorLib.getColor(this._node.gts.id))):this.chip.style.setProperty("background-color","#eeeeee"),this.refreshCounter++)},t.prototype.componentWillLoad=function(){this.LOG=new Logger(t,this.debug),this._node=Object.assign({},this.node,{selected:-1===this.hiddenData.indexOf(this.node.gts.id)})},t.prototype.componentDidLoad=function(){(""!==this.gtsFilter.slice(1)&&new RegExp(this.gtsFilter.slice(1),"gi").test(GTSLib.serializeGtsMetadata(this._node.gts))||this.hiddenData.indexOf(this._node.gts.id)>-1)&&this.setState(!1),this.colorizeChip()},t.prototype.lastIndex=function(t,e){return t===this.toArray(e).length-1},t.prototype.toArray=function(t){return void 0===t?[]:Object.keys(t).map(function(e){return{name:e,value:t[e]}})},t.prototype.switchPlotState=function(t){return t.preventDefault(),this.setState(!this._node.selected),!1},t.prototype.setState=function(t){this._node=Object.assign({},this._node,{selected:t,label:GTSLib.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["switchPlotState"],this._node),this.colorizeChip(),this.warpViewSelectedGTS.emit(this._node)},t.prototype.render=function(){var t=this;return h("div",null,this._node&&this._node.gts&&this._node.gts.l?h("span",{onClick:function(e){return t.switchPlotState(e)}},h("i",{class:"normal",ref:function(e){return t.chip=e}}),h("span",{class:"gtsInfo"},h("span",{class:"gts-classname"},"  ",this._node.gts.c),h("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.l).map(function(e,s){return h("span",null,h("span",{class:"gts-labelname"},e.name),h("span",{class:"gts-separator"},"="),h("span",{class:"gts-labelvalue"},e.value),h("span",{hidden:t.lastIndex(s,t._node.gts.l)},", "))}),h("span",{class:"gts-separator",innerHTML:" &rcub;"}),this.toArray(this._node.gts.a).length>0?h("span",null,h("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.a).map(function(e,s){return h("span",null,h("span",{class:"gts-attrname"},e.name),h("span",{class:"gts-separator"},"="),h("span",{class:"gts-attrvalue"},e.value),h("span",{hidden:t.lastIndex(s,t._node.gts.a)},", "))}),h("span",{class:"gts-separator",innerHTML:" &rcub;"})):"")):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-chip"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{debug:{type:Boolean,attr:"debug"},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},kbdLastKeyPressed:{type:"Any",attr:"kbd-last-key-pressed",watchCallbacks:["handleKeyDown"]},name:{type:String,attr:"name"},node:{type:"Any",attr:"node"},refreshCounter:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host .normal,:host div span{cursor:pointer}:host .normal{border-radius:50%;background-color:#bbb;display:inline-block;width:5px;height:5px;border:2px solid #454545;margin-top:auto;margin-bottom:auto;vertical-align:middle}:host .gts-classname{color:var(--gts-classname-font-color,#0074d9)}:host .gts-labelname{color:var(--gts-labelname-font-color,#19a979)}:host .gts-attrname{color:var(--gts-labelname-font-color,#ed4a7b)}:host .gts-separator{color:var(--gts-separator-font-color,#bbb)}:host .gts-attrvalue,:host .gts-labelvalue{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}"},enumerable:!0,configurable:!0}),t}();export{WarpViewChip};