<html>
<head>
<title>LRC 歌词编辑器</title>
    <meta charset="utf-8">
    <script src="jquery-3.3.1.js"></script>

<style>
    nav ul {
        position: fixed;
        z-index: 99;
        right: 5%;
        border: 1px solid darkgray;
        border-radius: 5px;
        list-style:none;
        padding: 0;
    }

    .tab {
        padding: 1em;
        display: block;
    }

    .tab:hover {
        cursor: pointer;
        background-color: lightgray !important;
    }

    td {
        padding:0.2em;
    }

    textarea[name="edit_lyric"] {
        width: 100%;
        height: 50em;
    }

    input[type="button"] {
        width: 100%;
        height: 100%;
    }

    input[type="submit"] {
        width: 100%;
        height: 100%;
    }

    #td_submit {
        text-align: center;
    }

    select {
        display: block;
    }

    #lyric {
        overflow: auto;
        width: 35%;
        height: 60%;
        border: 0;
        resize: none;
        font-size: large;
        line-height: 2em;
        text-align: center;
    }
    .active{
        font-size: larger;
        font: bolder;

        color: red;
    }
</style>
</head>
<body>
    <nav><ul>
        <li id="d_edit" class="tab">Edit Lyric</li>
        <li id="d_show" class="tab">Show Lyric</li>
    </ul></nav>

<!--歌词编辑部分-->
<section id="s_edit" class="content">
<form id="f_upload" enctype="multipart/form-data" action="upload.php" method="post">
    <p>请上传音乐文件</p>

     <audio controls="controls" src="" id="player"></audio>

    <!--TODO: 在这里补充 html 元素，使 file_upload 上传后若为音乐文件，则可以直接播放-->
     <input type="file" name="file_upload" id="file_upload">

    <table>
        <tr><td>Title: <input type="text"></td><td>Artist: <input type="text"></td></tr>
        <tr><td colspan="2">
            <textarea name="edit_lyric" id="edit_lyric"></textarea>
        </td></tr>
        <tr><td><input type="button" value="插入时间标签" id="insert"></td><td><input type="button" value="替换时间标签" id="modify"></td></tr>
        <tr><td colspan="2" id="td_submit">
            <input type="button" value="Submit" onclick="toSubmit()"></td></tr>
    </table>
</form>
</section>

<!--歌词展示部分-->
<section id="s_show" class="content">
    <select id="songSelect">
        <?php
           $files = scandir("uploads/mp3");
           for ($i =0;$i<count($files);$i++){
            if ($files[$i]!='.'&&$files[$i]!="..") {
                $t = basename($files[$i],'.mp3');
                echo "<option value='$files[$i]' data-sort=$i>$t</option>";
            }
           }
        ?>
    <!--TODO: 在这里补充 html 元素，使点开 #d_show 之后这里实时加载服务器中已有的歌名-->
    </select>
<!--    --><?php
//    $files2 = scandir("uploads/lrc");
//    $text = file_get_contents("uploads/lrc/".$files2[2]);
//
//    echo "<div id=\"lyric\" readonly=\"true\">
//            <b> $text </b>
//          </div> ";
//    echo "<audio src=\"uploads/mp3/$files[2]\" controls=\"controls\" id='player2'></audio>"
//     ?>
    <div id="lyric" readonly="true" ></div>
     <audio src="" controls="controls" id="player2"></audio>
    <button onclick="last()">上一首</button>
    <button onclick="next()">下一首</button>

    <!--TODO: 在这里补充 html 元素，使选择了歌曲之后这里展示歌曲进度条，并且支持上下首切换-->

</section>

</body>

<script src="lab11.js"></script>
</html>
