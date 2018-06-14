<?php
/**
 * Created by PhpStorm.
 * User: linguopeng
 * Date: 2018/6/8
 * Time: 下午8:54
 */
  $dirName = "uploads";
  if (!file_exists()){
      mkdir($dirName);
  }
   $dirName = "uploads/mp3";
    if (!file_exists()){
        mkdir($dirName);
    }
    $dirName = "uploads/lrc";

    if (!file_exists()){
        mkdir($dirName);
    }



  $file = $_FILES['file_upload'];
  $text = $_POST["edit_lyric"];


  $textName = "uploads/lrc/".basename($file["name"],'.mp3').'.lrc';
  $textFile = fopen($textName,w);
  fwrite($textFile,$text);


  if (!file_exists("uploads/mp3/" . $file["name"]))
  {move_uploaded_file($file["tmp_name"], "uploads/mp3/" . $file["name"]);}
  else{

  }
  header("Location:lab11.php");