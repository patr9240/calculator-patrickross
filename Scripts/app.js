/* 
    app.js
    Number Cruncher
    Patrick Ross
    200307049
    This is the custom javascript used for the calculator functions
*/

$(document).on("pagecreate","#portrait-calc",function(){

    //Detects phone orientation change (0 = portrait)
    $(window).on("orientationchange",function(){
        if(window.orientation == 0) 
        {
            // Phone in portrait
        }
        else 
        {
            //Phone in landscape
        }
    });

    //Detects button tap event
    $("button").on("tap",function(){
        $("#displayControlPortrait").val($(this).attr("id"));
    });

    //detects <p> tag tap event
    $("p").on("tap",function(){
        $(this).hide();
    });  

});