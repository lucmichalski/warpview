/*! Built with http://stenciljs.com */
const{h:t}=window.quantumviz;import{a as e}from"./chunk-f78e876a.js";import"./chunk-ee323282.js";class i{constructor(){this.cursorSize="{}",this.config="{}",this._cursorMinWidth=30}changeCursorSize(t,e){if(e!==t){let e=JSON.parse(t);e.cursorOffset+e.cursorSize<=100&&(this._cursor.style.left=(100*e.cursorOffset).toString()+"%",e.cursorSize*this._rail.getBoundingClientRect().width<this._cursorMinWidth?this._cursor.style.width=this._cursorMinWidth.toString()+"px":this._cursor.style.width=(100*e.cursorSize).toString()+"%")}}initSize(t,e){e!==t&&(this._rail.style.width=(.94*t).toString()+"px")}componentWillLoad(){}componentDidLoad(){this._rail=this.el.shadowRoot.querySelector("#rail"),this._cursor=this.el.shadowRoot.querySelector("#cursor");let t=new e(this._cursor,{axis:"x",containment:this._rail});t.on("dragStart",(t,e)=>{this.dimsX(t)}),t.on("dragMove",(t,e,i)=>{if(t.pageX-this._mouseCursorLeftOffset>=this._railMin+1&&t.pageX+this._mouseCursorRightOffset<=this._railMax-1){let e=t.pageX-this._rail.offsetLeft-this._mouseCursorLeftOffset,i=(e=Math.max(0,e))/(this._railMax-this._railMin-this._cursorWidth)*(this.maxValue-this.minValue)+this.minValue;window.setTimeout(()=>this.xSliderValueChanged.emit({sliderValue:i}))}})}dimsX(t){let e=this._rail.getBoundingClientRect(),i=this._cursor.getBoundingClientRect();this._railMin=this._rail.offsetLeft,this._railMax=e.width+this._rail.offsetLeft,this._cursorWidth=i.width,this._mouseCursorLeftOffset=t.pageX-this._cursor.offsetLeft-this._rail.offsetLeft,this._mouseCursorRightOffset=i.width-this._mouseCursorLeftOffset}xWheel(t){t.preventDefault();let e=this._rail.getBoundingClientRect(),i=(t.pageX-this._rail.offsetLeft)/e.width;this.xZoom.emit({zoomValue:{coef:i,zoomType:-1*t.deltaY}})}render(){return t("div",{id:"rail",onWheel:t=>this.xWheel(t)},t("div",{id:"cursor"}))}static get is(){return"quantum-horizontal-zoom-slider"}static get encapsulation(){return"shadow"}static get properties(){return{config:{type:String,attr:"config"},cursorSize:{type:String,attr:"cursor-size",watchCallbacks:["changeCursorSize"]},el:{elementRef:!0},maxValue:{type:Number,attr:"max-value"},minValue:{type:Number,attr:"min-value"},width:{type:Number,attr:"width",watchCallbacks:["initSize"]}}}static get events(){return[{name:"xSliderValueChanged",method:"xSliderValueChanged",bubbles:!0,cancelable:!0,composed:!0},{name:"xZoom",method:"xZoom",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return":host #rail{position:relative;background-color:var(--quantum-bg-rail-color,grey);opacity:.7;height:20px;border:1px solid var(--quantum-border-rail-color,#000);border-radius:var(--quantum-border-radius,6px);padding:0;float:right;margin:0 15px 0 0}:host #rail:hover{opacity:1}:host #cursor{background-color:var(--quantum-bg-cursor-color,red);position:relative;cursor:move;width:100%;height:20px;border:1px solid var(--quantum-border-cursor-color,#000);border-radius:var(--quantum-border-radius,6px);-webkit-transition:left .01s;transition:left .01s}"}}export{i as QuantumHorizontalZoomSlider};