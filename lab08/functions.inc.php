<?php

function generateLink($url, $label, $class) {
   $link = '<a href="' . $url . '" class="' . $class . '">';
   $link .= $label;
   $link .= '</a>';
   return $link;
}


function outputPostRow($number)  {
    include("travel-data.inc.php");

      echo " <div class=\"row\">
                        <div class=\"col-md-4\">
            ".
                       generateLink("post.php?id=$number",
                           "<img src=images/{${thumb.$number}} alt={${title.$number}} class=img - responsive/>", "")
                          .

                            "
                        </div>
                        <div class=\"col-md-8\">
                            <h2>{${title.$number}}</h2>
                            <div class=\"details\">Posted by <a href=\"user.php?id=2\" class=\"\">{${username.$number}}</a>
                                <span class=\"pull-right\">{${date.$number}}</span>
                                <p class=\"ratings\">".
                                 constructRating(${reviewsRating.$number}).
                                   ${reviewsNum.$number}
                                ."</p>
                            </div>
                            <p class=\"excerpt\">{${excerpt.$number}}}</p>
                            <p><a href=post.php?id={${postId.$number}} class=\"btn btn-primary btn-sm\">Read more</a></p>
                        </div>
                    </div>
                    <hr/>";


}

/*
  Function constructs a string containing the <img> tags necessary to display
  star images that reflect a rating out of 5
*/
function constructRating($rating) {
    $imgTags = "";
    
    // first output the gold stars
    for ($i=0; $i < $rating; $i++) {
        $imgTags .= '<img src="images/star-gold.svg" width="16" />';
    }
    
    // then fill remainder with white stars
    for ($i=$rating; $i < 5; $i++) {
        $imgTags .= '<img src="images/star-white.svg" width="16" />';
    }    
    
    return $imgTags;    
}

?>