// Initialize the base map layer (OpenStreetMap)
const topoLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    title: 'Topographic',
    visible: true
});

// Load GeoJSON layer for waterbody
var waterbody = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'WATERBODY.geojson',  // Path to your GeoJSON file
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    })
});

// Load GeoJSON layer for cadastre
var cadastre = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'CADASTRAL.geojson',  // Path to your GeoJSON file
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(211, 211, 211, 1)',  // Faint gray color (light gray)
            width: 0.8                          // Width of the boundary line
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 0, 0)'  // Transparent fill
        })
    })
});

// Load GeoJSON layer for village boundary
var vb = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'VILLAGE BOUNDARY.geojson',  // Path to your GeoJSON file
        format: new ol.format.GeoJSON()
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',                // Color of the boundary
            width: 2,                      // Width of the boundary line
            lineDash: [8, 5]             // Dotted line pattern (10px dash, 10px gap)
        })
    })
});

// Initialize the map
const map = new ol.Map({
    target: 'map',  // Target div element
    layers: [
        topoLayer,    // Base Layer
        waterbody,
        cadastre,    // GeoJSON Layer for waterbodies
        vb            // GeoJSON Layer for village boundary
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([74.99, 17.11]), // Set the initial map center [longitude, latitude]
        zoom: 14 // Set the initial zoom level
    })
});

// Optional: Add custom controls or interactions
// Example: Zoom to the extent of the waterbody layer
map.once('postrender', function() {
    const source = waterbody.getSource();
    const extent = source.getExtent();

    // Check if the extent is valid (not empty)
    if (extent && extent[0] !== Infinity && extent[1] !== Infinity && extent[2] !== -Infinity && extent[3] !== -Infinity) {
        map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
    } else {
        console.warn('Invalid extent for waterbody layer');
    }
});
