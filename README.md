<html lang="en">
<!-- This is simple webmap done with Geoserver, openlayers, javascript, css, and html -->
  
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/ol@v10.4.0/dist/ol.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v10.4.0/ol.css">
<style>
    #map{
    width:90vw;
    height:90vh
}
</style>
</head>
<body>
    <div id="map"></div>
    <script>
    var map = new ol.Map({
        target:"map",
        layers:[
            new ol.layer.Tile({
                source:new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center:[0,0],
            zoom:2
        })
    });
        </script>
    
</body>
</html>
