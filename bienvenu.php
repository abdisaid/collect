
<?php 
//On demare la session sur sur cette page 
session_start() ;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <?php
     //Ensuite on affiche le contenu de la variable session
     echo "<p class ='message'> Bonjour " .  $_SESSION['email'] . "</p>";
    ?>
</body>
</html>