$('#upvote').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $.ajax({
            type: "POST",
            url: `/resetvote/${id}`,
            success: (p) => {
                $(this).removeClass('active');
                $("#points").html(p);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: `/upvote/${id}`,
            success: (p) => {
                $('#downvote').not(this).removeClass('active');
                $(this).toggleClass('active');
                $("#points").html(p);
            }
        });
    }
});

$('#downvote').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $.ajax({
            type: "POST",
            url: `/resetvote/${id}`,
            success: (p) => {
                $(this).removeClass('active');
                $("#points").html(p);
            }
        });
    }
    else {
        $.ajax({
            type: "POST",
            url: `/downvote/${id}`,
            success: (p) => {
                $("#upvote").removeClass('active');
                $(this).addClass('active');
                $("#points").html(p);
            }
        });
    }
});