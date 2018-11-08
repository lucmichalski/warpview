/*! Built with http://stenciljs.com */
const{h:t}=window.warpview;class e{}class r{static cleanArray(t){return t.filter(t=>!!t)}static unique(t){let e={},r=[];for(let s=0,n=t.length;s<n;++s)e.hasOwnProperty(t[s])||(r.push(t[s]),e[t[s]]=1);return r}static isArray(t){return t&&"object"==typeof t&&t instanceof Array&&"number"==typeof t.length&&"function"==typeof t.splice&&!t.propertyIsEnumerable("length")}static isValidResponse(t){let e;try{e=JSON.parse(t)}catch(e){return console.error("Response non JSON compliant",t),!1}return!!r.isArray(e)||(console.error("Response isn't an Array",e),!1)}static isEmbeddedImage(t){return!("string"!=typeof t||!/^data:image/.test(t))}static isEmbeddedImageObject(t){return!(null===t||null===t.image||null===t.caption||!r.isEmbeddedImage(t.image))}static isPositionArray(t){if(!t||!t.positions)return!1;if(r.isPositionsArrayWithValues(t)||r.isPositionsArrayWithTwoValues(t))return!0;for(let e in t.positions){if(t.positions[e].length<2||t.positions[e].length>3)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static isPositionsArrayWithValues(t){if(null===t||null===t.positions)return!1;for(let e in t.positions){if(3!==t.positions[e].length)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static isPositionsArrayWithTwoValues(t){if(null===t||null===t.positions)return!1;for(let e in t.positions){if(4!==t.positions[e].length)return!1;for(let r in t.positions[e])if("number"!=typeof t.positions[e][r])return!1}return!0}static metricFromJSON(t){let e={ts:t[0],value:void 0,alt:void 0,lon:void 0,lat:void 0};switch(t.length){case 2:e.value=t[1];break;case 3:e.alt=t[1],e.value=t[2];break;case 4:e.lat=t[1],e.lon=t[2],e.value=t[3];break;case 5:e.lat=t[1],e.lon=t[2],e.alt=t[3],e.value=t[4]}return e}static gtsFromJSON(t,e){return{gts:{c:t.c,l:t.l,a:t.a,v:t.v,id:e}}}static gtsFromJSONList(t,e){let s,n=[];return(t||[]).forEach((t,a)=>{let o=t;t.gts&&(o=t.gts),s=void 0!==e&&""!==e?e+"-"+a:a,r.isArray(o)&&n.push(r.gtsFromJSONList(o,s)),r.isGts(o)&&n.push(r.gtsFromJSON(o,s)),r.isEmbeddedImage(o)&&n.push({image:o,caption:"Image",id:s}),r.isEmbeddedImageObject(o)&&n.push({image:o.image,caption:o.caption,id:s})}),{content:n||[]}}static flatDeep(t){return t.reduce((t,e)=>Array.isArray(e)?t.concat(r.flatDeep(e)):t.concat(e),[])}static flattenGtsIdArray(t,e){let s,n;for(e||(e=[]),n=0;n<t.content.length;n++)(s=t.content[n]).content?r.flattenGtsIdArray(s,e):s.gts&&e.push(s.gts);return e}static serializeGtsMetadata(t){let e=[];Object.keys(t.l).forEach(r=>{e.push(r+"="+t.l[r])});let r=[];return Object.keys(t.a).forEach(e=>{r.push(e+"="+t.a[e])}),t.c+"{"+e.join(",")+(r.length>0?",":"")+r.join(",")+"}"}static gtsToPath(t){let e=[];t.v=t.v.sort(function(t,e){return t[0]-e[0]});for(let r=0;r<t.v.length;r++){let s=t.v[r];s.length,s.length,4===s.length&&e.push({ts:Math.floor(s[0]/1e3),lat:s[1],lon:s[2],val:s[3]}),5===s.length&&e.push({ts:Math.floor(s[0]/1e3),lat:s[1],lon:s[2],elev:s[3],val:s[4]})}return e}static equalMetadata(t,e){if(!(void 0!==t.c&&void 0!==e.c&&void 0!==t.l&&void 0!==e.l&&t.l instanceof Object&&e.l instanceof Object))return console.error("[warp10-gts-tools] equalMetadata - Error in GTS, metadata is not well formed"),!1;if(t.c!==e.c)return!1;for(let r in t.l){if(!e.l.hasOwnProperty(r))return!1;if(t.l[r]!==e.l[r])return!1}for(let r in e.l)if(!t.l.hasOwnProperty(r))return!1;return!0}static isGts(t){return!(!t||null===t||null===t.c||null===t.l||null===t.a||null===t.v||!r.isArray(t.v))}static isGtsToPlot(t){if(!r.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("number"==typeof t.v[e][t.v[e].length-1]||void 0!==t.v[e][t.v[e].length-1].constructor.prototype.toFixed)return!0;break}return!1}static isBooleanGts(t){if(!r.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("boolean"!=typeof t.v[e][t.v[e].length-1])return!0;break}return!1}static isGtsToAnnotate(t){if(!r.isGts(t)||0===t.v.length)return!1;for(let e=0;e<t.v.length;e++)if(null!==t.v[e][t.v[e].length-1]){if("number"!=typeof t.v[e][t.v[e].length-1]&&t.v[e][t.v[e].length-1].constructor&&"Big"!==t.v[e][t.v[e].length-1].constructor.name&&void 0===t.v[e][t.v[e].length-1].constructor.prototype.toFixed)return!0;break}return!1}static gtsSort(t){t.isSorted||(t.v=t.v.sort(function(t,e){return t[0]-e[0]}),t.isSorted=!0)}static gtsTimeRange(t){return r.gtsSort(t),0===t.v.length?null:[t.v[0][0],t.v[t.v.length-1][0]]}static getData(t){return"string"==typeof t?r.getData(JSON.parse(t)):t&&t.hasOwnProperty("data")?t:r.isArray(t)&&t.length>0&&t[0].data?t[0]:r.isArray(t)?{data:t}:new e}}class s{static getColor(t){return s.color[t%s.color.length]}static hexToRgb(t){let e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return e?[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]:null}static transparentize(t,e){return"rgba("+s.hexToRgb(t).concat(e).join(",")+")"}static generateColors(t){let e=[];for(let r=0;r<t;r++)e.push(s.getColor(r));return e}static generateTransparentColors(t){let e=[];for(let r=0;r<t;r++)e.push(s.transparentize(s.getColor(r),.5));return e}static hsvGradientFromRgbColors(t,e,r){let n=s.rgb2hsv(t.r,t.g,t.b),a=s.rgb2hsv(e.r,e.g,e.b);t.h=n[0],t.s=n[1],t.v=n[2],e.h=a[0],e.s=a[1],e.v=a[2];let o=s.hsvGradient(t,e,r);for(let t in o)o[t]&&(o[t].rgb=s.hsv2rgb(o[t].h,o[t].s,o[t].v),o[t].r=Math.floor(o[t].rgb[0]),o[t].g=Math.floor(o[t].rgb[1]),o[t].b=Math.floor(o[t].rgb[2]));return o}static rgb2hsv(t,e,r){let s,n,a,o=t/255,i=e/255,l=r/255,c=Math.max(o,i,l),u=c-Math.min(o,i,l);if(a=c,0===u)s=0,n=0;else switch(n=u/a,c){case o:s=(i-l+u*(i<l?6:0))/6*u;break;case i:s=(l-o+2*u)/6*u;break;case l:s=(o-i+4*u)/6*u}return[s,n,a]}static hsvGradient(t,e,r){let s=new Array(r),n=t.h>=e.h?t.h-e.h:1+t.h-e.h,a=t.h>=e.h?1+e.h-t.h:e.h-t.h;for(let o=0;o<r;o++){let i=a<=n?t.h+a*o/(r-1):t.h-n*o/(r-1);i<0&&(i=1+i),i>1&&(i-=1);let l=(1-o/(r-1))*t.s+o/(r-1)*e.s,c=(1-o/(r-1))*t.v+o/(r-1)*e.v;s[o]={h:i,s:l,v:c}}return s}static hsv2rgb(t,e,r){let s,n,a,o=Math.floor(6*t),i=6*t-o,l=r*(1-e),c=r*(1-i*e),u=r*(1-(1-i)*e);switch(o%6){case 0:s=r,n=u,a=l;break;case 1:s=c,n=r,a=l;break;case 2:s=l,n=r,a=u;break;case 3:s=l,n=c,a=r;break;case 4:s=u,n=l,a=r;break;case 5:s=r,n=l,a=c}return[255*s,255*n,255*a]}static rgb2hex(t,e,r){function s(t){let e=t.toString(16);return 1===e.length?"0"+e:e}return"#"+s(t)+s(e)+s(r)}}s.color=["#5899DA","#E8743B","#19A979","#ED4A7B","#945ECF","#13A4B4","#525DF4","#BF399E","#6C8893","#EE6868","#2F6497"];class n{constructor(t){this.className=t.name}log(t,e,r){const s=`[${this.className}] ${e.join(" - ")}`;switch(t){case a.DEBUG:break;case a.ERROR:console.error(s,r);break;case a.INFO:console.log(s,r);break;case a.WARN:console.warn(s,r);break;default:console.log(s,r)}}debug(t,e){this.log(a.DEBUG,t,e)}error(t,e){this.log(a.ERROR,t,e)}warn(t,e){this.log(a.WARN,t,e)}info(t,e){this.log(a.INFO,t,e)}}var a;!function(t){t[t.DEBUG=0]="DEBUG",t[t.ERROR=1]="ERROR",t[t.WARN=2]="WARN",t[t.INFO=3]="INFO"}(a||(a={}));class o{static guid(){let t,e,r="";for(t=0;t<32;t++)e=16*Math.random()|0,8!=t&&12!=t&&16!=t&&20!=t||(r+="-"),r+=(12==t?4:16==t?3&e|8:e).toString(16);return r}static mergeDeep(...t){let e={},r=0;for(;r<arguments.length;r++){const t=arguments[r];o.merge(t,e,!0)}return e}static merge(t,e,r){for(const s in t)t.hasOwnProperty(s)&&(r&&"[object Object]"===Object.prototype.toString.call(t[s])?e[s]=o.mergeDeep(e[s],t[s]):e[s]=t[s])}static isObject(t){return t&&"object"==typeof t&&!Array.isArray(t)}static getGridColor(t){return"#8e8e8e"}static getTooltipCallbacks(){return{title:t=>t[0].xLabel,label:(t,e)=>{let r=e.datasets[t.datasetIndex].label||"";return r&&(r+=": "),r+t.yLabel}}}static buildImage(t,e,r){const s=new Image(t,e),n=`<svg width="${t}px" height="${e}px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${e}" preserveAspectRatio="xMidYMid">\n<rect width="${t}" height="${e}" style="fill:${r};" />\n</svg>`;return s.src="data:image/svg+xml;base64,"+btoa(n),s}}export{r as a,s as b,n as c,o as d,e};