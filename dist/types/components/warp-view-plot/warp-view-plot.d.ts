import '../../stencil.core';
import { DataModel } from "../../model/dataModel";
import { Param } from "../../model/param";
import { GTS } from "../../model/GTS";
export declare class WarpViewPlot {
    el: HTMLElement;
    data: string | GTS[] | DataModel;
    options: string | Param;
    width: string;
    height: string;
    responsive: boolean;
    showLegend: boolean;
    gtsFilter: string;
    debug: boolean;
    private _options;
    private _data;
    private _toHide;
    private _timeMin;
    private _timeMax;
    showChart: boolean;
    showMap: boolean;
    chartType: string;
    timeClipValue: string;
    private LOG;
    private line;
    private main;
    private chart;
    private annotation;
    private modal;
    private timeClip;
    private warpViewChart;
    private filterInput;
    private timeClipElement;
    private mouseOutTimer;
    private graphId;
    componentDidLoad(): void;
    getTimeClip(): Promise<[number, number]>;
    private onGtsFilter;
    private onData;
    private onOptions;
    handleKeyUp(ev: KeyboardEvent): boolean;
    stateChange(event: CustomEvent): void;
    boundsDidChange(event: CustomEvent): void;
    onResize(event: CustomEvent): void;
    warpViewSelectedGTS(event: CustomEvent): void;
    private handleMouseMove;
    private handleMouseOut;
    private drawCharts;
    private applyFilter;
    componentWillLoad(): void;
    render(): JSX.Element;
}
