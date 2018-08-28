/*! Built with http://stenciljs.com */
<<<<<<< HEAD
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

    function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm, orgComponentOnReady) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    // create a temporary array to store the resolves
    // before the core file has fully loaded
    App.$r = [];
    // add componentOnReady to HTMLElement.prototype
    orgComponentOnReady = HTMLElementPrototype.componentOnReady;
    HTMLElementPrototype.componentOnReady = function componentOnReady(cb) {
        const elm = this;
        // there may be more than one app on the window so
        // call original HTMLElement.prototype.componentOnReady
        // if one exists already
        orgComponentOnReady && orgComponentOnReady.call(elm);
        function executor(resolve) {
            if (App.$r) {
                // core file hasn't loaded yet
                // so let's throw it in this temporary queue
                // and when the core does load it'll handle these
                App.$r.push([elm, resolve]);
            }
            else {
                // core has finished loading because there's no temporary queue
                // call the core's logic to handle this
                App.componentOnReady(elm, resolve);
            }
        }
        if (cb) {
            // just a callback
            return executor(cb);
        }
        // callback wasn't provided, let's return a promise
        if (win.Promise) {
            // use native/polyfilled promise
            return new Promise(executor);
        }
        // promise may not have been polyfilled yet
        return { then: executor };
    };
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}


    init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

    })(window, document, "quantumviz","quantumviz",0,"quantumviz.core.js","es5-build-disabled.js","hydrated",[["quantum-annotation","quantum-annotation",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",2,0,1,2],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["width",1,0,1,2]],1],["quantum-bubble","quantum-bubble",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-chart","quantum-chart",1,[["alone",1,0,1,3],["chartTitle",1,0,"chart-title",2],["config",1,0,1,2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["toBase64Image",6],["type",1,0,1,2],["unit",1,0,1,2],["width",1,0,1,2],["xView",1,0,"x-view",2],["yView",1,0,"y-view",2]],1],["quantum-chart-zoom","quantum-chart-zoom",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["type",1,0,1,2],["unit",1,0,1,2],["wc",7],["width",1,0,1,2]],1,[["chartInfos","chartInfosWatcher"],["xZoom","xZoomListener"],["yZoom","yZoomListener"],["xSliderValueChanged","xSliderListener"],["ySliderValueChanged","ySliderListener"]]],["quantum-chip","quantum-chip",1,[["el",7],["index",1,0,1,4],["name",1,0,1,2],["node",1,0,1,1]]],["quantum-dygraphs","quantum-dygraphs",1,[["data",1,0,1,2],["el",7],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["type",1,0,1,2]]],["quantum-gts-tree","quantum-chip",1,[["data",1,0,1,2]]],["quantum-heatmap-sliders","quantum-heatmap-sliders",0,[["blurValue",1,0,"blur-value",4],["el",7],["maxBlurValue",1,0,"max-blur-value",4],["maxRadiusValue",1,0,"max-radius-value",4],["minBlurValue",1,0,"min-blur-value",4],["minRadiusValue",1,0,"min-radius-value",4],["radiusValue",1,0,"radius-value",4]],1],["quantum-horizontal-zoom-map","quantum-chart",1,[["config",1,0,1,2],["cursorSize",1,0,"cursor-size",2],["el",7],["img",1,0,1,2],["maxValue",1,0,"max-value",4],["minValue",1,0,"min-value",4],["width",1,0,1,4]],1],["quantum-horizontal-zoom-slider","quantum-horizontal-zoom-slider",1,[["config",1,0,1,2],["cursorSize",1,0,"cursor-size",2],["el",7],["maxValue",1,0,"max-value",4],["minValue",1,0,"min-value",4],["width",1,0,1,4]],1],["quantum-map","quantum-heatmap-sliders",1,[["data",1,0,1,2],["dotsLimit",1,0,"dots-limit",4],["el",7],["heatBlur",1,0,"heat-blur",4],["heatControls",1,0,"heat-controls",3],["heatData",1,0,"heat-data",2],["heatOpacity",1,0,"heat-opacity",4],["heatRadius",1,0,"heat-radius",4],["height",1,0,1,2],["mapTitle",1,0,"map-title",2],["responsive",1,0,1,3],["startLat",1,0,"start-lat",4],["startLong",1,0,"start-long",4],["startZoom",1,0,"start-zoom",4],["width",1,0,1,2]],1,[["heatRadiusDidChange","radiuschange"],["heatBlurDidChange","blurChange"],["heatOpacityDidChange","opacityChange"]]],["quantum-multi-charts","quantum-multi-charts",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["type",1,0,1,2],["unit",1,0,1,2],["wc",7],["width",1,0,1,2]],1,[["chartInfos","chartInfosWatcher"],["xZoom","xZoomListener"],["xSliderValueChanged","xSliderListener"]]],["quantum-pie","quantum-bubble",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["type",1,0,1,2],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-polar","quantum-bubble",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["type",1,0,1,2],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-radar","quantum-radar",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-scatter","quantum-bubble",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-tile","quantum-bubble",1,[["chartTitle",1,0,"chart-title",2],["data",5],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["type",1,0,1,2],["unit",1,0,1,2],["url",1,0,1,2],["wsElement",7]],1],["quantum-toggle","quantum-toggle",1,[["checked",1,0,1,3],["option",1,0,1,2],["state",5],["text1",1,0,"text-1",2],["text2",1,0,"text-2",2]],1,[["timeSwitched","switchedListener"]]],["quantum-tree-view","quantum-chip",1,[["branch",1,0,1,3],["gtsList",1,0,"gts-list",1]]],["quantum-vega","quantum-vega",1,[["data",1,0,1,2],["el",7],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["type",1,0,1,2]]],["quantum-vertical-zoom-slider","quantum-chart-zoom",1,[["config",1,0,1,2],["cursorSize",1,0,"cursor-size",2],["el",7],["height",1,0,1,4],["maxValue",1,0,"max-value",4],["minValue",1,0,"min-value",4]],1]],HTMLElement.prototype);
=======
!function(e,t,i,a,n,r,o,s,u,l,h,m,d,c,p){for((h=e.quantumviz=e.quantumviz||{}).components=u,(d=u.filter(function(e){return e[2]}).map(function(e){return e[0]})).length&&((m=t.createElement("style")).innerHTML=d.join()+"{visibility:hidden}.hydrated{visibility:inherit}",m.setAttribute("data-styles",""),t.head.insertBefore(m,t.head.firstChild)),h.$r=[],p=l.componentOnReady,l.componentOnReady=function(t){const i=this;function a(e){h.$r?h.$r.push([i,e]):h.componentOnReady(i,e)}return p&&p.call(i),t?a(t):e.Promise?new Promise(a):{then:a}},m=(d=t.querySelectorAll("script")).length-1;m>=0&&!(c=d[m]).src&&!c.hasAttribute("data-resources-url");m--);(d=c.getAttribute("data-resources-url"))&&(n=d),!n&&c.src&&(n=(d=c.src.split("/").slice(0,-1)).join("/")+(d.length?"/":"")+"quantumviz/"),m=t.createElement("script"),function(e,t,i,a){return!(t.search.indexOf("core=esm")>0)&&(!(!(t.search.indexOf("core=es5")>0||"file:"===t.protocol)&&e.customElements&&e.customElements.define&&e.fetch&&e.CSS&&e.CSS.supports&&e.CSS.supports("color","var(--c)")&&"noModule"in i)||function(e){try{return new Function('import("")'),!1}catch(e){}return!0}())}(e,e.location,m)?m.src=n+"quantumviz.tincefol.js":(m.src=n+"quantumviz.glgglhw7.js",m.setAttribute("type","module"),m.setAttribute("crossorigin",!0)),m.setAttribute("data-resources-url",n),m.setAttribute("data-namespace","quantumviz"),t.head.appendChild(m)}(window,document,0,0,0,0,0,0,[["quantum-annotation","2irtnfvn",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",2,0,1,2],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["width",1,0,1,2]],1],["quantum-bubble","boyejtqr",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-chart","jtuytcw4",1,[["alone",1,0,1,3],["chartTitle",1,0,"chart-title",2],["config",1,0,1,2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["toBase64Image",6],["type",1,0,1,2],["unit",1,0,1,2],["width",1,0,1,2],["xView",1,0,"x-view",2],["yView",1,0,"y-view",2]],1],["quantum-chart-zoom","ezad2yma",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["type",1,0,1,2],["unit",1,0,1,2],["wc",7],["width",1,0,1,2]],1,[["chartInfos","chartInfosWatcher"],["xZoom","xZoomListener"],["yZoom","yZoomListener"],["xSliderValueChanged","xSliderListener"],["ySliderValueChanged","ySliderListener"]]],["quantum-chip","b186kx7w",1,[["el",7],["index",1,0,1,4],["name",1,0,1,2],["node",1,0,1,1]]],["quantum-gts-tree","b186kx7w",1,[["data",1,0,1,2]]],["quantum-heatmap-sliders","zypxy15j",0,[["blurValue",1,0,"blur-value",4],["el",7],["maxBlurValue",1,0,"max-blur-value",4],["maxRadiusValue",1,0,"max-radius-value",4],["minBlurValue",1,0,"min-blur-value",4],["minRadiusValue",1,0,"min-radius-value",4],["radiusValue",1,0,"radius-value",4]],1],["quantum-horizontal-zoom-map","jtuytcw4",1,[["config",1,0,1,2],["cursorSize",1,0,"cursor-size",2],["el",7],["img",1,0,1,2],["maxValue",1,0,"max-value",4],["minValue",1,0,"min-value",4],["width",1,0,1,4]],1],["quantum-horizontal-zoom-slider","4xovsxpl",1,[["config",1,0,1,2],["cursorSize",1,0,"cursor-size",2],["el",7],["maxValue",1,0,"max-value",4],["minValue",1,0,"min-value",4],["width",1,0,1,4]],1],["quantum-map","zypxy15j",1,[["data",1,0,1,2],["dotsLimit",1,0,"dots-limit",4],["el",7],["heatBlur",1,0,"heat-blur",4],["heatControls",1,0,"heat-controls",3],["heatData",1,0,"heat-data",2],["heatOpacity",1,0,"heat-opacity",4],["heatRadius",1,0,"heat-radius",4],["height",1,0,1,2],["mapTitle",1,0,"map-title",2],["responsive",1,0,1,3],["startLat",1,0,"start-lat",4],["startLong",1,0,"start-long",4],["startZoom",1,0,"start-zoom",4],["width",1,0,1,2]],1,[["heatRadiusDidChange","radiuschange"],["heatBlurDidChange","blurChange"],["heatOpacityDidChange","opacityChange"]]],["quantum-multi-charts","hacj8hxh",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["hiddenData",1,0,"hidden-data",2],["options",1,0,1,2],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["type",1,0,1,2],["unit",1,0,1,2],["wc",7],["width",1,0,1,2]],1,[["chartInfos","chartInfosWatcher"],["xZoom","xZoomListener"],["xSliderValueChanged","xSliderListener"]]],["quantum-pie","boyejtqr",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["type",1,0,1,2],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-polar","boyejtqr",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["type",1,0,1,2],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-radar","cfkufbgo",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-scatter","boyejtqr",1,[["chartTitle",1,0,"chart-title",2],["data",1,0,1,2],["el",7],["height",1,0,1,2],["options",1],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["timeMax",1,0,"time-max",4],["timeMin",1,0,"time-min",4],["unit",1,0,1,2],["width",1,0,1,2]],1],["quantum-tile","boyejtqr",1,[["chartTitle",1,0,"chart-title",2],["data",5],["responsive",1,0,1,3],["showLegend",1,0,"show-legend",3],["type",1,0,1,2],["unit",1,0,1,2],["url",1,0,1,2],["wsElement",7]],1],["quantum-toggle","eabyz3iz",1,[["checked",1,0,1,3],["option",1,0,1,2],["state",5],["text1",1,0,"text-1",2],["text2",1,0,"text-2",2]],1],["quantum-tree-view","b186kx7w",1,[["branch",1,0,1,3],["gtsList",1,0,"gts-list",1]]],["quantum-vertical-zoom-slider","ezad2yma",1,[["config",1,0,1,2],["cursorSize",1,0,"cursor-size",2],["el",7],["height",1,0,1,4],["maxValue",1,0,"max-value",4],["minValue",1,0,"min-value",4]],1]],HTMLElement.prototype);
>>>>>>> 7368215948444e01f4a2dbca6a965fe0428702e3
