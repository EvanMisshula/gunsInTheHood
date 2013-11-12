var myTiles = new L.TileLayer('http://localhost:8000/mbtiles-server.php?db=nycBase.mbtiles&z={z}&x={x}&y={y}',
    {
    attribution: "Data from OSM and NYPD",
    maxZoom: 17,
    minZoon: 12
    });

var map = new L.Map('map');

map.setView( new L.LatLng(40.7556,-73.9819), 12).addLayer(myTiles);

//control
var info = L.control();

var BoroOrCT = 3; 

//function getColor
function getColor(d) {
      
   return d === null ? '#7CFC00' :
           d > 50 ? '#800026' :
           d > 25  ? '#BD0026' :
           d > 1.25  ? '#E31A1C' :
           d >= 0  ? '#FC4E2A' :
           d == -1   ? '#7CFC00' :
	'#FFFFFF'
          
}

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div','info');
    this.update();
    return this._div;
};

info.update = function (props) {
    switch (BoroOrCT) {
    case 1:
	this._div.innerHTML = '<h4>Precinct Number</h4>' + 
	    (props ? '<b>' + props.Precinct + '</b>'
	     : 'Hover over a police precinct');
//	document.write("We are in case 1.<br>");
    break;
    case 2:
	this._div.innerHTML = '<h4>Census Tract Info</h4>' + 
	    (props ? '<b>' + props.BoroName 
	     + '</b><br /> ' + props.CTLabel  
	     + '</b><br /> ' + props.NTAName
	     + '<br /><b>2010 count </b> ' + props.c2010
	     + '<br /><b>2010 inc </b> ' + props.pChg2010
	     + '<br /><b>Pct Black </b> ' + props.BlackP
	     + '<br /><b>Pct White </b> ' + props.WhiteP
	     + '<br /><b>Pct Hispanic </b> ' + props.HispanicP
	     + '<br /><b>Pct Asian </b> ' + props.AsianP
	     + '<br /><b>Pct Other </b> ' + props.OtherP
	     : 'Hover over a census tract');
//	document.write("We are in case 2.<br>");
	break;
    case 3:
	this._div.innerHTML = '<h4>Zip Code Info</h4>' + 
	    (props ? '<b>' + props.ZCTA5CE00 
	     + '</b><br /><b>Feels Unsafe (@night) </b> ' + props.flUnsfP
	     + '%'
	     : 'Hover over a census tract');
	break;
    default:
	this._div.innerHTML = '<h4>Boro Information</h4>' + 
	    (props ? '<b>' + props.BoroName + '</b><br /> ' + props.BoroCode
	     : 'Hover over a Boro');
//	document.write("We are in the default case.<br>");
	break;
    };
};

info.addTo(map);

// style
function style(feature) {
    return {
        fillColor: getColor(feature.properties.flUnsfP),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var geojson;
//listener
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

info.update(layer.feature.properties);
}


//reset
function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

var data;
switch (BoroOrCT)
{
    case 1:
    data = nycpp;
    break;
    case 2:
    data = nycTractData;
    break;
    case 3:
    data = nycZipData;
    break;
    default:
    data = nycBoro;
    break;
}
 
geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
 
