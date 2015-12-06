<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Maintenance Health</title>

    <?php require('php/dist/m-HTMLhead.php'); ?>


  </head>
  <body>


    <?php require('php/dist/m-navBar.php'); ?>

    

    <div id="l-body">

      <div class="container">

        <div class="col-xs-5">
          <?php require('php/dist/m-equipList.php'); ?>
        </div>

        <div class="col-xs-7">
          <?php require('php/dist/m-equipDetail.php'); ?>
        </div>

      </div>

		</div>



    <?php require('php/dist/m-HTMLfoot.php'); ?>
    

    <script src="js/dist/p-index.min.js"></script>


  </body>
</html>