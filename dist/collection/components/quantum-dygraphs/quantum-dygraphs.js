import { GTSLib } from '../../gts.lib';
import Dygraph from 'dygraphs';
/**
 * options :
 *  gridLineColor: 'red | #fff'
 *  time.timeMode: 'timestamp | date'
 *  showRangeSelector: boolean
 *  type : 'line | area | step'
 *
 */
export class QuantumDygraphs {
    constructor() {
        this.data = '[]';
        this.options = '{}';
        this.hiddenData = '[]';
        this.theme = 'light';
        this.unit = '';
        this.chartTitle = '';
        this.responsive = false;
        this.standalone = true;
        this._option = {
            time: { timeMode: 'date' },
            showRangeSelector: true,
            type: 'line'
        };
    }
    hideData(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.drawChart();
        }
    }
    onData(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.drawChart();
        }
    }
    onTheme(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.drawChart();
        }
    }
    changeScale(newValue, oldValue) {
        if (oldValue !== newValue) {
            this._option = JSON.parse(newValue);
            this.drawChart();
        }
    }
    gtsToData(gts) {
        const datasets = [];
        const data = {};
        let pos = 0;
        let i = 0;
        let labels = [];
        let colors = [];
        const hiddenData = JSON.parse(this.hiddenData);
        if (!gts) {
            return;
        }
        else
            gts.forEach(d => {
                if (d.gts) {
                    d.gts = GTSLib.flatDeep(d.gts);
                    labels = new Array(d.gts.length);
                    labels[0] = 'Date';
                    colors = new Array(d.gts.length);
                    d.gts.forEach(g => {
                        if (g.v && GTSLib.isGtsToPlot(g)) {
                            let label = GTSLib.serializeGtsMetadata(g);
                            if (hiddenData.filter((i) => i === label).length === 0) {
                                GTSLib.gtsSort(g);
                                g.v.forEach(value => {
                                    if (!data[value[0]]) {
                                        data[value[0]] = new Array(d.gts.length);
                                        data[value[0]].fill(null);
                                    }
                                    data[value[0]][i] = value[value.length - 1];
                                });
                                let color = GTSLib.getColor(pos);
                                if (d.params && d.params[i] && d.params[i].color) {
                                    color = d.params[i].color;
                                }
                                if (d.params && d.params[i] && d.params[i].key) {
                                    label = d.params[i].key;
                                }
                                labels[i + 1] = label;
                                colors[i] = color;
                                i++;
                            }
                        }
                        pos++;
                    });
                }
            });
        labels = labels.filter((i) => !!i);
        Object.keys(data).forEach(timestamp => {
            if (this._option.time && this._option.time.timeMode === 'timestamp') {
                datasets.push([parseInt(timestamp)].concat(data[timestamp].slice(0, labels.length - 1)));
            }
            else {
                datasets.push([new Date(parseInt(timestamp) / 100)].concat(data[timestamp].slice(0, labels.length - 1)));
            }
        });
        datasets.sort((a, b) => a[0] > b[0] ? 1 : -1);
        return { datasets: datasets, labels: labels, colors: colors.slice(0, labels.length) };
    }
    isStepped() {
        return this._option.type === 'step';
    }
    isStacked() {
        return this._option.type === 'area';
    }
    legendFormatter(data) {
        if (data.x === null) {
            // This happens when there's no selection and {legend: 'always'} is set.
            return '<br>' + data.series.map(function (series) {
                if (!series.isVisible)
                    return;
                let labeledData = series.labelHTML + ': ' + series.yHTML;
                if (series.isHighlighted) {
                    labeledData = '<b>' + labeledData + '</b>';
                }
                return series.dashHTML + ' ' + labeledData;
            }).join('<br>');
        }
        let html = data.xHTML;
        data.series.forEach(function (series) {
            if (!series.isVisible || !series.yHTML)
                return;
            let labeledData = series.labelHTML + ': ' + series.yHTML;
            if (series.isHighlighted) {
                labeledData = '<b>' + labeledData + '</b>';
            }
            html += '<br>' + series.dashHTML + ' ' + labeledData;
        });
        return html;
    }
    highlightCallback(event) {
        this.pointHover.emit({
            x: event.x,
            y: event.y
        });
    }
    zoomCallback(minDate, maxDate) {
        this.boundsDidChange.emit({
            bounds: {
                min: minDate,
                max: maxDate
            }
        });
    }
    drawChart() {
        const data = JSON.parse(this.data);
        this._data = this.gtsToData(data);
        const chart = this.el.querySelector('#myChart');
        if (data.length > 0) {
            const color = this._option.gridLineColor || this.theme === 'light' ? '#000000' : '#ffffff';
            this._chart = new Dygraph(chart, this._data.datasets, {
                height: (this.responsive ? this.el.parentElement.clientHeight : QuantumDygraphs.DEFAULT_HEIGHT) - 30,
                width: this.responsive ? this.el.parentElement.clientWidth : QuantumDygraphs.DEFAULT_WIDTH,
                labels: this._data.labels,
                showRoller: false,
                showRangeSelector: this._option.showRangeSelector || true,
                connectSeparatedPoints: true,
                colors: this._data.colors,
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
                zoomCallback: this.zoomCallback.bind(this),
                axisLabelWidth: this.standalone ? 50 : 94,
                rightGap: this.standalone ? 0 : 20
            });
        }
    }
    componentDidLoad() {
        this._option = JSON.parse(this.options);
        this.drawChart();
    }
    render() {
        return h("div", { class: this.theme },
            h("h1", null, this.chartTitle),
            h("div", { id: "myChart", class: this.theme }));
    }
    static get is() { return "quantum-dygraphs"; }
    static get properties() { return {
        "chartTitle": {
            "type": String,
            "attr": "chart-title"
        },
        "data": {
            "type": String,
            "attr": "data",
            "watchCallbacks": ["onData"]
        },
        "el": {
            "elementRef": true
        },
        "hiddenData": {
            "type": String,
            "attr": "hidden-data",
            "watchCallbacks": ["hideData"]
        },
        "options": {
            "type": String,
            "attr": "options",
            "watchCallbacks": ["changeScale"]
        },
        "responsive": {
            "type": Boolean,
            "attr": "responsive"
        },
        "standalone": {
            "type": Boolean,
            "attr": "standalone"
        },
        "theme": {
            "type": String,
            "attr": "theme",
            "watchCallbacks": ["onTheme"]
        },
        "unit": {
            "type": String,
            "attr": "unit"
        }
    }; }
    static get events() { return [{
            "name": "receivedData",
            "method": "receivedData",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "boundsDidChange",
            "method": "boundsDidChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "pointHover",
            "method": "pointHover",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:quantum-dygraphs:**/"; }
}
QuantumDygraphs.DEFAULT_WIDTH = 800;
QuantumDygraphs.DEFAULT_HEIGHT = 600;
