<?php
  header('Content-Description: File Transfer');
  header('Content-Type: application/json');
  header('Content-Disposition: attachment; filename=' . $_POST['filename']);
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  
  //  $out = fopen('php://output', 'w');
  $content = $_POST['TestObj'];
  echo $content;
  //  fwrite($out, $content);
  //  fclose($out)
?>