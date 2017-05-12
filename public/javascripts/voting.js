$('.upvote').on('click', function (e) {
    e.preventDefault();
    var butt = $(e.target);
    var id = $(e.target).attr("voteid");
    if (butt.hasClass('active')) {
        $.ajax({
            type: "POST",
            url: `/resetvote/${id}`,
            success: (p) => {
                butt.removeClass('active');
                butt.siblings(".points").html(p);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: `/upvote/${id}`,
            success: (p) => {
                butt.siblings("button").removeClass('active');
                butt.toggleClass('active');
                butt.siblings(".points").html(p);
            }
        });
    }
});

$('.downvote').on('click', function (e) {
    e.preventDefault();
    var butt = $(e.target);
    var id = $(e.target).attr("voteid");
    if (butt.hasClass('active')) {
        $.ajax({
            type: "POST",
            url: `/resetvote/${id}`,
            success: (p) => {
                butt.removeClass('active');
                butt.siblings(".points").html(p);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: `/downvote/${id}`,
            success: (p) => {
                butt.siblings("button").removeClass('active');
                butt.addClass('active');
                butt.siblings(".points").html(p);
            }
        });
    }
});