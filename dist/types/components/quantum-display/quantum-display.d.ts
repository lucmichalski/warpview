import '../../stencil.core';
import { Param } from "../../model/param";
import { DataModel } from "../../model/dataModel";
/**
 * Display component
 */
export declare class QuantumDisplay {
    unit: string;
    displayTitle: string;
    responsive: boolean;
    data: DataModel | any[] | string | number;
    options: Param;
    width: string;
    height: string;
    el: HTMLElement;
    private LOG;
    private toDisplay;
    private _options;
    private onData;
    private onOptions;
    private drawChart;
    private getStyle;
    componentDidLoad(): void;
    render(): JSX.Element;
}
