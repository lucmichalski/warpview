const e=window.warpview.h;class s{constructor(){this.message="Loading and parsing data..."}render(){return e("div",{class:"wrapper"},e("div",{class:" lds-ring"},e("div",null),e("div",null),e("div",null),e("div",null)),e("h2",null,this.message))}static get is(){return"warp-view-spinner"}static get encapsulation(){return"shadow"}static get properties(){return{message:{type:String,attr:"message"}}}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host .wrapper{position:relative;width:100%;height:100%;min-height:230px}:host .wrapper h2{text-align:center;width:50%;margin:auto;bottom:0}:host .wrapper .lds-ring,:host .wrapper h2{display:inline-block;position:absolute;height:64px;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}:host .wrapper .lds-ring{width:64px;top:50%}:host .wrapper .lds-ring div{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;width:51px;height:51px;margin:6px;border:6px solid;border-radius:50%;-webkit-animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:var(--warp-view-spinner-color,#5899da) transparent transparent transparent}:host .wrapper .lds-ring div:first-child{-webkit-animation-delay:-.45s;animation-delay:-.45s}:host .wrapper .lds-ring div:nth-child(2){-webkit-animation-delay:-.3s;animation-delay:-.3s}:host .wrapper .lds-ring div:nth-child(3){-webkit-animation-delay:-.15s;animation-delay:-.15s}\@-webkit-keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"}}export{s as WarpViewSpinner};