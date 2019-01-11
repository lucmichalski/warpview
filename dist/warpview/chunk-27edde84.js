class t{constructor(t,e=!1){this.isDebug=!1,this.className=t.name,this.isDebug=e}log(t,r,s){let n=[];switch(n.push(`[${this.className}] ${r.join(" - ")}`),n=n.concat(s),t){case e.DEBUG:break;case e.ERROR:console.error(...n);break;case e.INFO:console.log(...n);break;case e.WARN:console.warn(...n);break;default:this.isDebug&&console.log(...n)}}debug(t,...r){this.log(e.DEBUG,t,r)}error(t,...r){this.log(e.ERROR,t,r)}warn(t,...r){this.log(e.WARN,t,r)}info(t,...r){this.log(e.INFO,t,r)}}var e;!function(t){t[t.DEBUG=0]="DEBUG",t[t.ERROR=1]="ERROR",t[t.WARN=2]="WARN",t[t.INFO=3]="INFO"}(e||(e={}));class r{static guid(){let t,e,r="";for(t=0;t<32;t++)e=16*Math.random()|0,8!=t&&12!=t&&16!=t&&20!=t||(r+="-"),r+=(12==t?4:16==t?3&e|8:e).toString(16);return r}static mergeDeep(...t){let e={},s=0;for(;s<arguments.length;s++)r.merge(arguments[s],e,!0);return e}static merge(t,e,s){for(const n in t)t.hasOwnProperty(n)&&(e[n]=s&&"[object Object]"===Object.prototype.toString.call(t[n])?r.mergeDeep(e[n],t[n]):t[n])}static isObject(t){return t&&"object"==typeof t&&!Array.isArray(t)}static getTooltipCallbacks(){return{title:t=>t[0].xLabel,label:(t,e)=>{let r=e.datasets[t.datasetIndex].label||"";return r&&(r+=": "),r+t.yLabel}}}static buildImage(t,e,r){const s=new Image(t,e);return s.src="data:image/svg+xml;base64,"+btoa(`<svg width="${t}px" height="${e}px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${e}" preserveAspectRatio="xMidYMid">\n<rect width="${t}" height="${e}" style="fill:${r};" ></rect>\n</svg>`),s}}class s{}class n{static cleanArray(t){return t.filter(t=>!!t)}static unique(t){let e={},r=[];for(let s=0,n=t.length;s<n;++s)e.hasOwnProperty(t[s])||(r.push(t[s]),e[t[s]]=1);return r}static isArray(t){return t&&"object"==typeof t&&t instanceof Array&&"number"==typeof t.length&&"function"==typeof t.splice&&!t.propertyIsEnumerable("length")}static isValidResponse(t){let e;try{e=JSON.parse(t)}catch(e){return this.LOG.error(["isValidResponse"],"Response non JSON compliant",t),!1}return!!n.isArray(e)||(this.LOG.error(["isValidResponse"],"Response isn't an Array",e),!1)}static isEmbeddedImage(t){return!("string"!=typeof t||!/^data:image/.test(t))}static isEmbeddedImageObject(t){return!(null===t||null===t.image||null===t.caption||!n.isEmbeddedImage(t.image))}static isPositionArray(t){if(!t||!t.positions)return!1;if(n.isPositionsArrayWithValues(t)||n.isPositionsArrayWithTwoValues(t))return!0;for(let e in t.positions){if(t.positions[e].length<2||t.positions[e].length>3)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static isPositionsArrayWithValues(t){if(null===t||null===t.positions)return!1;for(let e in t.positions){if(3!==t.positions[e].length)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static isPositionsArrayWithTwoValues(t){if(null===t||null===t.positions)return!1;for(let e in t.positions){if(4!==t.positions[e].length)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static metricFromJSON(t){let e={ts:t[0],value:void 0,alt:void 0,lon:void 0,lat:void 0};switch(t.length){case 2:e.value=t[1];break;case 3:e.alt=t[1],e.value=t[2];break;case 4:e.lat=t[1],e.lon=t[2],e.value=t[3];break;case 5:e.lat=t[1],e.lon=t[2],e.alt=t[3],e.value=t[4]}return e}static gtsFromJSON(t,e){return{gts:{c:t.c,l:t.l,a:t.a,v:t.v,id:e}}}static gtsFromJSONList(t,e){let r,s=[];return(t||[]).forEach((t,a)=>{let o=t;t.gts&&(o=t.gts),r=void 0!==e&&""!==e?e+"-"+a:a,n.isArray(o)&&s.push(n.gtsFromJSONList(o,r)),n.isGts(o)&&s.push(n.gtsFromJSON(o,r)),n.isEmbeddedImage(o)&&s.push({image:o,caption:"Image",id:r}),n.isEmbeddedImageObject(o)&&s.push({image:o.image,caption:o.caption,id:r})}),{content:s||[]}}static flatDeep(t){return n.isArray(t)||(t=[t]),t.reduce((t,e)=>Array.isArray(e)?t.concat(n.flatDeep(e)):t.concat(e),[])}static flattenGtsIdArray(t,e){const r=[];return n.isGts(t)&&(t=[t]),t.forEach(t=>{if(n.isArray(t)){const s=n.flattenGtsIdArray(t,e);r.push(s.res),e=s.r}else t.v&&(t.id=e,r.push(t),e++)}),{res:r,r:e}}static serializeGtsMetadata(t){let e=[];Object.keys(t.l).forEach(r=>{e.push(r+"="+t.l[r])});let r=[];return Object.keys(t.a).forEach(e=>{r.push(e+"="+t.a[e])}),t.c+"{"+e.join(",")+(r.length>0?",":"")+r.join(",")+"}"}static gtsToPath(t){let e=[];for(let r=0;r<t.v.length;r++){let s=t.v[r];4===s.length&&e.push({ts:Math.floor(s[0]/1e3),lat:s[1],lon:s[2],val:s[3]}),5===s.length&&e.push({ts:Math.floor(s[0]/1e3),lat:s[1],lon:s[2],elev:s[3],val:s[4]})}return e}static equalMetadata(t,e){if(!(void 0!==t.c&&void 0!==e.c&&void 0!==t.l&&void 0!==e.l&&t.l instanceof Object&&e.l instanceof Object))return this.LOG.error(["equalMetadata"],"Error in GTS, metadata is not well formed"),!1;if(t.c!==e.c)return!1;for(let r in t.l)if(!e.l.hasOwnProperty(r)||t.l[r]!==e.l[r])return!1;for(let r in e.l)if(!t.l.hasOwnProperty(r))return!1;return!0}static isGts(t){return!(!t||null===t.c||null===t.l||null===t.a||null===t.v||!n.isArray(t.v))}static isGtsToPlot(t){if(!n.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("number"==typeof t.v[e][t.v[e].length-1]||void 0!==t.v[e][t.v[e].length-1].constructor.prototype.toFixed)return!0;break}return!1}static isBooleanGts(t){if(!n.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("boolean"!=typeof t.v[e][t.v[e].length-1])return!0;break}return!1}static isGtsToAnnotate(t){if(!n.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("number"!=typeof t.v[e][t.v[e].length-1]&&t.v[e][t.v[e].length-1].constructor&&"Big"!==t.v[e][t.v[e].length-1].constructor.name&&void 0===t.v[e][t.v[e].length-1].constructor.prototype.toFixed)return!0;break}return!1}static gtsSort(t){t.isSorted||(t.v=t.v.sort(function(t,e){return t[0]-e[0]}),t.isSorted=!0)}static gtsTimeRange(t){return n.gtsSort(t),0===t.v.length?null:[t.v[0][0],t.v[t.v.length-1][0]]}static getData(t){return"string"==typeof t?n.getData(JSON.parse(t)):t&&t.hasOwnProperty("data")?t:n.isArray(t)&&t.length>0&&t[0].data?t[0]:n.isArray(t)?{data:t}:new s}static getDivider(t){let e=1e3;return"ms"===t&&(e=1),"ns"===t&&(e=1e6),e}}n.LOG=new t(n),n.formatLabel=(t=>{const e=t.split("{");let r=`<span class="gtsInfo"><span class='gts-classname'>${e[0]}</span>`;if(e.length>1){r+="<span class='gts-separator'>{</span>";const t=e[1].substr(0,e[1].length-1).split(",");t.length>0&&t.forEach((e,s)=>{const n=e.split("=");e.length>1&&(r+=`<span><span class='gts-labelname'>${n[0]}</span><span class='gts-separator'>=</span><span class='gts-labelvalue'>${n[1]}</span>`,s!==t.length-1&&(r+="<span>, </span>"))}),r+="<span class='gts-separator'>}</span>"}if(e.length>2){r+="<span class='gts-separator'>{</span>";const t=e[2].substr(0,e[2].length-1).split(",");t.length>0&&t.forEach((e,s)=>{const n=e.split("=");e.length>1&&(r+=`<span><span class='gts-attrname'>${n[0]}</span><span class='gts-separator'>=</span><span class='gts-attrvalue'>${n[1]}</span>`,s!==t.length-1&&(r+="<span>, </span>"))}),r+="<span class='gts-separator'>}</span>"}return r+="</span>"});var a="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function o(t,e){return t(e={exports:{}},e.exports),e.exports}function i(t){return t&&t.default||t}var l=o(function(t,e){function r(t){var e=[];for(var r in t)e.push(r);return e}(t.exports="function"==typeof Object.keys?Object.keys:r).shim=r}),c=o(function(t,e){var r="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();function s(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function n(t){return t&&"object"==typeof t&&"number"==typeof t.length&&Object.prototype.hasOwnProperty.call(t,"callee")&&!Object.prototype.propertyIsEnumerable.call(t,"callee")||!1}(e=t.exports=r?s:n).supported=s,e.unsupported=n}),u=o(function(t){var e=Array.prototype.slice,r=t.exports=function(t,a,o){return o||(o={}),t===a||(t instanceof Date&&a instanceof Date?t.getTime()===a.getTime():!t||!a||"object"!=typeof t&&"object"!=typeof a?o.strict?t===a:t==a:function(t,a,o){var i,u;if(s(t)||s(a))return!1;if(t.prototype!==a.prototype)return!1;if(c(t))return!!c(a)&&(t=e.call(t),a=e.call(a),r(t,a,o));if(n(t)){if(!n(a))return!1;if(t.length!==a.length)return!1;for(i=0;i<t.length;i++)if(t[i]!==a[i])return!1;return!0}try{var p=l(t),f=l(a)}catch(t){return!1}if(p.length!=f.length)return!1;for(p.sort(),f.sort(),i=p.length-1;i>=0;i--)if(p[i]!=f[i])return!1;for(i=p.length-1;i>=0;i--)if(!r(t[u=p[i]],a[u],o))return!1;return typeof t==typeof a}(t,a,o))};function s(t){return null==t}function n(t){return!(!t||"object"!=typeof t||"number"!=typeof t.length||"function"!=typeof t.copy||"function"!=typeof t.slice||t.length>0&&"number"!=typeof t[0])}});class p{constructor(){this.showDots=!1,this.timeUnit="us"}}export{r as a,n as b,u as c,t as d,p as e,s as f,o as g,a as h,i};