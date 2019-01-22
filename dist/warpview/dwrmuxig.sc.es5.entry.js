warpview.loadBundle("dwrmuxig",["exports","./chunk-320b7a54.js","./chunk-9fb984f8.js"],function(t,e,a){var i=window.warpview.h,s=function(){function t(){this.responsive=!1,this.showLegend=!0,this.options=new e.Param,this.width="",this.height="",this.elemsCount=15,this.debug=!1,this.page=0,this._options={timeMode:"date"},this._data=[]}return t.prototype.onData=function(t,a){e.deepEqual(t,a)||(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,a){e.deepEqual(t,a)||(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){if(this._options=e.ChartLib.mergeDeep(this._options,this.options),this.LOG.debug(["drawChart","_options"],this._options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.data){var t,a=this.data;"string"==typeof a&&(a=JSON.parse(a)),e.GTSLib.isArray(a)&&a[0]&&(a[0]instanceof e.DataModel||a[0].hasOwnProperty("data"))&&(a=a[0]),t=a instanceof e.DataModel||a.hasOwnProperty("data")?a.data:a,this._data=this.parseData(e.GTSLib.flatDeep(t)),this.LOG.debug(["drawChart","_data"],this._data)}},t.prototype.getHeaderParam=function(t,e,a,i){return this.data.params&&this.data.params[t]&&this.data.params[t][a]&&this.data.params[t][a][e]?this.data.params[t][a][e]:this.data.globalParams&&this.data.globalParams[a]&&this.data.globalParams[a][e]?this.data.globalParams[a][e]:i},t.prototype.parseData=function(t){var a=this,i=[];return this.LOG.debug(["parseData"],t),t.forEach(function(t,s){var n={name:"",values:[],headers:[]};e.GTSLib.isGts(t)?(a.LOG.debug(["parseData","isGts"],t),n.name=e.GTSLib.serializeGtsMetadata(t),n.values=t.v):(a.LOG.debug(["parseData","is not a Gts"],t),n.values=e.GTSLib.isArray(t)?t:[t]),n.headers=[a.getHeaderParam(s,0,"headers","Date")],t.v.length>0&&t.v[0].length>2&&n.headers.push(a.getHeaderParam(s,1,"headers","Latitude")),t.v.length>0&&t.v[0].length>3&&n.headers.push(a.getHeaderParam(s,2,"headers","Longitude")),t.v.length>0&&t.v[0].length>4&&n.headers.push(a.getHeaderParam(s,3,"headers","Elevation")),n.headers.push(a.getHeaderParam(s,t.v[0].length-1,"headers","Value")),i.push(n)}),this.LOG.debug(["parseData","flatData"],i),i},t.prototype.componentWillLoad=function(){this.LOG=new e.Logger(t,this.debug),this.drawChart()},t.prototype.render=function(){var t=this;return i("div",{class:"wrapper"},this._data.map(function(e){return i("warp-view-paginable",{data:e,options:t._options,debug:t.debug})}))},Object.defineProperty(t,"is",{get:function(){return"warp-view-datagrid"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{_data:{state:!0},data:{type:String,attr:"data",watchCallbacks:["onData"]},debug:{type:Boolean,attr:"debug"},el:{elementRef:!0},elemsCount:{type:Number,attr:"elems-count"},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},page:{state:!0},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */"},enumerable:!0,configurable:!0}),t}(),n=function(){function t(){this.options=new e.Param,this.elemsCount=15,this.debug=!1,this.page=0,this.pages=[],this.displayedValues=[],this._options={timeMode:"date"},this.windowed=5}return t.prototype.formatDate=function(t){return"date"===this._options.timeMode?a.moment.utc(t/1e3).toISOString():t.toString()},t.prototype.goto=function(t){this.page=t,this.drawGridData()},t.prototype.next=function(){this.page=Math.min(this.page+1,this._data.values.length-1),this.drawGridData()},t.prototype.prev=function(){this.page=Math.max(this.page-1,0),this.drawGridData()},t.prototype.drawGridData=function(){if(this._options=e.ChartLib.mergeDeep(this._options,this.options),this.LOG.debug(["drawGridData","_options"],this._options),this.data){this.pages=[];for(var t=0;t<this.data.values.length/this.elemsCount;t++)this.pages.push(t);this._data=Object.assign({},this.data),this.displayedValues=this._data.values.slice(Math.max(0,this.elemsCount*this.page),Math.min(this.elemsCount*(this.page+1),this._data.values.length)),this.LOG.debug(["drawGridData","_data"],this.data)}},t.prototype.componentWillLoad=function(){this.LOG=new e.Logger(t,this.debug),this.drawGridData()},t.prototype.render=function(){var t=this;return i("div",{class:"wrapper"},this._data?i("div",null,i("div",{class:"heading",innerHTML:e.GTSLib.formatLabel(this._data.name)}),i("table",null,i("thead",null,this._data.headers.map(function(t){return i("th",null,t)})),i("tbody",null,this.displayedValues.map(function(e,a){return i("tr",{class:a%2==0?"odd":"even"},e.map(function(e,a){return i("td",null,0===a?t.formatDate(e):e)}))}))),i("div",{class:"center"},i("div",{class:"pagination"},0!==this.page?i("div",{class:"prev hoverable",onClick:function(){return t.prev()}},"<"):"",this.page-this.windowed>0?i("div",{class:"index disabled"},"..."):"",this.pages.map(function(e){return e>=t.page-t.windowed&&e<=t.page+t.windowed?i("div",{class:"index "+(t.page===e?"active":"hoverable"),onClick:function(){return t.goto(e)}},e):""}),this.page+this.windowed<this.pages.length?i("div",{class:"index disabled"},"..."):"",this.page!==this._data.values.length-1?i("div",{class:"next hoverable",onClick:function(){return t.next()}},">"):""))):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-paginable"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data"},debug:{type:Boolean,attr:"debug"},elemsCount:{type:Number,attr:"elems-count"},options:{type:"Any",attr:"options"},page:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-warp-view-paginable-h   table.sc-warp-view-paginable{width:100%;color:var(--warp-view-font-color,#000)}.sc-warp-view-paginable-h   table.sc-warp-view-paginable   td.sc-warp-view-paginable, .sc-warp-view-paginable-h   table.sc-warp-view-paginable   th.sc-warp-view-paginable{padding:var(--warp-view-datagrid-cell-padding,5px)}.sc-warp-view-paginable-h   table.sc-warp-view-paginable   .odd.sc-warp-view-paginable{background-color:var(--warp-view-datagrid-odd-bg-color,#fff);color:var(--warp-view-datagrid-odd-color,#000)}.sc-warp-view-paginable-h   table.sc-warp-view-paginable   .even.sc-warp-view-paginable{background-color:var(--warp-view-datagrid-even-bg-color,#ddd);color:var(--warp-view-datagrid-even-color,#000)}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable{text-align:center}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable{display:inline-block}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .index.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .next.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .prev.sc-warp-view-paginable{color:var(--warp-view-font-color,#000);float:left;padding:8px 16px;text-decoration:none;-webkit-transition:background-color .3s;transition:background-color .3s;border:1px solid var(--warp-view-pagination-border-color,#ddd);margin:0;cursor:pointer;background-color:var(--warp-view-pagination-bg-color,#fff)}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .index.active.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .next.active.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .prev.active.sc-warp-view-paginable{background-color:var(--warp-view-pagination-active-bg-color,#4caf50);color:var(--warp-view-pagination-active-color,#fff);border:1px solid var(--warp-view-pagination-active-border-color,#4caf50)}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .index.hoverable.sc-warp-view-paginable:hover, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .next.hoverable.sc-warp-view-paginable:hover, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .prev.hoverable.sc-warp-view-paginable:hover{background-color:var(--warp-view-pagination-hover-bg-color,#ddd);color:var(--warp-view-pagination-hover-color,#000);border:1px solid var(--warp-view-pagination-hover-border-color,#ddd)}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .index.disabled.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .next.disabled.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .prev.disabled.sc-warp-view-paginable{cursor:auto;color:var(--warp-view-pagination-disabled-color,#ddd)}.sc-warp-view-paginable-h   .gts-classname.sc-warp-view-paginable{color:var(--gts-classname-font-color,#0074d9)}.sc-warp-view-paginable-h   .gts-labelname.sc-warp-view-paginable{color:var(--gts-labelname-font-color,#19a979)}.sc-warp-view-paginable-h   .gts-attrname.sc-warp-view-paginable{color:var(--gts-labelname-font-color,#ed4a7b)}.sc-warp-view-paginable-h   .gts-separator.sc-warp-view-paginable{color:var(--gts-separator-font-color,#bbb)}.sc-warp-view-paginable-h   .gts-attrvalue.sc-warp-view-paginable, .sc-warp-view-paginable-h   .gts-labelvalue.sc-warp-view-paginable{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}.sc-warp-view-paginable-h   .round.sc-warp-view-paginable{border-radius:50%;background-color:#bbb;display:inline-block;width:12px;height:12px;border:2px solid #454545}.sc-warp-view-paginable-h   ul.sc-warp-view-paginable{list-style:none}"},enumerable:!0,configurable:!0}),t}();t.WarpViewDatagrid=s,t.WarpViewPaginable=n,Object.defineProperty(t,"__esModule",{value:!0})});