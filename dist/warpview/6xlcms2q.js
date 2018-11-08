/*! Built with http://stenciljs.com */
const{h:t}=window.warpview;import{a as e}from"./chunk-b46c70e5.js";import{a as i,b as s,c as a,d as h,e as o}from"./chunk-aed9a63a.js";import{a as n}from"./chunk-dc94d6ae.js";import{a as r}from"./chunk-07b61ac6.js";import"./chunk-ee323282.js";class d{constructor(){this.responsive=!1,this.showLegend=!0,this.options=new n,this.hiddenData=[],this.width="",this.height="",this.legendOffset=70,this._mapIndex={},this.LOG=new a(d),this._options={gridLineColor:"#000000",timeMode:"date"},this.uuid="chart-"+h.guid().split("-").join(""),this.parentWidth=-1}onResize(){this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.LOG.debug(["onResize"],this.el.parentElement.clientWidth),this.drawChart()},250))}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}changeScale(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}hideData(t,e){if(e!==t&&this._chart){this.LOG.debug(["hiddenData"],t);const e=i.cleanArray(t);Object.keys(this._mapIndex).forEach(t=>{this._chart.getDatasetMeta(this._mapIndex[t]).hidden=!!e.find(e=>e===t)}),this._chart.update()}}minBoundChange(t,e){this._chart&&(this._chart.options.animation.duration=0,e!==t&&this._chart.options.scales.xAxes[0].time&&(this._chart.options.scales.xAxes[0].time.min=t,this.LOG.debug(["minBoundChange"],this._chart.options.scales.xAxes[0].time.min),this._chart.update()))}maxBoundChange(t,e){this._chart&&(this._chart.options.animation.duration=0,e!==t&&this._chart.options.scales.xAxes[0].time&&(this._chart.options.scales.xAxes[0].time.max=t,this.LOG.debug(["maxBoundChange"],this._chart.options.scales.xAxes[0].time.max),this._chart.update()))}drawChart(){if(!this.data)return;this._options.timeMode="date",this._options=h.mergeDeep(this._options,this.options),this.LOG.debug(["drawChart","hiddenData"],this.hiddenData);let t=this.el.shadowRoot.querySelector("#"+this.uuid),i=this.parseData(this.data),s=30*i.length+this.legendOffset,a=this.height||""!==this.height?Math.max(s,parseInt(this.height)):s;this.height=a.toString(),t.parentElement.style.height=a+"px",t.parentElement.style.width="100%";const o=this._options.gridLineColor,n=this,r={layout:{padding:{bottom:Math.max(30,30*i.length)}},legend:{display:this.showLegend},responsive:this.responsive,animation:{duration:0},tooltips:{mode:"x",position:"nearest",custom:function(t){t.opacity>0?n.pointHover.emit({x:t.dataPoints[0].x,y:this._eventPosition.y}):n.pointHover.emit({x:-100,y:this._eventPosition.y})},callbacks:{title:t=>t[0].xLabel||"",label:(t,e)=>`${e.datasets[t.datasetIndex].label}: ${e.datasets[t.datasetIndex].data[t.index].val}`}},scales:{xAxes:[{drawTicks:!1,type:"linear",time:{},gridLines:{zeroLineColor:o,color:o,display:!1},ticks:{}}],yAxes:[{display:!1,drawTicks:!1,scaleLabel:{display:!1},afterFit:function(t){t.width=100},gridLines:{color:o,zeroLineColor:o},ticks:{fontColor:o,min:0,max:1,beginAtZero:!0,stepSize:1}}]}};this.LOG.debug(["options"],this._options),"timestamp"===this._options.timeMode?(r.scales.xAxes[0].time=void 0,r.scales.xAxes[0].type="linear",r.scales.xAxes[0].ticks={fontColor:o,min:this.timeMin,max:this.timeMax}):(r.scales.xAxes[0].time={min:this.timeMin,max:this.timeMax,displayFormats:{millisecond:"HH:mm:ss.SSS",second:"HH:mm:ss",minute:"HH:mm",hour:"HH"}},r.scales.xAxes[0].ticks={fontColor:o},r.scales.xAxes[0].type="time"),this.LOG.debug(["drawChart"],[a,i]),this._chart&&this._chart.destroy(),i&&0!==i.length&&(this._chart=new e.Scatter(t,{data:{datasets:i},options:r}),Object.keys(this._mapIndex).forEach(t=>{this._chart.getDatasetMeta(this._mapIndex[t]).hidden=!!this.hiddenData.find(e=>e===t)}),this._chart.update(),this.onResize())}parseData(t){this.LOG.debug(["parseData"],t);let e=i.getData(t).data;if(this.LOG.debug(["parseData","dataList"],e),e&&0!==e.length){let t=[],a=0;return(e=i.flatDeep(e)).forEach((e,o)=>{if(i.isGtsToAnnotate(e)){let n=[],d=s.getColor(o);const l=h.buildImage(1,30,d);e.v.forEach(t=>{let e=t[0];"timestamp"!==this._options.timeMode&&(e=r(e/1e3).utc(!0).valueOf()),n.push({x:e,y:.5,val:t[t.length-1]})});let p=i.serializeGtsMetadata(e);this._mapIndex[p]=a,t.push({label:p,data:n,pointRadius:5,pointHoverRadius:5,pointHitRadius:5,pointStyle:l,borderColor:d,backgroundColor:s.transparentize(d,.5)}),a++}}),t}return[]}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("div",{class:"chart-container",style:{position:"relative",width:this.width,height:this.height}},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"warp-view-annotation"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["hideData"]},options:{type:"Any",attr:"options",watchCallbacks:["changeScale"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},timeMax:{type:Number,attr:"time-max",watchCallbacks:["maxBoundChange"]},timeMin:{type:Number,attr:"time-min",watchCallbacks:["minBoundChange"]},width:{type:String,attr:"width",mutable:!0}}}static get events(){return[{name:"pointHover",method:"pointHover",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"window:resize",method:"onResize",passive:!0}]}static get style(){return"/*!\n *\n *    Copyright 2016  Cityzen Data\n *\n *    Licensed under the Apache License, Version 2.0 (the \"License\");\n *    you may not use this file except in compliance with the License.\n *    You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n *    Unless required by applicable law or agreed to in writing, software\n *    distributed under the License is distributed on an \"AS IS\" BASIS,\n *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *    See the License for the specific language governing permissions and\n *    limitations under the License.\n *\n */:host .chart-container{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"}}class l{constructor(){this.width="",this.height="",this.responsive=!1,this.showLegend=!1,this.gtsFilter="",this._options={showControls:!0,showGTSTree:!0},this._data=new o,this._toHide=[],this.showChart=!0,this.showMap=!1,this.LOG=new a(l),this.graphId="container-"+h.guid()}componentDidLoad(){this.line=this.el.shadowRoot.querySelector("div.bar"),this.main=this.el.shadowRoot.querySelector("div.maincontainer"),this.chart=this.el.shadowRoot.querySelector("warp-view-chart"),this.annotation=this.el.shadowRoot.querySelector("warp-view-annotation"),this.drawCharts()}onGtsFilter(t,e){e!==t&&this.drawCharts()}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawCharts())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawCharts())}stateChange(t){switch(this.LOG.debug(["stateChange"],t.detail),t.detail.id){case"timeSwitch":t.detail.state?this._options.timeMode="timestamp":this._options.timeMode="date",this.drawCharts();break;case"chartSwitch":this.showChart=t.detail.state,this.drawCharts();break;case"mapSwitch":this.showMap=t.detail.state,this.showMap&&window.setTimeout(()=>{this.el.shadowRoot.querySelector("#map").resize()},500)}}boundsDidChange(t){this.LOG.debug(["boundsDidChange"],t.detail),this._timeMin=t.detail.bounds.min,this._timeMax=t.detail.bounds.max,this.line.style.left="-100px"}handleMouseMove(t){this.line=this.el.shadowRoot.querySelector("div.bar"),this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(()=>{this.line.style.display="block",this.line.style.left=Math.max(t.offsetX,100)+"px"},1))}handleMouseOut(t){this.LOG.debug(["handleMouseOut"],t),this.line.style.left=Math.max(t.offsetX,100)+"px",this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(()=>{this.line.style.left="-100px",this.line.style.display="none"},500))}onResize(t){const e=this.el.shadowRoot.querySelector("#"+this.graphId);this.LOG.debug(["warpViewChartResize"],[t.detail,e]),e&&(e.style.height=t.detail.h+"px")}warpViewSelectedGTS(t){this.LOG.debug(["warpViewSelectedGTS"],t.detail),this._toHide.find(e=>e===t.detail.label)||t.detail.selected?this._toHide=this._toHide.filter(e=>e!==t.detail.label):this._toHide.push(t.detail.label),this.LOG.debug(["warp-viewSelectedGTS"],this._toHide),this._toHide=this._toHide.slice(),this.drawCharts()}drawCharts(){this.LOG.debug(["drawCharts"],[this.data,this.options]),this._options=h.mergeDeep(this._options,this.options),this._data=i.getData(this.data);let t=new n;t="string"==typeof this.options?JSON.parse(this.options):this.options,this._options=h.mergeDeep(this._options,t),this.LOG.debug(["drawCharts","parsed"],[this._data,this._options])}render(){return t("div",null,this._options.showControls?t("div",{class:"inline"},t("warp-view-toggle",{id:"timeSwitch","text-1":"Date","text-2":"Timestamp"}),t("warp-view-toggle",{id:"chartSwitch","text-1":"Hide chart","text-2":"Display chart",checked:this.showChart}),t("warp-view-toggle",{id:"mapSwitch","text-1":"Hide map","text-2":"Display map",checked:this.showMap})):"",this._options.showGTSTree?t("warp-view-gts-tree",{data:this._data,id:"tree",gtsFilter:this.gtsFilter,options:this._options}):"",this.showChart?t("div",{class:"maincontainer",onMouseMove:t=>this.handleMouseMove(t),onMouseLeave:t=>this.handleMouseOut(t)},t("div",{class:"bar"}),t("div",{class:"annotation"},t("warp-view-annotation",{data:this._data,responsive:this.responsive,id:"annotation","show-legend":this.showLegend,timeMin:this._timeMin,timeMax:this._timeMax,hiddenData:this._toHide,options:this._options})),t("div",{style:{width:"100%",height:"768px"},id:this.graphId},t("warp-view-chart",{id:"chart",responsive:this.responsive,standalone:!1,data:this._data,hiddenData:this._toHide,options:this._options}))):"",this.showMap?t("div",{style:{width:"100%",height:"768px"}},t("warp-view-map",{options:this._options,id:"map",data:this._data,responsive:this.responsive,hiddenData:this._toHide})):"")}static get is(){return"warp-view-plot"}static get encapsulation(){return"shadow"}static get properties(){return{_data:{state:!0},_options:{state:!0},_timeMax:{state:!0},_timeMin:{state:!0},_toHide:{state:!0},data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},height:{type:String,attr:"height",mutable:!0},options:{type:String,attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showChart:{state:!0},showLegend:{type:Boolean,attr:"show-legend"},showMap:{state:!0},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"stateChange",method:"stateChange"},{name:"boundsDidChange",method:"boundsDidChange"},{name:"warpViewChartResize",method:"onResize"},{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS"}]}static get style(){return"/*!\n *\n *    Copyright 2016  Cityzen Data\n *\n *    Licensed under the Apache License, Version 2.0 (the \"License\");\n *    you may not use this file except in compliance with the License.\n *    You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n *    Unless required by applicable law or agreed to in writing, software\n *    distributed under the License is distributed on an \"AS IS\" BASIS,\n *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *    See the License for the specific language governing permissions and\n *    limitations under the License.\n *\n */:host{position:relative}:host .maincontainer{position:relative}:host .bar{width:1px;left:-100px;position:absolute;background-color:var(--warp-view-bar-color,red);top:0;bottom:55px;overflow:hidden;display:none;z-index:999}:host .inline{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-evenly;-webkit-justify-content:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;width:100%}:host .annotation{max-width:calc(100% - 18px)}"}}class p{constructor(){this.checked=!1,this.text1="",this.text2="",this.state=!1}componentWillLoad(){this.state=this.checked}switched(){this.state=!this.state,this.stateChange.emit({state:this.state,id:this.el.id})}render(){return t("div",{class:"container"},t("div",{class:"text"},this.text1),t("label",{class:"switch"},this.state?t("input",{type:"checkbox",class:"switch-input",checked:!0,onClick:()=>this.switched()}):t("input",{type:"checkbox",class:"switch-input",onClick:()=>this.switched()}),t("span",{class:"switch-label"}),t("span",{class:"switch-handle"})),t("div",{class:"text"},this.text2))}static get is(){return"warp-view-toggle"}static get encapsulation(){return"shadow"}static get properties(){return{checked:{type:Boolean,attr:"checked"},el:{elementRef:!0},state:{state:!0},text1:{type:String,attr:"text-1"},text2:{type:String,attr:"text-2"}}}static get events(){return[{name:"stateChange",method:"stateChange",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"/*!\n *\n *    Copyright 2016  Cityzen Data\n *\n *    Licensed under the Apache License, Version 2.0 (the \"License\");\n *    you may not use this file except in compliance with the License.\n *    You may obtain a copy of the License at\n *\n *      http://www.apache.org/licenses/LICENSE-2.0\n *\n *    Unless required by applicable law or agreed to in writing, software\n *    distributed under the License is distributed on an \"AS IS\" BASIS,\n *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *    See the License for the specific language governing permissions and\n *    limitations under the License.\n *\n */:host .switch{position:relative;margin-top:auto;margin-bottom:auto;display:block;width:var(--warp-view-switch-width,100px);height:var(--warp-view-switch-height,30px);padding:3px;border-radius:var(--warp-view-switch-radius,18px);cursor:pointer}:host .switch-input{display:none}:host .switch-label{position:relative;display:block;height:inherit;text-transform:uppercase;background:var(--warp-view-switch-inset-color,#eceeef);border-radius:inherit;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15);box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15)}:host .switch-input:checked~.switch-label{background:var(--warp-view-switch-inset-checked-color,#00cd00);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2);box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2)}:host .switch-handle{position:absolute;top:4px;left:4px;width:calc(var(--warp-view-switch-height,30px) - 2px);height:calc(var(--warp-view-switch-height,30px) - 2px);background:var(--warp-view-switch-handle-color,radial-gradient(#fff 15%,#f0f0f0 100%));border-radius:100%;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.2);box-shadow:1px 1px 5px rgba(0,0,0,.2)}:host .switch-input:checked~.switch-handle{left:calc(var(--warp-view-switch-width,100px) - var(--warp-view-switch-height,30px) + 4px);background:var(--warp-view-switch-handle-checked-color,radial-gradient(#fff 15%,#00cd00 100%));-webkit-box-shadow:-1px 1px 5px rgba(0,0,0,.2);box-shadow:-1px 1px 5px rgba(0,0,0,.2)}:host .switch-handle,:host .switch-label{-webkit-transition:All .3s ease;transition:All .3s ease;-webkit-transition:All .3s ease;-moz-transition:All .3s ease;-o-transition:All .3s ease}:host .container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host .text{color:var(--warp-view-font-color,#000);padding:7px}"}}export{d as WarpViewAnnotation,l as WarpViewPlot,p as WarpViewToggle};