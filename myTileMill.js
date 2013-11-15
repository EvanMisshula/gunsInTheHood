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

var BoroOrCT = 7; 
var colorBorder = [];
var data;

//data and color b
switch (BoroOrCT) {
case 1:
    data = nycpp;
    break;
case 2:
    data = nycTractData;
    break;
case 3:
    data = nycZipData;
    colorBorder = [ null, 50, 25.5, 1, 0, -1];
    break;
case 4:
    data = copsData;
    colorBorder = [ null, 50, 25, 1.25, 0, -1];
    break;
case 5:
    data = getGunData;
    colorBorder =[null, 27, 10.5, 0, 0, -1 ];
    break;
case 6:
    data = getGunData;
    colorBorder =[null, 33, 19.5, 0, 0, -1 ];
    break;
case 7:
    data = gunfireData;
    colorBorder =[null, 51.5, 29, 1, 0, -1 ];
    break;
default:
    data = nycBoro;
    break;
}

//console.log(" colorBorder =" + colorBorder);

function getColorBorder() {
   return(colorBorder);
}


//function getColor
function getColor(d) {

//    colorBorder = getColorBorder();
    console.log(colorBorder[0]);

    return d === colorBorder[0]  ? '#7CFC00' :
        d >  colorBorder[1]  ? '#800026' :
        d >  colorBorder[2]  ? '#BD0026' :
        d >  colorBorder[3]  ? '#E31A1C' :
        d >= colorBorder[4]  ? '#FC4E2A' :
        d == -1 ? '#7CFC00'  : '#FFFFFF' ;

}

function getFillOpacity(d) {
      
//    colorBorder = getColorBorder();
    console.log(colorBorder[0]);
    return d === colorBorder[0] ? 0.6 :
        d >  colorBorder[1] ? 0.4 :
        d >  colorBorder[2] ? 0.4 :
        d >  colorBorder[3] ? 0.4 :
        d >= colorBorder[4] ? 0.4 :
        d == -1             ? 0.7 : 0.8;

}

// style
function style(feature,colorBorder) {
    var retVal = {};
    switch (BoroOrCT) {
    case 3:
	retVal = {
            fillColor: getColor(feature.properties.flUnsfP,
				colorBorder),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: getFillOpacity(feature.properties.flUnsfP,
					colorBorder),
	};
	break; 
      case 4:
	retVal = {
            fillColor: getColor(feature.properties.cpsNtEP,
			      colorBorder),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: getFillOpacity(feature.properties.cpsNtEP,
					colorBorder)
	};
	break;
      case 5:
	retVal = {
            fillColor: getColor(feature.properties.cpsNtEP,
			      colorBorder),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: getFillOpacity(feature.properties.cpsNtEP,
					colorBorder)
	};
	break;
      case 6:
	retVal = {
            fillColor: getColor(feature.properties.cpsNtEP,
			      colorBorder),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: getFillOpacity(feature.properties.cpsNtEP,
					colorBorder)
	};
	break;
      case 7:
	retVal = {
            fillColor: getColor(feature.properties.cpsNtEP,
			      colorBorder),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: getFillOpacity(feature.properties.cpsNtEP,
					colorBorder)
	};
	break;
    default:
	console.log("We are in default case on the style switch");
	break;
    }
    return(retVal);
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
	break;
    case 3:
	this._div.innerHTML = '<h4>Zip Code Info</h4>' + 
	    (props ? '<b>' + props.ZCTA5CE00 
	     + '</b><br /><b>Feels Unsafe (@night) </b> ' + props.flUnsfP
	     + '%'
	     : 'Hover over a census tract');
	break;
    case 4:
	this._div.innerHTML = '<h4>Zip Code Info</h4>' + 
	    (props ? '<b>' + props.ZCTA5CE00 
	     + '</b><br /><b>Cops not effective  </b> ' + props.cpsNtEP
	     + '%'
	     : 'Hover over a zip code');
	break;
    case 5:
	this._div.innerHTML = '<h4>Zip Code Info</h4>' + 
	    (props ? '<b>' + props.ZCTA5CE00 
	     + '</b><br /><b>Can get a gun in 1 day  </b> ' + props.WIDyPct
	     + '%'
	     : 'Hover over a zip code');
	break;
    case 6:
	this._div.innerHTML = '<h4>Zip Code Info</h4>' + 
	    (props ? '<b>' + props.ZCTA5CE00 
	     + '</b><br /><b>Connected to people w/Guns </b> ' + props.pctKnow
	     + '%'
	     : 'Hover over a zip code');
	break;
    case 7:
	this._div.innerHTML = '<h4>Zip Code Info</h4>' + 
	    (props ? '<b>' + props.ZCTA5CE00 
	     + '</b><br /><b>Heard gunshotw in Last 6mos</b> ' + props.Lst6MnP
	     + '%'
	     : 'Hover over a zip code');
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

 
geojson = L.geoJson(data, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);
 
