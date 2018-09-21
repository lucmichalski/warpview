/*
 *
 *    Copyright 2016  Cityzen Data
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import {Component, Element, Event, EventEmitter, Listen, Prop, Watch} from '@stencil/core';
import {GTSLib} from '../../utils/gts.lib';
import Dygraph from 'dygraphs';
import {Logger} from "../../utils/logger";
import {ChartLib} from "../../utils/chart-lib";
import {ColorLib} from "../../utils/color-lib";
import {Param} from "../../model/param";
import {DataModel} from "../../model/dataModel";
import {GTS} from "../../model/GTS";
import moment from "moment";

/**
 * options :
 *  gridLineColor: 'red | #fff'
 *  time.timeMode: 'timestamp | date'
 *  showRangeSelector: boolean
 *  type : 'line | area | step'
 *
 */
@Component({
  tag: 'warp-view-chart',
  styleUrls: ['../../../node_modules/dygraphs/dist/dygraph.min.css', 'warp-view-chart.scss'],
  shadow: false
})
export class WarpViewChart {
  @Prop() data: DataModel | GTS[];
  @Prop() options: Param = new Param();
  @Prop() hiddenData: string[] = [];
  @Prop() unit: string = '';
  @Prop() type: string = 'line';
  @Prop() responsive: boolean = false;
  @Prop() standalone = true;

  @Element() el: HTMLElement;

  @Event() boundsDidChange: EventEmitter;
  @Event() pointHover: EventEmitter;

  private LOG: Logger = new Logger(WarpViewChart);
  private static DEFAULT_WIDTH = 800;
  private static DEFAULT_HEIGHT = 600;
  private resizeTimer;
  private _chart: Dygraph;
  private _options: any = {
    time: 'date',
    showRangeSelector: true,
    gridLineColor: '#8e8e8e'
  };
  private uuid = 'chart-' + ChartLib.guid().split('-').join('');
  private ticks = [];

  @Watch('hiddenData')
  private onHideData(newValue: string[], oldValue: string[]) {
    if (oldValue.length !== newValue.length) {
      this.LOG.debug(['hiddenData'], newValue);
      this.drawChart();
    }
  }

  @Watch('data')
  private onData(newValue: DataModel | GTS[], oldValue: DataModel | GTS[]) {
    if (oldValue !== newValue) {
      this.LOG.debug(['data'], newValue);
      this.drawChart();
    }
  }

  @Watch('options')
  private onOptions(newValue: Param, oldValue: Param) {
    if (oldValue !== newValue) {
      this.LOG.debug(['options'], newValue);
      this.drawChart();
    }
  }

  @Listen('window:resize')
  onResize() {
    if(this._chart) {
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.LOG.debug(['onResize'], this.el.parentElement.clientWidth);
        const height = (this.responsive ? this.el.parentElement.clientHeight : WarpViewChart.DEFAULT_HEIGHT) - 30;
        const width = (this.responsive ? this.el.parentElement.clientWidth : WarpViewChart.DEFAULT_WIDTH) - 5;
        this._chart.resize(width, height);
      }, 250);
    }
  }

  private gtsToData(gtsList) {
    this.LOG.debug(['gtsToData'], gtsList);
    this.ticks = [];
    const datasets = [];
    const data = {};
    let pos = 0;
    let labels = [];
    let colors = [];
    if (!gtsList) {
      return;
    } else {
      gtsList = GTSLib.flatDeep(gtsList);

      this.LOG.debug(['gtsToData', 'gtsList'], gtsList);
      labels = new Array(gtsList.length);
      labels[0] = 'Date';
      colors = new Array(gtsList.length);
      gtsList.forEach((g,i) => {
        if (g.v && GTSLib.isGtsToPlot(g)) {
          let label = GTSLib.serializeGtsMetadata(g);
          if (this.hiddenData.filter((i) => i === label).length === 0) {
            GTSLib.gtsSort(g);
            g.v.forEach(value => {
              if (!data[value[0]]) {
                data[value[0]] = new Array(gtsList.length);
                data[value[0]].fill(null);
              }
              data[value[0]][i] = value[value.length - 1] || -1;
            });
            let color = ColorLib.getColor(pos);
            labels[i + 1] = label;
            colors[i] = color;
          }
        }
        pos++;
      });
    }
    labels = labels.filter((i) => !!i);
    Object.keys(data).forEach(timestamp => {
      if (this._options.timeMode && this._options.timeMode === 'timestamp') {
        datasets.push([parseInt(timestamp)].concat(data[timestamp].slice(0, labels.length - 1)));
        this.ticks.push(parseInt(timestamp));
      } else {
        const ts = Math.floor(parseInt(timestamp) / 1000);
        datasets.push([moment(ts).utc(true).toDate()].concat(data[timestamp].slice(0, labels.length - 1)));
        this.ticks.push(ts);
      }
    });
    datasets.sort((a, b) => a[0] > b[0] ? 1 : -1);
    this.LOG.debug(['gtsToData', 'datasets'], [datasets, labels, colors]);
    return {datasets: datasets, labels: labels, colors: colors.slice(0, labels.length)};
  }

  private isStepped(): boolean {
    return this.type === 'step';
  }

  private isStacked(): boolean {
    return this.type === 'area';
  }

  private legendFormatter(data) {
    if (data.x === null) {
      // This happens when there's no selection and {legend: 'always'} is set.
      return '<br>' + data.series.map(function (series) {
        if (!series.isVisible) return;
        let labeledData = series.labelHTML + ': ' + series.yHTML;
        if (series.isHighlighted) {
          labeledData = '<b>' + labeledData + '</b>';
        }
        return series.dashHTML + ' ' + labeledData;
      }).join('<br>');
    }

    let html = data.xHTML;
    data.series.forEach(function (series) {
      if (!series.isVisible || !series.yHTML) return;
      let labeledData = series.labelHTML + ': ' + series.yHTML;
      if (series.isHighlighted) {
        labeledData = '<b>' + labeledData + '</b>';
      }
      html += '<br>' + series.dashHTML + ' ' + labeledData;
    });
    return html;
  }

  private highlightCallback(event) {
    this.pointHover.emit({
      x: event.x,
      y: event.y
    });
  }

  private drawChart() {
    this.LOG.debug(['drawChart', 'this.data'], [this.data]);
    this._options = ChartLib.mergeDeep(this._options, this.options);
    let dataList = GTSLib.getData(this.data).data;

    const dataToplot = this.gtsToData(dataList);
    this.LOG.debug(['drawChart', 'dataToplot'], [dataToplot]);
    const chart = this.el.querySelector('#' + this.uuid) as HTMLElement;
    if (dataToplot && dataToplot.datasets && dataToplot.datasets.length > 0) {
      const color = this._options.gridLineColor;
      this._chart = new Dygraph(
        chart,
        dataToplot.datasets,
        {
          height: (this.responsive ? this.el.parentElement.clientHeight : WarpViewChart.DEFAULT_HEIGHT) - 30,
          width: (this.responsive ? this.el.parentElement.clientWidth : WarpViewChart.DEFAULT_WIDTH) - 5,
          labels: dataToplot.labels,
          showRoller: false,
          showRangeSelector: this._options.showRangeSelector || true,
          connectSeparatedPoints: true,
          colors: dataToplot.colors,
          legend: 'follow',
          stackedGraph: this.isStacked(),
          strokeBorderWidth: this.isStacked() ? null : 0,
          strokeWidth: 2,
          stepPlot: this.isStepped(),
          ylabel: this.unit,
          labelsSeparateLines: true,
          highlightSeriesBackgroundAlpha: 1,
          highlightSeriesOpts: {
            strokeWidth: 3,
            strokeBorderWidth: 0,
            highlightCircleSize: 3,
            showInRangeSelector: true
          },
          hideOverlayOnMouseOut: true,
          labelsUTC: true,
          gridLineColor: color,
          axisLineColor: color,
          legendFormatter: this.legendFormatter,
          highlightCallback: this.highlightCallback.bind(this),
          drawCallback: ((dygraph, is_initial) => {
            this.LOG.debug(['drawCallback'], [dygraph.dateWindow_, is_initial]);
            if (dygraph.dateWindow_) {
              this.boundsDidChange.emit({
                bounds: {
                  min: dygraph.dateWindow_[0],
                  max: dygraph.dateWindow_[1]
                }
              });
            } else {
              this.boundsDidChange.emit({
                bounds: {
                  min: Math.min.apply(null, this.ticks),
                  max: Math.max.apply(null, this.ticks)
                }
              });
            }
          }).bind(this),
          axisLabelWidth: this.standalone ? 50 : 94,
          rightGap: this.standalone ? 0 : 20
        }
      );
      this.onResize();
    }
  }

  componentDidLoad() {
    this.drawChart();
  }

  render() {
    return <div>
      <div id={this.uuid} class="chart"/>
    </div>;
  }
}