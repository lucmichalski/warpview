/*! Built with http://stenciljs.com */
const{h:t}=window.quantumviz;import{a as e}from"./chunk-49509f30.js";import{a as i}from"./chunk-7f4b1b2f.js";import{a as s}from"./chunk-f29847bd.js";import{a}from"./chunk-c6b875fd.js";import{a as o,b as h}from"./chunk-c685c707.js";import{a as r}from"./chunk-b534d406.js";import"./chunk-ee323282.js";class n{constructor(){this.unit="",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.options=new o,this.width="",this.height="",this.LOG=new a(n),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+s.guid().split("-").join(""),this._mapIndex={}}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}buildGraph(){this._options=s.mergeDeep(this._options,this.options);let t=this.el.shadowRoot.querySelector("#"+this.uuid),i=this.gtsToData(this.data);if(!i)return;const a=this._options.gridLineColor,o={legend:{display:this.showLegend},animation:{duration:0},tooltips:{mode:"index",position:"nearest"},scales:{xAxes:[{type:"time",gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a}}],yAxes:[{gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]},responsive:this.responsive};this._chart=new e(t,{type:"bar",data:{labels:i.ticks,datasets:i.datasets},options:o}),this._chart.update()}drawChart(){this._options=s.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.data&&this.buildGraph()}gtsToData(t){this.LOG.debug(["gtsToData"],t);let e,s=[],a=[],o=0;if((e=this.data instanceof h?t.data:t)&&0!==e.length)return(e=i.flatDeep(e)).forEach(t=>{let e=[];if(t.v){i.gtsSort(t),t.v.forEach(t=>{a.push(Math.floor(parseInt(t[0])/1e3)),e.push(t[t.length-1])});let h=r.getColor(o),n=i.serializeGtsMetadata(t);this._mapIndex[n]=o;let l={label:n,data:e,borderColor:h,borderWidth:1,backgroundColor:r.transparentize(h,.5)};s.push(l),o++}}),this.LOG.debug(["gtsToData","datasets"],s),{datasets:s,ticks:i.unique(a).sort((t,e)=>t>e?1:t===e?0:-1)}}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"quantum-bar"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get style(){return"[data-quantum-bar-host]   div[data-quantum-bar]{height:var(--quantum-chart-height,100%)}[data-quantum-bar-host]   .chart-container[data-quantum-bar]{width:var(--quantum-chart-width,100%);height:calc(var(--quantum-chart-height,100%) - 30px);position:relative}[data-quantum-bar-host]   h1[data-quantum-bar]{font-size:20px;padding:5px;margin:0;color:var(--quantum-font-color,#000)}"}}class l{constructor(){this.unit="",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.options=new o,this.width="",this.height="",this._options={gridLineColor:"#8e8e8e"},this.LOG=new a(l),this.uuid="chart-"+s.guid().split("-").join("")}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}drawChart(){this._options=s.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";let t,i=this.el.shadowRoot.querySelector("#"+this.uuid);if(!this.data)return;t=this.data instanceof h?this.data.data:this.data;const a=this._options.gridLineColor,o={legend:{display:this.showLegend},layout:{padding:{left:0,right:50,top:50,bottom:50}},borderWidth:1,animation:{duration:0},scales:{xAxes:[{gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a}}],yAxes:[{gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]},responsive:this.responsive},r=this.parseData(t);this.LOG.debug(["drawChart"],[o,r]),new e(i,{type:"bubble",tooltips:{mode:"x",position:"nearest",callbacks:s.getTooltipCallbacks()},data:{datasets:r},options:o})}parseData(t){if(!t)return;let e=[];for(let s=0;s<t.length;s++){let a=Object.keys(t[s])[0],o=[],h=t[s][a];i.isArray(h)&&h.forEach(t=>{o.push({x:t[0],y:t[1],r:t[2]})}),e.push({data:o,label:a,backgroundColor:r.transparentize(r.getColor(s),.5),borderColor:r.getColor(s),borderWidth:1})}return e}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"quantum-bubble"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get style(){return"[data-quantum-bubble-host]   div[data-quantum-bubble]{height:var(--quantum-chart-height,100%)}[data-quantum-bubble-host]   .chart-container[data-quantum-bubble]{width:var(--quantum-chart-width,100%);height:calc(var(--quantum-chart-height,100%) - 30px);position:relative}[data-quantum-bubble-host]   h1[data-quantum-bubble]{font-size:20px;padding:5px;margin:0;color:var(--quantum-font-color,#000)}"}}class d{constructor(){this.chartTitle="",this.showLegend=!0,this.options=new o,this.width="",this.height="",this.unit="",this.responsive=!1,this.LOG=new a(d),this._options={type:"pie"},this.uuid="chart-"+s.guid().split("-").join("")}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}parseData(t){if(this.LOG.debug(["parseData"],t),!t)return;let e,i=[],s=[];return(e=this.data instanceof h?this.data.data:this.data).forEach(t=>{s.push(t[1]),i.push(t[0])}),this.LOG.debug(["parseData"],[i,s]),{labels:i,data:s}}drawChart(){this._options=s.mergeDeep(this._options,this.options);let t=this.el.shadowRoot.querySelector("#"+this.uuid),i=this.parseData(this.data);i&&(this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.LOG.debug(["drawChart"],[this.data,this._options,i]),new e(t,{type:"gauge"===this._options.type?"doughnut":this._options.type,data:{datasets:[{data:i.data,backgroundColor:r.generateTransparentColors(i.data.length),borderColor:r.generateColors(i.data.length),label:this.chartTitle}],labels:i.labels},options:{legend:{display:this.showLegend},animation:{duration:0},responsive:this.responsive,tooltips:{mode:"index",intersect:!0},circumference:this.getCirc(),rotation:this.getRotation()}}))}getRotation(){return"gauge"===this._options.type?Math.PI:-.5*Math.PI}getCirc(){return"gauge"===this._options.type?Math.PI:2*Math.PI}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"quantum-pie"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get style(){return"[data-quantum-pie-host]   div[data-quantum-pie]{height:var(--quantum-chart-height,100%)}[data-quantum-pie-host]   .chart-container[data-quantum-pie]{width:var(--quantum-chart-width,100%);height:calc(var(--quantum-chart-height,100%) - 30px);position:relative}[data-quantum-pie-host]   h1[data-quantum-pie]{font-size:20px;padding:5px;margin:0;color:var(--quantum-font-color,#000)}[data-quantum-pie-host]   h1[data-quantum-pie]   small[data-quantum-pie]{font-size:10px;margin-left:10px}"}}class p{constructor(){this.unit="",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.options=new o,this.width="",this.height="",this.LOG=new a(p),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+s.guid().split("-").join("")}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}parseData(t){let e=[],i=[];return t.forEach(t=>{i.push(t[1]),e.push(t[0])}),{labels:e,data:i}}drawChart(){this._options=s.mergeDeep(this._options,this.options);let t=this.el.shadowRoot.querySelector("#"+this.uuid);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";const i=this._options.gridLineColor;if(this.LOG.debug(["color"],i),!this.data)return;let a;a=this.data instanceof h?this.data.data:this.data;let o=this.parseData(a);new e(t,{type:"polarArea",data:{datasets:[{data:o.data,backgroundColor:r.generateTransparentColors(o.data.length),borderColor:r.generateColors(o.data.length),label:this.chartTitle}],labels:o.labels},options:{layout:{padding:{left:0,right:0,top:50,bottom:0}},animation:{duration:0},legend:{display:this.showLegend},responsive:this.responsive,scale:{gridLines:{color:i,zeroLineColor:i},pointLabels:{fontColor:i},ticks:{fontColor:i,backdropColor:"transparent"}},tooltips:{mode:"index",intersect:!0}}})}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"quantum-polar"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get style(){return"[data-quantum-polar-host]   div[data-quantum-polar]{height:var(--quantum-chart-height,100%)}[data-quantum-polar-host]   .chart-container[data-quantum-polar]{width:var(--quantum-chart-width,100%);height:calc(var(--quantum-chart-height,100%) - 30px);position:relative}[data-quantum-polar-host]   h1[data-quantum-polar]{font-size:20px;padding:5px;margin:0;color:var(--quantum-font-color,#000)}[data-quantum-polar-host]   h1[data-quantum-polar]   small[data-quantum-polar]{font-size:10px}"}}class u{constructor(){this.unit="",this.chartTitle="",this.responsive=!0,this.showLegend=!0,this.options=new o,this.width="",this.height="",this.LOG=new a(u),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+s.guid().split("-").join("")}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}parseData(t){this.LOG.debug(["gtsToData"],t);let e=[],i={};if(t&&0!==t.length){{let s=0;t.forEach(t=>{Object.keys(t).forEach(a=>{const o={label:a,data:[],backgroundColor:r.transparentize(r.getColor(s),.5),borderColor:r.getColor(s)};t[a].forEach(t=>{const e=Object.keys(t)[0];i[e]=0,o.data.push(t[e])}),e.push(o),s++})})}return this.LOG.debug(["gtsToData","datasets"],[e,Object.keys(i)]),{datasets:e,labels:Object.keys(i)}}}drawChart(){this._options=s.mergeDeep(this._options,this.options);let t=this.el.shadowRoot.querySelector("#"+this.uuid);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";const i=this._options.gridLineColor;if(!this.data)return;let a;a=this.data instanceof h?this.data.data:this.data;let o=this.parseData(a);o&&new e(t,{type:"radar",legend:{display:this.showLegend},data:{labels:o.labels,datasets:o.datasets},options:{layout:{padding:{left:0,right:0,top:50,bottom:0}},animation:{duration:0},legend:{display:this.showLegend},responsive:this.responsive,scale:{gridLines:{color:i,zeroLineColor:i},pointLabels:{fontColor:i},ticks:{fontColor:i,backdropColor:"transparent"}},tooltips:{mode:"index",intersect:!0}}})}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"quantum-radar"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get style(){return"[data-quantum-radar-host]   div[data-quantum-radar]{height:var(--quantum-chart-height,100%)}[data-quantum-radar-host]   .chart-container[data-quantum-radar]{width:var(--quantum-chart-width,100%);height:calc(var(--quantum-chart-height,100%) - 30px);position:relative}[data-quantum-radar-host]   h1[data-quantum-radar]{font-size:20px;padding:5px;margin:0;color:var(--quantum-font-color,#000)}[data-quantum-radar-host]   h1[data-quantum-radar]   small[data-quantum-radar]{font-size:10px}"}}class c{constructor(){this.unit="",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.options=new o,this.width="",this.height="",this.LOG=new a(c),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+s.guid().split("-").join("")}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}drawChart(){this._options=s.mergeDeep(this._options,this.options);let t,i=this.el.shadowRoot.querySelector("#"+this.uuid);t=this.data instanceof h?this.data.data:this.data;let a=this.gtsToScatter(t);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";const o=this._options.gridLineColor,r={legend:{display:this.showLegend},responsive:this.responsive,animation:{duration:0},tooltips:{mode:"x",position:"nearest",callbacks:s.getTooltipCallbacks()},scales:{xAxes:[{gridLines:{color:o,zeroLineColor:o},ticks:{fontColor:o}}],yAxes:[{gridLines:{color:o,zeroLineColor:o},ticks:{fontColor:o},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]}};this.chart=new e.Scatter(i,{data:{datasets:a},options:r}),this.LOG.debug(["gtsToScatter","chart"],[a,r])}gtsToScatter(t){if(!t)return;this.LOG.debug(["gtsToScatter"],t);let e=[];for(let s=0;s<t.length;s++){let a=t[s],o=[];a.v.forEach(t=>{o.push({x:t[0]/1e3,y:t[t.length-1]})}),e.push({label:i.serializeGtsMetadata(a),data:o,pointRadius:2,borderColor:r.getColor(s),backgroundColor:r.transparentize(r.getColor(s),.5)})}return this.LOG.debug(["gtsToScatter","datasets"],e),e}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"quantum-scatter"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get style(){return"[data-quantum-scatter-host]   div[data-quantum-scatter]{height:var(--quantum-chart-height,100%)}[data-quantum-scatter-host]   .chart-container[data-quantum-scatter]{width:var(--quantum-chart-width,100%);height:calc(var(--quantum-chart-height,100%) - 30px);position:relative}[data-quantum-scatter-host]   h1[data-quantum-scatter]{font-size:20px;padding:5px;margin:0;color:var(--quantum-font-color,#000)}"}}class g{constructor(){this.LOG=new a(g),this.unit="",this.type="line",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.url="",this.warpscript="",this.graphs={scatter:["scatter"],chart:["line","spline","step","area"],pie:["pie","doughnut","gauge"],polar:["polar"],radar:["radar"],bar:["bar"]},this.loading=!0}onOptions(t,e){this.LOG.debug(["options"],t),e!==t&&(this.LOG.debug(["options","changed"],t),this.parseGTS())}componentDidLoad(){this.execute()}parseGTS(){let t=new h;if(i.isArray(this.gtsList)&&1===this.gtsList.length){const e=this.gtsList[0];e.hasOwnProperty("data")?(t.data=e.data,t.globalParams=e.globalParams||{},t.globalParams.type=t.globalParams.type||this.type,t.params=e.params):(t.data=e,t.globalParams={type:this.type})}else t.data=this.gtsList,t.globalParams={type:this.type};this.LOG.debug(["parseGTS","data"],t),this.data=t,this.options=s.mergeDeep(this.options,t.globalParams),this.LOG.debug(["parseGTS","options"],this.options),this.loading=!1}execute(){this.loading=!0,this.warpscript=this.wsElement.textContent,this.LOG.debug(["componentDidLoad","warpscript"],this.warpscript),fetch(this.url,{method:"POST",body:this.warpscript}).then(t=>{t.text().then(t=>{this.gtsList=JSON.parse(t),this.parseGTS()},t=>{this.LOG.error(["componentDidLoad"],t),this.loading=!1})},t=>{this.LOG.error(["componentDidLoad"],t),this.loading=!1})}render(){return t("div",{class:"wrapper",id:"wrapper"},t("div",{class:"warpscript"},t("slot",null)),this.graphs.scatter.indexOf(this.type)>-1?t("quantum-scatter",{responsive:this.responsive,unit:this.unit,data:this.data,options:this.options,"show-legend":this.showLegend,chartTitle:this.chartTitle}):"",this.graphs.chart.indexOf(this.type)>-1?t("quantum-chart",{type:this.type,responsive:this.responsive,unit:this.unit,data:this.data,options:this.options,"show-legend":this.showLegend,chartTitle:this.chartTitle}):"","bubble"==this.type?t("quantum-bubble",{showLegend:this.showLegend,responsive:!0,unit:this.unit,data:this.data,options:this.options,chartTitle:this.chartTitle}):"",this.graphs.pie.indexOf(this.type)>-1?t("quantum-pie",{responsive:this.responsive,unit:this.unit,data:this.data,options:this.options,showLegend:this.showLegend,chartTitle:this.chartTitle}):"",this.graphs.polar.indexOf(this.type)>-1?t("quantum-polar",{responsive:this.responsive,unit:this.unit,data:this.data,showLegend:this.showLegend,chartTitle:this.chartTitle,options:this.options}):"",this.graphs.radar.indexOf(this.type)>-1?t("quantum-radar",{responsive:this.responsive,unit:this.unit,data:this.data,showLegend:this.showLegend,chartTitle:this.chartTitle,options:this.options}):"",this.graphs.bar.indexOf(this.type)>-1?t("quantum-bar",{responsive:this.responsive,unit:this.unit,data:this.data,showLegend:this.showLegend,chartTitle:this.chartTitle,options:this.options}):"","text"==this.type?t("quantum-display",{responsive:this.responsive,unit:this.unit,data:this.data,displayTitle:this.chartTitle,options:this.options}):"")}static get is(){return"quantum-tile"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{state:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},url:{type:String,attr:"url"},wsElement:{elementRef:!0}}}static get style(){return"[data-quantum-tile-host]{--quantum-chart-height:100%}[data-quantum-tile-host]   .warpscript[data-quantum-tile]{display:none}[data-quantum-tile-host]   .wrapper[data-quantum-tile]{min-height:var(--quantum-tile-height,400px);width:var(--quantum-tile-width,100%);height:var(--quantum-tile-height,100%)}"}}export{n as QuantumBar,l as QuantumBubble,d as QuantumPie,p as QuantumPolar,u as QuantumRadar,c as QuantumScatter,g as QuantumTile};