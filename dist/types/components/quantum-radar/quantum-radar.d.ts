import '../../stencil.core';
export declare class QuantumRadar {
    unit: string;
    chartTitle: string;
    responsive: boolean;
    showLegend: boolean;
    data: string;
    options: string;
    theme: string;
    width: string;
    height: string;
    el: HTMLElement;
    private LOG;
    private _options;
    private uuid;
    private onData;
    private onOptions;
    private onTheme;
    private parseData;
    private drawChart;
    componentDidLoad(): void;
    render(): JSX.Element;
}
