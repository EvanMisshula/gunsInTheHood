var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        homCount = ['Missing','gt 50', '25-50', '1.25-25', 'gte 0'];
        labels = [];

//    var colors  = ['#b6a8aa','#faf6f6','#e3e392','#A1DAB4','#41B6C4','#225EA8'];

    var colors = ['#7CFC00' ,
		  '#800026' ,
		  '#BD0026' ,
		  '#E31A1C' ,
		  '#FC4E2A' ];




    var opacity = [    0.6,    0.4,    0.4,    0.4,    0.4];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < colors.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '; opacity:' + opacity[i] + ';"></i> ' +
            homCount[i] + '<br>' ;
    }

    return div;
};

legend.addTo(map);
