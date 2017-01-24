<?php
  header('Content-Type: application/json');
  header('Content-Disposition: attachment; filename=samplle.json');
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  $content = file_get_contents('sample.json');
  echo $content;
?>