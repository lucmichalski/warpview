/*! Built with http://stenciljs.com */
(function(Context,namespace,hydratedCssClass,resourcesUrl,s){"use strict";
s=document.querySelector("script[data-namespace='quantumviz']");if(s){resourcesUrl=s.getAttribute('data-resources-url');}
(function(t,e,n,o){"use strict";function i(t,e,n,o,i,c,f){let l=n.t+(o||x),r=n[l];if(r||(r=n[l=n.t+x]),r){let o=e.e;if(e.n)if(1===n.encapsulation)o=i.shadowRoot;else for(;i=e.o(i);)if(i.host&&i.host.shadowRoot){o=i.host.shadowRoot;break}const c=t.i.get(o)||{};if(!c[l]){f=r.content.cloneNode(!0);const n=o.querySelectorAll("[data-styles]");e.c(o,f,n.length&&n[n.length-1].nextSibling||o.f),c[l]=!0,t.i.set(o,c)}}}function c(t){return{l:t[0],r:t[1],s:!!t[2],u:!!t[3],a:!!t[4]}}function f(t,e){if(S(e)&&"object"!=typeof e&&"function"!=typeof e){if(t===Boolean||3===t)return"false"!==e&&(""===e||!!e);if(t===Number||4===t)return parseFloat(e);if(t===String||2===t)return e.toString()}return e}function l(t,e,n,o){const i=t.p.get(e);i&&((o=i["s-ld"]||i.$activeLoading)&&((n=o.indexOf(e))>-1&&o.splice(n,1),o.length||(i["s-init"]&&i["s-init"](),i.$initLoad&&i.$initLoad())),t.p.delete(e))}function r(t,e,n){let o,i,c=null,f=!1,l=!1;for(var r=arguments.length;r-- >2;)R.push(arguments[r]);for(;R.length>0;)if((n=R.pop())&&void 0!==n.pop)for(r=n.length;r--;)R.push(n[r]);else"boolean"==typeof n&&(n=null),(l="function"!=typeof t)&&(null==n?n="":"number"==typeof n?n=String(n):"string"!=typeof n&&(l=!1)),l&&f?c[c.length-1].d+=n:null===c?c=[l?{d:n}:n]:c.push(l?{d:n}:n),f=l;if(null!=e){if(e.className&&(e.class=e.className),"object"==typeof e.class){for(r in e.class)e.class[r]&&R.push(r);e.class=R.join(" "),R.length=0}null!=e.v&&(o=e.v),null!=e.name&&(i=e.name)}return"function"==typeof t?t(Object.assign({},e,{children:c}),L):{b:t,m:c,d:void 0,y:e,w:o,g:i,M:void 0,k:!1}}function s(t,e){t.C.has(e)||(t.C.set(e,!0),t.j?t.queue.write(()=>u(t,e)):t.queue.tick(()=>u(t,e)))}function u(t,e,n,o,i,c){if(t.C.delete(e),!t.W.has(e)){if(o=t.x.get(e),n=!o){if((i=t.p.get(e))&&i.$rendered&&(i["s-rn"]=!0),i&&!i["s-rn"])return(i["s-rc"]=i["s-rc"]||[]).push(()=>{u(t,e)}),void(i.$onRender=i["s-rc"]);o=function f(t,e,n,o,i,c,l){try{(function r(t,e,n,o,i,c,f){for(f in t.N.set(o,n),t.O.has(n)||t.O.set(n,{}),(c=Object.assign({color:{type:String}},e.properties)).mode={type:String},c)p(t,c[f],n,o,f,i)})(t,i=t.A(e).S,e,o=new i,n),function s(t,e,n){if(e){const o=t.N.get(n);e.forEach(e=>{n[e.method]={emit:n=>{t.T(o,e.name,{bubbles:e.bubbles,composed:e.composed,cancelable:e.cancelable,detail:n})}}})}}(t,i.events,o);try{if(c=t.R.get(e)){for(l=0;l<c.length;l+=2)o[c[l]](c[l+1]);t.R.delete(e)}}catch(n){t.L(n,2,e)}}catch(n){o={},t.L(n,7,e,!0)}return t.x.set(e,o),o}(t,e,t.q.get(e));try{o.componentWillLoad&&(c=o.componentWillLoad())}catch(n){t.L(n,3,e)}}c&&c.then?c.then(()=>a(t,e,o,n)):a(t,e,o,n)}}function a(t,e,n,o){(function i(t,e,n,o,c){try{const i=e.S.host;let f;if(o.render||o.hostData||i||f){t.B=!0;const i=o.render&&o.render();let f;t.B=!1;const l=t.D.get(n)||{};l.M=n;const s=r(null,f,i);t.D.set(n,t.render(l,s,c,e.S.encapsulation))}t.P(t,t.F,e,o.mode,n),n["s-rn"]=!0,n.$onRender&&(n["s-rc"]=n.$onRender),n["s-rc"]&&(n["s-rc"].forEach(t=>t()),n["s-rc"]=null)}catch(e){t.B=!1,t.L(e,8,n,!0)}})(t,t.A(e),e,n,!o);try{o?e["s-init"]():g(t.D.get(e))}catch(n){t.L(n,6,e,!0)}}function p(t,e,n,o,i,c,l,r){if(e.type||e.state){const s=t.O.get(n);e.state||(!e.attr||void 0!==s[i]&&""!==s[i]||(l=c&&c.H)&&S(r=l[e.attr])&&(s[i]=f(e.type,r)),n.hasOwnProperty(i)&&(void 0===s[i]&&(s[i]=f(e.type,n[i])),delete n[i])),o.hasOwnProperty(i)&&void 0===s[i]&&(s[i]=o[i]),e.watchCallbacks&&(s[q+i]=e.watchCallbacks.slice()),b(o,i,function s(e){return(e=t.O.get(t.N.get(this)))&&e[i]},function u(n,o){(o=t.N.get(this))&&(e.state||e.mutable)&&d(t,o,i,n)})}else e.elementRef&&v(o,i,n)}function d(t,e,n,o,i,c,f){(i=t.O.get(e))||t.O.set(e,i={});const l=i[n];if(o!==l&&(i[n]=o,c=t.x.get(e))){if(f=i[q+n])for(let t=0;t<f.length;t++)try{c[f[t]].call(c,o,l,n)}catch(t){}!t.B&&e["s-rn"]&&s(t,e)}}function v(t,e,n){Object.defineProperty(t,e,{configurable:!0,value:n})}function b(t,e,n,o){Object.defineProperty(t,e,{configurable:!0,get:n,set:o})}function m(t,e,n,o,i,c,f,l,r){if("class"!==n||c)if("style"===n){for(l in o=o||N,i=i||N,o)i[l]||(e.style[l]="");for(l in i)i[l]!==o[l]&&(e.style[l]=i[l])}else if("o"!==n[0]||"n"!==n[1]||!/[A-Z]/.test(n[2])||n in e)if("list"!==n&&"type"!==n&&!c&&(n in e||-1!==["object","function"].indexOf(typeof i)&&null!==i)){const o=t.A(e);o&&o.I&&o.I[n]?h(e,n,i):"ref"!==n&&(h(e,n,null==i?"":i),null!=i&&!1!==i||e.removeAttribute(n))}else null!=i?function s(t,e,n){const o=e!==(e=e.replace(/^xlink\:?/,"")),i=B[e];!i||n&&"false"!==n?"function"!=typeof n&&(i&&(n=""),o?t.setAttributeNS(D,A(e),n):t.setAttribute(e,n)):o?t.removeAttributeNS(D,A(e)):t.removeAttribute(e)}(e,n,i):!c||null!=i&&!1!==i||e.removeAttribute(n);else n=A(n)in e?A(n.substring(2)):A(n[2])+n.substring(3),i?i!==o&&t.F.U(e,n,i):t.F.z(e,n);else if(o!==i){const t=null==o||""===o?O:o.trim().split(/\s+/),n=null==i||""===i?O:i.trim().split(/\s+/);let c=null==e.className||""===e.className?O:e.className.trim().split(/\s+/);for(l=0,r=t.length;l<r;l++)-1===n.indexOf(t[l])&&(c=c.filter(e=>e!==t[l]));for(l=0,r=n.length;l<r;l++)-1===t.indexOf(n[l])&&(c=[...c,n[l]]);e.className=c.join(" ")}}function h(t,e,n){try{t[e]=n}catch(t){}}function y(t,e,n,o,i){const c=11===n.M.nodeType&&n.M.host?n.M.host:n.M,f=e&&e.y||N,l=n.y||N;for(i in f)l&&null!=l[i]||null==f[i]||m(t,c,i,f[i],void 0,o,n.k);for(i in l)i in f&&l[i]===("value"===i||"checked"===i?c[i]:f[i])||m(t,c,i,f[i],l[i],o,n.k)}function w(t,e){function n(i,c,f,l,r,s,p,d,h){if(d=c.m[f],u||(v=!0,"slot"===d.b&&(a&&e.Q(l,a+"-slot",""),d.m?d.Z=!0:d.G=!0)),S(d.d))d.M=e.J(d.d);else if(d.G)d.M=e.J("");else{if(s=d.M=P||"svg"===d.b?e.K("http://www.w3.org/2000/svg",d.b):e.V(d.Z?"slot-fb":d.b),P="svg"===d.b||"foreignObject"!==d.b&&P,y(t,null,d,P),S(a)&&s["s-si"]!==a&&e.Q(s,s["s-si"]=a,""),d.m)for(r=0;r<d.m.length;++r)(p=n(i,d,r,s))&&e.X(s,p);"svg"===d.b&&(P=!1)}return d.M["s-hn"]=b,(d.Z||d.G)&&(d.M["s-sr"]=!0,d.M["s-cr"]=m,d.M["s-sn"]=d.g||"",(h=i&&i.m&&i.m[f])&&h.b===d.b&&i.M&&o(i.M)),d.M}function o(n,i,c,f){t.Y=!0;const s=e._(n);for(c=s.length-1;c>=0;c--)(f=s[c])["s-hn"]!==b&&f["s-ol"]&&(e.tt(f),e.c(r(f),f,l(f)),e.tt(f["s-ol"]),f["s-ol"]=null,v=!0),i&&o(f,i);t.Y=!1}function i(t,o,i,c,f,r,s,u){const a=t["s-cr"]||t.$defaultHolder;for((s=a&&e.o(a)||t).shadowRoot&&(s=s.shadowRoot);f<=r;++f)c[f]&&(u=S(c[f].d)?e.J(c[f].d):n(null,i,f,t))&&(c[f].M=u,e.c(s,u,l(o)))}function c(t,n,i,c){for(;n<=i;++n)S(t[n])&&(c=t[n].M,d=!0,c["s-ol"]?e.tt(c["s-ol"]):o(c,!0),e.tt(c))}function f(t,e){return t.b===e.b&&t.w===e.w&&("slot"!==t.b||t.g===e.g)}function l(t){return t&&t["s-ol"]?t["s-ol"]:t}function r(t){return e.o(t["s-ol"]?t["s-ol"]:t)}const s=[];let u,a,p,d,v,b,m;return function h(w,g,M,$,k,C,j,W,x){if(p=M,b=e.et(w.M),m=w.M["s-cr"],a="scoped"===$||"shadow"===$&&!e.n?"data-"+e.et(w.M):null,v=d=!1,u="shadow"===$&&e.n,p||(u?w.M=e.nt(w.M,{mode:"open"}):a&&e.Q(w.M,a+"-host","")),function s(u,a,p){const d=a.M=u.M,v=u.m,b=a.m;P=a.M&&S(e.ot(a.M))&&void 0!==a.M.ownerSVGElement,P="svg"===a.b||"foreignObject"!==a.b&&P,S(a.d)?(p=d["s-cr"]||d.$defaultHolder)?e.it(e.o(p),a.d):u.d!==a.d&&e.it(d,a.d):("slot"!==a.b&&y(t,u,a,P),S(v)&&S(b)?function m(t,u,a,p,d,v,b,h){let y=0,w=0,g=u.length-1,M=u[0],$=u[g],k=p.length-1,C=p[0],j=p[k];for(;y<=g&&w<=k;)if(null==M)M=u[++y];else if(null==$)$=u[--g];else if(null==C)C=p[++w];else if(null==j)j=p[--k];else if(f(M,C))s(M,C),M=u[++y],C=p[++w];else if(f($,j))s($,j),$=u[--g],j=p[--k];else if(f(M,j))"slot"!==M.b&&"slot"!==j.b||o(e.o(M.M)),s(M,j),e.c(t,M.M,e.ct($.M)),M=u[++y],j=p[--k];else if(f($,C))"slot"!==M.b&&"slot"!==j.b||o(e.o($.M)),s($,C),e.c(t,$.M,M.M),$=u[--g],C=p[++w];else{for(d=null,v=y;v<=g;++v)if(u[v]&&S(u[v].w)&&u[v].w===C.w){d=v;break}S(d)?((h=u[d]).b!==C.b?b=n(u&&u[w],a,d,t):(s(h,C),u[d]=void 0,b=h.M),C=p[++w]):(b=n(u&&u[w],a,w,t),C=p[++w]),b&&e.c(r(M.M),b,l(M.M))}y>g?i(t,null==p[k+1]?null:p[k+1].M,a,p,w,k):w>k&&c(u,y,g)}(d,v,a,b):S(b)?(S(u.d)&&e.it(d,""),i(d,null,a,b,0,b.length-1)):S(v)&&c(v,0,v.length-1)),P&&"svg"===a.b&&(P=!1)}(w,g),v){for(function t(n,o,i,c,f,l,r,u,a,p){for(f=0,l=(o=e._(n)).length;f<l;f++){if((i=o[f])["s-sr"]&&(c=i["s-cr"]))for(u=e._(e.o(c)),a=i["s-sn"],r=u.length-1;r>=0;r--)(c=u[r])["s-cn"]||c["s-nr"]||c["s-hn"]===i["s-hn"]||((3===(p=e.ft(c))||8===p)&&""===a||1===p&&null===e.lt(c,"slot")&&""===a||1===p&&e.lt(c,"slot")===a)&&(s.some(t=>t.rt===c)||(d=!0,c["s-sn"]=a,s.push({st:i,rt:c})));1===e.ft(i)&&t(i)}}(g.M),C=0;C<s.length;C++)(j=s[C]).rt["s-ol"]||((W=e.J(""))["s-nr"]=j.rt,e.c(e.o(j.rt),j.rt["s-ol"]=W,j.rt));for(t.Y=!0,C=0;C<s.length;C++){j=s[C];const t=e.o(j.st);let n=e.ct(j.st);for(W=j.rt["s-ol"];W=e.ut(W);)if((x=W["s-nr"])&&x["s-sn"]===j.rt["s-sn"]&&t===e.o(x)){n=e.ct(x);break}(!n&&t!==e.o(j.rt)||e.ct(j.rt)!==n)&&j.rt!==n&&(e.tt(j.rt),e.c(t,j.rt,n))}t.Y=!1}return d&&function t(n,o,i,c,f,l,r,s){for(c=0,f=(i=e._(n)).length;c<f;c++)if(o=i[c],1===e.ft(o)){if(o["s-sr"])for(r=o["s-sn"],o.hidden=!1,l=0;l<f;l++)if(i[l]["s-hn"]!==o["s-hn"])if(s=e.ft(i[l]),""!==r){if(1===s&&r===e.lt(i[l],"slot")){o.hidden=!0;break}}else if(1===s||3===s&&""!==e.at(i[l]).trim()){o.hidden=!0;break}t(o)}}(g.M),s.length=0,g}}function g(t,e){t&&(t.y&&t.y.ref&&t.y.ref(e?null:t.M),t.m&&t.m.forEach(t=>{g(t,e)}))}function M(t,e,n,o,i){const c=t.ft(e);let f,l,r,s;if(i&&1===c){(l=t.lt(e,W))&&(r=l.split("."))[0]===o&&((s={}).b=t.et(s.M=e),n.m||(n.m=[]),n.m[r[1]]=s,n=s,i=""!==r[2]);for(let c=0;c<e.childNodes.length;c++)M(t,e.childNodes[c],n,o,i)}else 3===c&&(f=e.previousSibling)&&8===t.ft(f)&&"s"===(r=t.at(f).split("."))[0]&&r[1]===o&&((s={d:t.at(e)}).M=e,n.m||(n.m=[]),n.m[r[2]]=s)}function $(t,e,n,o,i){return n["s-cr"]||t.lt(n,j)||function c(t,e){return t&&1===e.encapsulation}(t.n,e)||(n["s-cr"]=t.J(""),n["s-cr"]["s-cn"]=!0,t.c(n,n["s-cr"],t._(n)[0])),t.n||1!==e.encapsulation||(n.shadowRoot=n),o={pt:n["s-id"],H:{}},e.I&&Object.keys(e.I).forEach(c=>{(i=e.I[c].dt)&&(o.H[i]=t.lt(n,i))}),o}function k(t,e,n,o){n.connectedCallback=function(){(function n(t,e,o){t.vt.has(o)||(t.vt.set(o,!0),function i(t,e){const n=t.A(e);n.bt&&n.bt.forEach(n=>{n.s||t.F.U(e,n.l,function o(t,e,n,i){return o=>{(i=t.x.get(e))?i[n](o):((i=t.R.get(e)||[]).push(n,o),t.R.set(e,i))}}(t,e,n.r),n.a,n.u)})}(t,o)),t.W.delete(o),t.mt.has(o)||(t.mt.set(o,!0),o["s-id"]||(o["s-id"]=t.ht()),function c(t,e,n){for(n=e;n=t.F.ot(n);)if(t.yt(n)){t.wt.has(e)||(t.p.set(e,n),n.$activeLoading&&(n["s-ld"]=n.$activeLoading),(n["s-ld"]=n["s-ld"]||[]).push(e));break}}(t,o),t.queue.tick(()=>t.gt(e,o,$(t.F,e,o))))})(t,e,this)},n.attributeChangedCallback=function(t,n,o){(function i(t,e,n,o,c,l,r){if(t&&o!==c)for(l in t)if((r=t[l]).dt&&A(r.dt)===A(n)){e[l]=f(r.Mt,c);break}})(e.I,this,t,n,o)},n.disconnectedCallback=function(){(function e(t,n,o){!t.Y&&function i(t,e){for(;e;){if(!t.o(e))return 9!==t.ft(e);e=t.o(e)}}(t.F,n)&&(t.W.set(n,!0),l(t,n),g(t.D.get(n),!0),t.F.z(n),t.vt.delete(n),[t.p,t.$t,t.q].forEach(t=>t.delete(n)))})(t,this)},n["s-init"]=function(){(function e(t,n,o,i,c){if(!t.wt.has(n)&&(i=t.x.get(n))&&!t.W.has(n)&&(!n["s-ld"]||!n["s-ld"].length)){delete n["s-ld"],t.wt.set(n,!0);try{g(t.D.get(n)),(c=t.$t.get(n))&&(c.forEach(t=>t(n)),t.$t.delete(n)),i.componentDidLoad&&i.componentDidLoad()}catch(e){t.L(e,4,n)}n.classList.add(o),l(t,n)}})(t,this,o)},n.forceUpdate=function(){s(t,this)},function i(t,e,n){e&&Object.keys(e).forEach(o=>{const i=e[o],c=i.kt;1===c||2===c?b(n,o,function e(){return(t.O.get(this)||{})[o]},function e(n){d(t,this,o,f(i.Mt,n))}):6===c&&v(n,o,T)})}(t,e.I,n)}function C(t,e,n,o){return function(){const i=arguments;return function c(t,e,n){return new Promise(o=>{let i=e[n];i||(i=t.Ct.querySelector(n)),i||(i=e[n]=t.V(n),t.X(t.Ct,i)),i.componentOnReady(o)})}(t,e,n).then(t=>t[o].apply(t,i))}}const j="data-ssrv",W="data-ssrc",x="$",N={},O=[],E={enter:13,escape:27,space:32,tab:9,left:37,up:38,right:39,down:40},S=t=>null!=t,A=t=>t.toLowerCase(),T=()=>{},R=[],L={getAttributes:function(t){return t.y},replaceAttributes:function(t,e){t.y=e}},q="wc-",B={allowfullscreen:1,async:1,autofocus:1,autoplay:1,checked:1,controls:1,disabled:1,enabled:1,formnovalidate:1,hidden:1,multiple:1,noresize:1,readonly:1,required:1,selected:1,spellcheck:1},D="http://www.w3.org/1999/xlink";let P=!1;(function F(t,e,n,o,f,l){const u={html:{}},a={},p=n[t]=n[t]||{},d=function v(t,e,n){t.jt||(t.jt=((t,e,n,o)=>t.addEventListener(e,n,o)),t.Wt=((t,e,n,o)=>t.removeEventListener(e,n,o)));const o=new WeakMap,i={xt:n.documentElement,e:n.head,Ct:n.body,Nt:!1,ft:t=>t.nodeType,V:t=>n.createElement(t),K:(t,e)=>n.createElementNS(t,e),J:t=>n.createTextNode(t),Ot:t=>n.createComment(t),c:(t,e,n)=>t.insertBefore(e,n),tt:t=>t.remove(),X:(t,e)=>t.appendChild(e),_:t=>t.childNodes,o:t=>t.parentNode,ct:t=>t.nextSibling,ut:t=>t.previousSibling,et:t=>A(t.nodeName),at:t=>t.textContent,it:(t,e)=>t.textContent=e,lt:(t,e)=>t.getAttribute(e),Q:(t,e,n)=>t.setAttribute(e,n),Et:(t,e,n,o)=>t.setAttributeNS(e,n,o),St:(t,e)=>t.removeAttribute(e),At:(t,o)=>"child"===o?t.firstElementChild:"parent"===o?i.ot(t):"body"===o?i.Ct:"document"===o?n:"window"===o?e:t,U:(e,n,c,f,l,r,s,u)=>{const a=n;let p=e,d=o.get(e);if(d&&d[a]&&d[a](),"string"==typeof r?p=i.At(e,r):"object"==typeof r?p=r:(u=n.split(":")).length>1&&(p=i.At(e,u[0]),n=u[1]),!p)return;let v=c;(u=n.split(".")).length>1&&(n=u[0],v=(t=>{t.keyCode===E[u[1]]&&c(t)})),s=i.Nt?{capture:!!f,passive:!!l}:!!f,t.jt(p,n,v,s),d||o.set(e,d={}),d[a]=(()=>{p&&t.Wt(p,n,v,s),d[a]=null})},z:(t,e)=>{const n=o.get(t);n&&(e?n[e]&&n[e]():Object.keys(n).forEach(t=>{n[t]&&n[t]()}))},nt:(t,e)=>t.attachShadow(e)};i.n=!!i.xt.attachShadow,i.Tt=((t,n,o)=>t&&t.dispatchEvent(new e.CustomEvent(n,o)));try{e.addEventListener("e",null,Object.defineProperty({},"passive",{get:()=>i.Nt=!0}))}catch(t){}return i.ot=((t,e)=>(e=i.o(t))&&11===i.ft(e)?e.host:e),i}(p,n,o);e.isServer=e.isPrerender=!(e.isClient=!0),e.window=n,e.location=n.location,e.document=o,e.resourcesUrl=e.publicPath=f,e.enableListener=((t,e,n,o,i)=>(function c(t,e,n,o,i,f){if(e){const c=t.N.get(e),l=t.A(c);if(l&&l.bt)if(o){const o=l.bt.find(t=>t.l===n);o&&t.F.U(c,n,t=>e[o.r](t),o.a,void 0===f?o.u:!!f,i)}else t.F.z(c,n)}})(h,t,e,n,o,i)),e.emit=((t,n,o)=>d.Tt(t,e.eventNameFn?e.eventNameFn(n):n,o)),p.h=r,p.Context=e;const b=n.$definedCmps=n.$definedCmps||{};let m=0;const h={F:d,Rt:function y(t,e){if(!b[t.t]){b[t.t]=!0,k(h,t,e.prototype,l);{const n=[];for(const e in t.I)t.I[e].dt&&n.push(t.I[e].dt);e.observedAttributes=n}n.customElements.define(t.t,e)}},T:e.emit,A:t=>u[d.et(t)],Lt:t=>e[t],isClient:!0,yt:t=>!(!b[d.et(t)]&&!h.A(t)),ht:()=>t+m++,L:(t,e,n)=>void 0,qt:t=>(function e(t,n,o){return{create:C(t,n,o,"create"),componentOnReady:C(t,n,o,"componentOnReady")}})(d,a,t),queue:e.queue=function g(t,e){function n(t){for(let e=0;e<t.length;e++)try{t[e]()}catch(t){}t.length=0}function o(t,e){let n=0;for(;n<t.length&&c()<e;)try{t[n++]()}catch(t){}n===t.length?t.length=0:0!==n&&t.splice(0,n)}function i(){a++,n(r);const e=c()+7*Math.ceil(a*(1/22));o(s,e),o(u,e),s.length>0&&(u.push(...s),s.length=0),(p=r.length+s.length+u.length>0)?t.raf(i):a=0}const c=()=>e.performance.now(),f=Promise.resolve(),l=[],r=[],s=[],u=[];let a=0,p=!1;return t.raf||(t.raf=e.requestAnimationFrame.bind(e)),{tick(t){l.push(t),1===l.length&&f.then(()=>n(l))},read(e){r.push(e),p||(p=!0,t.raf(i))},write(e){s.push(e),p||(p=!0,t.raf(i))}}}(p,n),gt:function W(t,n){if(n.mode||(n.mode=d.lt(n,"mode")||e.mode),$(h.F,t,n),t.S)s(h,n);else{const e="string"==typeof t.Bt?t.Bt:t.Bt[n.mode],o=f+e+(function o(t,e){return 2===e.encapsulation||1===e.encapsulation&&!t}(d.n,t)?".sc":"")+".js";import(o).then(e=>{try{t.S=e[(t=>A(t).split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(""))(t.t)],function o(t,e,n){const o=n.style;if(o){const i=n.is+(n.styleMode||x);if(!e[i]){const n=t.V("template");e[i]=n,n.innerHTML=`<style>${o}</style>`,t.X(t.e,n)}}}(d,t,t.S)}catch(e){t.S=class{}}s(h,n)}).catch(t=>void 0)}},p:new WeakMap,i:new WeakMap,mt:new WeakMap,vt:new WeakMap,wt:new WeakMap,N:new WeakMap,q:new WeakMap,x:new WeakMap,W:new WeakMap,C:new WeakMap,$t:new WeakMap,R:new WeakMap,D:new WeakMap,O:new WeakMap};h.render=w(h,d);const N=d.xt;N["s-ld"]=[],N["s-rn"]=!0,N["s-init"]=(()=>{h.wt.set(N,p.loaded=h.j=!0),d.Tt(n,"appload",{detail:{namespace:t}})}),function O(t,e,n){const o=n.querySelectorAll(`[${j}]`),i=o.length;let c,f,l,r,s,u;if(i>0)for(t.wt.set(n,!0),r=0;r<i;r++)for(c=o[r],f=e.lt(c,j),(l={}).b=e.et(l.M=c),t.D.set(c,l),s=0,u=c.childNodes.length;s<u;s++)M(e,c.childNodes[s],l,f,!0)}(h,d,N),h.P=i,(p.components||[]).map(t=>(function e(t,n,o,i){const f={t:t[0],I:{color:{dt:"color"}}};f.Bt=t[1];const l=t[3];if(l)for(o=0;o<l.length;o++)i=l[o],f.I[i[0]]={kt:i[1],Dt:!!i[2],dt:"string"==typeof i[3]?i[3]:i[3]?i[0]:0,Mt:i[4]};return f.encapsulation=t[4],t[5]&&(f.bt=t[5].map(c)),n[f.t]=f})(t,u)).forEach(t=>h.Rt(t,class extends HTMLElement{})),function S(t,e){e.componentOnReady=((e,n)=>{if(t.A(e)&&!t.wt.has(e)){const o=t.$t.get(e)||[];o.push(n),t.$t.set(e,o)}else n(e)}),e.$r&&e.$r.forEach(t=>e.componentOnReady(t[0],t[1])),e.$r=null}(h,p),p.initialized=!0})(o,n,t,e,resourcesUrl,hydratedCssClass)})(window,document,Context,namespace);
})({},"quantumviz","hydrated");