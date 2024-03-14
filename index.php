
<!DOCTYPE html>
<html>
<?php session_start();?>
<head>

    <title>Patrones de búsqueda</title>
    <?php include("phpComponents/head.php"); ?>

</head>

<body>
 
    <!--?php include("phpComponents/topbar.php")?> Algo para el idioma ?¿-->
     <!--<section id="mainContent"> <-?php include("phpComponents/slideshow.php")?></section>-->
    <!--?php include("phpComponents/footer.php") ?>-->

    <!--Topbar para anuncio//readme-->

    <main><!--Contenido principal (Sidebar y Content)-->

    <div id="sidebar">
         <!--?php include("phpComponents/sidebar.php") ?>-->
      <div class="toggle-btn">
        <span>&#9776</span>
      </div>
      <ul>
        <li>
          img
          here
        </li>
        <li>Introducción</li><!--No es mandar al usuario a otra pagina, es recargar el contenido de la derecha (y los botones)-->
        <li>Búsqueda Directa</li>
        <li>KMP</li>
        <li>BM</li>
      </ul>
    </div>

    <div id="Content">
        <!--?php include("phpComponents/content.php") ?>-->
        Contenido de la página (va cambiando)
        <!--Modificar con js una variable con los botones del sidebar para que cambie el contenido de la página-->
        <?php include("phpComponents/sandbox.php") ?>
    </div>

    </main>

    <!--?php include("phpComponents/footer.php") ?>-->

    <script src="/Scripts/main.js" charset="utf-8"></script>
</body>


</html>