import Chart from "chart.js";
import {Component, Element, Prop, Watch} from "@stencil/core";
import {GTSLib} from "../../utils/gts.lib";
import {ChartLib} from "../../utils/chart-lib";
import {Logger} from "../../utils/logger";
import {Param} from "../../model/param";
import {ColorLib} from "../../utils/color-lib";

@Component({
  tag: "quantum-bar",
  styleUrl: "quantum-bar.scss",
  shadow: true
})
export class QuantumBar {
  @Prop() unit: string = '';
  @Prop() chartTitle: string = '';
  @Prop() responsive: boolean = false;
  @Prop() showLegend: boolean = true;
  @Prop() data: string = '[]';
  @Prop() options: string = '{}';
  @Prop() theme = 'light';
  @Prop({mutable: true}) width = '';
  @Prop({mutable: true}) height = '';

  @Element() el: HTMLElement;

  private LOG: Logger = new Logger(QuantumBar);
  private _options: Param = {};
  private uuid = 'chart-' + ChartLib.guid().split('-').join('');
  private _chart;
  private _mapIndex = {};
  private _data: any;

  @Watch('data')
  private onData(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      this.LOG.debug(['data'], newValue);
      this.drawChart();
    }
  }

  @Watch('options')
  private onOptions(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      this.LOG.debug(['options'], newValue);
      this.drawChart();
    }
  }

  @Watch('theme')
  private onTheme(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      this.LOG.debug(['theme'], newValue);
      this.drawChart();
    }
  }

  private buildGraph() {
    this._options = ChartLib.mergeDeep(this._options, JSON.parse(this.options));
    let ctx = this.el.shadowRoot.querySelector('#' + this.uuid);
    let gts = this.gtsToData(this._data);
    if (!gts) {
      return;
    }
    const color = this._options.gridLineColor || ChartLib.getGridColor(this.theme);
    const graphOpts: any = {
      legend: {
        display: this.showLegend
      },
      //   borderWidth: 1,
      animation: {
        duration: 0,
      },
      tooltips: {
        mode: 'index',
        position: 'nearest'
      },
      scales: {
        xAxes: [{
          type: "time",
          gridLines: {
            color: color,
            zeroLineColor: color,
          },
          ticks: {
            fontColor: color
          }
        }],
        yAxes: [
          {
            gridLines: {
              color: color,
              zeroLineColor: color,
            },
            ticks: {
              fontColor: color
            },
            scaleLabel: {
              display: this.unit !== '',
              labelString: this.unit
            }
          }
        ]
      },
      responsive: this.responsive
    };

    this._chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: gts.ticks,
        datasets: gts.datasets
      },
      options: graphOpts
    });

    this._chart.update();
  }

  private drawChart() {
    this._options = ChartLib.mergeDeep(this._options, JSON.parse(this.options));
    this.height = (this.responsive ? this.el.parentElement.clientHeight : this.height || 600) + '';
    this.width = (this.responsive ? this.el.parentElement.clientWidth : this.width || 800) + '';
    this._data = JSON.parse(this.data);
    if (!this._data) return;
    this.buildGraph();
    console.log(Chart.helpers.color)
  }

  private gtsToData(gts) {
    this.LOG.debug(['gtsToData'], gts);
    let datasets = [];
    let ticks = [];
    let pos = 0;
    let dataList: any[];
    if (gts.hasOwnProperty('data')) {
      dataList = gts.data
    } else {
      dataList = gts;
    }
    if (!dataList || dataList.length === 0) {
      return;
    } else {
      dataList = GTSLib.flatDeep(dataList);
      let i = 0;
      dataList.forEach(g => {
          let data = [];
          if (g.v) {
            GTSLib.gtsSort(g);
            g.v.forEach(d => {
              ticks.push(Math.floor(parseInt(d[0]) / 1000));
              data.push(d[d.length - 1]);
            });
            let color = ColorLib.getColor(pos);
            let label = GTSLib.serializeGtsMetadata(g);
            this._mapIndex[label] = pos;
            let ds = {
              label: label,
              data: data,
              borderColor: color,
              borderWidth: 1,
              backgroundColor: ColorLib.transparentize(color, 0.5)
            };
            datasets.push(ds);
            pos++;
            i++;
          }
        });
    }
    this.LOG.debug(['gtsToData', 'datasets'], datasets);
    return {datasets: datasets, ticks: GTSLib.unique(ticks).sort((a, b) => a > b ? 1 : a === b ? 0 : -1)};
  }

  componentDidLoad() {
    this.drawChart();
  }

  render() {
    return (
      <div class={this.theme}>
        <h1>{this.chartTitle}</h1>
        <div class="chart-container">
          <canvas id={this.uuid} width={this.width} height={this.height}/>
        </div>
      </div>
    );
  }
}
