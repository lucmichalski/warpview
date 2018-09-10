import Chart from 'chart.js';
import {Component, Element, Event, EventEmitter, Prop, Watch} from '@stencil/core';
import {GTSLib} from '../../gts.lib';

@Component({
  tag: 'quantum-bubble',
  styleUrl: 'quantum-bubble.scss',
  shadow: true
})
export class QuantumBubble {
  @Prop() unit: string = '';
  @Prop() chartTitle: string = '';
  @Prop() responsive: boolean = false;
  @Prop() showLegend: boolean = true;
  @Prop() standalone = true;
  @Prop() data: string = '[]';
  @Prop() options: {
    gridLineColor?: string
  } = {};
  @Prop() theme = 'light';
  @Prop() width = '';
  @Prop() height = '';
  @Prop() timeMin: number;
  @Prop() timeMax: number;
  @Event() pointHover: EventEmitter;

  @Element() el: HTMLElement;

  @Watch('data')
  redraw(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      this.drawChart();
    }
  }

  drawChart() {
    this.height = (this.responsive ? this.el.parentElement.clientHeight : this.height || 600) + '';
    this.width = (this.responsive ? this.el.parentElement.clientWidth : this.width || 800) + '';
    let ctx = this.el.shadowRoot.querySelector("#myChart");
    let data = JSON.parse(this.data);
    if (!data) return;
    const me = this;
    const color = this.options.gridLineColor || this.theme === 'light' ? '#FFFFFF' : '#000000';
    const options: any = {
      legend: {
        display: this.showLegend
      },
      borderWidth: 1,
      animation: {
        duration: 0,
      },
      scales: {
        xAxes: [{
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

    if (!this.standalone) {
      options.scales.yAxes[0].afterFit = (scaleInstance) => {
        scaleInstance.width = 100; // sets the width to 100px
      };
    }

    new Chart(ctx, {
      type: 'bubble',
      tooltips: {
        mode: 'x',
        position: 'nearest',
        custom: function (tooltip) {
          if (tooltip.opacity > 0) {
            me.pointHover.emit({x: tooltip.dataPoints[0].x + 15, y: this._eventPosition.y});
          } else {
            me.pointHover.emit({x: -100, y: this._eventPosition.y});
          }
          return;
        }
      },
      data: {
        datasets: this.parseData(data)
      },
      options: options
    });
  }

  parseData(gts) {
    if (!gts) return;
    let datasets = [];
    for (let i = 0; i < gts.length; i++) {
      let label = Object.keys(gts[i])[0];
      let data = [];
      let g = gts[i][label];
      if (GTSLib.isArray(g)) {
        g.forEach(d => {
          data.push({
              x: d[0],
              y: d[1],
              r: d[2],
            }
          )
        });
      }
      datasets.push({
        data: data,
        label: label,
        backgroundColor: GTSLib.transparentize(GTSLib.getColor(i), 0.5),
        borderColor: GTSLib.getColor(i),
        borderWidth: 1
      });
    }
    return datasets;
  }

  componentDidLoad() {
    this.drawChart()
  }

  render() {
    return (
      <div class={this.theme}>
        <h1>{this.chartTitle}</h1>
        <div class="chart-container">
          <canvas id="myChart" width={this.width} height={this.height}/>
        </div>
      </div>
    );
  }
}
