<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="main.css">
	<link rel="stylesheet" type="text/css" href="muniprojet.css">
	<link rel="shortcut icon" type="image/x-icon" href="abdi.ico" />
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="shortcut icon" type="image/x-icon" href="image/asws.ico" />
    <link rel="shortcut icon" type="image/x-icon" href="images.png"/>

</head>
<body style="background-image: url();">

<div class="loginBox">
			<img src="IMAGE1.png" class="user">
			<h2>Connectez-Vous</h2>
			<form name="Connecter">
				<p style="text-transform: uppercase;color: black">Email</p>
				<input type="text" name="email" placeholder="Entre Email" style="color: white">
				<p style="text-transform: uppercase;color: black">Mot de passe</p>
				<input type="password" name="password" placeholder="••••••" style="color: white">
				<input type="button" onclick="check(this.form)" value="Connecter" style="box-shadow: 5px 5px 10px black;">
				<a href="#">Crée un Compte</a>
			</form>
		</div>
		<script language="javascript">
			function check(form)
			{
				if (form.email.value=="admin" && form.password.value=="admin")
				 {
				 	window.open('index.html')
				}
				else
				 {
				 	alert("Vous pouvez pas acceder ")

				}
			}
			
		</script>
</body>
</html>