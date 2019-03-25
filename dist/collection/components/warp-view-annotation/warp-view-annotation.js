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
import { GTSLib } from '../../utils/gts.lib';
import { ColorLib } from "../../utils/color-lib";
import { Logger } from "../../utils/logger";
import { Param } from "../../model/param";
import { ChartLib } from "../../utils/chart-lib";
import moment from "moment-timezone";
import deepEqual from "deep-equal";
/**
 * @prop --warp-view-chart-width: Fixed width if not responsive
 * @prop --warp-view-chart-height: Fixed height if not responsive
 */
export class WarpViewAnnotation {
    constructor() {
        this.responsive = false;
        this.showLegend = true;
        this.options = new Param();
        this.hiddenData = [];
        this.width = '';
        this.height = '';
        this.standalone = true;
        this.debug = false;
        this.displayExpander = true;
        this._mapIndex = {};
        this._options = {
            gridLineColor: '#000000',
            timeMode: 'date',
            timeZone: 'UTC',
            timeUnit: 'us'
        };
        this.parentWidth = -1;
        this._height = '0';
        this.expanded = false;
    }
    //two ways to capture keyboard events :
    // - local level, click to get focus.
    // - document level (only if isalone property is true)
    handleKeyDown(ev) {
        if (ev.key === 'Control') {
            this.LOG.debug(['document:keydown'], this.tooltip.querySelector('#tooltip-body'));
            this.trimmed = setInterval(() => {
                if (this.tooltip.querySelector('#tooltip-body')) {
                    this.tooltip.querySelector('#tooltip-body').classList.remove('trimmed');
                }
            }, 100);
        }
    }
    handleKeyup(ev) {
        this.LOG.debug(['document:keyup'], ev);
        if (ev.key === 'Control') {
            if (this.tooltip.querySelector('#tooltip-body')) {
                if (this.trimmed) {
                    clearInterval(this.trimmed);
                }
                this.tooltip.querySelector('#tooltip-body').classList.add('trimmed');
            }
        }
    }
    onResize() {
        if (this.el.parentElement.getBoundingClientRect().width !== this.parentWidth || this.parentWidth <= 0) {
            this.parentWidth = this.el.parentElement.getBoundingClientRect().width;
            clearTimeout(this.resizeTimer);
            this.resizeTimer = setTimeout(() => {
                if (this.el.parentElement.getBoundingClientRect().width > 0) {
                    this.LOG.debug(['onResize'], this.el.parentElement.getBoundingClientRect().width);
                    this.drawChart();
                }
                else {
                    this.onResize();
                }
            }, 150);
        }
    }
    onData(newValue) {
        this.LOG.debug(['data'], newValue);
        this.drawChart();
    }
    onOptions(newValue) {
        this.LOG.debug(['options'], newValue);
        this.drawChart();
    }
    hideData(newValue, oldValue) {
        if (!deepEqual(newValue, oldValue) && this._chart) {
            this.LOG.debug(['hiddenData'], newValue);
            const hiddenData = newValue;
            if (this._chart) {
                Object.keys(this._mapIndex).forEach(key => {
                    const hidden = hiddenData.indexOf(parseInt(key)) >= 0;
                    this.LOG.debug(['hiddenDataHidden'], [key, hidden, this._chart.getDatasetMeta(this._mapIndex[key])]);
                });
                this.drawChart();
                setTimeout(() => {
                    this._chart.update();
                }, 250);
            }
        }
    }
    minBoundChange(newValue, oldValue) {
        if (this._chart) {
            this._chart.options.animation.duration = 0;
            if (oldValue !== newValue && this._chart.options.scales.xAxes[0].time) {
                if (this._options.timeMode === 'timestamp') {
                    this._chart.options.scales.xAxes[0].ticks.min = (newValue == 0 && !this.standalone) ? 1 : newValue; //clunky hack for issue #22
                }
                else {
                    this._chart.options.scales.xAxes[0].time.min = (newValue == 0 && !this.standalone) ? 1 : newValue; //clunky hack for issue #22
                }
                this.LOG.debug(['minBoundChange'], this._chart.options.scales.xAxes[0].time.min);
            }
            this._chart.update();
        }
    }
    maxBoundChange(newValue, oldValue) {
        if (this._chart) {
            this._chart.options.animation.duration = 0;
            if (oldValue !== newValue && this._chart.options.scales.xAxes[0].time) {
                if (this._options.timeMode === 'timestamp') {
                    this._chart.options.scales.xAxes[0].ticks.max = (newValue == 0 && !this.standalone) ? 1 : newValue; //clunky hack for issue #22
                }
                else {
                    this._chart.options.scales.xAxes[0].time.max = (newValue == 0 && !this.standalone) ? 1 : newValue; //clunky hack for issue #22
                }
                this.LOG.debug(['maxBoundChange'], this._chart.options.scales.xAxes[0].time.max);
            }
            this._chart.update();
        }
    }
    /**
     *
     */
    drawChart() {
        if (!this.data) {
            return;
        }
        this._options.timeMode = 'date';
        this._options = ChartLib.mergeDeep(this._options, this.options);
        moment.tz.setDefault(this._options.timeZone); //force X axis display in UTC
        this.LOG.debug(['drawChart', 'hiddenData'], this.hiddenData);
        let gts = this.parseData(this.data);
        this.displayExpander = (gts.length > 1);
        if (!gts || gts.length === 0) {
            return;
        }
        let calculatedHeight = (this.expanded ? 30 * gts.length : 30);
        let height = this.height
            || this.height !== ''
            ? Math.max(calculatedHeight, parseInt(this.height))
            : calculatedHeight;
        this._height = height.toString();
        this.LOG.debug(['drawChart', 'height'], height, gts.length, calculatedHeight);
        this.canvas.parentElement.style.height = height + 'px';
        this.canvas.parentElement.style.width = '100%';
        const color = this._options.gridLineColor;
        const me = this;
        const chartOption = {
            layout: {
                padding: {
                    right: 26 //fine tuning, depends on chart element
                }
            },
            legend: { display: this.showLegend },
            responsive: this.responsive,
            animation: {
                duration: 0
            },
            tooltips: {
                enabled: false,
                custom: function (tooltipModel) {
                    const layout = me.canvas.getBoundingClientRect();
                    if (tooltipModel.opacity === 0) {
                        me.tooltip.style.opacity = '0';
                        me.date.innerHTML = '';
                        return;
                    }
                    if (tooltipModel.dataPoints && tooltipModel.dataPoints[0]) {
                        me.pointHover.emit({
                            x: tooltipModel.dataPoints[0].x,
                            y: this._eventPosition.y
                        });
                    }
                    else {
                        me.pointHover.emit({ x: -100, y: this._eventPosition.y });
                    }
                    me.tooltip.style.opacity = '1';
                    me.tooltip.style.top = (tooltipModel.caretY - 14 + 20) + 'px';
                    me.tooltip.classList.remove('right', 'left');
                    if (tooltipModel.body) {
                        me.LOG.debug(['tooltip'], tooltipModel.title[0]);
                        me.date.innerHTML = me._options.timeMode === 'timestamp'
                            ? tooltipModel.title[0].time
                            : moment(tooltipModel.title[0].time).utc().toISOString() || '';
                        me.tooltip.innerHTML = `<div class="tooltip-body trimmed" id="tooltip-body">
  <span>${GTSLib.formatLabel(tooltipModel.body[0].lines[0].gts)}: </span>
  <span class="value">${tooltipModel.body[0].lines[0].value}</span>
</div>`;
                    }
                    if (tooltipModel.caretX > layout.width / 2) {
                        me.tooltip.classList.add('left');
                    }
                    else {
                        me.tooltip.classList.add('right');
                    }
                    me.tooltip.style.pointerEvents = 'none';
                    return;
                },
                callbacks: {
                    title: (tooltipItems, data) => {
                        return { time: data.datasets[tooltipItems[0].datasetIndex].data[tooltipItems[0].index].x };
                    },
                    label: (tooltipItem, data) => {
                        return {
                            gts: data.datasets[tooltipItem.datasetIndex].label,
                            value: data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].val
                        };
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        display: false,
                        drawTicks: false,
                        type: "linear",
                        time: {},
                        gridLines: {
                            zeroLineColor: color,
                            color: color,
                            display: false
                        },
                        ticks: {}
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        drawTicks: false,
                        scaleLabel: {
                            display: false
                        },
                        afterFit: (scaleInstance) => {
                            scaleInstance.width = 100; // sets the width to 100px
                        },
                        gridLines: {
                            color: color,
                            zeroLineColor: color,
                            drawBorder: false
                        },
                        ticks: {
                            display: false,
                            min: -0.05,
                            max: 1,
                            beginAtZero: false,
                            stepSize: 1,
                            offsetGridLines: true
                        }
                    }
                ]
            }
        };
        this.LOG.debug(['options'], this._options);
        if (this.expanded) {
            chartOption.scales.yAxes[0].ticks.max = gts.length;
        }
        if (this._options.timeMode === 'timestamp') {
            chartOption.scales.xAxes[0].time = {};
            chartOption.scales.xAxes[0].type = 'linear';
            chartOption.scales.xAxes[0].ticks = {
                fontColor: color,
                min: this.timeMin,
                max: this.timeMax,
                maxRotation: 0,
                minRotation: 0
            };
        }
        else {
            let tmin = (this.timeMin == 0 && !this.standalone) ? 1 : this.timeMin; //clunky hack for issue #22
            let tmax = (this.timeMax == 0 && !this.standalone) ? 1 : this.timeMax; //clunky hack for issue #22. introduce a 1millisecond error.
            chartOption.scales.xAxes[0].time = {
                min: tmin,
                max: tmax,
                displayFormats: {
                    millisecond: 'HH:mm:ss.SSS',
                    second: 'HH:mm:ss',
                    minute: 'HH:mm',
                    hour: 'HH',
                    maxRotation: 0,
                    minRotation: 0
                }
            };
            chartOption.scales.xAxes[0].ticks = {
                fontColor: color
            };
            chartOption.scales.xAxes[0].type = 'time';
        }
        this.LOG.debug(['drawChart', 'about to render'], this._options, chartOption, gts);
        if (this._chart) {
            this._chart.destroy();
        }
        this._chart = new Chart.Scatter(this.canvas, { data: { datasets: gts }, options: chartOption });
        this.onResize();
        setTimeout(() => {
            this._chart.update();
        }, 250);
        // not needed if managed in dataset. will be needed later when optimizing the parseData calls.
        // Object.keys(this._mapIndex).forEach(key => {
        //   this.LOG.debug(['drawChart', 'hide'], [key]);
        //   this._chart.getDatasetMeta(this._mapIndex[key]).hidden = !!this.hiddenData.find(item => item + '' === key);
        // });
    }
    /**
     *
     * @param gts
     * @returns {any[]}
     */
    parseData(gts) {
        this.LOG.debug(['parseData'], gts);
        let dataList = GTSLib.getData(gts).data;
        this._mapIndex = {};
        if (!dataList || dataList.length === 0) {
            return [];
        }
        else {
            let dataSet = [];
            dataList = GTSLib.flattenGtsIdArray(dataList, 0).res;
            dataList = GTSLib.flatDeep(dataList);
            this.LOG.debug(['parseData', 'dataList'], dataList);
            let i = 0;
            dataList = dataList.filter(g => {
                return (g.v && GTSLib.isGtsToAnnotate(g));
            });
            dataList.forEach(g => {
                this.LOG.debug(['parseData', 'will draw'], g);
                let data = [];
                let color = ColorLib.getColor(g.id);
                const myImage = ChartLib.buildImage(1, 30, color);
                g.v.forEach(d => {
                    let time = d[0];
                    if (this._options.timeMode !== 'timestamp') {
                        time = moment(time / GTSLib.getDivider(this._options.timeUnit)).utc(true).valueOf();
                    }
                    data.push({ x: time, y: (this.expanded ? dataList.length - 1 - i : 0) + 0.5, val: d[d.length - 1] });
                });
                let label = GTSLib.serializeGtsMetadata(g);
                this._mapIndex[g.id + ''] = i;
                dataSet.push({
                    label: label,
                    data: data,
                    pointRadius: 5,
                    pointHoverRadius: 5,
                    pointHitRadius: 5,
                    pointStyle: myImage,
                    borderColor: color,
                    backgroundColor: ColorLib.transparentize(color),
                    hidden: this.hiddenData.indexOf(g.id) >= 0
                });
                i++;
            });
            return dataSet;
        }
    }
    componentWillLoad() {
        this.LOG = new Logger(WarpViewAnnotation, this.debug);
    }
    componentDidLoad() {
        this.drawChart();
        ChartLib.resizeWatchTimer(this.el, this.onResize.bind(this));
    }
    render() {
        return h("div", null,
            h("div", { class: "date", ref: el => this.date = el }),
            this.displayExpander
                ? h("button", { class: 'expander', onClick: () => this.toggle(), title: "collapse/expand" }, "+/-")
                : '',
            h("div", { class: "chart-container", style: {
                    position: "relative",
                    width: this.width,
                    height: this._height
                } },
                h("canvas", { ref: el => this.canvas = el, width: this.width, height: this._height })),
            h("div", { class: "tooltip", ref: el => this.tooltip = el }));
    }
    toggle() {
        this.expanded = !this.expanded;
        this.drawChart();
    }
    static get is() { return "warp-view-annotation"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "data": {
            "type": String,
            "attr": "data",
            "watchCallbacks": ["onData"]
        },
        "debug": {
            "type": Boolean,
            "attr": "debug"
        },
        "displayExpander": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "height": {
            "type": String,
            "attr": "height",
            "mutable": true
        },
        "hiddenData": {
            "type": "Any",
            "attr": "hidden-data",
            "watchCallbacks": ["hideData"]
        },
        "options": {
            "type": "Any",
            "attr": "options",
            "watchCallbacks": ["onOptions"]
        },
        "responsive": {
            "type": Boolean,
            "attr": "responsive"
        },
        "showLegend": {
            "type": Boolean,
            "attr": "show-legend"
        },
        "standalone": {
            "type": Boolean,
            "attr": "standalone"
        },
        "timeMax": {
            "type": Number,
            "attr": "time-max",
            "watchCallbacks": ["maxBoundChange"]
        },
        "timeMin": {
            "type": Number,
            "attr": "time-min",
            "watchCallbacks": ["minBoundChange"]
        },
        "width": {
            "type": String,
            "attr": "width",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "pointHover",
            "method": "pointHover",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "handleKeyDown"
        }, {
            "name": "document:keydown",
            "method": "handleKeyDown"
        }, {
            "name": "keyup",
            "method": "handleKeyup"
        }, {
            "name": "document:keyup",
            "method": "handleKeyup"
        }, {
            "name": "window:resize",
            "method": "onResize",
            "passive": true
        }]; }
    static get style() { return "/**style-placeholder:warp-view-annotation:**/"; }
}
