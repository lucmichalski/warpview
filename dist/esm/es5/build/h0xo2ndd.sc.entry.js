import{h}from"../warpview.core.js";var WarpViewSpinner=function(){function e(){this.message="Loading and parsing data..."}return e.prototype.render=function(){return h("div",{class:"wrapper"},h("div",{class:" lds-ring"},h("div",null),h("div",null),h("div",null),h("div",null)),h("h2",null,this.message))},Object.defineProperty(e,"is",{get:function(){return"warp-view-spinner"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{message:{type:String,attr:"message"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner{position:relative;width:100%;height:100%;min-height:230px}.sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner   h2.sc-warp-view-spinner{text-align:center;width:50%;margin:auto;bottom:0}.sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner   .lds-ring.sc-warp-view-spinner, .sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner   h2.sc-warp-view-spinner{display:inline-block;position:absolute;height:64px;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner   .lds-ring.sc-warp-view-spinner{width:64px;top:50%}.sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner   .lds-ring.sc-warp-view-spinner   div.sc-warp-view-spinner{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;width:51px;height:51px;margin:6px;border:6px solid;border-radius:50%;-webkit-animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:var(--warp-view-spinner-color,#5899da) transparent transparent transparent}.sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner   .lds-ring.sc-warp-view-spinner   div.sc-warp-view-spinner:first-child{-webkit-animation-delay:-.45s;animation-delay:-.45s}.sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner   .lds-ring.sc-warp-view-spinner   div.sc-warp-view-spinner:nth-child(2){-webkit-animation-delay:-.3s;animation-delay:-.3s}.sc-warp-view-spinner-h   .wrapper.sc-warp-view-spinner   .lds-ring.sc-warp-view-spinner   div.sc-warp-view-spinner:nth-child(3){-webkit-animation-delay:-.15s;animation-delay:-.15s}\@-webkit-keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"},enumerable:!0,configurable:!0}),e}();export{WarpViewSpinner};