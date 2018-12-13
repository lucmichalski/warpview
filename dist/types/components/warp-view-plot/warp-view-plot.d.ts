import '../../stencil.core';
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
    private _options;
    private _data;
    private _toHide;
    private _timeMin;
    private _timeMax;
    showChart: boolean;
    showMap: boolean;
    chartType: string;
    private LOG;
    private line;
    private main;
    private chart;
    private annotation;
    private mouseOutTimer;
    private graphId;
    componentDidLoad(): void;
    private onGtsFilter;
    private onData;
    private onOptions;
    stateChange(event: CustomEvent): void;
    boundsDidChange(event: CustomEvent): void;
    private handleMouseMove;
    private handleMouseOut;
    onResize(event: CustomEvent): void;
    warpViewSelectedGTS(event: CustomEvent): void;
    private drawCharts;
    render(): JSX.Element;
}
