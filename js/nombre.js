$(document).ready(function() {
    $.ajax({
        type: "POST",
        url: "php/obtenerNombre.php",
        data: {},
        success: function(data) {
            // Set the input value to the username
            $("#new_username").val(data);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText);
        }
    });
});