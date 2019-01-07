/*
 *  Copyright 2018  SenX S.A.S.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import {Component, Element, Listen, Method, Prop, State, Watch} from '@stencil/core'
import {DataModel} from "../../model/dataModel";
import {Param} from "../../model/param";
import {Logger} from "../../utils/logger";
import {GTS} from "../../model/GTS";
import {GTSLib} from "../../utils/gts.lib";
import {ChartLib} from "../../utils/chart-lib";
import {WarpViewModal} from "../warp-view-modal/warp-view-modal";
import {WarpViewChart} from "../warp-view-chart/warp-view-chart";

@Component({
  tag: 'warp-view-plot',
  styleUrl: 'warp-view-plot.scss',
  shadow: true
})
export class WarpViewPlot {
  @Element() el: HTMLElement;

  @Prop() data: string | GTS[] | DataModel;
  @Prop() options: string | Param;
  @Prop({mutable: true}) width = "";
  @Prop({mutable: true}) height = "";
  @Prop() responsive: boolean = false;
  @Prop() showLegend: boolean = false;
  @Prop({mutable: true}) gtsFilter = '';

  @State() private _options: Param = {
    showControls: true,
    showGTSTree: true,
    showDots: true
  };
  @State() private _data: DataModel = new DataModel();
  @State() private _toHide: number[] = [];
  @State() private _timeMin;
  @State() private _timeMax;
  @State() showChart = true;
  @State() showMap = false;
  @State() chartType = 'line';
  @State() timeClipValue: string = '';

  private LOG: Logger = new Logger(WarpViewPlot);
  private line: HTMLElement;
  private main: HTMLElement;
  private chart: HTMLElement;
  private annotation: HTMLElement;
  private modal: WarpViewModal;
  private timeClip: WarpViewModal;
  private warpViewChart: WarpViewChart;
  private filterInput: HTMLInputElement;
  private timeClipElement: HTMLParagraphElement;
  private mouseOutTimer: number;
  private graphId = 'container-' + ChartLib.guid();

  componentDidLoad() {
    this.line = this.el.shadowRoot.querySelector('div.bar');
    this.main = this.el.shadowRoot.querySelector('div.maincontainer');
    this.chart = this.el.shadowRoot.querySelector('warp-view-chart');
    this.annotation = this.el.shadowRoot.querySelector('warp-view-annotation');
    this.drawCharts(true);
  }

  @Method()
  async getTimeClip(): Promise<[number, number]> {
    this.LOG.debug(['getTimeClip'], this.warpViewChart.getTimeClip());
    return this.warpViewChart.getTimeClip();
  }

  @Watch('gtsFilter')
  private onGtsFilter(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      this.drawCharts();
    }
  }

  @Watch('data')
  private onData(newValue: DataModel | GTS[], oldValue: DataModel | GTS[]) {
    if (oldValue !== newValue) {
      this.LOG.debug(['data'], newValue);
      this.drawCharts(true);
    }
  }

  @Watch('options')
  private onOptions(newValue: Param, oldValue: Param) {
    if (oldValue !== newValue) {
      this.LOG.debug(['options'], newValue);
      this.drawCharts();
    }
  }

  @Listen('document:keyup')
  handleKeyUp(ev: KeyboardEvent) {
    this.LOG.debug(['document:keyup'], ev);
    ev.preventDefault();
    if (ev.key === '/') {
      this.modal.open();
      this.filterInput.focus();
      this.filterInput.select();
    }
    if (ev.key === 't') {
      this.warpViewChart.getTimeClip().then(tc => {
        this.timeClipValue = `${Math.round(tc[0]).toString()} ISO8601 ${Math.round(tc[1]).toString()} ISO8601 TIMECLIP`;
        this.LOG.debug(['handleKeyUp', 't'], this.timeClipValue);
        this.timeClip.open();
      });
    }
    return false;
  }

  @Listen('stateChange')
  stateChange(event: CustomEvent) {
    this.LOG.debug(['stateChange'], event.detail);
    switch (event.detail.id) {
      case 'timeSwitch' :
        if (event.detail.state) {
          this._options.timeMode = 'timestamp';
        } else {
          this._options.timeMode = 'date';
        }
        this.drawCharts();
        break;
      case 'typeSwitch' :
        if (event.detail.state) {
          this.chartType = 'step';
        } else {
          this.chartType = 'line';
        }
        this.drawCharts();
        break;
      case 'chartSwitch' :
        this.showChart = event.detail.state;
        this.drawCharts();
        break;
      case 'mapSwitch' :
        this.showMap = event.detail.state;
        if (this.showMap) {
          window.setTimeout(() => {
            (this.el.shadowRoot.querySelector('#map') as any).resize();
          }, 500);
        }
        break;
    }
  }

  @Listen('boundsDidChange')
  boundsDidChange(event: CustomEvent) {
    this.LOG.debug(['boundsDidChange'], event.detail);
    this._timeMin = event.detail.bounds.min;
    this._timeMax = event.detail.bounds.max;
    this.line.style.left = '-100px';
  }

  @Listen('warpViewChartResize')
  onResize(event: CustomEvent) {
    const div = this.el.shadowRoot.querySelector('#' + this.graphId) as HTMLElement;
    this.LOG.debug(['warpViewChartResize'], [event.detail, div]);
    if (div) {
      div.style.height = event.detail.h + 'px';
    }
  }

  @Listen('warpViewSelectedGTS')
  warpViewSelectedGTS(event: CustomEvent) {
    this.LOG.debug(['warpViewSelectedGTS'], event.detail);
    if (!this._toHide.find(i => {
      return i === event.detail.gts.id;
    }) && !event.detail.selected) {
      this._toHide.push(event.detail.gts.id);
    } else {
      this._toHide = this._toHide.filter(i => {
        return i !== event.detail.gts.id;
      });
    }
    this.LOG.debug(['warpViewSelectedGTS'], this._toHide);
    this._toHide = this._toHide.slice();
    this.drawCharts();
  }

  private handleMouseMove(evt: MouseEvent) {
    this.line = this.el.shadowRoot.querySelector('div.bar');
    if (this.mouseOutTimer) {
      window.clearTimeout(this.mouseOutTimer);
      delete this.mouseOutTimer;
    }
    if (!this.mouseOutTimer) {
      this.mouseOutTimer = window.setTimeout(() => {
        this.line.style.display = 'block';
        this.line.style.left = Math.max(evt.offsetX, 100) + 'px';
      }, 1);
    }
  }

  private handleMouseOut(evt: MouseEvent) {
    this.LOG.debug(['handleMouseOut'], evt);
    this.line.style.left = Math.max(evt.offsetX, 100) + 'px';
    if (this.mouseOutTimer) {
      window.clearTimeout(this.mouseOutTimer);
      delete this.mouseOutTimer;
    }
    if (!this.mouseOutTimer) {
      this.mouseOutTimer = window.setTimeout(() => {
        this.line.style.left = '-100px';
        this.line.style.display = 'none';
      }, 500);
    }
  }

  private drawCharts(firstdraw:boolean=false) {
    this.LOG.debug(['drawCharts'], [this.data, this.options]);
    this._options = ChartLib.mergeDeep(this._options, this.options);
    this._data = GTSLib.getData(this.data);
    let opts = new Param();
    if (typeof this.options === 'string') {
      opts = JSON.parse(this.options as string) as Param;
    } else {
      opts = this.options as Param;
    }

    this._options = ChartLib.mergeDeep(this._options, opts);

    this.LOG.debug(["PPts"],"firstdraw " +firstdraw);
    if (firstdraw) { //on the first draw, we can set some default options.
      //automatically switch to timestamp mode
      //when the first tick and last tick of all the series are in the interval [-100ms 100ms]
      let tsLimit = 100 * GTSLib.getDivider(this._options.timeUnit);
      let dataList = this._data.data;
      if (dataList){
        let gtsList = GTSLib.flattenGtsIdArray(dataList as any, 0).res;
        gtsList = GTSLib.flatDeep(gtsList);
        let timestampMode = true;
        gtsList.forEach(g => {
          if (g.v.length > 0) { //if gts not empty
            timestampMode=timestampMode && (g.v[0][0]>-tsLimit && g.v[0][0] < tsLimit)
            timestampMode=timestampMode && (g.v[g.v.length - 1 ][0]>-tsLimit && g.v[g.v.length - 1 ][0] < tsLimit)
          }          
        })
        if (timestampMode) {
          this._options.timeMode="timestamp";
        }
      }
    } 
    
    this.timeClip.close();
    this.modal.close();
    this.LOG.debug(['drawCharts', 'parsed'], this._data, this._options);
  }

  private applyFilter() {
    this.gtsFilter = this.filterInput.value;
    this.modal.close();
  }

  render() {
    return <div>
      <warp-view-modal modalTitle="TimeClip" ref={(el: any) => this.timeClip = el as WarpViewModal}>
        <pre><code ref={(el) => this.timeClipElement = el as HTMLParagraphElement}
                   innerHTML={this.timeClipValue}/></pre>
      </warp-view-modal>
      <warp-view-modal modalTitle="GTS Filter" ref={(el: any) => this.modal = el as WarpViewModal}>
        <label>Enter a regular expression to filter GTS.</label>
        <input type="text" ref={(el) => this.filterInput = el as HTMLInputElement} value={this.gtsFilter}/>
        <button type="button" class={this._options.popupButtonValidateClass}
                onClick={() => this.applyFilter()} innerHTML={this._options.popupButtonValidateLabel || 'Apply'}>
        </button>
      </warp-view-modal>
      {this._options.showControls
        ? <div class="inline">
          <warp-view-toggle id="timeSwitch" text-1="Date" text-2="Timestamp" checked={this._options.timeMode=="timestamp"}/>
          <warp-view-toggle id="typeSwitch" text-1="Line" text-2="Step"/>
          <warp-view-toggle id="chartSwitch" text-1="Hide chart" text-2="Display chart"
                            checked={this.showChart}/>
          <warp-view-toggle id="mapSwitch" text-1="Hide map" text-2="Display map"
                            checked={this.showMap}/>
        </div>
        : ''}
      {this._options.showGTSTree
        ? <warp-view-gts-tree data={this._data} id="tree" gtsFilter={this.gtsFilter}
                              hiddenData={this._toHide} options={this._options}/>
        : ''}
      {this.showChart ? <div class="main-container" onMouseMove={evt => this.handleMouseMove(evt)}
                             onMouseLeave={evt => this.handleMouseOut(evt)}>
        <div class="bar"/>
        <div class="annotation">
          <warp-view-annotation data={this._data} responsive={this.responsive} id="annotation"
                                showLegend={this.showLegend}
                                timeMin={this._timeMin} timeMax={this._timeMax} standalone={false}
                                hiddenData={this._toHide} options={this._options}/>
        </div>
        <div style={{width: '100%', height: '768px'}} id={this.graphId}>
          <warp-view-gts-popup maxToShow={5} hiddenData={this._toHide} gtsList={this._data}/>
          <warp-view-chart id="chart" responsive={this.responsive} standalone={false} data={this._data}
                           ref={(el: any) => this.warpViewChart = el}
                           hiddenData={this._toHide} type={this.chartType}
                           options={this._options}/>
        </div>
      </div> : ''}
      {this.showMap ? <div class="map-container">
        <warp-view-map options={this._options} id="map" data={this._data as any}
                       responsive={this.responsive} hiddenData={this._toHide}/>
      </div> : ''}
    </div>;
  }
}
