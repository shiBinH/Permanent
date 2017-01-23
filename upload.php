<?php 
  $filename = $_POST['filename'];
  $contents = file_get_contents($_FILES[$filename]['tmp_name']);
  echo $contents;
?>