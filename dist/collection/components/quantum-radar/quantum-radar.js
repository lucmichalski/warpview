import Chart from 'chart.js';
import { GTSLib } from '../../gts.lib';
export class QuantumRadar {
    constructor() {
        this.unit = '';
        this.chartTitle = '';
        this.responsive = true;
        this.showLegend = true;
        this.data = '[]';
        this.options = {};
        this.width = '';
        this.height = '';
    }
    redraw(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.drawChart();
        }
    }
    generateColors(num) {
        let color = [];
        for (let i = 0; i < num; i++) {
            color.push(GTSLib.transparentize(GTSLib.getColor(i), 0.5));
        }
        return color;
    }
    parseData(gts) {
        let labels = [];
        let datas = [];
        gts.forEach(d => {
            datas.push(d[1]);
            labels.push(d[0]);
        });
        return { labels: labels, datas: datas };
    }
    drawChart() {
        let ctx = this.el.shadowRoot.querySelector("#myChart");
        //let gts = this.parseData(JSON.parse(this.data));
        new Chart(ctx, {
            type: 'radar',
            legend: { display: this.showLegend },
            data: {
                /*
                datasets: [{data: gts.datas, backgroundColor: this.generateColors(gts.datas.length), label: this.chartTitle}],
                labels: gts.labels
                */
                labels: ['Beer', 'Rum', 'Peanut', 'Crisps'],
                datasets: [{
                        data: [50, 25, 10, 10],
                        backgroundColor: '#64aa3939'
                    }, {
                        data: [35, 75, 90, 5],
                        backgroundColor: '#642d882d'
                    }
                ]
            },
            options: {
                responsive: this.responsive,
                tooltips: {
                    mode: 'index',
                    intersect: true
                }
            }
        });
    }
    componentDidLoad() {
        this.drawChart();
    }
    render() {
        return (h("div", null,
            h("h1", null, this.chartTitle),
            h("div", { class: "chart-container" }, this.responsive
                ? h("canvas", { id: "myChart" })
                : h("canvas", { id: "myChart", width: this.width, height: this.height }))));
    }
    static get is() { return "quantum-radar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "chartTitle": {
            "type": String,
            "attr": "chart-title"
        },
        "data": {
            "type": String,
            "attr": "data",
            "watchCallbacks": ["redraw"]
        },
        "el": {
            "elementRef": true
        },
        "height": {
            "type": String,
            "attr": "height"
        },
        "options": {
            "type": "Any",
            "attr": "options"
        },
        "responsive": {
            "type": Boolean,
            "attr": "responsive"
        },
        "showLegend": {
            "type": Boolean,
            "attr": "show-legend"
        },
        "unit": {
            "type": String,
            "attr": "unit"
        },
        "width": {
            "type": String,
            "attr": "width"
        }
    }; }
    static get style() { return "/**style-placeholder:quantum-radar:**/"; }
}