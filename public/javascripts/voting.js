$('#upvote').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: `/upvote/${id}`,
        success: (p) => { $("#points").html(p) }
    });
});

$('#downvote').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: `/downvote/${id}`,
        success: (p) => { $("#points").html(p) }
    });
});