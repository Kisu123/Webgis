// --- Basemaps ---
const osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible: true,
  title: 'OSM'
});

const esriHybridLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  }),
  visible: false,
  title: 'ESRIHybrid'
});

// --- Vector Layers ---
const waterbody = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'WATERBODY.geojson',
    format: new ol.format.GeoJSON()
  }),
  title: 'Water Body',
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'blue', width: 1 }),
    fill: new ol.style.Fill({ color: 'skyblue' })
  })
});

const Railway = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'Railway.geojson',
    format: new ol.format.GeoJSON()
  }),
  title: 'Railway',
  style: function (feature) {
    return [
      // Outer line (rail edges)
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'black',
          width: 3
        })
      }),
      // Inner dashed line to mimic cross ties
      new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: 'white',
          width: 2,
          lineDash: [4, 10] // simulate sleeper spacing
        })
      })
    ];
  },
  visible: true
});


const Well = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'OPENWELL.geojson',
    format: new ol.format.GeoJSON()
  }),
  title: 'Well',
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: 'skyblue' }),
      stroke: new ol.style.Stroke({ color: 'black', width: 1 })
    }),
    text: new ol.style.Text({
      text: 'W',
      font: 'bold 6px sans-serif',
      fill: new ol.style.Fill({ color: 'blue' }),
      stroke: new ol.style.Stroke({width: 1 }),
      textAlign: 'center',
      textBaseline: 'middle',
      offsetY: 0
    })
  }),
  visible: true
});

const FarmPond = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'farmpond.geojson',
    format: new ol.format.GeoJSON()
  }),
  title: 'Farm Pond',
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({ color: 'blue', width: 1 }),
    fill: new ol.style.Fill({ color: 'skyblue' })
  })
});


const cadastre = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'CADASTRAL.geojson',
    format: new ol.format.GeoJSON()
  }),
  title: 'Cadastre',
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgba(211, 211, 211, 1)',
      width: 0.4
    }),
    fill: new ol.style.Fill({ color: 'rgba(0, 0, 0, 0)' })
  })
});

const vb = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'VILLAGE BOUNDARY.geojson',
    format: new ol.format.GeoJSON()
  }),
  title: 'Village Boundary',
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 2,
      // lineDash: [8, 5]
    })
  })
});

// --- Map Initialization ---
const map = new ol.Map({
  target: 'map',
  layers: [
    osmLayer, // Basemap layers
    esriHybridLayer,
    waterbody, // Vector layers
    cadastre,
    vb,
    Well,
    FarmPond,
    Railway
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([74.99, 17.11]),
    zoom: 14
  })
});

// --- Basemap Switcher Logic ---
const basemapOptions = document.querySelectorAll(".basemap-option");

basemapOptions.forEach(option => {
  option.addEventListener("click", () => {
    const selectedMap = option.getAttribute("data-map");
    osmLayer.setVisible(selectedMap === "OSM");
    esriHybridLayer.setVisible(selectedMap === "ESRIHybrid");

    // Update active state
    basemapOptions.forEach(opt => opt.classList.remove("active"));
    option.classList.add("active");
  });
});

// Set default basemap to OSM
document.querySelector('.basemap-option[data-map="OSM"]').classList.add("active");

// --- Layer Switcher Logic ---
const layerCheckboxes = document.querySelectorAll('.layer-switcher input');

const layers = {
  waterbody: waterbody,
  cadastre: cadastre,
  vb: vb,
  Well: Well,
  FarmPond: FarmPond,
  Railway: Railway

  
};

layerCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const layerKey = checkbox.getAttribute('data-layer');
    const layer = layers[layerKey];
    if (layer) {
      layer.setVisible(checkbox.checked);
    }
  });
});

// --- Print/Export Map ---
document.getElementById('printBtn').addEventListener('click', () => {
  map.once('rendercomplete', () => {
    const mapCanvas = document.createElement('canvas');
    const size = map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    const context = mapCanvas.getContext('2d');

    Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), canvas => {
      if (canvas.width > 0) {
        const opacity = canvas.parentNode.style.opacity || canvas.style.opacity;
        context.globalAlpha = opacity === '' ? 1 : Number(opacity);
        const transform = canvas.style.transform;
        const matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
        context.setTransform(...matrix);
        context.drawImage(canvas, 0, 0);
      }
    });

    const link = document.createElement('a');
    link.download = 'map.png';
    link.href = mapCanvas.toDataURL();
    link.click();
  });

  map.renderSync();
});

