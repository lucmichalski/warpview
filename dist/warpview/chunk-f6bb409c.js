/*! Built with http://stenciljs.com */
const{h:t}=window.warpview;class e{}class r{static cleanArray(t){return t.filter(t=>!!t)}static unique(t){let e={},r=[];for(let s=0,n=t.length;s<n;++s)e.hasOwnProperty(t[s])||(r.push(t[s]),e[t[s]]=1);return r}static isArray(t){return t&&"object"==typeof t&&t instanceof Array&&"number"==typeof t.length&&"function"==typeof t.splice&&!t.propertyIsEnumerable("length")}static isValidResponse(t){let e;try{e=JSON.parse(t)}catch(e){return console.error("Response non JSON compliant",t),!1}return!!r.isArray(e)||(console.error("Response isn't an Array",e),!1)}static isEmbeddedImage(t){return!("string"!=typeof t||!/^data:image/.test(t))}static isEmbeddedImageObject(t){return!(null===t||null===t.image||null===t.caption||!r.isEmbeddedImage(t.image))}static isPositionArray(t){if(!t||!t.positions)return!1;if(r.isPositionsArrayWithValues(t)||r.isPositionsArrayWithTwoValues(t))return!0;for(let e in t.positions){if(t.positions[e].length<2||t.positions[e].length>3)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static isPositionsArrayWithValues(t){if(null===t||null===t.positions)return!1;for(let e in t.positions){if(3!==t.positions[e].length)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static isPositionsArrayWithTwoValues(t){if(null===t||null===t.positions)return!1;for(let e in t.positions){if(4!==t.positions[e].length)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static metricFromJSON(t){let e={ts:t[0],value:void 0,alt:void 0,lon:void 0,lat:void 0};switch(t.length){case 2:e.value=t[1];break;case 3:e.alt=t[1],e.value=t[2];break;case 4:e.lat=t[1],e.lon=t[2],e.value=t[3];break;case 5:e.lat=t[1],e.lon=t[2],e.alt=t[3],e.value=t[4]}return e}static gtsFromJSON(t,e){return{gts:{c:t.c,l:t.l,a:t.a,v:t.v,id:e}}}static gtsFromJSONList(t,e){let s,n=[];return(t||[]).forEach((t,o)=>{let a=t;t.gts&&(a=t.gts),s=void 0!==e&&""!==e?e+"-"+o:o,r.isArray(a)&&n.push(r.gtsFromJSONList(a,s)),r.isGts(a)&&n.push(r.gtsFromJSON(a,s)),r.isEmbeddedImage(a)&&n.push({image:a,caption:"Image",id:s}),r.isEmbeddedImageObject(a)&&n.push({image:a.image,caption:a.caption,id:s})}),{content:n||[]}}static flatDeep(t){return t.reduce((t,e)=>Array.isArray(e)?t.concat(r.flatDeep(e)):t.concat(e),[])}static flattenGtsIdArray(t,e){const s=[];return console.log("flattenGtsIdArray",t,e),r.isGts(t)&&(t=[t]),t.forEach(t=>{if(console.log("flattenGtsIdArray a.forEach",t,e),r.isArray(t)){console.log("flattenGtsIdArray d isArray");const n=r.flattenGtsIdArray(t,e);s.push(n.res),e=n.r}else t.v&&(t.id=e,s.push(t),e++);console.log("flattenGtsIdArray res r",s,e)}),console.log("flattenGtsIdArray res",s),{res:s,r:e}}static serializeGtsMetadata(t){let e=[];Object.keys(t.l).forEach(r=>{e.push(r+"="+t.l[r])});let r=[];return Object.keys(t.a).forEach(e=>{r.push(e+"="+t.a[e])}),t.c+"{"+e.join(",")+(r.length>0?",":"")+r.join(",")+"}"}static gtsToPath(t){let e=[];t.v=t.v.sort(function(t,e){return t[0]-e[0]});for(let r=0;r<t.v.length;r++){let s=t.v[r];s.length,s.length,4===s.length&&e.push({ts:Math.floor(s[0]/1e3),lat:s[1],lon:s[2],val:s[3]}),5===s.length&&e.push({ts:Math.floor(s[0]/1e3),lat:s[1],lon:s[2],elev:s[3],val:s[4]})}return e}static equalMetadata(t,e){if(!(void 0!==t.c&&void 0!==e.c&&void 0!==t.l&&void 0!==e.l&&t.l instanceof Object&&e.l instanceof Object))return console.error("[warp10-gts-tools] equalMetadata - Error in GTS, metadata is not well formed"),!1;if(t.c!==e.c)return!1;for(let r in t.l){if(!e.l.hasOwnProperty(r))return!1;if(t.l[r]!==e.l[r])return!1}for(let r in e.l)if(!t.l.hasOwnProperty(r))return!1;return!0}static isGts(t){return!(!t||null===t||null===t.c||null===t.l||null===t.a||null===t.v||!r.isArray(t.v))}static isGtsToPlot(t){if(!r.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("number"==typeof t.v[e][t.v[e].length-1]||void 0!==t.v[e][t.v[e].length-1].constructor.prototype.toFixed)return!0;break}return!1}static isBooleanGts(t){if(!r.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("boolean"!=typeof t.v[e][t.v[e].length-1])return!0;break}return!1}static isGtsToAnnotate(t){if(!r.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("number"!=typeof t.v[e][t.v[e].length-1]&&t.v[e][t.v[e].length-1].constructor&&"Big"!==t.v[e][t.v[e].length-1].constructor.name&&void 0===t.v[e][t.v[e].length-1].constructor.prototype.toFixed)return!0;break}return!1}static gtsSort(t){t.isSorted||(t.v=t.v.sort(function(t,e){return t[0]-e[0]}),t.isSorted=!0)}static gtsTimeRange(t){return r.gtsSort(t),0===t.v.length?null:[t.v[0][0],t.v[t.v.length-1][0]]}static getData(t){return"string"==typeof t?r.getData(JSON.parse(t)):t&&t.hasOwnProperty("data")?t:r.isArray(t)&&t.length>0&&t[0].data?t[0]:r.isArray(t)?{data:t}:new e}}class s{constructor(t){this.className=t.name}log(t,e,r){const s=`[${this.className}] ${e.join(" - ")}`;switch(t){case n.DEBUG:break;case n.ERROR:console.error(s,r);break;case n.INFO:console.log(s,r);break;case n.WARN:console.warn(s,r);break;default:console.log(s,r)}}debug(t,e){this.log(n.DEBUG,t,e)}error(t,e){this.log(n.ERROR,t,e)}warn(t,e){this.log(n.WARN,t,e)}info(t,e){this.log(n.INFO,t,e)}}var n;!function(t){t[t.DEBUG=0]="DEBUG",t[t.ERROR=1]="ERROR",t[t.WARN=2]="WARN",t[t.INFO=3]="INFO"}(n||(n={}));class o{}class a{static guid(){let t,e,r="";for(t=0;t<32;t++)e=16*Math.random()|0,8!=t&&12!=t&&16!=t&&20!=t||(r+="-"),r+=(12==t?4:16==t?3&e|8:e).toString(16);return r}static mergeDeep(...t){let e={},r=0;for(;r<arguments.length;r++){const t=arguments[r];a.merge(t,e,!0)}return e}static merge(t,e,r){for(const s in t)t.hasOwnProperty(s)&&(r&&"[object Object]"===Object.prototype.toString.call(t[s])?e[s]=a.mergeDeep(e[s],t[s]):e[s]=t[s])}static isObject(t){return t&&"object"==typeof t&&!Array.isArray(t)}static getTooltipCallbacks(){return{title:t=>t[0].xLabel,label:(t,e)=>{let r=e.datasets[t.datasetIndex].label||"";return r&&(r+=": "),r+t.yLabel}}}static buildImage(t,e,r){const s=new Image(t,e),n=`<svg width="${t}px" height="${e}px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${e}" preserveAspectRatio="xMidYMid">\n<rect width="${t}" height="${e}" style="fill:${r};" />\n</svg>`;return s.src="data:image/svg+xml;base64,"+btoa(n),s}}export{r as a,s as b,o as c,a as d,e};