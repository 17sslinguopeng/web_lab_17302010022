var interval;
document.getElementById("d_edit").onclick = function () {click_tab("edit");};
document.getElementById("d_show").onclick = function () {click_tab("show");};
var player = document.getElementById("player");
var edit_lyric = $("#edit_lyric");
var lyric = document.getElementById("lyric");
var player2 = document.getElementById("player2")
document.getElementById("d_show").click();
$(document).ready(function () {
    changeSong();
    var interval = setInterval("checkLrc()",10);
})

$("#songSelect").change(function () {
   changeSong()

})
function checkLrc() {
    let p = document.getElementsByClassName("normal lrc");

    if (p.length==0) return;
    let now =parseInt(player2.currentTime*100);
    for (i=0;i<p.length;i++){

    if ( now == p[i].dataset.seconds){
        $(`#${i}`).addClass("active");
        $(`#${i}`).siblings().removeClass("active");

        $t = 55*(i-3);


        lyric.scrollTop= $t;

    }}
}
function changeSong() {
    s = $("#songSelect").val().substring(0,$("#songSelect").val().length-4);

    $.post("getSongs.php",
        {'song':s}
        ,function (data) {
            re = /^\[\d{2}:\d{2}:\d{2}\.\d{2}]/;
            str = data.split(";");
            player2.src = str[0];
            let text = str[1].split("\n");
            s = "";
            lrc = new Array();
            for (i=0;i<text.length;i++){

                time=-1;
                if (re.test(text[i])){

                    time = getSeconds(text[i].substring(0,13));
                    temp = text[i].substring(13,text[i].length);

                }
                else temp = text[i];
                s = s+`<p class='normal lrc' data-seconds=${time} id=${i}>${temp}</p>`
            }

            $("#lyric").html(s);

        })
}
function last() {

}
function getSeconds(s){

    s = s.substring(1,s.length-1);
    a = s.split(":");
    let time = 0;

    time = time+parseInt(a[0])*60*60*100;

    time = time+parseInt(a[1])*60*100;

    t=a[2].split(".");
    time = time+parseInt(t[0])*100;

    time = time+parseInt(t[1]);

    return time;

}
$("#file_upload").change(function () {

    var f = document.getElementById("file_upload").files.item(0);


    player.src= window.URL.createObjectURL(f);
  //  $("#player").prop("src",window.URL.createObjectURL(f))


})


function click_tab(tag) {
    for (let i = 0; i < document.getElementsByClassName("tab").length; i++)
        document.getElementsByClassName("tab")[i].style.backgroundColor = "transparent";
    for (let i = 0; i < document.getElementsByClassName("content").length; i++)
        document.getElementsByClassName("content")[i].style.display = "none";

    document.getElementById("s_" + tag).style.display = "block";
    document.getElementById("d_" + tag).style.backgroundColor = "darkgray";
}

// Edit 部分


var edit_lyric_pos = 0;

document.getElementById("edit_lyric").onmouseleave = function () {

    edit_lyric_pos = document.getElementById("edit_lyric").selectionStart;

};

$("#modify").click(function () {
    re = /^\[\d{2}:\d{2}:\d{2}\.\d{2}]/;
    let pos = new Array();
    pos =get_target_line(edit_lyric_pos);
    text = edit_lyric.val();
    let line = text.substring(pos[0],pos[1]);
    let  time = new Date(player.currentTime*1000);
    s =time.toISOString();
    time = '['+s.substring(11,22)+']';
    if (re.test(line)){

        line = text.substring(0,pos[0])+time+text.substring(pos[0]+13,text.length);

        edit_lyric.val(line)
    }
})
$("#insert").click(function () {


    let pos = new Array();
    pos =get_target_line(edit_lyric_pos);
    let  time = new Date(player.currentTime*1000);
    s =time.toISOString();
    time = '['+s.substring(11,22)+']';
    let text = edit_lyric.val();
    text =text.substring(0,pos[0])+time+text.substring(pos[0],text.length);
    edit_lyric.val(text);


})
function toSubmit() {
    if (document.getElementById("file_upload").files.item(0)!=null&& edit_lyric.val()!="")
        document.getElementById("f_upload").submit();
    else {
        alert("请上传文件和歌词!");
    }
}
// 获取所在行的初始位置。

function get_target_pos(n_pos) {
    if (n_pos === undefined) n_pos = edit_lyric_pos;
    let value = document.getElementById("edit_lyric").value;
    let pos = 0;
    for (let i = n_pos; i >= -1; i--) {
        if (value.charAt(i) === '\n') {
            pos = i + 1;
            break;
        }
    }
    return pos;
}

// 选中所在行。
function get_target_line(n_pos) {
    let value = document.getElementById("edit_lyric").value;
    let f_pos = get_target_pos(n_pos);
    let l_pos = 0;

    for (let i = f_pos;; i++) {
        if (value.charAt(i) === '\n' || i===value.length-1) {
            l_pos = i + 1;
            break;
        }
    }
    return [f_pos, l_pos];
}

/* HINT:
 * 已经帮你写好了寻找每行开头的位置，可以使用 get_target_pos()
 * 来获取第一个位置，从而插入相应的歌词时间。
 * 在 textarea 中，可以通过这个 DOM 节点的 selectionStart 和
 * selectionEnd 获取相对应的位置。
 *
 * TODO: 请实现你的歌词时间标签插入效果。
 */

/* TODO: 请实现你的上传功能，需包含一个音乐文件和你写好的歌词文本。
 */

/* HINT:
 * 实现歌词和时间的匹配的时候推荐使用 Map class，ES6 自带。
 * 在 Map 中，key 的值必须是字符串，但是可以通过字符串直接比较。
 * 每一行行高可粗略估计为 40，根据电脑差异或许会有不同。
 * 当前歌词请以粗体显示。
 * 从第八行开始，当歌曲转至下一行的时候，需要调整滚动条，使得当前歌
 * 词保持在正中。
 *
 * TODO: 请实现你的歌词滚动效果。
 */
