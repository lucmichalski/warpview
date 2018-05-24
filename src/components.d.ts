/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface QuantumBubble {
      'chartTitle': string;
      'data': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'unit': string;
    }
  }

  interface HTMLQuantumBubbleElement extends StencilComponents.QuantumBubble, HTMLStencilElement {}

  var HTMLQuantumBubbleElement: {
    prototype: HTMLQuantumBubbleElement;
    new (): HTMLQuantumBubbleElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-bubble': HTMLQuantumBubbleElement;
  }
  interface ElementTagNameMap {
    'quantum-bubble': HTMLQuantumBubbleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-bubble': JSXElements.QuantumBubbleAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumBubbleAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'unit'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumChart {
      'chartTitle': string;
      'data': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'type': string;
      'unit': string;
    }
  }

  interface HTMLQuantumChartElement extends StencilComponents.QuantumChart, HTMLStencilElement {}

  var HTMLQuantumChartElement: {
    prototype: HTMLQuantumChartElement;
    new (): HTMLQuantumChartElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-chart': HTMLQuantumChartElement;
  }
  interface ElementTagNameMap {
    'quantum-chart': HTMLQuantumChartElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-chart': JSXElements.QuantumChartAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumChartAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'type'?: string;
      'unit'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumEditor {
      'config': string;
      'theme': string;
      'url': string;
      'warpscript': string;
    }
  }

  interface HTMLQuantumEditorElement extends StencilComponents.QuantumEditor, HTMLStencilElement {}

  var HTMLQuantumEditorElement: {
    prototype: HTMLQuantumEditorElement;
    new (): HTMLQuantumEditorElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-editor': HTMLQuantumEditorElement;
  }
  interface ElementTagNameMap {
    'quantum-editor': HTMLQuantumEditorElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-editor': JSXElements.QuantumEditorAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumEditorAttributes extends HTMLAttributes {
      'config'?: string;
      'onWarpscriptChanged'?: (event: CustomEvent) => void;
      'onWarpscriptResult'?: (event: CustomEvent) => void;
      'theme'?: string;
      'url'?: string;
      'warpscript'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumPie {
      'chartTitle': string;
      'data': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'type': string;
      'unit': string;
    }
  }

  interface HTMLQuantumPieElement extends StencilComponents.QuantumPie, HTMLStencilElement {}

  var HTMLQuantumPieElement: {
    prototype: HTMLQuantumPieElement;
    new (): HTMLQuantumPieElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-pie': HTMLQuantumPieElement;
  }
  interface ElementTagNameMap {
    'quantum-pie': HTMLQuantumPieElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-pie': JSXElements.QuantumPieAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumPieAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'type'?: string;
      'unit'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumPolar {
      'chartTitle': string;
      'data': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'type': string;
      'unit': string;
    }
  }

  interface HTMLQuantumPolarElement extends StencilComponents.QuantumPolar, HTMLStencilElement {}

  var HTMLQuantumPolarElement: {
    prototype: HTMLQuantumPolarElement;
    new (): HTMLQuantumPolarElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-polar': HTMLQuantumPolarElement;
  }
  interface ElementTagNameMap {
    'quantum-polar': HTMLQuantumPolarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-polar': JSXElements.QuantumPolarAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumPolarAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'type'?: string;
      'unit'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumResult {
      'config': string;
      'result': any;
      'theme': string;
    }
  }

  interface HTMLQuantumResultElement extends StencilComponents.QuantumResult, HTMLStencilElement {}

  var HTMLQuantumResultElement: {
    prototype: HTMLQuantumResultElement;
    new (): HTMLQuantumResultElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-result': HTMLQuantumResultElement;
  }
  interface ElementTagNameMap {
    'quantum-result': HTMLQuantumResultElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-result': JSXElements.QuantumResultAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumResultAttributes extends HTMLAttributes {
      'config'?: string;
      'result'?: any;
      'theme'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumScatter {
      'chartTitle': string;
      'data': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'unit': string;
    }
  }

  interface HTMLQuantumScatterElement extends StencilComponents.QuantumScatter, HTMLStencilElement {}

  var HTMLQuantumScatterElement: {
    prototype: HTMLQuantumScatterElement;
    new (): HTMLQuantumScatterElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-scatter': HTMLQuantumScatterElement;
  }
  interface ElementTagNameMap {
    'quantum-scatter': HTMLQuantumScatterElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-scatter': JSXElements.QuantumScatterAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumScatterAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'unit'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumTile {
      'chartTitle': string;
      'responsive': boolean;
      'showLegend': boolean;
      'type': string;
      'unit': string;
      'url': string;
    }
  }

  interface HTMLQuantumTileElement extends StencilComponents.QuantumTile, HTMLStencilElement {}

  var HTMLQuantumTileElement: {
    prototype: HTMLQuantumTileElement;
    new (): HTMLQuantumTileElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-tile': HTMLQuantumTileElement;
  }
  interface ElementTagNameMap {
    'quantum-tile': HTMLQuantumTileElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-tile': JSXElements.QuantumTileAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumTileAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'type'?: string;
      'unit'?: string;
      'url'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
