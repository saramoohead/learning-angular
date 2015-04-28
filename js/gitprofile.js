// to ensure the page is loaded fully before the JavaScript begins to run, document.ready
// then anonmymous function wraps the instructions 
$(document).ready(function () {
    // for the class gitprofile, use the jQuery .on('submit', handler) format to define behaviour
    $('.gitprofile').on('submit', function(e) {

        // Prevents default action, i.e. clicked anchors will not take browser to new URL
        e.preventDefault();

        // creates a variable named url, pointing at the github api, specifically their users data
        // it adds in the jQuery command to validate the input class username
        // and finally it adds on a query string parameter to allow multiple calls to Github via the personal access token
        var url = 'https://api.github.com/users/' + $('input.username').val() + '?d49bbdad070e3b42447ad9ad89a5dc2e268c17c1';

        // creates a variable named template that is the jQuery command to get/return the HTML content from the section template
        var template = $('template').html();

        //  uses jQuery AJAX to send an HTTP get request to what's defined in variable url and then passes the info received back in the response
        //  AJAX: asynchoronous javascript and XML (but we don't really use XML anymore)
        //  prepend to insert contents at beginning of selected element (container)
        //  Mustache is a "logicless" template syntax because there are no if/else or loops
        $.get(url, function(info) {
            $('.container').prepend(Mustache.render(template, info));
        }).fail(function() {
            $('.container').prepend("User not found")
        }).always(function() {
            $('input.username').val('');
        });
    });
});
