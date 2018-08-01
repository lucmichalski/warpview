import {
  Component,
  Prop,
  Element,
  EventEmitter,
  Event,
  Watch
} from "@stencil/core";
import { GTSLib } from "../../gts.lib";
import Draggabilly from "draggabilly";

@Component({
  tag: "quantum-horizontal-zoom-map",
  styleUrl: "quantum-horizontal-zoom-map.scss",
  shadow: true
})
export class QuantumHorizontalZoomMap {
  @Prop() width: number;
  @Prop() maxValue: number;
  @Prop() minValue: number;
  @Prop() cursorSize: string = "{}";
  @Prop() config: string = "{}";
  @Prop() img: string;

  @Element() el: HTMLElement;

  @Event() xSliderValueChanged: EventEmitter;
  @Event() xZoom: EventEmitter;

  private _config = {
    rail: {
      class: ""
    },
    cursor: {
      class: ""
    }
  };
  private _rail: HTMLElement;
  private _cursor: HTMLElement;
  private _img: HTMLElement;
  private _cursorWidth;
  private _cursorMinWidth = 30;
  private _railMin;
  private _railMax;
  private _mouseCursorLeftOffset;
  private _mouseCursorRightOffset;
  private lastPos = 0;

  @Watch("cursorSize")
  changeCursorSize(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      let object = JSON.parse(newValue);
      if (object.cursorOffset + object.cursorSize <= 100) {
        this._cursor.style.left = (object.cursorOffset * 100).toString() + "%";

        window.requestAnimationFrame(() => {
          if (
            object.cursorSize * this._rail.getBoundingClientRect().width <
            this._cursorMinWidth
          ) {
            this._cursor.style.width = this._cursorMinWidth.toString() + "px";
          } else {
            this._cursor.style.width =
              (object.cursorSize * 100).toString() + "%";
          }
        });
      }
    }
  }

  @Watch("width")
  initSize(newValue: number, oldValue: number) {
    if (oldValue !== newValue) {
      this._rail.style.width = (0.94 * newValue).toString() + "px";
      //console.log("width", this._rail.style.width);
      this._img.style.width = (newValue + 18).toString() + "px";
    }
  }

  componentWillLoad() {
    this._config = GTSLib.mergeDeep(this._config, JSON.parse(this.config));
  }

  componentDidLoad() {
    this._rail = this.el.shadowRoot.querySelector("#rail") as HTMLElement;
    this._cursor = this.el.shadowRoot.querySelector("#cursor") as HTMLElement;
    this._img = this.el.shadowRoot.querySelector("#img") as HTMLElement;
    let drag = new Draggabilly(this._cursor, {
      axis: "x",
      containment: this._rail
    });
    drag.on("dragStart", (event, pointer) => {
      this.dimsX(event);
    });
    drag.on("dragMove", (event: any, pointer, moveVector) => {
      let v = event.pageX - this._rail.offsetLeft - this._mouseCursorLeftOffset;
      v = Math.max(0, v);
      let value =
        (v / (this._railMax - this._railMin - this._cursorWidth)) *
          (this.maxValue - this.minValue) +
        this.minValue;
      window.setTimeout(() =>
        this.xSliderValueChanged.emit({ sliderValue: value })
      );
    });
  }

  dimsX(event) {
    let railDims = this._rail.getBoundingClientRect() as DOMRect;
    let cursorDims = this._cursor.getBoundingClientRect() as DOMRect;
    this._railMin = this._rail.offsetLeft;
    this._railMax = railDims.width + this._rail.offsetLeft;
    this._cursorWidth = cursorDims.width;
    this._mouseCursorLeftOffset =
      event.pageX - this._cursor.offsetLeft - this._rail.offsetLeft;
    this._mouseCursorRightOffset =
      cursorDims.width - this._mouseCursorLeftOffset;
  }

  xWheel(event) {
    event.preventDefault();
    let railDims = this._rail.getBoundingClientRect() as DOMRect;
    let coef = (event.pageX - this._rail.offsetLeft) / railDims.width;
    this.xZoom.emit({ zoomValue: { coef: coef, zoomType: event.deltaY * -1 } });
  }

  positionClick(event) {
    event.preventDefault();
    if (
      event.pageX < this._railMin + this._cursor.offsetLeft ||
      event.pageX > this._railMin + this._cursor.offsetLeft + this._cursorWidth
    ) {
      this.dimsX(event);
      let halfCursorWidth = this._cursorWidth / 2;
      let v;
      if (event.pageX - halfCursorWidth < this._rail.offsetLeft) {
        v = 0;
        this._cursor.style.left = "1px";
      } else if (event.pageX + halfCursorWidth > this._railMax) {
        v = this._railMax - this._railMin - this._cursorWidth;
        this._cursor.style.left = v.toString() + "px";
      } else {
        v = event.pageX - this._railMin - halfCursorWidth;
        //v = event.pageX - this._rail.offsetLeft - halfCursorWidth;
        this._cursor.style.left = v.toString() + "px";
      }

      let value =
        (v / (this._railMax - this._railMin - this._cursorWidth)) *
          (this.maxValue - this.minValue) +
        this.minValue;
      this.xSliderValueChanged.emit({ sliderValue: value });
    }
  }

  render() {
    return (
      <div
        id="rail"
        onWheel={event => this.xWheel(event)}
        onMouseUp={event => this.positionClick(event)}
      >
        <div id="cursor" />
        <img id="img" src={this.img} />
      </div>
    );
  }
}