function requestFilter()
{
    var myCheckboxes = new Array();
    $("input:checked").each(function() {
       myCheckboxes.push($(this).val());
    });
    //$.get("/allproblems/sorted", myCheckboxes);
    console.log(myCheckboxes);
    $.ajax({
        url: '/allproblems/sorted',
        type: "POST", 
        data: {
            'tag[]': myCheckboxes
        },
        success: function(data) {
            $("html").html(data);
        }
   
    });
}

$('#filter').on('click', function (e){
    e.preventDefault();
    console.log('z');
    requestFilter();
});