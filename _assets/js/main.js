//= require 'vendor/jquery-1.12.4.min'

//= require assessment-tabs

// javascript for the global search bar
$(document).ready(function(){
    $('.search-input').focus(function() {
        //Preload the index
        $.getJSON( "/search-engine/index.json");
    });
    // If search-input has value add class that moves it in front of label
    $('#site-search-text').on("propertychange input", function () { // input = ie9+, propertychange < ie9
        element = $(this);
        if (element.val()) {
            element.addClass('has-value');
        } else {
            element.removeClass('has-value');
        }
    });
});
