$('#upvote').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: `/upvote/${id}`,
        success: () => { console.log('up') }
    });
});

$('#downvote').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: `/downvote/${id}`,
        success: () => { console.log('down') }
    });
});