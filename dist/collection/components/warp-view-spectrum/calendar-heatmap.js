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
import { Logger } from "../../utils/logger";
import { ChartLib } from "../../utils/chart-lib";
import moment from 'moment';
import { easeLinear, max, scaleBand, scaleLinear, scaleTime, sum, timeDays, timeHours, timeSecond } from "d3";
import { event, select } from 'd3-selection';
import { ColorLib } from "../../utils/color-lib";
export class CalendarHeatmap {
    constructor() {
        this.color = '#ff4500';
        this.overview = 'global';
        this.LOG = new Logger(CalendarHeatmap);
        // Defaults
        this.gutter = 5;
        this.item_gutter = 1;
        this.width = 1000;
        this.height = 200;
        this.item_size = 10;
        this.label_padding = 40;
        this.max_block_height = 20;
        this.transition_duration = 500;
        this.in_transition = false;
        // Tooltip defaults
        this.tooltip_width = 250;
        this.tooltip_padding = 15;
        // Overview defaults
        this.history = ['global'];
        this.selected = {};
        this.uuid = 'spectrum-' + ChartLib.guid().split('-').join('');
    }
    onData(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.LOG.debug(['data'], newValue);
            this.drawChart();
        }
    }
    /**
     * Recalculate dimensions on window resize events
     */
    onResize() {
        this.calculateDimensions();
        if (!!this.data && !!this.data[0]['summary']) {
            this.drawChart();
        }
    }
    ;
    /**
     * Utility function to get number of complete weeks in a year
     *
     * @returns {number}
     */
    static getNumberOfWeeks() {
        const dayIndex = Math.round((+moment.utc() - +moment.utc().subtract(1, 'year').startOf('week')) / 86400000);
        return Math.trunc(dayIndex / 7) + 1;
    }
    /**
     * Utility function to calculate chart dimensions
     */
    calculateDimensions() {
        const element = this.el.shadowRoot.querySelector('#' + this.uuid);
        this.width = element.clientWidth < 1000 ? 1000 : element.clientWidth;
        this.item_size = ((this.width - this.label_padding) / CalendarHeatmap.getNumberOfWeeks() - this.gutter);
        this.height = this.label_padding + 7 * (this.item_size + this.gutter);
        this.svg.attr('width', this.width).attr('height', this.height);
    }
    groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }
    ;
    /**
     * Helper function to check for data summary
     *
     * @returns {any}
     */
    updateDataSummary() {
        // Get daily summary if that was not provided
        if (!this.data[0]['summary']) {
            this.data.map((d) => {
                const summary = d['details'].reduce((uniques, project) => {
                    if (!uniques[project.name]) {
                        uniques[project.name] = {
                            'value': project.value
                        };
                    }
                    else {
                        uniques[project.name].value += project.value;
                    }
                    return uniques;
                }, {});
                const unsorted_summary = Object.keys(summary).map((key) => {
                    return {
                        'name': key,
                        'value': summary[key].value
                    };
                });
                d['summary'] = unsorted_summary.sort((a, b) => {
                    return b.value - a.value;
                });
                return d;
            });
        }
    }
    /**
     * Draw the chart based on the current overview type
     */
    drawChart() {
        if (!this.svg || !this.data) {
            return;
        }
        if (this.overview === 'global') {
            this.drawGlobalOverview();
            this.onChange.emit({
                overview: this.overview,
                start: moment.utc(this.data[0]['date']),
                end: moment.utc(this.data[this.data.length - 1]['date']),
            });
        }
        else if (this.overview === 'year') {
            this.drawYearOverview();
            this.onChange.emit({
                overview: this.overview,
                start: moment.utc(this.selected['date']).startOf('year'),
                end: moment.utc(this.selected['date']).endOf('year'),
            });
        }
        else if (this.overview === 'month') {
            this.drawMonthOverview();
            this.onChange.emit({
                overview: this.overview,
                start: moment.utc(this.selected['date']).startOf('month'),
                end: moment.utc(this.selected['date']).endOf('month'),
            });
        }
        else if (this.overview === 'week') {
            this.drawWeekOverview();
            this.onChange.emit({
                overview: this.overview,
                start: moment.utc(this.selected['date']).startOf('week'),
                end: moment.utc(this.selected['date']).endOf('week'),
            });
        }
        else if (this.overview === 'day') {
            this.drawDayOverview();
            this.onChange.emit({
                overview: this.overview,
                start: moment.utc(this.selected['date']).startOf('day'),
                end: moment.utc(this.selected['date']).endOf('day'),
            });
        }
    }
    /**
     * Draw global overview (multiple years)
     */
    drawGlobalOverview() {
        // Add current overview to the history
        if (this.history[this.history.length - 1] !== this.overview) {
            this.history.push(this.overview);
        }
        // Define start and end of the dataset
        const startM = moment.utc(this.data[0].date.startOf('y'));
        const endM = moment.utc(this.data[this.data.length - 1].date.endOf('y'));
        // Define array of years and total values
        const ydata = this.data.filter((d) => {
            return moment.utc(d.date).isBetween(startM, endM, null, '[]');
        });
        ydata.forEach(d => {
            const summary = [];
            const group = this.groupBy(d.details, 'name');
            Object.keys(group).forEach(k => {
                summary.push({
                    name: k,
                    total: group[k].reduce((acc, o) => {
                        return acc + o.value;
                    }, 0),
                    color: group[k][0].color,
                    id: group[k][0].id,
                });
            });
            d.summary = summary;
        });
        const duration = Math.ceil(moment.duration(endM.diff(startM)).asYears());
        const scale = [];
        for (let i = 0; i < duration; i++) {
            const d = moment.utc().year(startM.year() + i).month(0).date(1).startOf('y');
            scale.push(d);
        }
        const year_data = ydata.map((d) => {
            const date = d.date;
            return {
                date: date,
                total: ydata.reduce((prev, current) => {
                    if (current.date.year() === date.year()) {
                        prev += current.total;
                    }
                    return prev;
                }, 0),
                summary: (() => {
                    const summary = ydata.reduce((summary, d) => {
                        if (d.date.year() === date.year()) {
                            for (let i = 0; i < d.summary.length; i++) {
                                if (!summary[d.summary[i].name]) {
                                    summary[d.summary[i].name] = {
                                        total: d.summary[i].total,
                                        color: d.summary[i].color,
                                    };
                                }
                                else {
                                    summary[d.summary[i].name].total += d.summary[i].total;
                                }
                            }
                        }
                        return summary;
                    }, {});
                    const unsorted_summary = Object.keys(summary).map((key) => {
                        return {
                            name: key,
                            total: summary[key].total,
                            color: summary[key].color,
                        };
                    });
                    return unsorted_summary.sort((a, b) => {
                        return b.total - a.total;
                    });
                })(),
            };
        });
        // Calculate max value of all the years in the dataset
        const max_value = max(year_data, (d) => {
            return d.total;
        });
        // Define year labels and axis
        const year_labels = scale.map((d) => {
            return d;
        });
        const yearScale = scaleBand()
            .rangeRound([0, this.width])
            .padding(0.05)
            .domain(year_labels.map((d) => {
            return d.year().toString();
        }));
        // Add global data items to the overview
        this.items.selectAll('.item-block-year').remove();
        this.items.selectAll('.item-block-year')
            .data(year_data)
            .enter()
            .append('rect')
            .attr('class', 'item item-block-year')
            .attr('width', () => {
            return (this.width - this.label_padding) / year_labels.length - this.gutter * 5;
        })
            .attr('height', () => {
            return this.height - this.label_padding;
        })
            .attr('transform', (d) => {
            return 'translate(' + yearScale(d.date.year().toString()) + ',' + this.tooltip_padding * 2 + ')';
        })
            .attr('fill', (d) => {
            const color = scaleLinear()
                .range(['#ffffff', this.color || '#ff4500'])
                .domain([-0.15 * max_value, max_value]);
            return color(d.total) || '#ff4500';
        })
            .on('click', (d) => {
            if (this.in_transition) {
                return;
            }
            // Set in_transition flag
            this.in_transition = true;
            // Set selected date to the one clicked on
            this.selected = d;
            // Hide tooltip
            this.hideTooltip();
            // Remove all global overview related items and labels
            this.removeGlobalOverview();
            // Redraw the chart
            this.overview = 'year';
            this.drawChart();
        })
            .style('opacity', 0)
            .on('mouseover', (d) => {
            if (this.in_transition) {
                return;
            }
            // Calculate tooltip position
            let x = yearScale(d.date.year) + this.tooltip_padding * 2;
            while (this.width - x < (this.tooltip_width + this.tooltip_padding * 5)) {
                x -= 10;
            }
            const y = this.tooltip_padding * 4;
            // Show tooltip
            this.tooltip.html(this.getTooltip(d))
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                .duration(this.transition_duration / 2)
                .ease(easeLinear)
                .style('opacity', 1);
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.hideTooltip();
        })
            .transition()
            .delay((d, i) => {
            return this.transition_duration * (i + 1) / 10;
        })
            .duration(() => {
            return this.transition_duration;
        })
            .ease(easeLinear)
            .style('opacity', 1)
            .call((transition, callback) => {
            if (transition.empty()) {
                callback();
            }
            let n = 0;
            transition.each(() => {
                ++n;
            }).on('end', function () {
                if (!--n) {
                    callback.apply(this, arguments);
                }
            });
        }, () => {
            this.in_transition = false;
        });
        // Add year labels
        this.labels.selectAll('.label-year').remove();
        this.labels.selectAll('.label-year')
            .data(year_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-year')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return d.year();
        })
            .attr('x', (d) => {
            return yearScale(d.year().toString());
        })
            .attr('y', this.label_padding / 2)
            .on('mouseenter', (year_label) => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block-year')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                return (moment.utc(d.date).year() === year_label.year) ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block-year')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 1);
        })
            .on('click', (d) => {
            if (this.in_transition) {
                return;
            }
            // Set in_transition flag
            this.in_transition = true;
            // Set selected year to the one clicked on
            this.selected = year_data[0];
            // Hide tooltip
            this.hideTooltip();
            // Remove all global overview related items and labels
            this.removeGlobalOverview();
            // Redraw the chart
            this.overview = 'year';
            this.drawChart();
        });
    }
    /**
     * Draw year overview
     */
    drawYearOverview() {
        // Add current overview to the history
        if (this.history[this.history.length - 1] !== this.overview) {
            this.history.push(this.overview);
        }
        // Define start and end date of the selected year
        const start_of_year = moment(this.selected.date).startOf('year');
        const end_of_year = moment(this.selected.date).endOf('year');
        // Filter data down to the selected year
        const year_data = this.data.filter((d) => {
            return d.date.isBetween(start_of_year, end_of_year, null, '[]');
        });
        year_data.forEach(d => {
            const summary = [];
            const group = this.groupBy(d.details, 'name');
            Object.keys(group).forEach(k => {
                summary.push({
                    name: k,
                    total: group[k].reduce((acc, o) => {
                        return acc + o.value;
                    }, 0),
                    color: group[k][0].color,
                    id: group[k][0].id,
                });
            });
            d.summary = summary;
        });
        // Calculate max value of the year data
        const max_value = max(year_data, (d) => {
            return d.total;
        });
        const color = scaleLinear()
            .range(['#ffffff', this.color])
            .domain([-0.15 * max_value, max_value]);
        this.items.selectAll('.item-circle').remove();
        this.items.selectAll('.item-circle')
            .data(year_data).enter().append('rect').attr('class', 'item item-circle').style('opacity', 0)
            .attr('x', (d) => {
            return this.calcItemX(d, start_of_year) + (this.item_size - this.calcItemSize(d, max_value)) / 2;
        })
            .attr('y', (d) => {
            return this.calcItemY(d) + (this.item_size - this.calcItemSize(d, max_value)) / 2;
        })
            .attr('rx', (d) => {
            return this.calcItemSize(d, max_value);
        })
            .attr('ry', (d) => {
            return this.calcItemSize(d, max_value);
        })
            .attr('width', (d) => {
            return this.calcItemSize(d, max_value);
        })
            .attr('height', (d) => {
            return this.calcItemSize(d, max_value);
        })
            .attr('fill', (d) => {
            return (d.total > 0) ? color(d.total) : 'transparent';
        })
            .on('click', (d) => {
            if (this.in_transition) {
                return;
            }
            // Don't transition if there is no data to show
            if (d.total === 0) {
                return;
            }
            this.in_transition = true;
            // Set selected date to the one clicked on
            this.selected = d;
            // Hide tooltip
            this.hideTooltip();
            // Remove all year overview related items and labels
            this.removeYearOverview();
            // Redraw the chart
            this.overview = 'day';
            this.drawChart();
        })
            .on('mouseover', (d) => {
            if (this.in_transition) {
                return;
            }
            // Pulsating animation
            const circle = select(event.currentTarget);
            const repeat = () => {
                circle.transition()
                    .duration(this.transition_duration)
                    .ease(easeLinear)
                    .attr('x', (d) => {
                    return this.calcItemX(d, start_of_year) - (this.item_size * 1.1 - this.item_size) / 2;
                })
                    .attr('y', (d) => {
                    return this.calcItemY(d) - (this.item_size * 1.1 - this.item_size) / 2;
                })
                    .attr('width', this.item_size * 1.1)
                    .attr('height', this.item_size * 1.1)
                    .transition()
                    .duration(this.transition_duration)
                    .ease(easeLinear)
                    .attr('x', (d) => {
                    return this.calcItemX(d, start_of_year) + (this.item_size - this.calcItemSize(d, max_value)) / 2;
                })
                    .attr('y', (d) => {
                    return this.calcItemY(d) + (this.item_size - this.calcItemSize(d, max_value)) / 2;
                })
                    .attr('width', (d) => {
                    return this.calcItemSize(d, max_value);
                })
                    .attr('height', (d) => {
                    return this.calcItemSize(d, max_value);
                })
                    .on('end', repeat);
            };
            repeat();
            // Construct tooltip
            // Calculate tooltip position
            let x = this.calcItemX(d, start_of_year) + this.item_size / 2;
            if (this.width - x < (this.tooltip_width + this.tooltip_padding * 3)) {
                x -= this.tooltip_width + this.tooltip_padding * 2;
            }
            const y = this.calcItemY(d) + this.item_size / 2;
            // Show tooltip
            this.tooltip.html(this.getTooltip(d))
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                .duration(this.transition_duration / 2)
                .ease(easeLinear)
                .style('opacity', 1);
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            // Set circle radius back to what it's supposed to be
            select(event.currentTarget).transition()
                .duration(this.transition_duration / 2)
                .ease(easeLinear)
                .attr('x', (d) => {
                return this.calcItemX(d, start_of_year) + (this.item_size - this.calcItemSize(d, max_value)) / 2;
            })
                .attr('y', (d) => {
                return this.calcItemY(d) + (this.item_size - this.calcItemSize(d, max_value)) / 2;
            })
                .attr('width', (d) => {
                return this.calcItemSize(d, max_value);
            })
                .attr('height', (d) => {
                return this.calcItemSize(d, max_value);
            });
            // Hide tooltip
            this.hideTooltip();
        })
            .transition()
            .delay(() => {
            return (Math.cos(Math.PI * Math.random()) + 1) * this.transition_duration;
        })
            .duration(() => {
            return this.transition_duration;
        })
            .ease(easeLinear)
            .style('opacity', 1)
            .call((transition, callback) => {
            if (transition.empty()) {
                callback();
            }
            let n = 0;
            transition.each(() => {
                ++n;
            }).on('end', function () {
                if (!--n) {
                    callback.apply(this, arguments);
                }
            });
        }, () => {
            this.in_transition = false;
        });
        // Add month labels
        const duration = Math.ceil(moment.duration(end_of_year.diff(start_of_year)).asMonths());
        const month_labels = [];
        for (let i = 1; i < duration; i++) {
            const d = moment.utc(this.selected.date).month((start_of_year.month() + i) % 12).startOf('month');
            month_labels.push(d);
        }
        const monthScale = scaleLinear()
            .range([0, this.width])
            .domain([0, month_labels.length]);
        this.labels.selectAll('.label-month').remove();
        this.labels.selectAll('.label-month')
            .data(month_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-month')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return d.format('MMM');
        })
            .attr('x', (d, i) => {
            return monthScale(i) + (monthScale(i) - monthScale(i - 1)) / 2;
        })
            .attr('y', this.label_padding / 2)
            .on('mouseenter', (d) => {
            if (this.in_transition) {
                return;
            }
            const selected_month = moment.utc(d);
            this.items.selectAll('.item-circle')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                return moment.utc(d.date).isSame(selected_month, 'month') ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-circle')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 1);
        })
            .on('click', (d) => {
            if (this.in_transition) {
                return;
            }
            // Check month data
            const month_data = this.data.filter((e) => {
                return moment.utc(d).startOf('month') <= moment.utc(e.date) && moment.utc(e.date) < moment.utc(d).endOf('month');
            });
            // Don't transition if there is no data to show
            if (!month_data.length) {
                return;
            }
            // Set selected month to the one clicked on
            this.selected = { date: d };
            this.in_transition = true;
            // Hide tooltip
            this.hideTooltip();
            // Remove all year overview related items and labels
            this.removeYearOverview();
            // Redraw the chart
            this.overview = 'month';
            this.drawChart();
        });
        // Add day labels
        const day_labels = timeDays(moment.utc().startOf('week').toDate(), moment.utc().endOf('week').toDate());
        const dayScale = scaleBand()
            .rangeRound([this.label_padding, this.height])
            .domain(day_labels.map((d) => {
            return moment.utc(d).weekday().toString();
        }));
        this.labels.selectAll('.label-day').remove();
        this.labels.selectAll('.label-day')
            .data(day_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-day')
            .attr('x', this.label_padding / 3)
            .attr('y', (d, i) => {
            return dayScale((i).toString()) + dayScale.bandwidth() / 1.75;
        })
            .style('text-anchor', 'left')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return moment.utc(d).format('dddd')[0];
        })
            .on('mouseenter', (d) => {
            if (this.in_transition) {
                return;
            }
            const selected_day = moment.utc(d);
            this.items.selectAll('.item-circle')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                return (moment.utc(d.date).day() === selected_day.day()) ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-circle')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 1);
        });
        // Add button to switch back to previous overview
        this.drawButton();
    }
    ;
    /**
     * Draw month overview
     */
    drawMonthOverview() {
        // Add current overview to the history
        if (this.history[this.history.length - 1] !== this.overview) {
            this.history.push(this.overview);
        }
        // Define beginning and end of the month
        const start_of_month = moment(this.selected.date).startOf('month');
        const end_of_month = moment(this.selected.date).endOf('month');
        // Filter data down to the selected month
        let month_data = [];
        this.data.filter((d) => {
            return moment.utc(d.date).isBetween(start_of_month, end_of_month, null, '[]');
        }).map(d => {
            let scale = [];
            // Object.keys(this.groupBy(d.details, 'name')
            d.details.forEach(det => {
                const date = moment.utc(det.date);
                const i = Math.floor(date.hours() / 3);
                if (!scale[i]) {
                    scale[i] = {
                        date: date.startOf('hour'),
                        total: 0,
                        details: [],
                        summary: []
                    };
                }
                scale[i].total += det.value;
                scale[i].details.push(det);
            });
            scale.forEach(s => {
                const group = this.groupBy(s.details, 'name');
                Object.keys(group).forEach(k => {
                    s.summary.push({
                        name: k,
                        total: sum(group[k], (d) => {
                            return d.total;
                        }),
                        color: group[k][0].color
                    });
                });
            });
            console.log('scale', scale);
            month_data = month_data.concat(scale);
        });
        console.log('month_data', month_data);
        const max_value = max(month_data, (d) => {
            return d.total;
        });
        // Define day labels and axis
        const day_labels = timeDays(moment(this.selected.date).startOf('week').toDate(), moment(this.selected.date).endOf('week').toDate());
        const dayScale = scaleBand()
            .rangeRound([this.label_padding, this.height])
            .domain(day_labels.map((d) => {
            return moment.utc(d).weekday().toString();
        }));
        // Define week labels and axis
        const week_labels = [start_of_month];
        const incWeek = moment(start_of_month);
        while (incWeek.week() !== end_of_month.week()) {
            week_labels.push(moment(incWeek.add(1, 'week')));
        }
        month_data.forEach(d => {
            const summary = [];
            const group = this.groupBy(d.details, 'name');
            Object.keys(group).forEach(k => {
                summary.push({
                    name: k,
                    total: group[k].reduce((acc, o) => {
                        return acc + o.value;
                    }, 0),
                    color: group[k][0].color,
                    id: group[k][0].id,
                });
            });
            d.summary = summary;
        });
        const weekScale = scaleBand()
            .rangeRound([this.label_padding, this.width])
            .padding(0.05)
            .domain(week_labels.map((weekday) => {
            return weekday.week() + '';
        }));
        const color = scaleLinear()
            .range(['#ffffff', this.color])
            .domain([-0.15 * max_value, max_value]);
        // Add month data items to the overview
        this.items.selectAll('.item-block-month').remove();
        this.items.selectAll('.item-block-month')
            .data(month_data)
            .enter().append('rect')
            .style('opacity', 0)
            /*  .attr('transform', (d: any) => {
                return 'translate(' + weekScale(d.date.week().toString()) + ',' + ((dayScale(d.date.weekday().toString()) + dayScale.bandwidth() / 1.75) - 15) + ')';
              })*/
            .attr('class', 'item item-block-rect')
            .attr('y', (d) => {
            return this.calcItemY(d) + (this.item_size - this.calcItemSize(d, max_value)) / 2;
        })
            .attr('x', (d) => {
            return this.calcItemXMonth(d, start_of_month, weekScale(d.date.week().toString())) + (this.item_size - this.calcItemSize(d, max_value)) / 2;
        })
            .attr('rx', (d) => {
            return this.calcItemSize(d, max_value);
        })
            .attr('ry', (d) => {
            return this.calcItemSize(d, max_value);
        })
            .attr('width', (d) => {
            return this.calcItemSize(d, max_value);
        })
            .attr('height', (d) => {
            return this.calcItemSize(d, max_value);
        })
            .attr('fill', (d) => {
            return (d.total > 0) ? color(d.total) : 'transparent';
        })
            .on('click', (d) => {
            if (this.in_transition) {
                return;
            }
            // Don't transition if there is no data to show
            if (d.total === 0) {
                return;
            }
            this.in_transition = true;
            // Set selected date to the one clicked on
            this.selected = d;
            // Hide tooltip
            this.hideTooltip();
            // Remove all month overview related items and labels
            this.removeMonthOverview();
            // Redraw the chart
            this.overview = 'day';
            this.drawChart();
        })
            .on('mouseover', (d) => {
            if (this.in_transition) {
                return;
            }
            // Construct tooltip
            // Calculate tooltip position
            let x = weekScale(d.date.week().toString()) + this.tooltip_padding;
            while (this.width - x < (this.tooltip_width + this.tooltip_padding * 3)) {
                x -= 10;
            }
            const y = dayScale(d.date.weekday().toString()) + this.tooltip_padding;
            // Show tooltip
            this.tooltip.html(this.getTooltip(d))
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                .duration(this.transition_duration / 2)
                .ease(easeLinear)
                .style('opacity', 1);
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.hideTooltip();
        })
            .transition()
            .delay(() => {
            return (Math.cos(Math.PI * Math.random()) + 1) * this.transition_duration;
        })
            .duration(() => {
            return this.transition_duration;
        })
            .ease(easeLinear)
            .style('opacity', 1)
            .call((transition, callback) => {
            if (transition.empty()) {
                callback();
            }
            let n = 0;
            transition.each(() => {
                ++n;
            }).on('end', function () {
                if (!--n) {
                    callback.apply(this, arguments);
                }
            });
        }, () => {
            this.in_transition = false;
        });
        // Add week labels
        this.labels.selectAll('.label-week').remove();
        this.labels.selectAll('.label-week')
            .data(week_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-week')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return 'Week ' + d.week();
        })
            .attr('x', (d) => {
            return weekScale(d.week().toString());
        })
            .attr('y', this.label_padding / 2)
            .on('mouseenter', (weekday) => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block-month')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                return (moment.utc(d.date).week() === weekday.week) ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block-month')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 1);
        })
            .on('click', (d) => {
            if (this.in_transition) {
                return;
            }
            // Check week data
            const week_data = this.data.filter((e) => {
                return d.startOf('week') <= moment.utc(e.date) && moment.utc(e.date) < d.endOf('week');
            });
            // Don't transition if there is no data to show
            if (!week_data.length) {
                return;
            }
            this.in_transition = true;
            // Set selected month to the one clicked on
            this.selected = { date: d };
            // Hide tooltip
            this.hideTooltip();
            // Remove all year overview related items and labels
            this.removeMonthOverview();
            // Redraw the chart
            this.overview = 'week';
            this.drawChart();
        });
        // Add day labels
        this.labels.selectAll('.label-day').remove();
        this.labels.selectAll('.label-day')
            .data(day_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-day')
            .attr('x', this.label_padding / 3)
            .attr('y', (d, i) => {
            return dayScale(i) + dayScale.bandwidth() / 1.75;
        })
            .style('text-anchor', 'left')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return moment.utc(d).format('dddd')[0];
        })
            .on('mouseenter', (d) => {
            if (this.in_transition) {
                return;
            }
            const selected_day = moment.utc(d);
            this.items.selectAll('.item-block-month')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                return (moment.utc(d.date).day() === selected_day.day()) ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block-month')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 1);
        });
        // Add button to switch back to previous overview
        this.drawButton();
    }
    ;
    /**
     * Draw week overview
     */
    drawWeekOverview() {
        // Add current overview to the history
        if (this.history[this.history.length - 1] !== this.overview) {
            this.history.push(this.overview);
        }
        // Define beginning and end of the week
        const start_of_week = moment(this.selected.date).startOf('week');
        const end_of_week = moment(this.selected.date).endOf('week');
        // Filter data down to the selected week
        const week_data = this.data.filter((d) => {
            return moment(d.date).isBetween(start_of_week, end_of_week, null, '[]');
        });
        const max_value = max(week_data, (d) => {
            return max(d.summary, (d) => {
                return +d.value;
            });
        });
        // Define day labels and axis
        const day_labels = timeDays(moment.utc().startOf('week').toDate(), moment.utc().endOf('week').toDate());
        const dayScale = scaleBand()
            .rangeRound([this.label_padding, this.height])
            .domain(day_labels.map((d) => {
            return moment.utc(d).weekday().toString();
        }));
        // Define week labels and axis
        const week_labels = [start_of_week];
        const weekScale = scaleBand()
            .rangeRound([this.label_padding, this.width])
            .padding(0.01)
            .domain(week_labels.map((weekday) => {
            return weekday.weekday().toString();
        }));
        console.log('week_data', week_data);
        // Add week data items to the overview
        this.items.selectAll('.item-block-week').remove();
        const item_block = this.items.selectAll('.item-block-week')
            .data(week_data)
            .enter()
            .append('g')
            .attr('class', 'item item-block-week')
            .attr('width', () => {
            return (this.width - this.label_padding) / week_labels.length - this.gutter * 5;
        })
            .attr('height', () => {
            return Math.min(dayScale.bandwidth(), this.max_block_height);
        })
            .attr('transform', (d) => {
            return 'translate(' + weekScale(moment(d.date).week().toString()) + ',' + ((dayScale(moment(d.date).weekday().toString()) + dayScale.bandwidth() / 1.75) - 15) + ')';
        })
            .attr('total', (d) => {
            return d.total;
        })
            .attr('date', (d) => {
            return d.date;
        })
            .attr('offset', 0)
            .on('click', (d) => {
            if (this.in_transition) {
                return;
            }
            // Don't transition if there is no data to show
            if (d.total === 0) {
                return;
            }
            this.in_transition = true;
            // Set selected date to the one clicked on
            this.selected = d;
            // Hide tooltip
            this.hideTooltip();
            // Remove all week overview related items and labels
            this.removeWeekOverview();
            // Redraw the chart
            this.overview = 'day';
            this.drawChart();
        });
        const item_width = (this.width - this.label_padding) / week_labels.length - this.gutter * 5;
        const itemScale = scaleLinear().rangeRound([0, item_width]);
        const item_gutter = this.item_gutter;
        item_block.selectAll()
            .data((d) => {
            return d.summary;
        })
            .enter()
            .append('rect')
            .attr('class', 'item item-block-rect')
            .attr('x', function (d) {
            const total = parseInt(select(this.parentNode).attr('total'));
            const offset = parseInt(select(this.parentNode).attr('offset'));
            itemScale.domain([0, total]);
            select(this.parentNode).attr('offset', offset + itemScale(d.value));
            return offset;
        })
            .attr('width', function (d) {
            const total = parseInt(select(this.parentNode).attr('total'));
            itemScale.domain([0, total]);
            return Math.max((itemScale(d.value) - item_gutter), 1);
        })
            .attr('height', () => {
            return Math.min(dayScale.bandwidth(), this.max_block_height);
        })
            .attr('fill', (d) => {
            const color = scaleLinear()
                .range(['#ffffff', this.color])
                .domain([-0.15 * max_value, max_value]);
            return color(d.value) || '#ff4500';
        })
            .style('opacity', 0)
            .on('mouseover', (d) => {
            if (this.in_transition) {
                return;
            }
            // Get date from the parent node
            const date = new Date(select(event.currentTarget.parentNode).attr('date'));
            // Calculate tooltip position
            const total = parseInt(select(event.currentTarget.parentNode).attr('total'));
            itemScale.domain([0, total]);
            let x = parseInt(select(event.currentTarget).attr('x')) + this.tooltip_padding * 5;
            while (this.width - x < (this.tooltip_width + this.tooltip_padding * 3)) {
                x -= 10;
            }
            const y = dayScale(moment.utc(date).weekday().toString()) + this.tooltip_padding;
            // Show tooltip
            this.tooltip.html(this.getTooltip(d))
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                .duration(this.transition_duration / 2)
                .ease(easeLinear)
                .style('opacity', 1);
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.hideTooltip();
        })
            .transition()
            .delay(() => {
            return (Math.cos(Math.PI * Math.random()) + 1) * this.transition_duration;
        })
            .duration(() => {
            return this.transition_duration;
        })
            .ease(easeLinear)
            .style('opacity', 1)
            .call((transition, callback) => {
            if (transition.empty()) {
                callback();
            }
            let n = 0;
            transition
                .each(() => {
                ++n;
            })
                .on('end', function () {
                if (!--n) {
                    callback.apply(this, arguments);
                }
            });
        }, () => {
            this.in_transition = false;
        });
        // Add week labels
        this.labels.selectAll('.label-week').remove();
        this.labels.selectAll('.label-week')
            .data(week_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-week')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return 'Week ' + d.week;
        })
            .attr('x', (d) => {
            return weekScale(d.week);
        })
            .attr('y', this.label_padding / 2)
            .on('mouseenter', (weekday) => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block-week')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                return (moment.utc(d.date).week() === weekday.week) ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block-week')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 1);
        });
        // Add day labels
        this.labels.selectAll('.label-day').remove();
        this.labels.selectAll('.label-day')
            .data(day_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-day')
            .attr('x', this.label_padding / 3)
            .attr('y', (d, i) => {
            return dayScale((i).toString()) + dayScale.bandwidth() / 1.75;
        })
            .style('text-anchor', 'left')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return moment.utc(d).format('dddd')[0];
        })
            .on('mouseenter', (d) => {
            if (this.in_transition) {
                return;
            }
            const selected_day = moment.utc(d);
            this.items.selectAll('.item-block-week')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                return (moment.utc(d.date).day() === selected_day.day()) ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block-week')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 1);
        });
        // Add button to switch back to previous overview
        this.drawButton();
    }
    ;
    /**
     * Draw day overview
     */
    drawDayOverview() {
        // Add current overview to the history
        if (this.history[this.history.length - 1] !== this.overview) {
            this.history.push(this.overview);
        }
        // Initialize selected date to today if it was not set
        if (!Object.keys(this.selected).length) {
            this.selected = this.data[this.data.length - 1];
        }
        const project_labels = this.selected['summary'].map((project) => {
            return project.name;
        });
        const projectScale = scaleBand()
            .rangeRound([this.label_padding, this.height])
            .domain(project_labels);
        const itemScale = scaleTime()
            .range([this.label_padding * 2, this.width])
            .domain([moment.utc(this.selected['date']).startOf('day'), moment.utc(this.selected['date']).endOf('day')]);
        this.items.selectAll('.item-block').remove();
        this.items.selectAll('.item-block')
            .data(this.selected['details'])
            .enter()
            .append('rect')
            .attr('class', 'item item-block')
            .attr('x', (d) => {
            return itemScale(moment.utc(d.date));
        })
            .attr('y', (d) => {
            return ((projectScale(d.name) || 1) + projectScale.bandwidth() / 2) - 15;
        })
            .attr('width', (d) => {
            const end = itemScale(timeSecond.offset(moment.utc(d.date).toDate(), d.value));
            return Math.max((end - itemScale(moment.utc(d.date))), 1);
        })
            .attr('height', () => {
            return Math.min(projectScale.bandwidth(), this.max_block_height);
        })
            .attr('fill', () => {
            return this.color;
        })
            .style('opacity', 0)
            .on('mouseover', (d) => {
            if (this.in_transition) {
                return;
            }
            // Calculate tooltip position
            let x = d.value * 100 / (60 * 60 * 24) + itemScale(moment.utc(d.date));
            while (this.width - x < (this.tooltip_width + this.tooltip_padding * 3)) {
                x -= 10;
            }
            const y = projectScale(d.name) + this.tooltip_padding;
            // Show tooltip
            this.tooltip.html(this.getTooltip(d))
                .style('left', x + 'px')
                .style('top', y + 'px')
                .transition()
                .duration(this.transition_duration / 2)
                .ease(easeLinear)
                .style('opacity', 1);
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.hideTooltip();
        })
            .on('click', (d) => {
            if (this.handler) {
                this.handler.emit(d);
            }
        })
            .transition()
            .delay(() => {
            return (Math.cos(Math.PI * Math.random()) + 1) * this.transition_duration;
        })
            .duration(() => {
            return this.transition_duration;
        })
            .ease(easeLinear)
            .style('opacity', 0.5)
            .call((transition, callback) => {
            if (transition.empty()) {
                callback();
            }
            let n = 0;
            transition
                .each(() => {
                ++n;
            })
                .on('end', function () {
                if (!--n) {
                    callback.apply(this, arguments);
                }
            });
        }, () => {
            this.in_transition = false;
        });
        // Add time labels
        const timeLabels = timeHours(moment.utc(this.selected['date']).startOf('day').toDate(), moment.utc(this.selected['date']).endOf('day').toDate());
        const timeScale = scaleTime()
            .range([this.label_padding * 2, this.width])
            .domain([0, timeLabels.length]);
        this.labels.selectAll('.label-time').remove();
        this.labels.selectAll('.label-time')
            .data(timeLabels)
            .enter()
            .append('text')
            .attr('class', 'label label-time')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return moment.utc(d).format('HH:mm');
        })
            .attr('x', (d, i) => {
            return timeScale(i);
        })
            .attr('y', this.label_padding / 2)
            .on('mouseenter', (d) => {
            if (this.in_transition) {
                return;
            }
            const selected = itemScale(moment.utc(d));
            this.items.selectAll('.item-block')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                const start = itemScale(moment.utc(d.date));
                const end = itemScale(moment.utc(d.date).add(d.value, 'seconds'));
                return (selected >= start && selected <= end) ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 0.5);
        });
        // Add project labels
        const label_padding = this.label_padding;
        this.labels.selectAll('.label-project').remove();
        this.labels.selectAll('.label-project')
            .data(project_labels)
            .enter()
            .append('text')
            .attr('class', 'label label-project')
            .attr('x', this.gutter)
            .attr('y', (d) => {
            return projectScale(d) + projectScale.bandwidth() / 2;
        })
            .attr('min-height', () => {
            return projectScale.bandwidth();
        })
            .style('text-anchor', 'left')
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .text((d) => {
            return d;
        })
            .each(function () {
            const obj = select(this);
            let text_length = obj.node().getComputedTextLength(), text = obj.text();
            while (text_length > (label_padding * 1.5) && text.length > 0) {
                text = text.slice(0, -1);
                obj.text(text + '...');
                text_length = obj.node().getComputedTextLength();
            }
        })
            .on('mouseenter', (project) => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', (d) => {
                return (d.name === project) ? 1 : 0.1;
            });
        })
            .on('mouseout', () => {
            if (this.in_transition) {
                return;
            }
            this.items.selectAll('.item-block')
                .transition()
                .duration(this.transition_duration)
                .ease(easeLinear)
                .style('opacity', 0.5);
        });
        // Add button to switch back to previous overview
        this.drawButton();
    }
    /**
     * Helper function to calculate item position on the x-axis
     *
     * @param d
     * @param {moment.Moment} start_of_year
     * @returns {number}
     */
    calcItemX(d, start_of_year) {
        const dayIndex = Math.round((+moment(d.date) - +start_of_year.startOf('week')) / 86400000);
        const colIndex = Math.trunc(dayIndex / 7);
        return colIndex * (this.item_size + this.gutter) + this.label_padding;
    }
    ;
    calcItemXMonth(d, start, offset) {
        const hourIndex = moment(d.date).hours();
        const colIndex = Math.trunc(hourIndex / 3);
        console.log('calcItemXMonth', hourIndex, colIndex);
        return colIndex * (this.item_size + this.gutter) + offset;
    }
    ;
    calcDayX(d, start) {
        const hourIndex = moment(d.date).hour();
        const colIndex = Math.trunc(hourIndex / 8);
        return colIndex * (this.item_size + this.gutter) + this.label_padding;
    }
    ;
    /**
     * Helper function to calculate item position on the y-axis
     * @param d object
     */
    calcItemY(d) {
        return this.label_padding + moment.utc(d.date).weekday() * (this.item_size + this.gutter);
    }
    ;
    /**
     * Helper function to calculate item size
     * @param d object
     * @param max number
     */
    calcItemSize(d, max) {
        if (max <= 0) {
            return this.item_size;
        }
        return this.item_size * 0.75 + (this.item_size * d.total / max) * 0.25;
    }
    ;
    /**
     * Draw the button for navigation purposes
     */
    drawButton() {
        this.buttons.selectAll('.button').remove();
        const button = this.buttons.append('g')
            .attr('class', 'button button-back')
            .style('opacity', 0)
            .on('click', () => {
            if (this.in_transition) {
                return;
            }
            // Set transition boolean
            this.in_transition = true;
            // Clean the canvas from whichever overview type was on
            if (this.overview === 'year') {
                this.removeYearOverview();
            }
            else if (this.overview === 'month') {
                this.removeMonthOverview();
            }
            else if (this.overview === 'week') {
                this.removeWeekOverview();
            }
            else if (this.overview === 'day') {
                this.removeDayOverview();
            }
            // Redraw the chart
            this.history.pop();
            this.overview = this.history.pop();
            this.drawChart();
        });
        button.append('circle')
            .attr('cx', this.label_padding / 2.25)
            .attr('cy', this.label_padding / 2.5)
            .attr('r', this.item_size / 2);
        button.append('text')
            .attr('x', this.label_padding / 2.25)
            .attr('y', this.label_padding / 2.5)
            .attr('dy', () => {
            return Math.floor(this.width / 100) / 3;
        })
            .attr('font-size', () => {
            return Math.floor(this.label_padding / 3) + 'px';
        })
            .html('&#x2190;');
        button.transition()
            .duration(this.transition_duration)
            .ease(easeLinear)
            .style('opacity', 1);
    }
    ;
    /**
     * Transition and remove items and labels related to global overview
     */
    removeGlobalOverview() {
        this.items.selectAll('.item-block-year')
            .transition()
            .duration(this.transition_duration)
            .ease(easeLinear)
            .style('opacity', 0)
            .remove();
        this.labels.selectAll('.label-year').remove();
    }
    ;
    /**
     * Transition and remove items and labels related to year overview
     */
    removeYearOverview() {
        this.items.selectAll('.item-circle')
            .transition()
            .duration(this.transition_duration)
            .ease(easeLinear)
            .style('opacity', 0)
            .remove();
        this.labels.selectAll('.label-day').remove();
        this.labels.selectAll('.label-month').remove();
        this.hideBackButton();
    }
    ;
    /**
     * Transition and remove items and labels related to month overview
     */
    removeMonthOverview() {
        this.items.selectAll('.item-block-rect')
            .transition()
            .duration(this.transition_duration)
            .ease(easeLinear)
            .style('opacity', 0)
            .remove();
        this.labels.selectAll('.label-day').remove();
        this.labels.selectAll('.label-week').remove();
        this.hideBackButton();
    }
    ;
    /**
     * Transition and remove items and labels related to week overview
     */
    removeWeekOverview() {
        this.items.selectAll('.item-block-rect')
            .transition()
            .duration(this.transition_duration)
            .ease(easeLinear)
            .style('opacity', 0)
            .attr('x', (d, i) => {
            return (i % 2 === 0) ? -this.width / 3 : this.width / 3;
        })
            .remove();
        this.labels.selectAll('.label-day').remove();
        this.labels.selectAll('.label-week').remove();
        this.hideBackButton();
    }
    ;
    /**
     * Transition and remove items and labels related to daily overview
     */
    removeDayOverview() {
        this.items.selectAll('.item-block')
            .transition()
            .duration(this.transition_duration)
            .ease(easeLinear)
            .style('opacity', 0)
            .attr('x', (d, i) => {
            return (i % 2 === 0) ? -this.width / 3 : this.width / 3;
        })
            .remove();
        this.labels.selectAll('.label-time').remove();
        this.labels.selectAll('.label-project').remove();
        this.hideBackButton();
    }
    ;
    /**
     * Helper function to hide the tooltip
     */
    hideTooltip() {
        this.tooltip.transition()
            .duration(this.transition_duration / 2)
            .ease(easeLinear)
            .style('opacity', 0);
    }
    ;
    /**
     * Helper function to hide the back button
     */
    hideBackButton() {
        this.buttons.selectAll('.button')
            .transition()
            .duration(this.transition_duration)
            .ease(easeLinear)
            .style('opacity', 0)
            .remove();
    }
    ;
    /**
     * Helper function to convert seconds to a human readable format
     * @param seconds Integer
     */
    static formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - (hours * 3600)) / 60);
        let time = '';
        if (hours > 0) {
            time += hours === 1 ? '1 hour ' : hours + ' hours ';
        }
        if (minutes > 0) {
            time += minutes === 1 ? '1 minute' : minutes + ' minutes';
        }
        if (hours === 0 && minutes === 0) {
            time = Math.round(seconds) + ' seconds';
        }
        return time;
    }
    ;
    componentDidLoad() {
        const element = this.el.shadowRoot.querySelector('#' + this.uuid);
        // Initialize svg element
        this.svg = select(element).append('svg').attr('class', 'svg');
        // Initialize main svg elements
        this.items = this.svg.append('g');
        this.labels = this.svg.append('g');
        this.buttons = this.svg.append('g');
        // Add tooltip to the same element as main svg
        this.tooltip = select(element).append('div').attr('class', 'heatmap-tooltip').style('opacity', 0);
        // Calculate chart dimensions
        this.calculateDimensions();
        // Draw the chart
        this.drawChart();
    }
    render() {
        return h("div", { id: this.uuid });
    }
    getTooltip(d) {
        let tooltip_html = '<div class="header"><strong>' + d.date.format('dddd, MMM Do YYYY') + '</strong></div><ul>';
        d.summary.forEach(s => {
            tooltip_html += '<li><div class="round" style="background-color:' +
                ColorLib.transparentize(s.color, 0.7) + '; border-color:' + s.color + '" /> ' +
                CalendarHeatmap.formatLabel(s.name) + ': ' + s.total + '</li>';
        });
        tooltip_html += '</ul>';
        return tooltip_html;
    }
    static formatLabel(data) {
        const serializedGTS = data.split('{');
        let display = `<span class="gtsInfo"><span class='gts-classname'>${serializedGTS[0]}</span>`;
        if (serializedGTS.length > 1) {
            display += `<span class='gts-separator'>{</span>`;
            const labels = serializedGTS[1].substr(0, serializedGTS[1].length - 1).split(',');
            if (labels.length > 0) {
                labels.forEach((l, i) => {
                    const label = l.split('=');
                    if (l.length > 1) {
                        display += `<span><span class='gts-labelname'>${label[0]}</span><span class='gts-separator'>=</span><span class='gts-labelvalue'>${label[1]}</span>`;
                        if (i !== labels.length - 1) {
                            display += `<span>, </span>`;
                        }
                    }
                });
            }
            display += `<span class='gts-separator'>}</span>`;
        }
        if (serializedGTS.length > 2) {
            display += `<span class='gts-separator'>{</span>`;
            const labels = serializedGTS[2].substr(0, serializedGTS[2].length - 1).split(',');
            if (labels.length > 0) {
                labels.forEach((l, i) => {
                    const label = l.split('=');
                    if (l.length > 1) {
                        display += `<span><span class='gts-attrname'>${label[0]}</span><span class='gts-separator'>=</span><span class='gts-attrvalue'>${label[1]}</span>`;
                        if (i !== labels.length - 1) {
                            display += `<span>, </span>`;
                        }
                    }
                });
            }
            display += `<span class='gts-separator'>}</span>`;
        }
        display += '</span>';
        return display;
    }
    static get is() { return "calendar-heatmap"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "data": {
            "type": "Any",
            "attr": "data",
            "watchCallbacks": ["onData"]
        },
        "el": {
            "elementRef": true
        },
        "overview": {
            "type": String,
            "attr": "overview",
            "mutable": true
        }
    }; }
    static get events() { return [{
            "name": "handler",
            "method": "handler",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onChange",
            "method": "onChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "window:resize",
            "method": "onResize",
            "passive": true
        }]; }
    static get style() { return "/**style-placeholder:calendar-heatmap:**/"; }
}
