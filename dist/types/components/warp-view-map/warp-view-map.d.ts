import '../../stencil.core';
import 'leaflet.heat';
import 'leaflet.markercluster';
export declare class WarpViewMap {
    width: number;
    height: number;
    responsive: boolean;
    data: any;
    heatData: any[];
    options: any;
    hiddenData: number[];
    debug: boolean;
    el: HTMLElement;
    private _options;
    private mapTypes;
    private _map;
    private uuid;
    private LOG;
    private polylinesBeforeCurrentValue;
    private polylinesAfterCurrentValue;
    private currentValuesMarkers;
    private annotationsMarkers;
    private positionArraysMarkers;
    private _iconAnchor;
    private _popupAnchor;
    private _heatLayer;
    private resizeTimer;
    private pathData;
    private annotationsData;
    private positionData;
    private tiles;
    private static DEFAULT_HEIGHT;
    private static DEFAULT_WIDTH;
    private parentWidth;
    private mapElement;
    private parentHeight;
    onResize(): void;
    private onHideData;
    private onData;
    private onOptions;
    heatRadiusDidChange(event: any): void;
    heatBlurDidChange(event: any): void;
    heatOpacityDidChange(event: any): void;
    private drawMap;
    private icon;
    private displayMap;
    private updateGtsPath;
    private updatePositionArray;
    /**
     *
     * @returns {Promise<boolean>}
     */
    resize(): Promise<boolean>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    render(): JSX.Element;
}
