/*
	 Guggari, Pooja Maheshwar. 
	 Class Account# jadrn017 
	 Spring 2018
*/


if(getCookie('jadrn011SID') != '')
        window.location = "http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi";


function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }


$(document).ready(function() {
	$("[name='username']").val('');
	$("[name='password']").val('');
	$("[name='username']").focus();


	$(':submit').on('click', function(e) {
		e.preventDefault();
		var form_data = new FormData($('form')[0]); 
		$.ajax({
            url: "/perl/jadrn011/proj1/loggedin.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
            	if(response == 1) {
            		window.location = "http://jadran.sdsu.edu/perl/jadrn011/proj1/admin.cgi";
            	}
            	else if(response == 0) {
            		// Invalid Username/Password :TODO
            	}
            },
            error: function(response) {
               //
            }
        });
	});

});