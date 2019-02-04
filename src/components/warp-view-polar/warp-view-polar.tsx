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

import Chart from 'chart.js';
import {Component, Element, Listen, Prop, Watch} from '@stencil/core';
import {ChartLib} from "../../utils/chart-lib";
import {ColorLib} from "../../utils/color-lib";
import {Logger} from "../../utils/logger";
import {Param} from "../../model/param";
import {DataModel} from "../../model/dataModel";
import {GTSLib} from "../../utils/gts.lib";
import deepEqual from "deep-equal";

@Component({
  tag: 'warp-view-polar',
  styleUrl: 'warp-view-polar.scss',
  shadow: true
})
export class WarpViewPolar {
  @Prop() responsive: boolean = false;
  @Prop() showLegend: boolean = true;
  @Prop() data: DataModel | any[] | string;
  @Prop() options: Param = new Param();
  @Prop({mutable: true}) width = '';
  @Prop({mutable: true}) height = '';
  @Prop() debug = false;

  @Element() el: HTMLElement;

  private LOG: Logger;
  private _options: Param = {
    gridLineColor: '#8e8e8e'
  };
  private uuid = 'chart-' + ChartLib.guid().split('-').join('');
  private _chart: Chart;
  private resizeTimer;
  private parentWidth = -1;
  private parentHeight = -1;


  @Listen('window:resize')
  onResize() {
    if (this.el.parentElement.clientWidth !== this.parentWidth || this.parentWidth <= 0 || this.el.parentElement.clientHeight !== this.parentHeight) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.parentWidth = this.el.parentElement.clientWidth;
        this.parentHeight = this.el.parentElement.clientHeight;
        if (this.el.parentElement.clientWidth > 0) {
          this.LOG.debug(['onResize'], this.el.parentElement.clientWidth);
          this.drawChart();
        } else {
          this.onResize();
        }
      }, 150);
    }
  }

  @Watch('data')
  private onData(newValue: DataModel | any[], oldValue: DataModel | any[]) {
    this.LOG.debug(['data'], newValue);
    this.drawChart();
  }

  @Watch('options')
  private onOptions(newValue: Param, oldValue: Param) {
    if (!deepEqual(newValue, oldValue)) {
      this.LOG.debug(['options'], newValue);
      this.drawChart();
    }
  }

  private parseData(gts) {
    let labels = [];
    let data = [];
    gts.forEach(d => {
      data.push(Math.abs(d[1]));
      labels.push(d[0]);
    });
    return {labels: labels, data: data}
  }

  private drawChart() {
    this._options = ChartLib.mergeDeep(this._options, this.options);
    let ctx = this.el.shadowRoot.querySelector('#' + this.uuid);
    this.height = (this.responsive ? this.el.parentElement.clientHeight : this.height || 600) + '';
    this.width = (this.responsive ? this.el.parentElement.clientWidth : this.width || 800) + '';
    const color = this._options.gridLineColor;
    if (!this.data) return;

    let data: any = this.data;
    if (typeof data === 'string') {
      data = JSON.parse(data as string);
    }

    if (GTSLib.isArray(data) && data[0] && (data[0] instanceof DataModel || data[0].hasOwnProperty('data'))) {
      data = data[0];
    }
    let dataList: any[];
    if (data instanceof DataModel || data.hasOwnProperty('data')) {
      dataList = data.data as any[];
    } else {
      dataList = data;
    }
    let gts = this.parseData(dataList);
    if (this._chart) {
      this._chart.destroy();
      delete this._chart;
    }
    this.LOG.debug(['gts.data'], gts.data);
    if (gts && gts.data && gts.data.length > 0) {
      this._chart = new Chart(ctx, {
        type: 'polarArea',
        data: {
          datasets: [{
            data: gts.data,
            backgroundColor: ColorLib.generateTransparentColors(gts.data.length),
            borderColor: ColorLib.generateColors(gts.data.length)
          }],
          labels: gts.labels
        },
        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 50,
              bottom: 0
            }
          },
          animation: {
            duration: 0,
          },
          legend: {display: this.showLegend},
          responsive: this.responsive,
          maintainAspectRatio: false,
          scale: {
            gridLines: {
              color: color,
              zeroLineColor: color
            },
            pointLabels: {
              fontColor: color,
            },
            ticks: {
              fontColor: color,
              backdropColor: 'transparent'
            }
          },
          tooltips: {
            mode: 'index',
            intersect: true,
          }
        }
      });
      this.onResize();
      setTimeout(() => {
        this._chart.update();
      }, 250);
    }
  }

  componentWillLoad() {
    this.LOG = new Logger(WarpViewPolar, this.debug);
  }

  componentDidLoad() {
    this.drawChart();
    ChartLib.resizeWatchTimer(this.el,this.onResize.bind(this));
  }

  render() {
    return <div>
      <div class="chart-container">
        <canvas id={this.uuid} width={this.width} height={this.height}/>
      </div>
    </div>;
  }
}
