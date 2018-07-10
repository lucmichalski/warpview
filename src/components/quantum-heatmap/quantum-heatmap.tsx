import {Component, Element, Prop} from '@stencil/core';

import Leaflet/*, { geoJSON }*/ from 'leaflet';
import 'leaflet.heat';
import {GTSLib} from "../../gts.lib";
//import { GeoJsonObject } from 'geojson';


@Component({
  tag: 'quantum-heatmap',
  styleUrls: [
    '../../../node_modules/leaflet/dist/leaflet.css',
    'quantum-heatmap.scss'
  ],
  shadow: true
})

export class QuantumHeatmap {

  @Prop() mapTitle: string = "";
  @Prop() width: number;
  @Prop() height: number;
  @Prop() responsive: boolean = false;
  @Prop() data: string = "[]";
  @Prop() startLat: number;
  @Prop() startLong: number;
  @Prop() startZoom: number;

  @Prop() heatRadius: number;
  @Prop() heatBlur: number;
  @Prop() heatOpacity: number;
  @Prop() heatData: string= "[]";
  @Element() el: HTMLElement;

  private _map;
  private _token = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  private _pathStyle = {
    weight: 5,
    opacity: 0.65
  }
  private _dotStyle = {
    radius: 8,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }
  private _iconAnchor: Leaflet.PointExpression = [20, 52];
  private _popupAnchor: Leaflet.PointExpression = [0, -50];
  

  drawMap() {
    let ctx = this.el.shadowRoot.querySelector('#mymap');
    this._map = Leaflet.map(ctx as HTMLElement).setView([this.startLat, this.startLong], this.startZoom);
    
    Leaflet.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + this._token, {
      maxZoom: 23,
      id: 'mapbox.streets'
    }).addTo(this._map);

    let geoData = this.gtsToGeoJSON(JSON.parse(this.data));
    geoData.forEach(d => {
      d.addTo(this._map)
    });

    var heat = Leaflet.heatLayer(JSON.parse(this.heatData),
      {radius: this.heatRadius,
      blur: this.heatBlur,
      minOpacity: this.heatOpacity
      });
    heat.addTo(this._map);
  }

  icon(color, marker = ""){
    let c = "+" + color.slice(1);
    let m = marker !== ""
      ? "-" + marker
      : "";
    return Leaflet.icon({
      iconUrl: 'https://api.mapbox.com/v4/marker/pin-s' + m + c + '@2x.png?access_token=' + this._token,
      iconAnchor: this._iconAnchor,
      popupAnchor: this._popupAnchor
    });
  }

  gtsToGeoJSON(data){
    let geoData = [];
    data.forEach(d => {
      d.gts.forEach((g, i) => {
        let key = d.params[i].key.toLowerCase();

        switch(key){/*
          case 'path':
            let path = {
              'type': 'LineString',
              'properties': {
                'color': !! d.params[i].color
                ? d.params[i].color
                : GTSLib.getColor(i),
                "weight": this._pathStyle.weight,
                "opacity": this._pathStyle.opacity,
                'popupContent': d.params[i].legend
              },
              'coordinates': []
            };
            g.v.forEach(p => {
              path.coordinates.push([p[2], p[1]]);
            });
            geoData.push(Leaflet.geoJSON(path, {
              style: path.properties,
              onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.popupContent);
              }
            }));
            break;*/

          case 'point':
            let point = {} as any;
            if(!! g.positions){
              g.positions.forEach(p => {
                point = {
                  'type': 'Feature',
                  'properties': {
                    'style': {
                      'color': !! d.params[i].color
                        ? d.params[i].color
                        : GTSLib.getColor(i)
                    },
                    'popupContent': 'lat : ' + p[0] + '<br/>long : ' + p[1]
                  },
                  'geometry':{
                    'type': 'Point',
                    'coordinates': [p[1], p[0]]
                  }
                };

                if(d.params[i].render === 'dot'){
                  point.properties.style.radius = d.params[i].radius
                    ? d.params[i].radius
                    : this._dotStyle.radius;
                  point.properties.style.weight = !! d.params[i].weight
                    ? d.params[i].weight
                    : this._dotStyle.weight;
                  point.properties.style.opacity = !! d.params[i].opacity
                    ? d.params[i].opacity
                    : this._dotStyle.opacity;
                  point.properties.style.fillOpacity = !! d.params[i].fillOpacity
                    ? d.params[i].fillOpacity
                    : this._dotStyle.fillOpacity;
                  point.properties.style.fillColor = !! d.params[i].fillColor
                    ? d.params[i].fillColor
                    : GTSLib.getColor(i);

                }else{
                  point.properties.icon = this.icon(point.properties.style.color, d.params[i].marker);
                }
                if(p.length === 4){
                  point.properties.popupContent += "<br/>alt : " + p[2] + "<br/>value : " + p[3];
                }else if(p.length === 3){
                  point.properties.popupContent += "<br/>value : " + p[2];
                }
                if(d.params[i].render === 'dot'){
                  geoData.push(Leaflet.geoJSON(point, {
                    pointToLayer: function (feature, latlng) {
                      return Leaflet.circleMarker(latlng, feature.properties.style);
                    },
                    onEachFeature: function (feature, layer) {
                      layer.bindPopup(feature.properties.popupContent);
                    }
                  }));
                }else{
                  geoData.push(Leaflet.geoJSON(point, {
                    pointToLayer: function (feature, latlng) {
                      return Leaflet.marker(latlng, {icon: feature.properties.icon});
                    },
                    onEachFeature: function (feature, layer) {
                      layer.bindPopup(feature.properties.popupContent);
                    }
                  }));
                }
              });

            }else{
              g.v.forEach(p => {
                point = {
                  'type': 'Feature',
                  'properties': {
                    'style': {
                      'color': !! d.params[i].color
                        ? d.params[i].color
                        : GTSLib.getColor(i),
                    },
                    'value': p[p.lenght-1],
                    'popupContent':  'timestamp : ' + p[0] + '<br/>date : '+ new Date(p[0]) + '<br/>lat : ' + p[1] + '<br/>long : ' + p[2]
                  },
                  'geometry': {
                    'type': 'Point',
                    'coordinates': [p[2], p[1]]
                  }
                }

                if(d.params[i].render === 'dot'){
                  point.properties.style.radius = !! d.params[i].radius
                    ? d.params[i].radius
                    : this._dotStyle.radius;
                  point.properties.style.weight = !! d.params[i].weight
                    ? d.params[i].weight
                    : this._dotStyle.weight;
                  point.properties.style.opacity = !! d.params[i].opacity
                    ? d.params[i].opacity
                    : this._dotStyle.opacity;
                  point.properties.style.fillOpacity = !! d.params[i].fillOpacity
                    ? d.params[i].fillOpacity
                    : this._dotStyle.fillOpacity;
                  point.properties.style.fillColor = !! d.params[i].fillColor
                    ? d.params[i].fillColor
                    : GTSLib.getColor(i);

                }else{
                  point.properties.icon = this.icon(point.properties.style.color, d.params[i].marker);
                }

                if(p.length === 5){
                  point.properties.popupContent += "<br/>alt : " + p[3] + "<br/>value : " + p[4];
                }else if(p.length === 4){
                  point.properties.popupContent += "<br/>value : " + p[3];
                }
                if(d.params[i].render === 'dot'){
                  geoData.push(Leaflet.geoJSON(point, {
                    pointToLayer: function (feature, latlng) {
                      return Leaflet.circleMarker(latlng, feature.properties.style);
                    },
                    onEachFeature: function (feature, layer) {
                      layer.bindPopup(feature.properties.popupContent);
                    }
                  }));
                }else{
                  geoData.push(Leaflet.geoJSON(point, {
                    pointToLayer: function (feature, latlng) {
                      return Leaflet.marker(latlng, {icon: feature.properties.icon});
                    },
                    onEachFeature: function (feature, layer) {
                      layer.bindPopup(feature.properties.popupContent);
                    }
                  }));
                }
              });
            }
            
            break;
        }
      });
    });
    return geoData;
  }


  componentDidLoad() {
    this.drawMap();
  }

  render() {
    return (
      <div>
        <h1>{this.mapTitle}</h1>
        <div class="map-container">
          <div id="mymap" style={ {'width': '100%', 'height': '800px' }} />
        </div>
      </div>
    );
  }
}
