/*! Built with http://stenciljs.com */
const{h:t}=window.quantumviz;import{a as e}from"./chunk-7cb7a6ed.js";import{a as i}from"./chunk-faa0a089.js";import"./chunk-6133ee7c.js";class a{constructor(){this.unit="",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.data="[]",this.options={},this.width="",this.height=""}redraw(t,e){e!==t&&this.drawChart()}drawChart(){let t=this.el.shadowRoot.querySelector("#myChart"),i=JSON.parse(this.data);if(!i)return;const a=this;new e(t,{type:"bubble",tooltips:{mode:"x",position:"nearest",custom:function(t){t.opacity>0?a.pointHover.emit({x:t.dataPoints[0].x+15,y:this._eventPosition.y}):a.pointHover.emit({x:-100,y:this._eventPosition.y})}},legend:{display:this.showLegend},data:{datasets:this.parseData(i)},options:{borderWidth:1,scales:{yAxes:[{afterFit:function(t){t.width=100}}]},responsive:this.responsive}})}parseData(t){if(!t)return;let e=[];for(let a=0;a<t.length;a++){let s=Object.keys(t[a])[0],r=[],n=t[a][s];i.isArray(n)&&n.forEach(t=>{r.push({x:t[0],y:t[1],r:t[2]})}),e.push({data:r,label:s,backgroundColor:i.transparentize(i.getColor(a),.5),borderColor:i.getColor(a),borderWidth:1})}return e}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container"},this.responsive?t("canvas",{id:"myChart"}):t("canvas",{id:"myChart",width:this.width,height:this.height})))}static get is(){return"quantum-bubble"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:String,attr:"data",watchCallbacks:["redraw"]},el:{elementRef:!0},height:{type:String,attr:"height"},options:{type:"Any",attr:"options"},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},timeMax:{type:Number,attr:"time-max"},timeMin:{type:Number,attr:"time-min"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width"}}}static get events(){return[{name:"pointHover",method:"pointHover",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".chart-container{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"}}class s{constructor(){this.unit="",this.type="line",this.chartTitle="",this.responsive=!1,this.showLegend=!1,this.data="[]",this.options="{}",this.width="",this.height=""}redraw(t,e){e!==t&&this.drawChart()}changeScale(t,e){if(e!==t){const e=JSON.parse(t);"timestamp"===e.time.timeMode?(this._chart.options.scales.xAxes[0].time.stepSize=e.time.stepSize,this._chart.options.scales.xAxes[0].time.unit=e.time.unit,this._chart.options.scales.xAxes[0].time.displayFormats.millisecond=e.time.displayFormats,this._chart.update()):(this._chart.options.scales.xAxes[0].time.stepSize=e.time.stepSize,this._chart.options.scales.xAxes[0].time.unit=e.time.unit,this._chart.update())}}hideData(t){const e=this._chart.getDatasetMeta(t);null===e.hidden?e.hidden=!0:e.hidden=null,this._chart.update(),this.didHideOrShowData.emit()}drawChart(){let t=this.el.shadowRoot.querySelector("#myChart");if(!JSON.parse(this.data))return;let i=this.gtsToData(JSON.parse(this.data));const a=this,s={legend:{display:!1},tooltips:{mode:"x",position:"nearest",custom:function(t){t.opacity>0?a.pointHover.emit({x:t.dataPoints[0].x+15,y:this._eventPosition.y}):a.pointHover.emit({x:-100,y:this._eventPosition.y})}},scales:{xAxes:[{time:{min:this.timeMin,max:this.timeMax,unit:"day"},type:"time"}],yAxes:[{afterFit:function(t){t.width=100},scaleLabel:{display:!0,labelString:this.unit}}]},responsive:this.responsive};"spline"===this.type&&(s.elements={line:{lineTension:0}}),"area"===this.type&&(s.elements={line:{fill:"start"}}),this._chart=new e(t,{type:"bar"===this.type?this.type:"line",data:{labels:i.ticks,datasets:i.datasets},options:s})}gtsToData(t){let e=[],a=[];if(t)return t.forEach(t=>{t.gts&&(t.gts=i.flatDeep(t.gts),t.gts.forEach((s,r)=>{let n=[];if(s.v){s.v.forEach(t=>{a.push(t[0]/1e3),n.push(t[t.length-1])});let h=i.getColor(r);t.params&&t.params[r]&&t.params[r].color&&(h=t.params[r].color);let o=i.serializeGtsMetadata(s);t.params&&t.params[r]&&t.params[r].key&&(o=t.params[r].key);let p={label:o,data:n,pointRadius:1,fill:!1,steppedLine:this.isStepped(),borderColor:h,borderWidth:1,backgroundColor:i.transparentize(h,.5)};if(t.params&&t.params[r]&&t.params[r].interpolate)switch(t.params[r].interpolate){case"line":p.lineTension=0;break;case"spline":break;case"area":p.fill=!0}e.push(p)}}))}),{datasets:e,ticks:i.unique(a)}}isStepped(){return!!this.type.startsWith("step")&&this.type.replace("step-","")}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container"},this.responsive?t("canvas",{id:"myChart"}):t("canvas",{id:"myChart",width:this.width,height:this.height})))}static get is(){return"quantum-chart"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:String,attr:"data",watchCallbacks:["redraw"]},el:{elementRef:!0},height:{type:String,attr:"height"},hiddenData:{type:Number,attr:"hidden-data",watchCallbacks:["hideData"]},options:{type:String,attr:"options",watchCallbacks:["changeScale"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},timeMax:{type:Number,attr:"time-max"},timeMin:{type:Number,attr:"time-min"},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width"}}}static get events(){return[{name:"pointHover",method:"pointHover",bubbles:!0,cancelable:!0,composed:!0},{name:"didHideOrShowData",method:"didHideOrShowData",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"quantum-chart .chart-container{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"}}class r{constructor(){this.unit="",this.type="pie",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.data="[]",this.options={},this.width="",this.height=""}redraw(t,e){e!==t&&this.drawChart()}generateColors(t){let e=[];for(let a=0;a<t;a++)e.push(i.getColor(a));return e}parseData(t){let e=[],i=[];return t.forEach(t=>{i.push(t[1]),e.push(t[0])}),{labels:e,data:i}}drawChart(){let t=this.el.shadowRoot.querySelector("#myChart"),i=this.parseData(JSON.parse(this.data));new e(t,{type:"gauge"===this.type?"doughnut":this.type,legend:{display:this.showLegend},data:{datasets:[{data:i.data,backgroundColor:this.generateColors(i.data.length),label:this.chartTitle}],labels:i.labels},options:{responsive:this.responsive,tooltips:{mode:"index",intersect:!0},circumference:this.getCirc(),rotation:this.getRotation()}})}getRotation(){return"gauge"===this.type?Math.PI:-.5*Math.PI}getCirc(){return"gauge"===this.type?Math.PI:2*Math.PI}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container"},this.responsive?t("canvas",{id:"myChart"}):t("canvas",{id:"myChart",width:this.width,height:this.height})))}static get is(){return"quantum-pie"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:String,attr:"data",watchCallbacks:["redraw"]},el:{elementRef:!0},height:{type:String,attr:"height"},options:{type:"Any",attr:"options"},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width"}}}static get style(){return".chart-container{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"}}class n{constructor(){this.unit="",this.type="polar",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.data="[]",this.options={},this.width="",this.height=""}redraw(t,e){e!==t&&this.drawChart()}generateColors(t){let e=[];for(let a=0;a<t;a++)e.push(i.transparentize(i.getColor(a),.5));return e}parseData(t){let e=[],i=[];return t.forEach(t=>{i.push(t[1]),e.push(t[0])}),{labels:e,datas:i}}drawChart(){let t=this.el.shadowRoot.querySelector("#myChart"),i=this.parseData(JSON.parse(this.data));new e.PolarArea(t,{type:this.type,legend:{display:this.showLegend},data:{datasets:[{data:i.datas,backgroundColor:this.generateColors(i.datas.length),label:this.chartTitle}],labels:i.labels},options:{responsive:this.responsive,tooltips:{mode:"index",intersect:!0}}})}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container"},this.responsive?t("canvas",{id:"myChart"}):t("canvas",{id:"myChart",width:this.width,height:this.height})))}static get is(){return"quantum-polar"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:String,attr:"data",watchCallbacks:["redraw"]},el:{elementRef:!0},height:{type:String,attr:"height"},options:{type:"Any",attr:"options"},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width"}}}static get style(){return".chart-container{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"}}class h{constructor(){this.unit="",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.data="[]",this.options={},this.width="",this.height=""}redraw(t,e){e!==t&&this.drawChart()}drawChart(){let t=this.el.shadowRoot.querySelector("#myChart"),i=this.gtsToScatter(JSON.parse(this.data));const a=this;new e.Scatter(t,{data:{datasets:i},options:{legend:{display:this.showLegend},responsive:this.responsive,tooltips:{mode:"x",position:"nearest",custom:function(t){t.opacity>0?a.pointHover.emit({x:t.dataPoints[0].x+15,y:this._eventPosition.y}):a.pointHover.emit({x:-100,y:this._eventPosition.y})}},scales:{xAxes:[{type:"time",time:{min:this.timeMin,max:this.timeMax}}],yAxes:[{afterFit:function(t){t.width=100},scaleLabel:{display:!0,labelString:this.unit}}]}}})}gtsToScatter(t){let e=[];return t.forEach(t=>{for(let a=0;a<t.gts.length;a++){let s=t.gts[a],r=[];s.v.forEach(t=>{r.push({x:t[0]/1e3,y:t[t.length-1]})});let n=i.getColor(a);t.params&&t.params[a]&&t.params[a].color&&(n=t.params[a].color);let h=`${s.c} - ${JSON.stringify(s.l)}`;t.params&&t.params[a]&&t.params[a].key&&(h=t.params[a].key),e.push({label:h,data:r,pointRadius:2,borderColor:n,backgroundColor:i.transparentize(n,.5)})}}),e}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container"},this.responsive?t("canvas",{id:"myChart"}):t("canvas",{id:"myChart",width:this.width,height:this.height})))}static get is(){return"quantum-scatter"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:String,attr:"data",watchCallbacks:["redraw"]},el:{elementRef:!0},height:{type:String,attr:"height"},options:{type:"Any",attr:"options"},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},timeMax:{type:Number,attr:"time-max"},timeMin:{type:Number,attr:"time-min"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width"}}}static get events(){return[{name:"pointHover",method:"pointHover",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"quantum-scatter .chart-container{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"}}class o{constructor(){this.warpscript="",this.data="[]",this.unit="",this.type="line",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.url="",this.graphs={scatter:["scatter"],chart:["line","spline","step-after","step-before","area","bar"],pie:["pie","doughnut","gauge"],polar:["polar"]}}componentDidLoad(){this.warpscript=this.wsElement.textContent;let t=this;fetch(this.url,{method:"POST",body:this.warpscript}).then(e=>{e.text().then(e=>{let i=JSON.parse(e),a=[];"doughnut"===t.type||"pie"===t.type||"polar"===t.type||"gauge"===t.type||"bubble"===t.type?(i.length>0&&Array.isArray(i[0])&&(i=i[0]),t.data=JSON.stringify(i)):(i.length>0&&Array.isArray(i[0])&&(i=i[0]),a.push({gts:i,params:t.getParams(i)}),t.data=JSON.stringify(a))},t=>{console.error(t)})},t=>{console.error(t)})}getParams(t){let e=[],a=this;for(let s=0;s<t.length;s++){let r=t[s];e.push({color:i.getColor(s),key:r.c,interpolate:a.type})}return e}render(){return this.graphs.scatter.indexOf(this.type)>-1?t("quantum-scatter",{responsive:this.responsive,unit:this.unit,data:this.data,"show-legend":this.showLegend,chartTitle:this.chartTitle}):this.graphs.chart.indexOf(this.type)>-1?t("quantum-chart",{responsive:this.responsive,unit:this.unit,data:this.data,type:this.type,"show-legend":this.showLegend,chartTitle:this.chartTitle}):"bubble"==this.type?t("quantum-bubble",{"show-legend":this.showLegend,responsive:this.responsive,unit:this.unit,data:this.data,chartTitle:this.chartTitle}):this.graphs.pie.indexOf(this.type)>-1?t("quantum-pie",{responsive:this.responsive,unit:this.unit,data:this.data,type:this.type,"show-legend":this.showLegend,chartTitle:this.chartTitle}):this.graphs.polar.indexOf(this.type)>-1?t("quantum-polar",{responsive:this.responsive,unit:this.unit,data:this.data,type:this.type,"show-legend":this.showLegend,chartTitle:this.chartTitle}):void 0}static get is(){return"quantum-tile"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{state:!0},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},url:{type:String,attr:"url"},wsElement:{elementRef:!0}}}static get style(){return""}}export{a as QuantumBubble,s as QuantumChart,r as QuantumPie,n as QuantumPolar,h as QuantumScatter,o as QuantumTile};