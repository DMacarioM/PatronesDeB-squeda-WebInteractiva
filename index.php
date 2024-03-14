
<!DOCTYPE html>
<html>
<?php session_start();?>
<head>

    <title>Patrones de búsqueda</title>
    <?php include("/phpComponents/head.php"); ?>

</head>

<body>
 
    <!--?php include("phpComponents/topbar.php")?> Algo para el idioma ?¿-->
     <!--<section id="mainContent"> <-?php include("phpComponents/slideshow.php")?></section>-->
    <!--?php include("phpComponents/footer.php") ?>-->

    <div>
        <div class="toggle-btn">
            <span>&#9776;</span>
        </div>
        <ul>
            <li>
                <img src="/images/logo_ucam.png">
            </li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
            <li>Home</li>
        </ul>
    </div>

  


    <div id="nav">
        <div class="titulonav">
        Secciones
        </div>
        <div class="cuerporec">
            <ul>
                <li><a href="#">Portada</a></li>
                <li><a href="#">Grandes rutas</a></li>
                <li><a href="#">Nuevas rutas</a></li>
                <li><a href="#">Ciudades</a></li>
                <li><a href="#">Pueblos</a></li>
            </ul>
        </div>
    </div>


    <script src="/Scripts/main.js" charset="utf-8"></script>
</body>


</html>