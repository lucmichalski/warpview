import '../../stencil.core';
import { Param } from "../../model/param";
import { DataModel } from "../../model/dataModel";
export declare class WarpViewRadar {
    responsive: boolean;
    showLegend: boolean;
    data: DataModel | any[] | string;
    options: Param;
    width: string;
    height: string;
    debug: boolean;
    el: HTMLElement;
    private LOG;
    private _options;
    private uuid;
    private _chart;
    private resizeTimer;
    private parentWidth;
    private parentHeight;
    onResize(): void;
    private onData;
    private onOptions;
    private parseData;
    private drawChart;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
