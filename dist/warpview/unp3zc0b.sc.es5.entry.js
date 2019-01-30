warpview.loadBundle("unp3zc0b",["exports","./chunk-75c5f765.js","./chunk-a31bdffc.js"],function(t,e,s){var n=window.warpview.h,i=function(){},a=function(){function t(){this.gtsFilter="",this.hiddenData=[],this.debug=!1,this.kbdLastKeyPressed=[],this.refreshCounter=0,this._node={selected:!0,gts:i}}return t.prototype.onGtsFilter=function(t,s){s!==t&&""!==this.gtsFilter&&this.setState(new RegExp(this.gtsFilter,"gi").test(e.GTSLib.serializeGtsMetadata(this._node.gts)))},t.prototype.onHideData=function(t,s){this.LOG.debug(["hiddenData"],t),this._node=Object.assign({},this._node,{selected:-1===this.hiddenData.indexOf(this._node.gts.id),label:e.GTSLib.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["hiddenData"],this._node),this.colorizeChip()},t.prototype.handleKeyDown=function(t){"a"===t[0]&&this.setState(!0),"n"===t[0]&&this.setState(!1)},t.prototype.colorizeChip=function(){this.chip&&(this._node.selected?(this.chip.style.setProperty("background-color",s.ColorLib.transparentize(s.ColorLib.getColor(this._node.gts.id))),this.chip.style.setProperty("border-color",s.ColorLib.getColor(this._node.gts.id))):this.chip.style.setProperty("background-color","#eeeeee"),this.refreshCounter++)},t.prototype.componentWillLoad=function(){this.LOG=new e.Logger(t,this.debug),this._node=Object.assign({},this.node,{selected:-1===this.hiddenData.indexOf(this.node.gts.id)})},t.prototype.componentDidLoad=function(){(""!==this.gtsFilter&&new RegExp(this.gtsFilter,"gi").test(e.GTSLib.serializeGtsMetadata(this._node.gts))||this.hiddenData.indexOf(this._node.gts.id)>-1)&&this.setState(!1),this.colorizeChip()},t.prototype.lastIndex=function(t,e){return t===this.toArray(e).length-1},t.prototype.toArray=function(t){return void 0===t?[]:Object.keys(t).map(function(e){return{name:e,value:t[e]}})},t.prototype.switchPlotState=function(t){return t.preventDefault(),this.setState(!this._node.selected),!1},t.prototype.setState=function(t){this._node=Object.assign({},this._node,{selected:t,label:e.GTSLib.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["switchPlotState"],this._node),this.colorizeChip(),this.warpViewSelectedGTS.emit(this._node)},t.prototype.render=function(){var t=this;return n("div",null,this._node&&this._node.gts&&this._node.gts.l?n("span",{onClick:function(e){return t.switchPlotState(e)}},n("i",{class:"normal",ref:function(e){return t.chip=e}}),n("span",{class:"gtsInfo"},n("span",{class:"gts-classname"},"  ",this._node.gts.c),n("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.l).map(function(e,s){return n("span",null,n("span",{class:"gts-labelname"},e.name),n("span",{class:"gts-separator"},"="),n("span",{class:"gts-labelvalue"},e.value),n("span",{hidden:t.lastIndex(s,t._node.gts.l)},", "))}),n("span",{class:"gts-separator",innerHTML:" &rcub;"}),this.toArray(this._node.gts.a).length>0?n("span",null,n("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.a).map(function(e,s){return n("span",null,n("span",{class:"gts-attrname"},e.name),n("span",{class:"gts-separator"},"="),n("span",{class:"gts-attrvalue"},e.value),n("span",{hidden:t.lastIndex(s,t._node.gts.a)},", "))}),n("span",{class:"gts-separator",innerHTML:" &rcub;"})):"")):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-chip"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{debug:{type:Boolean,attr:"debug"},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},kbdLastKeyPressed:{type:"Any",attr:"kbd-last-key-pressed",watchCallbacks:["handleKeyDown"]},name:{type:String,attr:"name"},node:{type:"Any",attr:"node"},refreshCounter:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-warp-view-chip-h   .normal.sc-warp-view-chip, .sc-warp-view-chip-h   div.sc-warp-view-chip   span.sc-warp-view-chip{cursor:pointer}.sc-warp-view-chip-h   .normal.sc-warp-view-chip{border-radius:50%;background-color:#bbb;display:inline-block;width:5px;height:5px;border:2px solid #454545;margin-top:auto;margin-bottom:auto;vertical-align:middle}.sc-warp-view-chip-h   .gts-classname.sc-warp-view-chip{color:var(--gts-classname-font-color,#0074d9)}.sc-warp-view-chip-h   .gts-labelname.sc-warp-view-chip{color:var(--gts-labelname-font-color,#19a979)}.sc-warp-view-chip-h   .gts-attrname.sc-warp-view-chip{color:var(--gts-labelname-font-color,#ed4a7b)}.sc-warp-view-chip-h   .gts-separator.sc-warp-view-chip{color:var(--gts-separator-font-color,#bbb)}.sc-warp-view-chip-h   .gts-attrvalue.sc-warp-view-chip, .sc-warp-view-chip-h   .gts-labelvalue.sc-warp-view-chip{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}"},enumerable:!0,configurable:!0}),t}();t.WarpViewChip=a,Object.defineProperty(t,"__esModule",{value:!0})});