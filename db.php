<?php

$server = 'localhost';
$username = 'postgres';
$password = '0000';
$db_name = 'DONNEES';


$dbconn = pg_connect("host=$server port=5433 dbname=$db_name user=$username   password=$password");




?>