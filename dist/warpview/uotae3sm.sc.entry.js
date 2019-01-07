const t=window.warpview.h;import{e,b as i,c as s,a,d as h}from"./chunk-c082721c.js";import{a as o}from"./chunk-bf214dd1.js";class r{constructor(){this.gtsList=new e,this.maxToShow=5,this.hiddenData=[],this.debug=!1,this.displayed=[],this.current=0,this._gts=[],this.chips=[]}handleKeyDown(t){if(["ArrowUp","ArrowDown"," "].indexOf(t.key)>-1)return t.preventDefault(),!1}handleKeyUp(t){switch(this.LOG.debug(["document:keyup"],t),t.key){case"s":t.preventDefault(),this.showPopup();break;case"ArrowUp":t.preventDefault(),this.current=Math.max(0,this.current-1),this.prepareData();break;case"ArrowDown":t.preventDefault(),this.current=Math.min(this._gts.length-1,this.current+1),this.prepareData();break;case" ":t.preventDefault(),this.warpViewSelectedGTS.emit({gts:this.displayed[this.current],selected:this.hiddenData.indexOf(this._gts[this.current].id)>-1});break;default:return!0}return!1}onHideData(t){this.LOG.debug(["hiddenData"],t),this.prepareData(),this.colorizeChips()}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.prepareData())}showPopup(){this.current=0,this.prepareData(),this.modal.open()}prepareData(){this.gtsList&&(this._gts=i.flatDeep([this.gtsList.data]),this.displayed=this._gts.slice(Math.max(0,Math.min(this.current-this.maxToShow,this._gts.length-2*this.maxToShow)),Math.min(this._gts.length,this.current+this.maxToShow+Math.abs(Math.min(this.current-this.maxToShow,0)))),this.LOG.debug(["prepareData"],this.displayed))}colorizeChips(){this.chips.map((t,e)=>{-1===this.hiddenData.indexOf(this.displayed[e].id)?(t.style.setProperty("background-color",o.transparentize(o.getColor(this.displayed[e].id))),t.style.setProperty("border-color",o.getColor(this.displayed[e].id))):t.style.setProperty("background-color","#eeeeee")})}componentWillLoad(){this.LOG=new s(r,this.debug)}componentDidLoad(){this.prepareData()}render(){return t("warp-view-modal",{modalTitle:"GTS Selector",ref:t=>{this.modal=t}},this.current>0?t("div",{class:"up-arrow"}):"",t("ul",null,this._gts.map((e,s)=>e&&this.displayed.find(t=>t.id===e.id)?t("li",{class:this.current===s?"selected":""},t("div",{class:"round",ref:t=>this.chips[s]=t,style:{"background-color":o.transparentize(o.getColor(e.id)),"border-color":o.getColor(e.id)}}),t("span",{innerHTML:i.formatLabel(i.serializeGtsMetadata(e))})):"")),this.current<this._gts.length-1?t("div",{class:"down-arrow"}):"")}static get is(){return"warp-view-gts-popup"}static get encapsulation(){return"shadow"}static get properties(){return{current:{state:!0},debug:{type:Boolean,attr:"debug"},displayed:{state:!0},gtsList:{type:"Any",attr:"gts-list",watchCallbacks:["onData"]},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},maxToShow:{type:Number,attr:"max-to-show"}}}static get events(){return[{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"document:keydown",method:"handleKeyDown"},{name:"document:keyup",method:"handleKeyUp"}]}static get style(){return".sc-warp-view-gts-popup-h   ul.sc-warp-view-gts-popup{list-style:none;position:relative}.sc-warp-view-gts-popup-h   ul.sc-warp-view-gts-popup   li.sc-warp-view-gts-popup{line-height:1.5em;padding-left:10px;margin-right:20px}.sc-warp-view-gts-popup-h   ul.sc-warp-view-gts-popup   li.selected.sc-warp-view-gts-popup{background-color:var(--warpview-popup-selected-bg-color,#ddd)}.sc-warp-view-gts-popup-h   .down-arrow.sc-warp-view-gts-popup{bottom:2px}.sc-warp-view-gts-popup-h   .down-arrow.sc-warp-view-gts-popup, .sc-warp-view-gts-popup-h   .up-arrow.sc-warp-view-gts-popup{position:absolute;left:2px;width:35px;height:35px;background-image:var(--warpview-popup-arrow-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T82TMW7CQBBF/0g+QOpINEkVCmpaLoBm5COk5QYoaeAY3MDSei2LGu4QKakiBA1tCpTK8kS2sLVe2xSh8XSrnf9m/s4s4c6gO/UYGEBEXlT1bK396bFGIjIJguA7iqJLkVNbYOZXItoQ0QHAzBhz9CCFeAVgCeAjy7Jpmqa/NUBEEgDzktqGuOKKO47j+KsGhGH4lOf5HsDIg5ycyqVYVd+steuGheLAzM9EtPMgW1VdVGWJ6N0YU1gpozVGH+K+gy/uBHR1crXUqNzbQXXhduJ69sd7cxOZ+UFVH5Mk+exb+YGt8n9+5h8up1sReYC0WAAAAABJRU5ErkJggg==));background-position:50%;background-repeat:no-repeat}.sc-warp-view-gts-popup-h   .up-arrow.sc-warp-view-gts-popup{top:2px;-webkit-transform:rotate(180deg);-moz-transform:rotate(180deg);-ms-transform:rotate(180deg);-o-transform:rotate(180deg);transform:rotate(180deg)}.sc-warp-view-gts-popup-h   .gts-classname.sc-warp-view-gts-popup{color:var(--gts-classname-font-color,#0074d9)}.sc-warp-view-gts-popup-h   .gts-labelname.sc-warp-view-gts-popup{color:var(--gts-labelname-font-color,#19a979)}.sc-warp-view-gts-popup-h   .gts-attrname.sc-warp-view-gts-popup{color:var(--gts-labelname-font-color,#ed4a7b)}.sc-warp-view-gts-popup-h   .gts-separator.sc-warp-view-gts-popup{color:var(--gts-separator-font-color,#bbb)}.sc-warp-view-gts-popup-h   .gts-attrvalue.sc-warp-view-gts-popup, .sc-warp-view-gts-popup-h   .gts-labelvalue.sc-warp-view-gts-popup{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}.sc-warp-view-gts-popup-h   .round.sc-warp-view-gts-popup{border-radius:50%;background-color:#bbb;display:inline-block;width:5px;height:5px;border:2px solid #454545;margin-top:auto;margin-bottom:auto;vertical-align:middle;margin-right:5px}"}}class n{constructor(){this.width="",this.height="",this.responsive=!1,this.showLegend=!1,this.gtsFilter="",this.debug=!1,this._options={showControls:!0,showGTSTree:!0,showDots:!0},this._data=new e,this._toHide=[],this.showChart=!0,this.showMap=!1,this.chartType="line",this.timeClipValue="",this.graphId="container-"+a.guid()}componentDidLoad(){this.line=this.el.shadowRoot.querySelector("div.bar"),this.main=this.el.shadowRoot.querySelector("div.maincontainer"),this.chart=this.el.shadowRoot.querySelector("warp-view-chart"),this.annotation=this.el.shadowRoot.querySelector("warp-view-annotation"),this.drawCharts(!0)}async getTimeClip(){return this.LOG.debug(["getTimeClip"],this.warpViewChart.getTimeClip()),this.warpViewChart.getTimeClip()}onGtsFilter(t,e){e!==t&&this.drawCharts()}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawCharts(!0))}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawCharts())}handleKeyUp(t){return this.LOG.debug(["document:keyup"],t),t.preventDefault(),"/"===t.key&&(this.modal.open(),this.filterInput.focus(),this.filterInput.select()),"t"===t.key&&this.warpViewChart.getTimeClip().then(t=>{this.timeClipValue=`${Math.round(t[0]).toString()} ISO8601 ${Math.round(t[1]).toString()} ISO8601 TIMECLIP`,this.LOG.debug(["handleKeyUp","t"],this.timeClipValue),this.timeClip.open()}),!1}stateChange(t){switch(this.LOG.debug(["stateChange"],t.detail),t.detail.id){case"timeSwitch":this._options.timeMode=t.detail.state?"timestamp":"date",this.drawCharts();break;case"typeSwitch":this.chartType=t.detail.state?"step":"line",this.drawCharts();break;case"chartSwitch":this.showChart=t.detail.state,this.drawCharts();break;case"mapSwitch":this.showMap=t.detail.state,this.showMap&&window.setTimeout(()=>{this.el.shadowRoot.querySelector("#map").resize()},500)}}boundsDidChange(t){this.LOG.debug(["boundsDidChange"],t.detail),this._timeMin=t.detail.bounds.min,this._timeMax=t.detail.bounds.max,this.line.style.left="-100px"}onResize(t){const e=this.el.shadowRoot.querySelector("#"+this.graphId);this.LOG.debug(["warpViewChartResize"],[t.detail,e]),e&&(e.style.height=t.detail.h+"px")}warpViewSelectedGTS(t){this.LOG.debug(["warpViewSelectedGTS"],t.detail),this._toHide.find(e=>e===t.detail.gts.id)||t.detail.selected?this._toHide=this._toHide.filter(e=>e!==t.detail.gts.id):this._toHide.push(t.detail.gts.id),this.LOG.debug(["warpViewSelectedGTS"],this._toHide),this._toHide=this._toHide.slice(),this.drawCharts()}handleMouseMove(t){this.line=this.el.shadowRoot.querySelector("div.bar"),this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(()=>{this.line.style.display="block",this.line.style.left=Math.max(t.offsetX,100)+"px"},1))}handleMouseOut(t){this.LOG.debug(["handleMouseOut"],t),this.line.style.left=Math.max(t.offsetX,100)+"px",this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(()=>{this.line.style.left="-100px",this.line.style.display="none"},500))}drawCharts(t=!1){this.LOG.debug(["drawCharts"],[this.data,this.options]),this._options=a.mergeDeep(this._options,this.options),this._data=i.getData(this.data);let e=new h;if(e="string"==typeof this.options?JSON.parse(this.options):this.options,this._options=a.mergeDeep(this._options,e),this.LOG.debug(["PPts"],"firstdraw "+t),t){let t=100*i.getDivider(this._options.timeUnit),e=this._data.data;if(e){let s=i.flattenGtsIdArray(e,0).res;s=i.flatDeep(s);let a=!0;s.forEach(e=>{e.v.length>0&&(a=(a=a&&e.v[0][0]>-t&&e.v[0][0]<t)&&e.v[e.v.length-1][0]>-t&&e.v[e.v.length-1][0]<t)}),a&&(this._options.timeMode="timestamp")}}this.timeClip.close(),this.modal.close(),this.LOG.debug(["drawCharts","parsed"],this._data,this._options)}applyFilter(){this.gtsFilter=this.filterInput.value,this.modal.close()}componentWillLoad(){this.LOG=new s(n,this.debug)}render(){return t("div",null,t("warp-view-modal",{modalTitle:"TimeClip",ref:t=>this.timeClip=t},t("pre",null,t("code",{ref:t=>this.timeClipElement=t,innerHTML:this.timeClipValue}))),t("warp-view-modal",{modalTitle:"GTS Filter",ref:t=>this.modal=t},t("label",null,"Enter a regular expression to filter GTS."),t("input",{type:"text",ref:t=>this.filterInput=t,value:this.gtsFilter}),t("button",{type:"button",class:this._options.popupButtonValidateClass,onClick:()=>this.applyFilter(),innerHTML:this._options.popupButtonValidateLabel||"Apply"})),this._options.showControls?t("div",{class:"inline"},t("warp-view-toggle",{id:"timeSwitch","text-1":"Date","text-2":"Timestamp",checked:"timestamp"==this._options.timeMode}),t("warp-view-toggle",{id:"typeSwitch","text-1":"Line","text-2":"Step"}),t("warp-view-toggle",{id:"chartSwitch","text-1":"Hide chart","text-2":"Display chart",checked:this.showChart}),t("warp-view-toggle",{id:"mapSwitch","text-1":"Hide map","text-2":"Display map",checked:this.showMap})):"",this._options.showGTSTree?t("warp-view-gts-tree",{data:this._data,id:"tree",gtsFilter:this.gtsFilter,debug:this.debug,hiddenData:this._toHide,options:this._options}):"",this.showChart?t("div",{class:"main-container",onMouseMove:t=>this.handleMouseMove(t),onMouseLeave:t=>this.handleMouseOut(t)},t("div",{class:"bar"}),t("div",{class:"annotation"},t("warp-view-annotation",{data:this._data,responsive:this.responsive,id:"annotation",showLegend:this.showLegend,debug:this.debug,timeMin:this._timeMin,timeMax:this._timeMax,standalone:!1,hiddenData:this._toHide,options:this._options})),t("div",{style:{width:"100%",height:"768px"},id:this.graphId},t("warp-view-gts-popup",{maxToShow:5,hiddenData:this._toHide,gtsList:this._data}),t("warp-view-chart",{id:"chart",responsive:this.responsive,standalone:!1,data:this._data,ref:t=>this.warpViewChart=t,debug:this.debug,hiddenData:this._toHide,type:this.chartType,options:this._options}))):"",this.showMap?t("div",{class:"map-container"},t("warp-view-map",{options:this._options,id:"map",data:this._data,debug:this.debug,responsive:this.responsive,hiddenData:this._toHide})):"")}static get is(){return"warp-view-plot"}static get encapsulation(){return"shadow"}static get properties(){return{_data:{state:!0},_options:{state:!0},_timeMax:{state:!0},_timeMin:{state:!0},_toHide:{state:!0},chartType:{state:!0},data:{type:String,attr:"data",watchCallbacks:["onData"]},debug:{type:Boolean,attr:"debug"},el:{elementRef:!0},getTimeClip:{method:!0},gtsFilter:{type:String,attr:"gts-filter",mutable:!0,watchCallbacks:["onGtsFilter"]},height:{type:String,attr:"height",mutable:!0},options:{type:String,attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showChart:{state:!0},showLegend:{type:Boolean,attr:"show-legend"},showMap:{state:!0},timeClipValue:{state:!0},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"document:keyup",method:"handleKeyUp"},{name:"stateChange",method:"stateChange"},{name:"boundsDidChange",method:"boundsDidChange"},{name:"warpViewChartResize",method:"onResize"},{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS"}]}static get style(){return".sc-warp-view-plot-h, .sc-warp-view-plot-h   .main-container.sc-warp-view-plot{position:relative}.sc-warp-view-plot-h   .map-container.sc-warp-view-plot{height:768px;width:calc(100% - 25px);margin-top:20px;margin-right:20px;position:relative}.sc-warp-view-plot-h   .bar.sc-warp-view-plot{width:1px;left:-100px;position:absolute;background-color:var(--warp-view-bar-color,red);top:0;bottom:55px;overflow:hidden;display:none;z-index:0}.sc-warp-view-plot-h   .inline.sc-warp-view-plot{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:space-evenly;justify-content:space-evenly;-ms-flex-align:stretch;align-items:stretch;width:100%}.sc-warp-view-plot-h   label.sc-warp-view-plot{display:inline-block}.sc-warp-view-plot-h   input.sc-warp-view-plot{display:block;width:calc(100% - 20px);padding:5px;font-size:1rem;font-weight:400;line-height:1.5}.sc-warp-view-plot-h   .annotation.sc-warp-view-plot{max-width:100%}"}}class d{constructor(){this.checked=!1,this.text1="",this.text2="",this.state=!1}componentWillLoad(){this.state=this.checked}onchecked(t,e){this.state=t}switched(){this.state=!this.state,this.stateChange.emit({state:this.state,id:this.el.id})}render(){return t("div",{class:"container"},t("div",{class:"text"},this.text1),t("label",{class:"switch"},t("input",this.state?{type:"checkbox",class:"switch-input",checked:!0,onClick:()=>this.switched()}:{type:"checkbox",class:"switch-input",onClick:()=>this.switched()}),t("span",{class:"switch-label"}),t("span",{class:"switch-handle"})),t("div",{class:"text"},this.text2))}static get is(){return"warp-view-toggle"}static get encapsulation(){return"shadow"}static get properties(){return{checked:{type:Boolean,attr:"checked",watchCallbacks:["onchecked"]},el:{elementRef:!0},state:{state:!0},text1:{type:String,attr:"text-1"},text2:{type:String,attr:"text-2"}}}static get events(){return[{name:"stateChange",method:"stateChange",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".sc-warp-view-toggle-h   .switch.sc-warp-view-toggle{position:relative;margin-top:auto;margin-bottom:auto;display:block;width:var(--warp-view-switch-width,100px);height:var(--warp-view-switch-height,30px);padding:3px;border-radius:var(--warp-view-switch-radius,18px);cursor:pointer}.sc-warp-view-toggle-h   .switch-input.sc-warp-view-toggle{display:none}.sc-warp-view-toggle-h   .switch-label.sc-warp-view-toggle{position:relative;display:block;height:inherit;text-transform:uppercase;background:var(--warp-view-switch-inset-color,#eceeef);border-radius:inherit;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15);box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15)}.sc-warp-view-toggle-h   .switch-input.sc-warp-view-toggle:checked ~ .switch-label.sc-warp-view-toggle{background:var(--warp-view-switch-inset-checked-color,#00cd00);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2);box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2)}.sc-warp-view-toggle-h   .switch-handle.sc-warp-view-toggle{position:absolute;top:4px;left:4px;width:calc(var(--warp-view-switch-height, 30px) - 2px);height:calc(var(--warp-view-switch-height, 30px) - 2px);background:var(--warp-view-switch-handle-color,radial-gradient(#fff 15%,#f0f0f0 100%));border-radius:100%;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.2);box-shadow:1px 1px 5px rgba(0,0,0,.2)}.sc-warp-view-toggle-h   .switch-input.sc-warp-view-toggle:checked ~ .switch-handle.sc-warp-view-toggle{left:calc(var(--warp-view-switch-width, 100px) - var(--warp-view-switch-height, 30px) + 4px);background:var(--warp-view-switch-handle-checked-color,radial-gradient(#fff 15%,#00cd00 100%));-webkit-box-shadow:-1px 1px 5px rgba(0,0,0,.2);box-shadow:-1px 1px 5px rgba(0,0,0,.2)}.sc-warp-view-toggle-h   .switch-handle.sc-warp-view-toggle, .sc-warp-view-toggle-h   .switch-label.sc-warp-view-toggle{transition:All .3s ease;-webkit-transition:All .3s ease;-moz-transition:All .3s ease;-o-transition:All .3s ease}.sc-warp-view-toggle-h   .container.sc-warp-view-toggle{display:-ms-flexbox;display:flex}.sc-warp-view-toggle-h   .text.sc-warp-view-toggle{color:var(--warp-view-font-color,#000);padding:7px}"}}export{r as WarpViewGtsPopup,n as WarpViewPlot,d as WarpViewToggle};