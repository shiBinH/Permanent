<?php 
  $contents = file_get_contents($_FILES['userfile']['tmp_name']);
  echo htmlentities($contents, ENT_NOQUOTES);
?>
