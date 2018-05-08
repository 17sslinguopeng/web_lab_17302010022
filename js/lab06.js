window.onload=function ()  {

    var s="";
    for (var i=0;i<=3;i++)
    {

        var t = "";
        for (var j =0;j<countries[i].cities.length;j++)
        {
            t = t+"<p>"+countries[i].cities[j]+"</p>";
        }

        var t2 ="";
        for ( j =0;j<countries[i].photos.length;j++)
        {
            source = `./images/${countries[i].photos[j]}`;

            t2 = t2+`<img src=${source} class=photo>`
        }

        s=s+ "<div class='item'>" +
            "<h2 >" +countries[i].name+
            "</h2>"+
            "<h3>"+countries[i].continent+
            "</h3>"+
            "<div class='inner-box'>" +
            "<h3>" +"Cities"+
            "</h3>"+
             t+
            "</div>"+
            "<div class='inner-box'>" +
            "<h3>" +
            "Popular Photos"+
            "</h3>"+
            t2+
            "</div>"+
            "<button>Visit</button>"+
            "</div>"
    }

    var ele = document.getElementsByClassName("flex-container");
    ele[0].innerHTML=s;
}