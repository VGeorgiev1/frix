$(".show-more a").on("click", function() {
    var $this = $(this); 
    var $content = $this.parent().prev("div.content");
    var linkText = $this.text().toUpperCase();    
    
    if(linkText === "SHOW MORE TAGS"){
        linkText = "Show less tags";
        $content.switchClass("hideContent", "showContent", 400);
    } else {
        linkText = "Show more tags";
        $content.switchClass("showContent", "hideContent", 400);
    };

    $this.text(linkText);
});