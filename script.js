// Define WMS layers
var waterBodyLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://192.168.43.9:8085/geoserver/dhalgaon/wms',
        params: { "LAYERS": 'dhalgaon:water_body', 'TILED': true },
        serverType: 'geoserver'
    }),
    visible: true
});

var cadastralLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://192.168.43.9:8085/geoserver/dhalgaon/wms',
        params: { "LAYERS": 'dhalgaon:cadastral', 'TILED': true },
        serverType: 'geoserver'
    }),
    visible: true
});

var villageBoundaryLayer = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://192.168.43.9:8085/geoserver/dhalgaon/wms',
        params: { "LAYERS": 'dhalgaon:village_boundary', 'TILED': true },
        serverType: 'geoserver'
    }),
    visible: true
});



// Layer visibility toggle (check if elements exist before adding events)
var waterBodyCheckbox = document.getElementById('waterBody');
if (waterBodyCheckbox) {
    waterBodyCheckbox.addEventListener('change', function () {
        waterBodyLayer.setVisible(this.checked);
    });
}

var cadastralCheckbox = document.getElementById('cadastral');
if (cadastralCheckbox) {
    cadastralCheckbox.addEventListener('change', function () {
        cadastralLayer.setVisible(this.checked);
    });
}

var villageBoundaryCheckbox = document.getElementById('villageBoundary');
if (villageBoundaryCheckbox) {
    villageBoundaryCheckbox.addEventListener('change', function () {
        villageBoundaryLayer.setVisible(this.checked);
    });
}

// Initialize map
var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({ source: new ol.source.OSM() }), // Base map
        waterBodyLayer,
        cadastralLayer,
        villageBoundaryLayer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([74.9881, 17.1160]), // Change to your area
        zoom: 14
    })
});
// Initialize Scale Control
var scaleControl = new ol.control.ScaleLine({
    units: 'metric', 
    target: document.getElementById('scaleBar') // Attach scale bar to custom div
});
map.addControl(scaleControl);

