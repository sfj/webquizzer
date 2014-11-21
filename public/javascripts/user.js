$(document).on('pageshow', function (event) {
    $('#logintext').val(localStorage.userName);

    $('#loginform').submit(function (event) {
        localStorage.userName = $('#logintext').val();
    })
});