/*   Guggari, Pooja Maheshwar. 
	 Class Account# jadrn011 
	 Spring 2018
*/
/////////////////////////////////////////////////////////////////
	
	function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 
		
	function isSKUFormatCorrect(name){
        var pattern = new RegExp(/([A-Z][A-Z][A-Z]-[0-9][0-9][0-9])/);
        return pattern.test(name);
    }
	
	function dup_handler(response) {
		if(response == "dup")
			$('#status').text("ERROR, duplicate");
		else if(response == "OK") {
			$('#status').text("");
			processUpload();
		}
		else
			alert(response);
    }	
	
	function processUpload() {
        send_file();
	}
	var size = 0; 
	function send_file() {    
		var form_data = new FormData($('form')[0]);
        var file_name = $('#photograph').val();
        //if(size > 2000000) {
         //   $('#status').html("ERROR, image is too big");
         //   return;
           // }
//        file_name = file_name.replace("C:\\fakepath\\",""); 
        var toDisplay = "<img src='/~jadrn011/proj1/animatedEllipse.gif' width='25px' height='auto' />";               
        $('#pic').html(toDisplay);
        var where = file_name.lastIndexOf("\\");  // this is safer!
        file_name = file_name.substring(where+1);          
        form_data.append("image", document.getElementById("photograph").files[0]);
		
        $.ajax( {
            url: "/perl/jadrn011/proj1/ajax_file_upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
	       if(response.startsWith("Success")) {
               	var fname = $("#photograph").val();	       
               	$('#status').html(response);
				$('form').serialize();
			$('form').submit();
			
		}
	       else {
                $('#status').css('color','red');
				$('#status').html(response);	
				$('#pic').html("&nbsp;");		       
                }
	    },
            error: function(response) {
               $('#status').css('color','red');
               $('#status').html("Sorry, an upload error occurred, 2MB maximum size");
                }
            });
    } 

    function process_reply(response) {
    $('#status').text("");
    $('#status').show();
    if(response == "OK") 
        $('#status').text("OK, not a duplicate");   
    else 
        $('#status').text("ERROR, duplicate");
    setTimeout(clearStatus, 2000);
    }
                 
$(document).ready( function() {
    var errorStatusHandle = $('#status');
    var elementHandle = new Array(15);
    elementHandle[0] = $('[name="sku"]');
    elementHandle[1] = $('[name="category"]');
    elementHandle[2] = $('[name="vendor"]');
    elementHandle[3] = $('[name="man_ident"]');
    elementHandle[4] = $('[name="description"]');
    elementHandle[5] = $('[name="features"]');
    elementHandle[6] = $('[name="cost"]');
    elementHandle[7] = $('[name="retail"]');
    elementHandle[8] = $('[name="qty"]');
    elementHandle[9] = $('[name="prod_image"]');
	elementHandle[0].focus();
	
	
    function isValidData() {
        if(isEmpty(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("Please enter SKU of the product");
            elementHandle[0].focus();
            return false;
            }
        if(!isSKUFormatCorrect(elementHandle[0].val())) {
            elementHandle[0].addClass("error");
            errorStatusHandle.text("The SKU entered appears to be invalid, "+
            "please enter sku in format XXX-###.");
            elementHandle[0].focus();            
            return false;
            }
        if(elementHandle[1].val() == 0) {
            elementHandle[1].addClass("error");
            errorStatusHandle.text("Please enter category of the product");
            elementHandle[1].focus();            
            return false;
            }
        if(elementHandle[2].val() == 0) {
            elementHandle[2].addClass("error");
            errorStatusHandle.text("Please enter vendor of the product");
            elementHandle[2].focus();           
            return false;
            }
        if(isEmpty(elementHandle[3].val())) {
            elementHandle[3].addClass("error");
            errorStatusHandle.text("Please enter Manufaturer's Identity of the product");
            elementHandle[3].focus();            
            return false;
            }
        if(isEmpty(elementHandle[4].val())) {
            elementHandle[4].addClass("error");
            errorStatusHandle.text("Please enter a description for the product");
            elementHandle[4].focus();            
            return false;
            }
        if(isEmpty(elementHandle[5].val())) {
            elementHandle[5].addClass("error");
            errorStatusHandle.text("Please enter features of the product");
            elementHandle[5].focus();            
            return false;
            }
        if(isEmpty(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("Please enter cost of the product");
            elementHandle[6].focus();            
            return false;
            }            
        if(!$.isNumeric(elementHandle[6].val())) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("The cost entered appears to be invalid, "+
            "numbers only please. ");
            elementHandle[6].focus();            
            return false;
            }
        if(elementHandle[6].val() == 0) {
            elementHandle[6].addClass("error");
            errorStatusHandle.text("The cost of the product might not be zero. Please enter correct cost")
            elementHandle[6].focus();            
            return false;
            }   
        if(isEmpty(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("Please enter retail price of the product");
            elementHandle[7].focus();            
            return false;
            }           
        if(!$.isNumeric(elementHandle[7].val())) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("The retail price appears to be invalid, "+
            "numbers only please. ");
            elementHandle[7].focus();            
            return false;
            }
        if(elementHandle[7].val() == 0) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("The retail price of the product might not be zero. Please enter correct cost")
            elementHandle[7].focus();            
            return false;
            }
        if(elementHandle[7].val() < elementHandle[6].val()) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("The retail price of the product might not be less than the cost of the product")
            elementHandle[7].focus();            
            return false;
            }
        if(isEmpty(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("Please enter the quantity of the product");
            elementHandle[8].focus();            
            return false;
            }            
        if(!$.isNumeric(elementHandle[8].val())) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("The quantity appears to be invalid, "+
            "numbers only please. ");
            elementHandle[8].focus();            
            return false;
            }

		if (size == 0) {
			elementHandle[11].addClass("error");
			errorStatusHandle.text("Please select an image file");
			elementHandle[11].focus();            
			return false;
			}
		if (size/1000 > 1000) {
			elementHandle[11].addClass("error");
			errorStatusHandle.text("File is too big, maximum file-size allowed is 1MB");
			elementHandle[11].focus();            
			return false;
			}
        return true;
        }      

   elementHandle[0].focus();
   
   
/////// HANDLERS

// the error message should no longer show once the value has been updated by the user
    elementHandle[0].on('blur', function() {
        if(isEmpty(elementHandle[0].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[1].on('blur', function() {
        if(isEmpty(elementHandle[1].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[2].on('blur', function() {
        if(isEmpty(elementHandle[2].val()))
            return;
		$(this).removeClass("error");
		errorStatusHandle.text("");
        });
	elementHandle[3].on('blur', function() {
        if(isEmpty(elementHandle[3].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[4].on('blur', function() {
        if(isEmpty(elementHandle[4].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[5].on('blur', function() {
        if(isEmpty(elementHandle[5].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[6].on('blur', function() {
        if(isEmpty(elementHandle[6].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[7].on('blur', function() {
        if(isEmpty(elementHandle[7].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
	elementHandle[8].on('blur', function() {
        if(isEmpty(elementHandle[8].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });

/////////////////////////////////////////////////////////////////        
	
	
	$('input[name="prod_image"]').on('change',function(e) {
		size = this.files[0].size;
		elementHandle[9].removeClass("error");
		errorStatusHandle.text("");
		});
	
	$(elementHandle[0]).on('blur', function() {
        var sku = $('#sku').val();
        if(!sku) return;
        var url = "/perl/jadrn011/check_dup.cgi?sku="+sku;
        $.get(url, process_reply);
    });
	
    $('#add-invent-btn').on('click', function(e) {
		e.preventDefault();
		if (isValidData()){
			for(var i=0; i < 10; i++)
            elementHandle[i].removeClass("error");
			errorStatusHandle.text("");
			// var params = "email="+elementHandle[0].val();
			// var url = "check_dup.php?"+params;
			// $.get(url, dup_handler);
			processUpload();
        }  });
        
    $(':reset').on('click', function() {
        for(var i=0; i < 10; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
        });                                       
});