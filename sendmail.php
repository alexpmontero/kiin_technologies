<?php

// Contact form by 

$mensaje.= $_POST['nombre']." te ha enviado un mensaje.";
$mensaje.= "\nAsunto: ".$_POST['asunto'];
$mensaje.= "\n".$_POST['mensaje'];
$mensaje.= "\n\nEste mensaje ha sido enviado desde el formulario de contacto del sitio http://kiintech.com.mx/";


$destino= "soporte@kiinenergy.com";
$remitente = $_POST['correo'];
$asunto = "Mensaje enviado por: ".$_POST['nombre'];

mail($destino,$asunto,$mensaje,"FROM: $remitente");

print("Su mensaje ha sido enviado correctamente.");

?>