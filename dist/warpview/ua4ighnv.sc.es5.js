/*! Built with http://stenciljs.com */
warpview.loadBundle("ua4ighnv",["exports","./chunk-4d253462.js","./chunk-68ffd5be.js","./chunk-a7af8df8.js","./chunk-97216db3.js"],function(t,e,i,s,n){var o=window.warpview.h,a=function(){function t(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new i.Param,this.width="",this.height="",this.LOG=new i.Logger(t),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+i.ChartLib.guid().split("-").join(""),this._mapIndex={},this.parentWidth=-1}return t.prototype.onResize=function(){var t=this;this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250))},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.buildGraph=function(){this._options=i.ChartLib.mergeDeep(this._options,this.options);var t=this.el.shadowRoot.querySelector("#"+this.uuid),s=this.gtsToData(this.data);if(s){var n=this._options.gridLineColor,o={legend:{display:this.showLegend},animation:{duration:0},tooltips:{mode:"index",position:"nearest"},scales:{xAxes:[{type:"time",gridLines:{color:n,zeroLineColor:n},ticks:{fontColor:n}}],yAxes:[{gridLines:{color:n,zeroLineColor:n},ticks:{fontColor:n},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]},responsive:this.responsive};"timestamp"===this._options.timeMode?(o.scales.xAxes[0].time=void 0,o.scales.xAxes[0].type="linear",o.scales.xAxes[0].ticks={fontColor:n}):(o.scales.xAxes[0].time={displayFormats:{millisecond:"HH:mm:ss.SSS",second:"HH:mm:ss",minute:"HH:mm",hour:"HH"}},o.scales.xAxes[0].ticks={fontColor:n},o.scales.xAxes[0].type="time"),this._chart&&this._chart.destroy(),this._chart=new e.Chart(t,{type:"bar",data:{labels:s.ticks,datasets:s.datasets},options:o}),this.onResize()}},t.prototype.drawChart=function(){this._options=i.ChartLib.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.data&&this.buildGraph()},t.prototype.gtsToData=function(t){var e=this;this.LOG.debug(["gtsToData"],t);var o,a=[],r=[],h=0;if("string"==typeof t&&(t=JSON.parse(this.data)),i.GTSLib.isArray(t)&&t[0]&&(t[0]instanceof i.DataModel||t[0].hasOwnProperty("data"))&&(t=t[0]),t instanceof i.DataModel||t.hasOwnProperty("data")?(o=t.data,this._options=i.ChartLib.mergeDeep(this._options,t.globalParams||{})):o=t,o&&0!==o.length)return(o=i.GTSLib.flatDeep(o)).forEach(function(t){var o=[];if(t.v){i.GTSLib.gtsSort(t),t.v.forEach(function(t){"timestamp"===e._options.timeMode?r.push(t[0]):r.push(n.moment.utc(t[0]/1e3)),o.push(t[t.length-1])});var p=s.ColorLib.getColor(h),l=i.GTSLib.serializeGtsMetadata(t);e._mapIndex[l]=h;var d={label:l,data:o,borderColor:p,borderWidth:1,backgroundColor:s.ColorLib.transparentize(p,.5)};a.push(d),h++}}),this.LOG.debug(["gtsToData","datasets"],a),{datasets:a,ticks:i.GTSLib.unique(r).sort(function(t,e){return t>e?1:t===e?0:-1})}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return o("div",null,o("div",{class:"chart-container"},o("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"warp-view-bar"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-bar-host]   div[data-warp-view-bar]{height:var(--warp-view-chart-height,100%)}[data-warp-view-bar-host]   .chart-container[data-warp-view-bar]{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),r=function(){function t(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new i.Param,this.width="",this.height="",this._options={gridLineColor:"#8e8e8e"},this.LOG=new i.Logger(t),this.uuid="chart-"+i.ChartLib.guid().split("-").join(""),this.parentWidth=-1}return t.prototype.onResize=function(){var t=this;this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250))},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){this._options=i.ChartLib.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";var t=this.el.shadowRoot.querySelector("#"+this.uuid);if(this.data){var s,n=this.data;"string"==typeof n&&(n=JSON.parse(n)),i.GTSLib.isArray(n)&&n[0]&&(n[0]instanceof i.DataModel||n[0].hasOwnProperty("data"))&&(n=n[0]),n instanceof i.DataModel||n.hasOwnProperty("data")?(s=n.data,this._options=i.ChartLib.mergeDeep(this._options,n.globalParams||{})):s=n;var o=this._options.gridLineColor,a={legend:{display:this.showLegend},layout:{padding:{left:0,right:50,top:50,bottom:50}},borderWidth:1,animation:{duration:0},scales:{xAxes:[{gridLines:{color:o,zeroLineColor:o},ticks:{fontColor:o}}],yAxes:[{gridLines:{color:o,zeroLineColor:o},ticks:{fontColor:o},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]},responsive:this.responsive},r=this.parseData(s);this.LOG.debug(["drawChart"],[a,r]),this._chart&&this._chart.destroy(),this._chart=new e.Chart(t,{type:"bubble",tooltips:{mode:"x",position:"nearest",callbacks:i.ChartLib.getTooltipCallbacks()},data:{datasets:r},options:a}),this.onResize()}},t.prototype.parseData=function(t){if(t){for(var e=[],n=function(n){var o=Object.keys(t[n])[0],a=[],r=t[n][o];i.GTSLib.isArray(r)&&r.forEach(function(t){a.push({x:t[0],y:t[1],r:t[2]})}),e.push({data:a,label:o,backgroundColor:s.ColorLib.transparentize(s.ColorLib.getColor(n),.5),borderColor:s.ColorLib.getColor(n),borderWidth:1})},o=0;o<t.length;o++)n(o);return e}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return o("div",null,o("div",{class:"chart-container"},o("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"warp-view-bubble"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-bubble-host]   div[data-warp-view-bubble]{height:var(--warp-view-chart-height,100%)}[data-warp-view-bubble-host]   .chart-container[data-warp-view-bubble]{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),h=function(){function t(){this.unit="",this.responsive=!1,this.options=new i.Param,this.width="",this.height="",this.LOG=new i.Logger(t),this.toDisplay="",this._options=new i.Param}return t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["onData"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){this.LOG.debug(["drawChart"],[this.options,this._options]),this._options=i.ChartLib.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"px",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"px";var t=this.data;if(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}i.GTSLib.isArray(t)&&t[0]&&(t[0]instanceof i.DataModel||t[0].hasOwnProperty("data"))&&(t=t[0]),t instanceof i.DataModel||t.hasOwnProperty("data")?(this.toDisplay=i.GTSLib.isArray(t.data)?t.data[0]:t.data,this._options=i.ChartLib.mergeDeep(this._options,t.globalParams||{})):this.toDisplay=i.GTSLib.isArray(t)?t[0]:t,this.LOG.debug(["drawChart"],[t,this.toDisplay])}},t.prototype.getStyle=function(){if(this.LOG.debug(["getStyle"],this._options),this._options){var t={"background-color":this._options.bgColor||"transparent"};return this._options.fontColor&&(t.color=this._options.fontColor),this.LOG.debug(["getStyle","style"],t),t}return{}},t.prototype.componentDidLoad=function(){this.LOG.debug(["componentDidLoad"],this._options),this.drawChart()},t.prototype.render=function(){return o("div",null,this.toDisplay&&""!==this.toDisplay?o("div",{class:"chart-container",id:"#wrapper"},o("div",{style:this.getStyle()},o("div",{class:"value"},this.toDisplay+"",o("small",null,this.unit)))):o("warp-view-spinner",null))},Object.defineProperty(t,"is",{get:function(){return"warp-view-display"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-display-host]   div[data-warp-view-display]{height:var(--warp-view-chart-height,100%)}[data-warp-view-display-host]   .chart-container[data-warp-view-display]{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative;color:var(--warp-view-font-color,#000)}[data-warp-view-display-host]   .chart-container[data-warp-view-display]   div[data-warp-view-display]{font-size:10rem;height:100%;width:100%}[data-warp-view-display-host]   .chart-container[data-warp-view-display]   div[data-warp-view-display]   .value[data-warp-view-display]{position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);text-align:center;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}[data-warp-view-display-host]   .chart-container[data-warp-view-display]   div[data-warp-view-display]   .value[data-warp-view-display]   small[data-warp-view-display]{font-size:3rem}"},enumerable:!0,configurable:!0}),t}(),p=function(){function t(){this.imageTitle="",this.responsive=!1,this.options=new i.Param,this.width="",this.height="",this.LOG=new i.Logger(t),this._options=new i.Param}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["onData"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){var t=this;if(this.LOG.debug(["drawChart"],[this.options,this._options]),this._options=i.ChartLib.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"px",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"px",this.toDisplay=[],this.data){var e=this.data;if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}e instanceof i.DataModel||e.hasOwnProperty("data")?e.data&&e.data.length>0&&i.GTSLib.isEmbeddedImage(e.data[0])?(this._options=i.ChartLib.mergeDeep(this._options,e.globalParams||{}),this.toDisplay.push(e.data[0])):e.data&&i.GTSLib.isEmbeddedImage(e.data)&&this.toDisplay.push(e.data):i.GTSLib.isArray(e)&&e.forEach(function(e){i.GTSLib.isEmbeddedImage(e)&&t.toDisplay.push(e)}),this.LOG.debug(["drawChart"],[this.data,this.toDisplay])}},t.prototype.getStyle=function(){if(this.LOG.debug(["getStyle"],this._options),this._options){var t={"background-color":this._options.bgColor||"transparent"};return this._options.fontColor&&(t.color=this._options.fontColor),this.LOG.debug(["getStyle","style"],t),t}return{}},t.prototype.componentDidLoad=function(){this.LOG.debug(["componentDidLoad"],this._options),this.drawChart()},t.prototype.render=function(){var t=this;return o("div",null,this.toDisplay?o("div",{class:"chart-container",id:"#wrapper"},this.toDisplay.map(function(e){return o("div",{style:t.getStyle()},o("img",{src:e,class:"responsive"}))})):o("warp-view-spinner",null))},Object.defineProperty(t,"is",{get:function(){return"warp-view-image"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},imageTitle:{type:String,attr:"image-title"},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-image-host]   div[data-warp-view-image]{height:var(--warp-view-chart-height,100%)}[data-warp-view-image-host]   .chart-container[data-warp-view-image]{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}[data-warp-view-image-host]   .chart-container[data-warp-view-image]   div[data-warp-view-image]{font-size:10rem;height:100%;width:100%}[data-warp-view-image-host]   .chart-container[data-warp-view-image]   div[data-warp-view-image]   .responsive[data-warp-view-image]{width:calc(100% - 10px);height:auto}"},enumerable:!0,configurable:!0}),t}(),l=function(){function t(){this.showLegend=!0,this.options=new i.Param,this.width="",this.height="",this.responsive=!1,this.LOG=new i.Logger(t),this._options={type:"pie"},this.uuid="chart-"+i.ChartLib.guid().split("-").join(""),this.parentWidth=-1}return t.prototype.onResize=function(){var t=this;this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250))},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.parseData=function(t){if(this.LOG.debug(["parseData"],t),t){var e,s=[],n=[];return"string"==typeof t&&(t=JSON.parse(t)),i.GTSLib.isArray(t)&&t[0]&&(t[0]instanceof i.DataModel||t[0].hasOwnProperty("data"))&&(t=t[0]),t instanceof i.DataModel||t.hasOwnProperty("data")?(e=t.data,this._options=i.ChartLib.mergeDeep(this._options,t.globalParams||{})):e=t,e.forEach(function(t){n.push(t[1]),s.push(t[0])}),this.LOG.debug(["parseData"],[s,n]),{labels:s,data:n}}},t.prototype.drawChart=function(){this._options=i.ChartLib.mergeDeep(this._options,this.options);var t=this.el.shadowRoot.querySelector("#"+this.uuid),n=this.parseData(this.data);n&&(this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.LOG.debug(["drawChart"],[this.data,this._options,n]),this._chart&&(this._chart.destroy(),delete this._chart),this.LOG.debug(["data.data"],n.data),n.data&&n.data.length>0&&(this._options.type=this.options.type||this._options.type,this._chart=new e.Chart(t,{type:"gauge"===this._options.type?"doughnut":this._options.type,data:{datasets:[{data:n.data,backgroundColor:s.ColorLib.generateTransparentColors(n.data.length),borderColor:s.ColorLib.generateColors(n.data.length)}],labels:n.labels},options:{legend:{display:this.showLegend},animation:{duration:0},responsive:this.responsive,tooltips:{mode:"index",intersect:!0},circumference:this.getCirc(),rotation:this.getRotation()}}),this.onResize()))},t.prototype.getRotation=function(){return"gauge"===this._options.type?Math.PI:-.5*Math.PI},t.prototype.getCirc=function(){return"gauge"===this._options.type?Math.PI:2*Math.PI},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return o("div",null,o("div",{class:"chart-container"},o("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"warp-view-pie"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-pie-host]   div[data-warp-view-pie]{width:calc(var(--warp-view-chart-width,100%));height:calc(var(--warp-view-chart-height,100%) - 10px)}[data-warp-view-pie-host]   .chart-container[data-warp-view-pie]{position:relative;margin:auto}"},enumerable:!0,configurable:!0}),t}(),d=function(){function t(){this.responsive=!1,this.showLegend=!0,this.options=new i.Param,this.width="",this.height="",this.LOG=new i.Logger(t),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+i.ChartLib.guid().split("-").join(""),this.parentWidth=-1}return t.prototype.onResize=function(){var t=this;this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250))},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.parseData=function(t){var e=[],i=[];return t.forEach(function(t){i.push(Math.abs(t[1])),e.push(t[0])}),{labels:e,data:i}},t.prototype.drawChart=function(){this._options=i.ChartLib.mergeDeep(this._options,this.options);var t=this.el.shadowRoot.querySelector("#"+this.uuid);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";var n=this._options.gridLineColor;if(this.data){var o,a=this.data;"string"==typeof a&&(a=JSON.parse(a)),i.GTSLib.isArray(a)&&a[0]&&(a[0]instanceof i.DataModel||a[0].hasOwnProperty("data"))&&(a=a[0]),o=a instanceof i.DataModel||a.hasOwnProperty("data")?a.data:a;var r=this.parseData(o);this._chart&&(this._chart.destroy(),delete this._chart),this.LOG.debug(["gts.data"],r.data),r&&r.data&&r.data.length>0&&(this._chart=new e.Chart(t,{type:"polarArea",data:{datasets:[{data:r.data,backgroundColor:s.ColorLib.generateTransparentColors(r.data.length),borderColor:s.ColorLib.generateColors(r.data.length)}],labels:r.labels},options:{layout:{padding:{left:0,right:0,top:50,bottom:0}},animation:{duration:0},legend:{display:this.showLegend},responsive:this.responsive,scale:{gridLines:{color:n,zeroLineColor:n},pointLabels:{fontColor:n},ticks:{fontColor:n,backdropColor:"transparent"}},tooltips:{mode:"index",intersect:!0}}}),this.onResize())}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return o("div",null,o("div",{class:"chart-container"},o("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"warp-view-polar"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-polar-host]   div[data-warp-view-polar]{height:var(--warp-view-chart-height,100%)}[data-warp-view-polar-host]   .chart-container[data-warp-view-polar]{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),u=function(){function t(){this.responsive=!0,this.showLegend=!0,this.options=new i.Param,this.width="",this.height="",this.LOG=new i.Logger(t),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+i.ChartLib.guid().split("-").join(""),this.parentWidth=-1}return t.prototype.onResize=function(){var t=this;this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250))},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.parseData=function(t){this.LOG.debug(["gtsToData"],t);var e=[],i={};if(t&&0!==t.length){var n=0;return t.forEach(function(t){Object.keys(t).forEach(function(o){var a={label:o,data:[],backgroundColor:s.ColorLib.transparentize(s.ColorLib.getColor(n),.5),borderColor:s.ColorLib.getColor(n)};t[o].forEach(function(t){var e=Object.keys(t)[0];i[e]=0,a.data.push(t[e])}),e.push(a),n++})}),this.LOG.debug(["gtsToData","datasets"],[e,Object.keys(i)]),{datasets:e,labels:Object.keys(i)}}},t.prototype.drawChart=function(){this._options=i.ChartLib.mergeDeep(this._options,this.options);var t=this.el.shadowRoot.querySelector("#"+this.uuid);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";var s=this._options.gridLineColor,n=this.data;if(n){var o;"string"==typeof n&&(n=JSON.parse(n)),i.GTSLib.isArray(n)&&n[0]&&(n[0]instanceof i.DataModel||n[0].hasOwnProperty("data"))&&(n=n[0]),o=n instanceof i.DataModel||n.hasOwnProperty("data")?n.data:n;var a=this.parseData(o);a&&(this._chart&&(this._chart.destroy(),delete this._chart),this.LOG.debug(["gts.data"],a.datasets),a.datasets&&a.datasets.length>0&&(this._chart=new e.Chart(t,{type:"radar",legend:{display:this.showLegend},data:{labels:a.labels,datasets:a.datasets},options:{layout:{padding:{left:0,right:0,top:50,bottom:0}},animation:{duration:0},legend:{display:this.showLegend},responsive:this.responsive,scale:{gridLines:{color:s,zeroLineColor:s},pointLabels:{fontColor:s},ticks:{fontColor:s,backdropColor:"transparent"}},tooltips:{mode:"index",intersect:!0}}}),this.onResize()))}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return o("div",null,o("div",{class:"chart-container"},o("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"warp-view-radar"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-radar-host]   div[data-warp-view-radar]{height:var(--warp-view-chart-height,100%)}[data-warp-view-radar-host]   .chart-container[data-warp-view-radar]{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),c=function(){function t(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new i.Param,this.width="",this.height="",this.LOG=new i.Logger(t),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+i.ChartLib.guid().split("-").join(""),this.parentWidth=-1}return t.prototype.onResize=function(){var t=this;this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250))},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){this._options=i.ChartLib.mergeDeep(this._options,this.options);var t,s=this.el.shadowRoot.querySelector("#"+this.uuid),n=this.data;if(n){"string"==typeof n&&(n=JSON.parse(n)),i.GTSLib.isArray(n)&&n[0]&&(n[0]instanceof i.DataModel||n[0].hasOwnProperty("data"))&&(n=n[0]),t=n instanceof i.DataModel||n.hasOwnProperty("data")?n.data:n;var o=this.gtsToScatter(t);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";var a=this._options.gridLineColor,r={legend:{display:this.showLegend},responsive:this.responsive,animation:{duration:0},tooltips:{mode:"x",position:"nearest",callbacks:i.ChartLib.getTooltipCallbacks()},scales:{xAxes:[{gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a}}],yAxes:[{gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]}};"timestamp"===this._options.timeMode?(r.scales.xAxes[0].time=void 0,r.scales.xAxes[0].type="linear",r.scales.xAxes[0].ticks={fontColor:a}):(r.scales.xAxes[0].time={displayFormats:{millisecond:"HH:mm:ss.SSS",second:"HH:mm:ss",minute:"HH:mm",hour:"HH"}},r.scales.xAxes[0].ticks={fontColor:a},r.scales.xAxes[0].type="time"),this._chart&&this._chart.destroy(),this._chart=new e.Chart.Scatter(s,{data:{datasets:o},options:r}),this.onResize(),this.LOG.debug(["gtsToScatter","chart"],[o,r])}},t.prototype.gtsToScatter=function(t){var e=this;if(t){this.LOG.debug(["gtsToScatter"],t);for(var o=[],a=function(a){var r=t[a],h=[];r.v.forEach(function(t){"timestamp"===e._options.timeMode?h.push({x:t[0],y:t[t.length-1]}):h.push({x:n.moment.utc(t[0]/1e3),y:t[t.length-1]})}),o.push({label:i.GTSLib.serializeGtsMetadata(r),data:h,pointRadius:2,borderColor:s.ColorLib.getColor(a),backgroundColor:s.ColorLib.transparentize(s.ColorLib.getColor(a),.5)})},r=0;r<t.length;r++)a(r);return this.LOG.debug(["gtsToScatter","datasets"],o),o}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return o("div",null,o("div",{class:"chart-container"},o("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"warp-view-scatter"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-scatter-host]   div[data-warp-view-scatter]{height:var(--warp-view-chart-height,100%)}[data-warp-view-scatter-host]   .chart-container[data-warp-view-scatter]{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),g=function(){function t(){this.LOG=new i.Logger(t),this.unit="",this.type="line",this.chartTitle="",this.responsive=!1,this.showLegend=!1,this.url="",this.gtsFilter="",this.warpscript="",this.graphs={scatter:["scatter"],chart:["line","spline","step","area"],pie:["pie","doughnut","gauge"],polar:["polar"],radar:["radar"],bar:["bar"],annotation:["annotation"],"gts-tree":["gts-tree"]},this.loading=!0}return t.prototype.onOptions=function(t,e){this.LOG.debug(["options"],t),e!==t&&(this.LOG.debug(["options","changed"],t),this.parseGTS())},t.prototype.onGtsFilter=function(t,e){e!==t&&this.parseGTS()},t.prototype.resize=function(){this.execute()},t.prototype.handleKeyDown=function(t){"r"===t.key&&this.execute()},t.prototype.componentDidLoad=function(){this.execute()},t.prototype.parseGTS=function(){var t=this,e=new i.DataModel;if(i.GTSLib.isArray(this.gtsList)&&1===this.gtsList.length){var s=this.gtsList[0];s.hasOwnProperty("data")?(e.data=s.data,e.globalParams=s.globalParams||{},e.globalParams.type=e.globalParams.type||this.type,e.params=s.params):(e.data=s,e.globalParams={type:this.type})}else e.data=this.gtsList,e.globalParams={type:this.type};this.LOG.debug(["parseGTS","data"],e),this.data=e,this._options=i.ChartLib.mergeDeep(this.options||{},e.globalParams),this.LOG.debug(["parseGTS","options"],this._options),this._autoRefresh!==this._options.autoRefresh&&(this._autoRefresh=this._options.autoRefresh,this.timer&&window.clearInterval(this.timer),this._autoRefresh&&this._autoRefresh>0&&(this.timer=window.setInterval(function(){return t.execute()},1e3*this._autoRefresh))),this.loading=!1},t.prototype.execute=function(){var t=this;this.loading=!0,this.warpscript=this.wsElement.textContent,this.LOG.debug(["execute","warpscript"],this.warpscript),fetch(this.url,{method:"POST",body:this.warpscript}).then(function(e){e.text().then(function(e){t.LOG.debug(["execute","response"],e);try{t.gtsList=JSON.parse(e),t.parseGTS()}catch(e){t.LOG.error(["execute"],e)}t.loading=!1},function(e){t.LOG.error(["execute"],[e,t.url,t.warpscript]),t.loading=!1})},function(e){t.LOG.error(["execute"],[e,t.url,t.warpscript]),t.loading=!1})},t.prototype.render=function(){return o("div",{class:"wrapper",id:"wrapper"},o("div",{class:"warpscript"},o("slot",null)),this.graphs.scatter.indexOf(this.type)>-1?o("div",null,o("h1",null,this.chartTitle),o("div",{class:"tile"},o("warp-view-scatter",{responsive:this.responsive,unit:this.unit,data:this.data,options:this._options,"show-legend":this.showLegend}))):"",this.graphs.chart.indexOf(this.type)>-1?o("div",null,o("h1",null,this.chartTitle),o("div",{class:"tile"},o("warp-view-chart",{type:this.type,responsive:this.responsive,unit:this.unit,data:this.data,options:this._options,"show-legend":this.showLegend}))):"","bubble"==this.type?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-bubble",{showLegend:this.showLegend,responsive:!0,unit:this.unit,data:this.data,options:this._options}))):"","map"==this.type?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-map",{responsive:!0,data:this.data,options:this._options}))):"",this.graphs.pie.indexOf(this.type)>-1?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-pie",{responsive:this.responsive,data:this.data,options:this._options,showLegend:this.showLegend}))):"",this.graphs.polar.indexOf(this.type)>-1?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-polar",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"",this.graphs.radar.indexOf(this.type)>-1?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-radar",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"",this.graphs.bar.indexOf(this.type)>-1?o("div",null,o("h1",null,this.chartTitle),o("div",{class:"tile"},o("warp-view-bar",{responsive:this.responsive,unit:this.unit,data:this.data,showLegend:this.showLegend,options:this._options}))):"","text"==this.type?o("div",null,o("h1",null,this.chartTitle),o("div",{class:"tile"},o("warp-view-display",{responsive:this.responsive,unit:this.unit,data:this.data,options:this._options}))):"","image"==this.type?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-image",{responsive:this.responsive,data:this.data,options:this._options}))):"","plot"==this.type?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-plot",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options,gtsFilter:this.gtsFilter}))):"","annotation"==this.type?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-annotation",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"","gts-tree"==this.type?o("div",null,o("h1",null,this.chartTitle,o("small",null,this.unit)),o("div",{class:"tile"},o("warp-view-gts-tree",{data:this.data,options:this._options}))):"",this.loading?o("warp-view-spinner",null):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-tile"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{chartTitle:{type:String,attr:"chart-title"},data:{state:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},resize:{method:!0},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},url:{type:String,attr:"url"},wsElement:{elementRef:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"document:keyup",method:"handleKeyDown"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-tile-host]{--warp-view-chart-height:100%}[data-warp-view-tile-host]   .warpscript[data-warp-view-tile]{display:none}[data-warp-view-tile-host]   .wrapper[data-warp-view-tile]{min-height:var(--warp-view-tile-height,400px);width:var(--warp-view-tile-width,100%);height:var(--warp-view-tile-height,100%)}[data-warp-view-tile-host]   .wrapper[data-warp-view-tile]   .tile[data-warp-view-tile]{width:100%;height:calc(var(--warp-view-tile-height,100%) - 40px);overflow-y:auto;overflow-x:hidden}[data-warp-view-tile-host]   .wrapper[data-warp-view-tile]   h1[data-warp-view-tile]{font-size:20px;padding:5px;margin:0;color:var(--warp-view-font-color,#000)}[data-warp-view-tile-host]   .wrapper[data-warp-view-tile]   h1[data-warp-view-tile]   small[data-warp-view-tile]{font-size:10px;margin-left:10px}"},enumerable:!0,configurable:!0}),t}();t.WarpViewBar=a,t.WarpViewBubble=r,t.WarpViewDisplay=h,t.WarpViewImage=p,t.WarpViewPie=l,t.WarpViewPolar=d,t.WarpViewRadar=u,t.WarpViewScatter=c,t.WarpViewTile=g,Object.defineProperty(t,"__esModule",{value:!0})});