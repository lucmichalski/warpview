import*as tslib_1 from"../polyfills/tslib.js";import{h}from"../warpview.core.js";import{c as DataModel,a as GTSLib,b as Logger}from"./chunk-97ee157e.js";import{b as deepEqual,a as ChartLib,c as Param}from"./chunk-d3ecdc47.js";import{a as moment}from"./chunk-8d7a9c7e.js";var WarpViewGtsPopup=function(){function t(){this.gtsList=new DataModel,this.maxToShow=5,this.hiddenData=[],this.debug=!1,this.kbdLastKeyPressed=[],this.displayed=[],this.current=0,this._gts=[],this.modalOpenned=!1}return t.prototype.onWarpViewModalOpen=function(){this.modalOpenned=!0},t.prototype.onWarpViewModalClose=function(){this.modalOpenned=!1},t.prototype.handleKeyDown=function(t){if("s"!==t[0]||this.modalOpenned){if(this.modalOpenned)switch(t[0]){case"ArrowUp":case"j":this.current=Math.max(0,this.current-1),this.prepareData();break;case"ArrowDown":case"k":this.current=Math.min(this._gts.length-1,this.current+1),this.prepareData();break;case" ":this.warpViewSelectedGTS.emit({gts:this._gts[this.current],selected:this.hiddenData.indexOf(this._gts[this.current].id)>-1});break;default:return!0}}else this.showPopup()},t.prototype.isOpened=function(){return this.modal.isOpened()},t.prototype.onHideData=function(t,e){this.LOG.debug(["hiddenData"],t),this.prepareData()},t.prototype.onData=function(t,e){this.LOG.debug(["data"],t),this.prepareData()},t.prototype.showPopup=function(){this.current=0,this.prepareData(),this.modal.open()},t.prototype.prepareData=function(){this.gtsList&&this.gtsList.data&&(this._gts=GTSLib.flatDeep([this.gtsList.data]),this.displayed=this._gts.slice(Math.max(0,Math.min(this.current-this.maxToShow,this._gts.length-2*this.maxToShow)),Math.min(this._gts.length,this.current+this.maxToShow+Math.abs(Math.min(this.current-this.maxToShow,0)))),this.LOG.debug(["prepareData"],this.displayed))},t.prototype.componentWillLoad=function(){this.LOG=new Logger(t,this.debug)},t.prototype.componentDidLoad=function(){this.prepareData()},t.prototype.render=function(){var t=this;return h("warp-view-modal",{kbdLastKeyPressed:this.kbdLastKeyPressed,modalTitle:"GTS Selector",ref:function(e){t.modal=e}},this.current>0?h("div",{class:"up-arrow"}):"",h("ul",null,this._gts.map(function(e,i){return h("li",{class:t.current==i?"selected":"",style:t.displayed.find(function(t){return t.id===e.id})?{}:{display:"none"}},h("warp-view-chip",{node:{gts:e},name:e.c,hiddenData:t.hiddenData}))})),this.current<this._gts.length-1?h("div",{class:"down-arrow"}):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-gts-popup"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{current:{state:!0},debug:{type:Boolean,attr:"debug"},displayed:{state:!0},gtsList:{type:"Any",attr:"gts-list",watchCallbacks:["onData"]},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},isOpened:{method:!0},kbdLastKeyPressed:{type:"Any",attr:"kbd-last-key-pressed",watchCallbacks:["handleKeyDown"]},maxToShow:{type:Number,attr:"max-to-show"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"warpViewModalOpen",method:"onWarpViewModalOpen"},{name:"warpViewModalClose",method:"onWarpViewModalClose"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-warp-view-gts-popup-h   ul.sc-warp-view-gts-popup{list-style:none;position:relative}.sc-warp-view-gts-popup-h   ul.sc-warp-view-gts-popup   li.sc-warp-view-gts-popup{line-height:1.5em;padding-left:10px;margin-right:20px}.sc-warp-view-gts-popup-h   ul.sc-warp-view-gts-popup   li.selected.sc-warp-view-gts-popup{background-color:var(--warpview-popup-selected-bg-color,#ddd)}.sc-warp-view-gts-popup-h   .down-arrow.sc-warp-view-gts-popup{bottom:2px}.sc-warp-view-gts-popup-h   .down-arrow.sc-warp-view-gts-popup, .sc-warp-view-gts-popup-h   .up-arrow.sc-warp-view-gts-popup{position:absolute;left:2px;width:35px;height:35px;background-image:var(--warpview-popup-arrow-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T82TMW7CQBBF/0g+QOpINEkVCmpaLoBm5COk5QYoaeAY3MDSei2LGu4QKakiBA1tCpTK8kS2sLVe2xSh8XSrnf9m/s4s4c6gO/UYGEBEXlT1bK396bFGIjIJguA7iqJLkVNbYOZXItoQ0QHAzBhz9CCFeAVgCeAjy7Jpmqa/NUBEEgDzktqGuOKKO47j+KsGhGH4lOf5HsDIg5ycyqVYVd+steuGheLAzM9EtPMgW1VdVGWJ6N0YU1gpozVGH+K+gy/uBHR1crXUqNzbQXXhduJ69sd7cxOZ+UFVH5Mk+exb+YGt8n9+5h8up1sReYC0WAAAAABJRU5ErkJggg==));background-position:50%;background-repeat:no-repeat}.sc-warp-view-gts-popup-h   .up-arrow.sc-warp-view-gts-popup{top:2px;-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}.sc-warp-view-gts-popup-h   .gts-classname.sc-warp-view-gts-popup{color:var(--gts-classname-font-color,#0074d9)}.sc-warp-view-gts-popup-h   .gts-labelname.sc-warp-view-gts-popup{color:var(--gts-labelname-font-color,#19a979)}.sc-warp-view-gts-popup-h   .gts-attrname.sc-warp-view-gts-popup{color:var(--gts-labelname-font-color,#ed4a7b)}.sc-warp-view-gts-popup-h   .gts-separator.sc-warp-view-gts-popup{color:var(--gts-separator-font-color,#bbb)}.sc-warp-view-gts-popup-h   .gts-attrvalue.sc-warp-view-gts-popup, .sc-warp-view-gts-popup-h   .gts-labelvalue.sc-warp-view-gts-popup{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}.sc-warp-view-gts-popup-h   .round.sc-warp-view-gts-popup{border-radius:50%;background-color:#bbb;display:inline-block;width:5px;height:5px;border:2px solid #454545;margin-top:auto;margin-bottom:auto;vertical-align:middle;margin-right:5px}"},enumerable:!0,configurable:!0}),t}(),WarpViewPlot=function(){function t(){this.width="",this.height="",this.responsive=!1,this.showLegend=!1,this.gtsFilter="",this.debug=!1,this.isAlone=!1,this._options={showControls:!0,showGTSTree:!0,showDots:!0},this._data=new DataModel,this._toHide=[],this.showChart=!0,this.showMap=!1,this.chartType="line",this.timeClipValue="",this.kbdLastKeyPressed=[],this.kbdCounter=0,this.preventDefaultKeyList=["Escape","/"],this.preventDefaultKeyListInModals=["Escape","ArrowUp","ArrowDown"," ","/"]}return t.prototype.componentDidLoad=function(){this.drawCharts(!0)},t.prototype.getTimeClip=function(){return tslib_1.__awaiter(this,void 0,void 0,function(){return tslib_1.__generator(this,function(t){return this.LOG.debug(["getTimeClip"],this.chart.getTimeClip()),[2,this.chart.getTimeClip()]})})},t.prototype.onGtsFilter=function(t,e){e!==t&&this.drawCharts()},t.prototype.onData=function(t,e){deepEqual(t,e)||(this.LOG.debug(["data"],t),this.drawCharts(!0))},t.prototype.onOptions=function(t,e){deepEqual(t,e)||(this.LOG.debug(["options"],t),this.drawCharts())},t.prototype.handleLocalKeydown=function(t){this.isAlone||this.handleKeyDown(t).then(function(){})},t.prototype.handleDocKeydown=function(t){this.isAlone&&this.handleKeyDown(t).then(function(){})},t.prototype.handleKeyDown=function(t){return tslib_1.__awaiter(this,void 0,void 0,function(){var e,i,n=this;return tslib_1.__generator(this,function(s){switch(s.label){case 0:return this.LOG.debug(["document:keydown"],t),this.preventDefaultKeyList.indexOf(t.key)>=0&&t.preventDefault(),[4,this.timeClip.isOpened()];case 1:return(i=s.sent())?[3,3]:[4,this.modal.isOpened()];case 2:i=s.sent(),s.label=3;case 3:return(e=i)?[3,5]:[4,this.gtsPopupModal.isOpened()];case 4:e=s.sent(),s.label=5;case 5:return e&&this.preventDefaultKeyListInModals.indexOf(t.key)>=0&&t.preventDefault(),"/"===t.key?(this.modal.open(),this.filterInput.focus(),this.filterInput.select()):"t"===t.key?this.chart.getTimeClip().then(function(t){n.timeClipValue=Math.round(t[0]).toString()+" ISO8601 "+Math.round(t[1]).toString()+" ISO8601 TIMECLIP",n.LOG.debug(["handleKeyUp","t"],n.timeClipValue),n.timeClip.open()}):this.pushKbdEvent(t.key),[2]}})})},t.prototype.pushKbdEvent=function(t){this.kbdCounter++,this.kbdLastKeyPressed=[t,this.kbdCounter.toString()]},t.prototype.stateChange=function(t){var e=this;switch(this.LOG.debug(["stateChange"],t.detail),t.detail.id){case"timeSwitch":this._options.timeMode=t.detail.state?"timestamp":"date",this.drawCharts();break;case"typeSwitch":this.chartType=t.detail.state?"step":"line",this.drawCharts();break;case"chartSwitch":this.showChart=t.detail.state,this.drawCharts();break;case"mapSwitch":this.showMap=t.detail.state,this.showMap&&window.setTimeout(function(){return e.map.resize()},500)}},t.prototype.boundsDidChange=function(t){this.LOG.debug(["boundsDidChange"],t.detail),this._timeMin=t.detail.bounds.min,this._timeMax=t.detail.bounds.max,this.line.style.left="-100px"},t.prototype.onResize=function(t){this.LOG.debug(["warpViewChartResize"],t.detail),this.chartContainer&&(this.chartContainer.style.height=t.detail.h+"px")},t.prototype.warpViewSelectedGTS=function(t){this.LOG.debug(["warpViewSelectedGTS"],t.detail),this._toHide.find(function(e){return e===t.detail.gts.id})||t.detail.selected?t.detail.selected&&(this._toHide=this._toHide.filter(function(e){return e!==t.detail.gts.id})):this._toHide.push(t.detail.gts.id),this.LOG.debug(["warpViewSelectedGTS"],this._toHide),this._toHide=this._toHide.slice(),this.drawCharts()},t.prototype.handleMouseMove=function(t){var e=this;this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(function(){e.line.style.display="block",e.line.style.left=Math.max(t.clientX-e.main.getBoundingClientRect().left,100)+"px"},1))},t.prototype.handleMouseOut=function(t){var e=this;this.line.style.left=Math.max(t.clientX-this.main.getBoundingClientRect().left,100)+"px",this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(function(){e.line.style.left="-100px",e.line.style.display="none"},500))},t.prototype.drawCharts=function(t){void 0===t&&(t=!1),this.LOG.debug(["drawCharts"],[this.data,this.options]),this.timeClip.close(),this.modal.close();var e=ChartLib.mergeDeep(this._options,this.options);this._data=GTSLib.getData(this.data);var i=new Param;if(i="string"==typeof this.options?JSON.parse(this.options):this.options,e=ChartLib.mergeDeep(e,i),this.LOG.debug(["PPts"],"firstdraw ",t),t){var n=100*GTSLib.getDivider(this._options.timeUnit),s=this._data.data;if(s){var a=GTSLib.flattenGtsIdArray(s,0).res;a=GTSLib.flatDeep(a);var o=!0;a.forEach(function(t){t.v.length>0&&(o=(o=o&&t.v[0][0]>-n&&t.v[0][0]<n)&&t.v[t.v.length-1][0]>-n&&t.v[t.v.length-1][0]<n)}),o&&(e.timeMode="timestamp")}}this._options=Object.assign({},e),this.LOG.debug(["drawCharts","parsed"],this._data,this._options)},t.prototype.applyFilter=function(){this.gtsFilter=this.filterInput.value,this.modal.close()},t.prototype.componentWillLoad=function(){this.LOG=new Logger(t,this.debug)},t.prototype.onWarpViewModalClose=function(){this.mainPlotDiv.focus()},t.prototype.inputTextKeyboardEvents=function(t){t.stopImmediatePropagation(),"Enter"===t.key?this.applyFilter():"Escape"===t.key&&this.pushKbdEvent("Escape")},t.prototype.tzSelected=function(){var t=this.tzSelector.value;this.LOG.debug(["timezone","tzselect"],t),this._options.timeZone=t,this.drawCharts()},t.prototype.render=function(){var t=this;return h("div",{tabindex:"0",onClick:function(e){t.isAlone||"SELECT"==e.path[0].nodeName||t.mainPlotDiv.focus()},ref:function(e){return t.mainPlotDiv=e}},h("warp-view-modal",{kbdLastKeyPressed:this.kbdLastKeyPressed,modalTitle:"TimeClip",ref:function(e){return t.timeClip=e}},h("pre",null,h("code",{ref:function(e){return t.timeClipElement=e},innerHTML:this.timeClipValue}))),h("warp-view-modal",{kbdLastKeyPressed:this.kbdLastKeyPressed,modalTitle:"GTS Filter",ref:function(e){return t.modal=e}},h("label",null,"Enter a regular expression to filter GTS."),h("input",{tabindex:"1",type:"text",onKeyPress:function(e){return t.inputTextKeyboardEvents(e)},onKeyDown:function(e){return t.inputTextKeyboardEvents(e)},onKeyUp:function(e){return t.inputTextKeyboardEvents(e)},ref:function(e){return t.filterInput=e},value:this.gtsFilter}),h("button",{tabindex:"2",type:"button",class:this._options.popupButtonValidateClass,onClick:function(){return t.applyFilter()},innerHTML:this._options.popupButtonValidateLabel||"Apply"})),this._options.showControls?h("div",{class:"inline"},h("warp-view-toggle",{id:"timeSwitch","text-1":"Date","text-2":"Timestamp",checked:"timestamp"==this._options.timeMode}),h("warp-view-toggle",{id:"typeSwitch","text-1":"Line","text-2":"Step"}),h("warp-view-toggle",{id:"chartSwitch","text-1":"Hide chart","text-2":"Display chart",checked:this.showChart}),h("warp-view-toggle",{id:"mapSwitch","text-1":"Hide map","text-2":"Display map",checked:this.showMap}),h("select",{id:"tzSelector",ref:function(e){return t.tzSelector=e},onChange:function(){return t.tzSelected()}},moment.tz.names().map(function(t){return h("option",{value:t,selected:"UTC"===t},t)}))):"",this._options.showGTSTree?h("warp-view-gts-tree",{data:this._data,id:"tree",gtsFilter:this.gtsFilter,debug:this.debug,hiddenData:this._toHide,options:this._options,kbdLastKeyPressed:this.kbdLastKeyPressed}):"",this.showChart?h("div",{class:"main-container",onMouseMove:function(e){return t.handleMouseMove(e)},onMouseLeave:function(e){return t.handleMouseOut(e)},ref:function(e){return t.main=e}},h("div",{class:"bar",ref:function(e){return t.line=e}}),h("div",{class:"annotation"},h("warp-view-annotation",{data:this._data,responsive:this.responsive,id:"annotation",showLegend:this.showLegend,ref:function(e){return t.annotation=e},debug:this.debug,timeMin:this._timeMin,timeMax:this._timeMax,standalone:!1,hiddenData:this._toHide,options:this._options})),h("div",{style:{width:"100%",height:"768px"},ref:function(e){return t.chartContainer=e}},h("warp-view-gts-popup",{maxToShow:5,hiddenData:this._toHide,gtsList:this._data,kbdLastKeyPressed:this.kbdLastKeyPressed,ref:function(e){return t.gtsPopupModal=e}}),h("warp-view-chart",{id:"chart",responsive:this.responsive,standalone:!1,data:this._data,ref:function(e){return t.chart=e},debug:this.debug,hiddenData:this._toHide,type:this.chartType,options:this._options}))):"",this.showMap?h("div",{class:"map-container"},h("warp-view-map",{options:this._options,ref:function(e){return t.map=e},data:this._data,debug:this.debug,responsive:this.responsive,hiddenData:this._toHide})):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-plot"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{_data:{state:!0},_options:{state:!0},_timeMax:{state:!0},_timeMin:{state:!0},_toHide:{state:!0},chartType:{state:!0},data:{type:String,attr:"data",watchCallbacks:["onData"]},debug:{type:Boolean,attr:"debug"},getTimeClip:{method:!0},gtsFilter:{type:String,attr:"gts-filter",mutable:!0,watchCallbacks:["onGtsFilter"]},height:{type:String,attr:"height",mutable:!0},isAlone:{type:Boolean,attr:"is-alone"},kbdLastKeyPressed:{state:!0},options:{type:String,attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showChart:{state:!0},showLegend:{type:Boolean,attr:"show-legend"},showMap:{state:!0},timeClipValue:{state:!0},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"keydown",method:"handleLocalKeydown"},{name:"document:keydown",method:"handleDocKeydown"},{name:"stateChange",method:"stateChange"},{name:"boundsDidChange",method:"boundsDidChange"},{name:"warpViewChartResize",method:"onResize"},{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS"},{name:"warpViewModalClose",method:"onWarpViewModalClose"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-warp-view-plot-h, .sc-warp-view-plot-h   .main-container.sc-warp-view-plot{position:relative}.sc-warp-view-plot-h   .map-container.sc-warp-view-plot{height:768px;width:calc(100% - 25px);margin-top:20px;margin-right:20px;position:relative}.sc-warp-view-plot-h   .bar.sc-warp-view-plot{width:1px;left:-100px;position:absolute;background-color:var(--warp-view-bar-color,red);top:0;bottom:55px;overflow:hidden;display:none;z-index:0}.sc-warp-view-plot-h   .inline.sc-warp-view-plot{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:space-evenly;justify-content:space-evenly;-ms-flex-align:stretch;align-items:stretch;width:100%}.sc-warp-view-plot-h   label.sc-warp-view-plot{display:inline-block}.sc-warp-view-plot-h   input.sc-warp-view-plot{display:block;width:calc(100% - 20px);padding:5px;font-size:1rem;font-weight:400;line-height:1.5}.sc-warp-view-plot-h   .annotation.sc-warp-view-plot{max-width:100%;margin-top:20px;margin-bottom:20px}"},enumerable:!0,configurable:!0}),t}(),WarpViewToggle=function(){function t(){this.checked=!1,this.text1="",this.text2="",this.state=!1}return t.prototype.componentWillLoad=function(){this.state=this.checked},t.prototype.onChecked=function(t){this.state=t},t.prototype.switched=function(){this.state=!this.state,this.stateChange.emit({state:this.state,id:this.el.id})},t.prototype.render=function(){var t=this;return h("div",{class:"container"},h("div",{class:"text"},this.text1),h("label",{class:"switch"},h("input",this.state?{type:"checkbox",class:"switch-input",checked:!0,onClick:function(){return t.switched()}}:{type:"checkbox",class:"switch-input",onClick:function(){return t.switched()}}),h("span",{class:"switch-label"}),h("span",{class:"switch-handle"})),h("div",{class:"text"},this.text2))},Object.defineProperty(t,"is",{get:function(){return"warp-view-toggle"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{checked:{type:Boolean,attr:"checked",watchCallbacks:["onChecked"]},el:{elementRef:!0},state:{state:!0},text1:{type:String,attr:"text-1"},text2:{type:String,attr:"text-2"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"stateChange",method:"stateChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-warp-view-toggle-h   .switch.sc-warp-view-toggle{position:relative;margin-top:auto;margin-bottom:auto;display:block;width:var(--warp-view-switch-width,100px);height:var(--warp-view-switch-height,30px);padding:3px;border-radius:var(--warp-view-switch-radius,18px);cursor:pointer}.sc-warp-view-toggle-h   .switch-input.sc-warp-view-toggle{display:none}.sc-warp-view-toggle-h   .switch-label.sc-warp-view-toggle{position:relative;display:block;height:inherit;text-transform:uppercase;background:var(--warp-view-switch-inset-color,#eceeef);border-radius:inherit;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15);box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15)}.sc-warp-view-toggle-h   .switch-input.sc-warp-view-toggle:checked ~ .switch-label.sc-warp-view-toggle{background:var(--warp-view-switch-inset-checked-color,#00cd00);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2);box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2)}.sc-warp-view-toggle-h   .switch-handle.sc-warp-view-toggle{position:absolute;top:4px;left:4px;width:calc(var(--warp-view-switch-height, 30px) - 2px);height:calc(var(--warp-view-switch-height, 30px) - 2px);background:var(--warp-view-switch-handle-color,radial-gradient(#fff 15%,#f0f0f0 100%));border-radius:100%;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.2);box-shadow:1px 1px 5px rgba(0,0,0,.2)}.sc-warp-view-toggle-h   .switch-input.sc-warp-view-toggle:checked ~ .switch-handle.sc-warp-view-toggle{left:calc(var(--warp-view-switch-width, 100px) - var(--warp-view-switch-height, 30px) + 4px);background:var(--warp-view-switch-handle-checked-color,radial-gradient(#fff 15%,#00cd00 100%));-webkit-box-shadow:-1px 1px 5px rgba(0,0,0,.2);box-shadow:-1px 1px 5px rgba(0,0,0,.2)}.sc-warp-view-toggle-h   .switch-handle.sc-warp-view-toggle, .sc-warp-view-toggle-h   .switch-label.sc-warp-view-toggle{transition:All .3s ease;-webkit-transition:All .3s ease;-moz-transition:All .3s ease;-o-transition:All .3s ease}.sc-warp-view-toggle-h   .container.sc-warp-view-toggle{display:-ms-flexbox;display:flex}.sc-warp-view-toggle-h   .text.sc-warp-view-toggle{color:var(--warp-view-font-color,#000);padding:7px}"},enumerable:!0,configurable:!0}),t}();export{WarpViewGtsPopup,WarpViewPlot,WarpViewToggle};