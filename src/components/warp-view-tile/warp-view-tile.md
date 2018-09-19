# Tile view

Execute WarpScript against a Warp 10 instance and display result according to a graph type; 

Example :

```html
 <warp-view-tile 
  url="https://warp.cityzendata.net/api/v0/exec" 
  responsive="true" 
  unit="°C" 
  type="text"
  chart-title="Text">
  { 'data' 42 'globalParams' { 'bgColor' 'darkblue' 'fontColor' 'cyan' } }
</warp-view-tile>
```

## CSS vars
 
- --warp-view-tile-height : Height
- --warp-view-tile-width : Width

## Attributes

| Name | Type | Default | Description |
|------|------|---------|-------------|
| data | `object` | | Serialized JSON representation of data to display, according to the chart type |
| options | `object` | | Serialized JSON representation of display options |
| unit | `string` | '' | Unit used |
| unit | `type` | 'line' | Chart type, possible value are are: 'line', 'scatter', 'step', 'area', 'bubble', 'pie', 'gauge', 'doughnut', 'polar', 'radar', 'bar', 'text', 'image', 'plot'  |
| chartTitle | `string` | '' | Main title |
| showLegend | `boolean` | true | Shows a legend |
| responsive | `boolean` | false | Fit the parent space |
| url | `string` | | URL of the Warp 10 endpoint |

## Data format


```json
{
  "data": [{
    "c": "class.name", 
    "l": { "label1": "label value"},  
    "a": { "attribute1": "attribute value"},
    "v" : [[0,0,0,true], [0,"a"]]
   }]
}
```

or 

```json
{
  "data": [["key", 54], ["key 2", 45]]
}
```

- **data**: data to be displayed as a GTS list.

## Events

### warp-viewSelectedGTS

```json
{
  "selected": true,
  "gts": {
   "c": "class.name", 
   "l": { "label1": "label value"},  
   "a": { "attribute1": "attribute value"},
   "v" : [[0,0,0,true], [0,"a"]]
  },
  "label": "class.name{label1=label value}"
}

``` 