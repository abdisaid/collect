<?php

include 'db.php';

$type = $_POST['typeofgeom'];
$name = $_POST['nameofgeom'];
$surface = $_POST['surfaceofgeom'];
$stringgeom = $_POST['stringofgeom'];
$add_query = "Insert into public.\"d_urbains\" (type,name,surface,geom) Values ('$type','$name','$surface',ST_GeomFromGeoJSON('$stringgeom'))";

$query = pg_query($dbconn,$add_query);
if ($query){
	echo json_encode(array("statusCode" => 200));
} else { 
	echo json_encode(array("statusCode" => 201));
	}


?>