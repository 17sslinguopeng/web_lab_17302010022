<?php

     $song = $_POST['song'];


     $file =fopen("uploads/lrc/".$song.".lrc",r);
     $s="";
     while (!feof($file)){
         $s = $s.fgetc($file);
     }
     echo "uploads/mp3/$song.mp3;".$s;

