/*! Built with http://stenciljs.com */
quantumviz.loadBundle("jtuytcw4",["exports","./chunk-d9eae628.js","./chunk-aca7b1ce.js","./chunk-6ce451e2.js","./chunk-12ee72ee.js"],function(t,e,i,a,s){var r=window.quantumviz.h,n=function(){function t(){this.alone=!0,this.unit="",this.type="line",this.chartTitle="",this.responsive=!1,this.showLegend=!1,this.data="[]",this.hiddenData="[]",this.options="{}",this.width="",this.height="",this.config="{}",this.xView="{}",this.yView="{}",this._mapIndex={},this._xSlider={element:null,min:0,max:0},this._ySlider={element:null,min:0,max:0},this._config={rail:{class:""},cursor:{class:""}},this._type="timestamp"}return t.prototype.toBase64Image=function(){return this._chart.toBase64Image()},t.prototype.redraw=function(t,e){e!==t&&this.drawChart()},t.prototype.changeScale=function(t,e){if(e!==t){var i=JSON.parse(t);console.log("changeScale",this._data),"timestamp"===i.time.timeMode?(delete this._chart.options.scales.xAxes[0].type,this._type="timestamp"):(this._type="time",this._chart.options.scales.xAxes[0].type="time",this._chart.options.scales.xAxes[0].ticks.stepSize=i.time.stepSize,this._chart.options.scales.xAxes[0].ticks.unit=i.time.unit),this._chart.update()}},t.prototype.hideData=function(t,e){var a=this;if(e!==t){var s=i.GTSLib.cleanArray(JSON.parse(t));if(this._data=JSON.parse(this.data),!this._data)return;Object.keys(this._mapIndex).forEach(function(t){a._chart.getDatasetMeta(a._mapIndex[t]).hidden=!!s.find(function(e){return e===t}),console.log(a._chart.getDatasetMeta(a._mapIndex[t]).dataset._children)}),this._chart.update()}},t.prototype.changeXView=function(){var t=JSON.parse(this.xView);"timestamp"===this._type?(this._chart.options.scales.xAxes[0].ticks.min=t.min,this._chart.options.scales.xAxes[0].ticks.max=t.max):(this._chart.options.scales.xAxes[0].ticks.min=e.moment(t.min,"x"),this._chart.options.scales.xAxes[0].ticks.max=e.moment(t.max,"x")),this._chart.update()},t.prototype.changeYView=function(){var t=JSON.parse(this.yView);this._chart.options.scales.yAxes[0].ticks.min=t.min,this._chart.options.scales.yAxes[0].ticks.max=t.max,this._chart.update()},t.prototype.buildGraph=function(){var t=this.el.shadowRoot.querySelector("#myChart"),i=this.gtsToData(this._data),a=i.ticks.slice().sort(function(t,e){return t-e});console.log("buildGraph",i,this.timeMin?this.timeMin:a[0]);var s=this,r={animation:!1,legend:{display:!1},tooltips:{mode:"x",position:"nearest",custom:function(t){t.opacity>0?s.pointHover.emit({x:t.dataPoints[0].x+15,y:this._eventPosition.y}):s.pointHover.emit({x:-100,y:this._eventPosition.y})}},scales:{xAxes:[{ticks:{},type:"time"}],yAxes:[{afterFit:function(t){t.width=100},scaleLabel:{display:!0,labelString:this.unit}}]},responsive:this.responsive};"timestamp"===this._type?(delete r.scales.xAxes[0].type,r.scales.xAxes[0].ticks={min:this.timeMin?this.timeMin:a[0],max:this.timeMax?this.timeMax:a[i.ticks.length-1],beginAtZero:!1}):r.scales.xAxes[0].ticks={min:e.moment(this.timeMin?this.timeMin:a[0],"x"),max:e.moment(this.timeMax?this.timeMax:a[i.ticks.length-1],"x"),unit:"day"},"spline"===this.type&&(r.elements={line:{lineTension:0}}),"area"===this.type&&(r.elements={line:{fill:"start"}}),this._chart=new e.Chart(t,{type:"bar"===this.type?this.type:"line",data:{labels:i.ticks,datasets:i.datasets},options:r});var n=[],o=[];if(i.datasets.forEach(function(t){var e=Math.max.apply(Math,t.data);e&&e!=1/0&&n.push(e)}),i.datasets.forEach(function(t){var e=Math.min.apply(Math,t.data);(0==e||e&&e!=1/0)&&o.push(e)}),this._ySlider.min=Math.min.apply(Math,o),this._ySlider.max=1.05*Math.max.apply(Math,n),this._chart.options.scales.yAxes[0].ticks.min=this._ySlider.min,this._chart.options.scales.yAxes[0].ticks.max=this._ySlider.max,this._chart.update(),this._xSlider.min=a[0],this._xSlider.max=a[a.length-1],this.alone)console.log("Not alone");else{console.log("Alone",a[0],a[a.length-1]);var h={xMin:a[0],xMax:a[a.length-1],yMin:Math.min.apply(Math,o),yMax:1.05*Math.max.apply(Math,n)};this.chartInfos.emit(h)}},t.prototype.drawChart=function(){this._data=JSON.parse(this.data),this._data&&this.buildGraph()},t.prototype.gtsToData=function(t){var e=this,a=[],s=[],r=0;if(t)return t.forEach(function(t){if(t.gts){t.gts=i.GTSLib.flatDeep(t.gts);var n=0;t.gts.forEach(function(o){var h=[];if(o.v){o.v.forEach(function(t){s.push(t[0]/1e3),h.push(t[t.length-1])});var l=i.GTSLib.getColor(r);t.params&&t.params[n]&&t.params[n].color&&(l=t.params[n].color);var c=i.GTSLib.serializeGtsMetadata(o);e._mapIndex[c]=r,t.params&&t.params[n]&&t.params[n].key&&(c=t.params[n].key);var p={label:c,data:h,pointRadius:0,fill:!1,steppedLine:e.isStepped(),borderColor:l,borderWidth:1,backgroundColor:i.GTSLib.transparentize(l,.5)};if(t.params&&t.params[n]&&t.params[n].interpolate)switch(t.params[n].interpolate){case"line":p.lineTension=0;break;case"spline":break;case"area":p.fill=!0}else p.lineTension=0;a.push(p),r++,n++}})}}),{datasets:a,ticks:i.GTSLib.unique(s)}},t.prototype.isStepped=function(){return!!this.type.startsWith("step")&&this.type.replace("step-","")},t.prototype.componentWillLoad=function(){this._config=i.GTSLib.mergeDeep(this._config,JSON.parse(this.config))},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return r("div",null,r("h1",null,this.chartTitle),r("div",{class:"chart-container"},this.responsive?r("canvas",{id:"myChart"}):r("canvas",{id:"myChart",width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"quantum-chart"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{alone:{type:Boolean,attr:"alone"},chartTitle:{type:String,attr:"chart-title"},config:{type:String,attr:"config"},data:{type:String,attr:"data",watchCallbacks:["redraw"]},el:{elementRef:!0},height:{type:String,attr:"height"},hiddenData:{type:String,attr:"hidden-data",watchCallbacks:["hideData"]},options:{type:String,attr:"options",watchCallbacks:["changeScale"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},timeMax:{type:Number,attr:"time-max"},timeMin:{type:Number,attr:"time-min"},toBase64Image:{method:!0},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width"},xView:{type:String,attr:"x-view",watchCallbacks:["changeXView"]},yView:{type:String,attr:"y-view",watchCallbacks:["changeYView"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"pointHover",method:"pointHover",bubbles:!0,cancelable:!0,composed:!0},{name:"boundsDidChange",method:"boundsDidChange",bubbles:!0,cancelable:!0,composed:!0},{name:"chartInfos",method:"chartInfos",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"quantum-chart .chart-container{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),o=function(){function t(){this.cursorSize="{}",this.config="{}",this._cursorMinWidth=30,this.lastPos=0}return t.prototype.changeCursorSize=function(t,e){var i=this;if(e!==t){var a=JSON.parse(t);a.cursorOffset+a.cursorSize<=100&&(this._cursor.style.left=(100*a.cursorOffset).toString()+"%",window.requestAnimationFrame(function(){a.cursorSize*i._rail.getBoundingClientRect().width<i._cursorMinWidth?i._cursor.style.width=i._cursorMinWidth.toString()+"px":i._cursor.style.width=(100*a.cursorSize).toString()+"%"}))}},t.prototype.initSize=function(t,e){e!==t&&(this._rail.style.width=(.94*t).toString()+"px",this._img.style.width=(t+18).toString()+"px")},t.prototype.componentWillLoad=function(){},t.prototype.componentDidLoad=function(){var t=this;this._rail=this.el.shadowRoot.querySelector("#rail"),this._cursor=this.el.shadowRoot.querySelector("#cursor"),this._img=this.el.shadowRoot.querySelector("#img");var e=new a.Draggabilly(this._cursor,{axis:"x",containment:this._rail});e.on("dragStart",function(e,i){t.dimsX(e)}),e.on("dragMove",function(e,i,a){if(e.pageX-t._mouseCursorLeftOffset>=t._railMin+1&&e.pageX+t._mouseCursorRightOffset<=t._railMax-1){var s=e.pageX-t._rail.offsetLeft-t._mouseCursorLeftOffset,r=(s=Math.max(0,s))/(t._railMax-t._railMin-t._cursorWidth)*(t.maxValue-t.minValue)+t.minValue;window.setTimeout(function(){return t.xSliderValueChanged.emit({sliderValue:r})})}})},t.prototype.dimsX=function(t){var e=this._rail.getBoundingClientRect(),i=this._cursor.getBoundingClientRect();this._railMin=this._rail.offsetLeft,this._railMax=e.width+this._rail.offsetLeft,this._cursorWidth=i.width,this._mouseCursorLeftOffset=t.pageX-this._cursor.offsetLeft-this._rail.offsetLeft,this._mouseCursorRightOffset=i.width-this._mouseCursorLeftOffset},t.prototype.xWheel=function(t){t.preventDefault();var e=this._rail.getBoundingClientRect(),i=(t.pageX-this._rail.offsetLeft)/e.width;this.xZoom.emit({zoomValue:{coef:i,zoomType:-1*t.deltaY}})},t.prototype.positionClick=function(t){if(t.preventDefault(),t.pageX<this._railMin+this._cursor.offsetLeft||t.pageX>this._railMin+this._cursor.offsetLeft+this._cursorWidth){this.dimsX(t);var e=this._cursorWidth/2,i=void 0;t.pageX-e<this._rail.offsetLeft?(i=0,this._cursor.style.left="1px"):t.pageX+e>this._railMax?(i=this._railMax-this._railMin-this._cursorWidth,this._cursor.style.left=i.toString()+"px"):(i=t.pageX-this._railMin-e,this._cursor.style.left=i.toString()+"px");var a=i/(this._railMax-this._railMin-this._cursorWidth)*(this.maxValue-this.minValue)+this.minValue;this.xSliderValueChanged.emit({sliderValue:a})}},t.prototype.render=function(){var t=this;return r("div",{id:"rail",onWheel:function(e){return t.xWheel(e)},onMouseUp:function(e){return t.positionClick(e)}},r("div",{id:"cursor"}),r("img",{id:"img",src:this.img}))},Object.defineProperty(t,"is",{get:function(){return"quantum-horizontal-zoom-map"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{config:{type:String,attr:"config"},cursorSize:{type:String,attr:"cursor-size",watchCallbacks:["changeCursorSize"]},el:{elementRef:!0},img:{type:String,attr:"img"},maxValue:{type:Number,attr:"max-value"},minValue:{type:Number,attr:"min-value"},width:{type:Number,attr:"width",watchCallbacks:["initSize"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"xSliderValueChanged",method:"xSliderValueChanged",bubbles:!0,cancelable:!0,composed:!0},{name:"xZoom",method:"xZoom",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return":host #rail{position:relative;border:1px solid #000;float:right;margin:0 0 0 100px;position:absolute;height:100px;width:100%;overflow:hidden}:host #img{position:absolute;height:100px;top:0;right:-1.5%}:host #cursor:hover{opacity:.6}:host #cursor{z-index:1;opacity:.3;background-color:grey;position:relative;cursor:move;width:100%;height:100%;border-left:3px solid red;border-right:3px solid red;-webkit-transition:left .01s;transition:left .01s}"},enumerable:!0,configurable:!0}),t}();t.QuantumChart=n,t.QuantumHorizontalZoomMap=o,Object.defineProperty(t,"__esModule",{value:!0})});