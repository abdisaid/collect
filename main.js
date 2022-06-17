var draw 
var flagIsDrawingOn = false
var PointType = ['parking','bank','arret de bus','station'];
var LineType = ['autoroute nationale','route nationale','Telephone Lines'];
var PolygonType = ['etendue eau','commercial','foret','parc'];
var selectedGeomType

var popup = new ol.Overlay.Popup ({
    popupClass: "default anim", //"tooltips", "warning" "black" "default", "tips", "shadow",
    closeBox: true,
    onclose: function(){ console.log("You close the box"); },
    positioning: 'auto',
    autoPan: true,
    autoPanAnimation: { duration: 100 }
  });



window.app = {};
var app = window.app;


app.DrawingApp = function(opt_options){
	var options = opt_options || {};
	var button = document.createElement('button');
	button.id = 'drawbtn'
	button.innerHTML = '<i class="fas fa-drafting-compass"></i>';

	var this_ = this;
	var startStopApp = function(){
		if (flagIsDrawingOn == false) {
	$('#startdrawModal').modal('show')
	
	   }else{
	   	map.removeInteraction(draw)
	   	flagIsDrawingOn = false
	   	document.getElementById('drawbtn').innerHTML = '<i class="fas fa-stop"></i>'
	  	defineTypeofFeature()
		
	  	$('#enterInformationModal').modal('show')


	   }

	};
	

	button.addEventListener('click', startStopApp, false);
	button.addEventListener('touchstart', startStopApp, false);


	var element = document.createElement('div');
	element.className = 'draw-app ol-unselectable ol-control';
	element.appendChild(button);

	ol.control.Control.call(this, {
		element: element,
		target: options.target
	});
};
ol.inherits(app.DrawingApp, ol.control.Control);







var myview = new ol.View({
	center : [1147813.6637510518, 4420815.412778232],
	zoom:14
})

var baseLayer = new ol.layer.Tile({
	source : new ol.source.OSM({
		attributions:'abdiii'
	})
})

//geoserver
var featureLayersource = new ol.source.TileWMS({
	url:"http://localhost:8080/geoserver/abdiwebsig/wms",
	params:{'LAYERS':'abdiwebsig:test','tiled': true},
	serverType:'geoserver',
})
var featureLayer = new ol.layer.Tile({
	source:featureLayersource
})
var params = featureLayer.getSource().getParams();
params.t= new Date().getMilliseconds();
featureLayer.getSource().updateParams(params);

var drawSource = new ol.source.Vector()

var drawLayer = new ol.layer.Vector({
	source : drawSource
})



var layerArray = [baseLayer,featureLayer,drawLayer]

var map = new ol.Map({
	controls: ol.control.defaults({
		attributionOptions: {
			collapsible: false
		}
	}).extend([
	new app.DrawingApp()
	]),
	target : 'mymap',
	view: myview,
	layers:layerArray,
	overlays: [popup]

})





function startDraw(geomType){
	selectedGeomType = geomType
	 draw = new ol.interaction.Draw({
	 	type:geomType,
	 	source:drawSource
	 })
	 $('#startdrawModal').modal('hide')
	 drawSource.clear()
	 map.addInteraction(draw)
	 flagIsDrawingOn = true
	 document.getElementById('drawbtn').innerHTML = '<i class="fas fa-stop"></i> '

}



function defineTypeofFeature(){
	var dropdownoftype = document.getElementById('typeofFatures')
	dropdownoftype.innerHTML =''
	if (selectedGeomType == 'Point') {
		for (i=0;i<PointType.length;i++){
			var op = document.createElement('option')
			op.value = PointType[i]
			op.innerHTML = PointType[i]
			dropdownoftype.appendChild(op)
		}

	} else if (selectedGeomType == 'LineString') {
			for (i=0;i<LineType.length;i++){
			var op = document.createElement('option')
			op.value = LineType[i]
			op.innerHTML = LineType[i]
			dropdownoftype.appendChild(op)
		}
	}else {
			for (i=0;i<PolygonType.length;i++){
			var op = document.createElement('option')
			op.value = PolygonType[i]
			op.innerHTML = PolygonType[i]
			dropdownoftype.appendChild(op)
		}
	}

}


function savetodb(){
	
	var featureArray = drawSource.getFeatures()
	
	var geogJONSformat = new ol.format.GeoJSON()
	
	var featuresGeojson = geogJONSformat.writeFeaturesObject(featureArray)
	
	var geojsonFeatureArray = featuresGeojson.features

	for (i=0;i<geojsonFeatureArray.length;i++){
		var type = document.getElementById('typeofFatures').value
        var name = document.getElementById('exampleInputtext1').value
		var surface = document.getElementById('exampleInputtext2').value
        var geom = JSON.stringify(geojsonFeatureArray[i].geometry)
		console.log(type,name,surface,geom);

        if (type !='') {
        	$.ajax({
        	url:'http://127.0.0.1:8181/save.php',
        	type:'POST',
        	data :{
        		typeofgeom : type,
        		nameofgeom : name,
				surfaceofgeom:surface,
        		stringofgeom : geom,
        	}, 
        	succes : function(dataResult){
        		var result = JSON.parse(dataResult)
        		if (result.statusCode == 200){
        			console.log('data added successfully')
        		} else {
        			console.log('data not added successfully')

        		}
        	}
        });

    } else {
    	alert('please select type')
    }
    }


	$('#enterInformationModal').modal('hide')
	clearDrawSource ()

}

function clearDrawSource () {
	drawSource.clear()
}



map.on('click', function(evt){
    popup.hide(); 
    var resolution  = map.getView().getResolution();
    var coord = evt.coordinate
    var projection = map.getView().getProjection()
    var url = featureLayersource.getGetFeatureInfoUrl(coord,resolution,projection,{'INFO_FORMAT':'application/json'})
   
    if (url){
        $.getJSON(url,function(data){
			console.log(data)
            content = '<b>type</b> : '+data.features[0].properties.type +' <br> <b>name </b> : '+data.features[0].properties.name
            if (data.features[0].geometry.type == 'Polygon'){
                popup.show(data.features[0].geometry.coordinates[0][0], content);  
            } else if (data.features[0].geometry.type == 'Point'){
                popup.show(data.features[0].geometry.coordinates, content);
            } else {
                popup.show( data.features[0].geometry.coordinates[0], content);
            }
			
        })
    }
})



//map addlayer 


//map.on click

