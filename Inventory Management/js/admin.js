/*   Guggari, Pooja Maheshwar. 
	 Class Account# jadrn011 
	 Spring 2018
*/
/////////////////////////////////////////////////////////////////
	
	if(getCookie('jadrn011SID') == '')
        window.location = "http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi";

    function isEmpty(fieldValue) {
        return $.trim(fieldValue).length == 0;    
        } 

    function isInteger(x) {
        return x % 1 === 0;
    }
		
	function isSKUFormatCorrect(name){
        var pattern = new RegExp(/([A-Z][A-Z][A-Z]-[0-9][0-9][0-9])/);
        return pattern.test(name);
    }
	
    function displayProductImage(str) {
        if( str == "Add" && $('#prod_image')[0].files && $('#prod_image')[0].files[0]) {
            {
                var read = new FileReader();

                read.onload = function (e) {
                    $('#p_image').prop('src', e.target.result);
                };

                read.readAsDataURL($('#prod_image')[0].files[0]);
            }
        }
        else if ( str == "Edit") {
            {
                var read = new FileReader();

                read.onload = function (e) {
                    $('#ep_image').prop('src', e.target.result);
                };

                read.readAsDataURL($('#eprod_image')[0].files[0]);
            }
        }
        else {
            $('#p_image').prop('src', '/~jadrn011/proj1/no-image.jpg');
            $('#ep_image').prop('src', '/~jadrn011/proj1/no-image.jpg');
            $('#dp_image').prop('src', '/~jadrn011/proj1/no-image.jpg');
        }
         
       
    }


    var fileUpload = new XMLHttpRequest();

    function uploadImage(file) 
    {
      var toDisplay = "<img src='/~jadrn011/proj1/ajax-loader.gif' width='25px' height='auto' />";               
      $('#pic').html(toDisplay);
      var formData = new FormData();
      formData.append("eprod_image", file.files[0]);
      formData.append("esku", $('#esku').val());
      fileUpload.open("post", "/perl/jadrn011/proj1/ajax_edit_file_upload.cgi", true);
      fileUpload.setRequestHeader("Content-Type", "multipart/form-data");
      fileUpload.send(formData);  /* Send to server */ 
    }

    fileUpload.onreadystatechange = function() 
    {
        if (fileUpload.readyState == 4 && fileUpload.status == 200) 
        {
            if(fileUpload.responseText=="UnAuthorised"){
              window.location = "http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi";    
            }
            else{       
                $('#pic').html("&nbsp;"); 
                edit_inventory();
            }
        }
    }




	
	function processUpload() {
        send_file();
	}
	var size = 0;
    var sizeEdit = 0; 
	function send_file() {    
		var form_data = new FormData($('form')[0]);
        var form_edit_data = new FormData($('form')[1]);
        var file_name;
        file_name = $('#prod_image').val();
        //if(size > 2000000) {
         //   $('#status').html("ERROR, image is too big");
         //   return;
           // }
//        file_name = file_name.replace("C:\\fakepath\\",""); 
        var toDisplay = "<img src='/~jadrn011/proj1/ajax-loader.gif' width='25px' height='auto' />";               
        $('#pic').html(toDisplay);
        if (file_name != null) {
            var where = file_name.lastIndexOf("\\");  // this is safer!
            file_name = file_name.substring(where+1);
            
                form_data.append("image", document.getElementById("prod_image").files[0]);
                form_data.append("sku", $('#sku').val());

                $.ajax( {
                url: "http://jadran.sdsu.edu/perl/jadrn011/proj1/ajax_file_upload.cgi",
                type: "post",
                data: form_data,
                processData: false,
                contentType: false,
                success: function(response) {
                if (response == "Unauthorised") {
                    window.history
                    window.location.replace("http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi");
                }
                else if(response.startsWith("Success")) {
                    add_inventory();
                }
                else {
                    $('div#status').css('color','red');   
                    $('div#status').text(response);
                    $('#pic').html("&nbsp;");              
                }
            },
                error: function(response) {
                   $('div#status').css('color','red');
                   $('div#status').text("Sorry, an upload error occurred, 2MB maximum size");
                    }
                });  

            
        }
        
    }

    function add_inventory() {
        var sku = $('#sku').val();
        var c = document.getElementById("category");
        var category = c.options[c.selectedIndex].text;
        var v = document.getElementById("vendor");
        var vendor = v.options[v.selectedIndex].text;
        var manIdent = $('#man_ident').val();
        var description = $('#description').val();
        var features = $('#features').val();
        var cost = $('#cost').val();
        var retail = $('#retail').val();
        var qty = $('#qty').val();
        //var prodImage =  getfilename($("#prod_image").val());
        var image = $('#prod_image').val();
        var extension = image.substring(image.lastIndexOf('.')+1);
        var prodImage = sku + "." + extension;
        //alert(prodImage);
        // alert(category);

        $.ajax({
            type: "POST",
            url: "/perl/jadrn011/proj1/add_new_inventory.cgi", 
            data: "sku=" + sku + "&category=" + category + "&vendor=" + vendor + 
            "&manIdent=" + manIdent + "&description=" + description + "&features=" + features + 
            "&cost=" + cost + "&retail=" + retail + "&qty=" + qty + "&prodImage=" + prodImage,
             
            success: function(data){
                //alert(data);
                if(data=="Unauthorised"){
                    window.location.replace("http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi");       
                }
                
                $("#newSKU").text(sku);
                $("#newCat").text(category);
                $("#newVend").text(vendor);
                $("#newMI").text(manIdent);
                $("#newDesc").text(description);
                $("#newFeat").text(features);
                $("#newCost").text(cost);
                $("#newRet").text("$ " + retail);
                $("#newQty").text(qty);
                addNewInventoryHandle(data);
            },
            error: function() { 
              alert("There is a server issue. Please try again.");
            }   
        });
    } 

    function addNewInventoryHandle(data) {
        hideNewInventory();
    }

    function hideNewInventory() {
        if (document.getElementById('New')) {
            if (document.getElementById('New').style.display != 'none') {
                document.getElementById('New').style.display = 'none';
                document.getElementById('displayNewInventory').style.display = 'block';
            }
        }
    }

    function showNewInventory() {
        if (document.getElementById('New')) {
            if (document.getElementById('New').style.display == 'none') {
                document.getElementById('New').style.display = 'block';
                document.getElementById('displayNewInventory').style.display = 'none';
            }
        }
    }

    function clearNewInventory() {
        document.getElementById("sku").value = "";
        $("#category").val(0);
        $("#vendor").val(0);
        document.getElementById("man_ident").value = "";
        document.getElementById("description").value = "";
        document.getElementById("features").value = "";
        document.getElementById("cost").value = "";
        document.getElementById("retail").value = "";
        document.getElementById("qty").value = "";
        $('#prod_image').val("");
        $('#p_image').prop('src', '/~jadrn011/proj1/no-image.jpg');
        $('div#status').text("");
        $('#pic').html("&nbsp;");
    }

    function clearNewInventoryDetails() {
        $("#newSKU").text("");
        $("#newCat").text("");
        $("#newVend").text("");
        $("#newMI").text("");
        $("#newDesc").text("");
        $("#newFeat").text("");
        $("#newCost").text("");
        $("#newRet").text("");
        $("#newQty").text("");
    }

    function check_duplicate_record() {
        var sku = $('#sku').val();
        if(!sku) return;
        var url = "http://jadran.sdsu.edu/perl/jadrn011/proj1/check_dup.cgi?sku="+sku;
        $.get(url, process_reply);
    }

    function process_reply(response) {
    $('div#status').text("");
    $('div#status').show();
    if (response == "Unauthorised") {
        window.location.replace("http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi");
    }
    else if(response == "OK") {
        $('div#status').text(""); 
        //$('#sku').addClass("cool");
    }
    else 
        $('div#status').text("The SKU entered already exists in the database");
        //$('#sku').addClass("error");
    }

    function check_record_exists() {
        if(editSendFile) {
            var sku = $('#esku').val();
        }
        else {
            var sku = $('#dsku').val();
        }
        
        if(!sku) return;
        var url = "http://jadran.sdsu.edu/perl/jadrn011/proj1/get_record_for_sku.cgi?sku="+sku;
        $.get(url, record_exists_reply);
    }

    function record_exists_reply(response) {
    $('div#status').text("");
    if (response == "Unauthorised") {
        window.location.replace("http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi");
    }
    else if(response == "DOESNOTEXIST") {
        $('div#status').text("The SKU entered does not exist"); 
        if(editSendFile) {
            disable_edit();
            $('[name="esku"]').addClass("error");
        }
        else {
            disable_delete();
            $('[name="dsku"]').addClass("error");
        }
        
    }
    else {
        $('div#status').text("");
        $('[name="esku"]').removeClass("error");
        $('[name="dsku"]').removeClass("error");
        populate(response);
        
    }
         
    }

    function populate(response) {
        var res = response.split("|");
        if(editSendFile) {
            $("#ecategory").val(res[1]);
            $("#evendor").val(res[2]);
            $("#eman_ident").val(res[3]);
            $("#edescription").text(res[4]);
            $("#efeatures").text(res[5]);
            $("#ecost").val(res[6]);
            $("#eretail").val(res[7]);
            $("#eqty").val(res[8]);
            $("#eprod_image").text(res[9]);
            $('#ep_image').prop('src', '/~jadrn011/proj1/_uploadDIR_/' + res[9]);
            enable_edit();
        } 
        else {
            $("#dcategory").val(res[1]);
            $("#dvendor").val(res[2]);
            $("#dman_ident").val(res[3]);
            $("#ddescription").text(res[4]);
            $("#dfeatures").text(res[5]);
            $("#dcost").val(res[6]);
            $("#dretail").val(res[7]);
            $("#dqty").val(res[8]);
            $("#dprod_image").text(res[9]);
            $('#dp_image').prop('src', '/~jadrn011/proj1/_uploadDIR_/' + res[9]);
            enable_delete();
        }     
    }

    function enable_edit() {
        document.getElementById('ecategory').disabled = false;
        document.getElementById('evendor').disabled = false;
        document.getElementById('eman_ident').disabled = false;
        document.getElementById('edescription').disabled = false;
        document.getElementById('efeatures').disabled = false;
        document.getElementById('ecost').disabled = false;
        document.getElementById('eretail').disabled = false;
        document.getElementById('eqty').disabled = false;
        document.getElementById('eprod_image').disabled = false;
        document.getElementById('edit-invent-btn').disabled = false;
    }

    function disable_edit() {
        $("#esku").focus();
        document.getElementById('ecategory').disabled = true;
        document.getElementById('evendor').disabled = true;
        document.getElementById('eman_ident').disabled = true;
        document.getElementById('edescription').disabled = true;
        document.getElementById('efeatures').disabled = true;
        document.getElementById('ecost').disabled = true;
        document.getElementById('eretail').disabled = true;
        document.getElementById('eqty').disabled = true;
        document.getElementById('eprod_image').disabled = true;
        document.getElementById('edit-invent-btn').disabled = true;
    }


    function disable_delete() {
        $("#dsku").focus();
        document.getElementById('dcategory').disabled = true;
        document.getElementById('dvendor').disabled = true;
        document.getElementById('dman_ident').disabled = true;
        document.getElementById('ddescription').disabled = true;
        document.getElementById('dfeatures').disabled = true;
        document.getElementById('dcost').disabled = true;
        document.getElementById('dretail').disabled = true;
        document.getElementById('dqty').disabled = true;
        document.getElementById('dprod_image').disabled = true;
        document.getElementById('delete-invent-btn').disabled = true;
    }

    function enable_delete() {
        document.getElementById('delete-invent-btn').disabled = false;
    }

    function edit_inventory() {
        var sku = $('#esku').val();
        var c = document.getElementById("ecategory");
        var category = c.options[c.selectedIndex].text;
        var v = document.getElementById("evendor");
        var vendor = v.options[v.selectedIndex].text;
        var manIdent = $('#eman_ident').val();
        var description = $('#edescription').val();
        var features = $('#efeatures').val();
        var cost = $('#ecost').val();
        var retail = $('#eretail').val();
        var qty = $('#eqty').val();
        //var prodImage =  getfilename($("#prod_image").val());
        var image = $("#eprod_image").val();
        if (image != "") {
            var extension = image.substring(image.lastIndexOf('.')+1);
            var prodImage = sku + "." + extension;
        }
        else {
            //alert("image not changed");
            var x = $('#ep_image')[0].src;
            var prodImage = x.substring(x.lastIndexOf('/')+1);

        }
        // alert(prodImage);
        // alert(image);
        // alert(extension);

        $.ajax({
            type: "POST",
            url: "/perl/jadrn011/proj1/edit_inventory.cgi", 
            data: "sku=" + sku + "&category=" + category + "&vendor=" + vendor + 
            "&manIdent=" + manIdent + "&description=" + description + "&features=" + features + 
            "&cost=" + cost + "&retail=" + retail + "&qty=" + qty + "&prodImage=" + prodImage,
            
            success: function(data){
                //alert(data);
                if(data=="Unauthorised"){
                    window.location.replace("http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi");       
                }
                
                $("#edSKU").text(sku);
                $("#edCat").text(category);
                $("#edVend").text(vendor);
                $("#edMI").text(manIdent);
                $("#edDesc").text(description);
                $("#edFeat").text(features);
                $("#edCost").text(cost);
                $("#edRet").text("$ " + retail);
                $("#edQty").text(qty);
                editInventoryHandle(data);
            },
            error: function() { 
              alert("There is a server issue. Please try again.");
            },   
        });
    }

    function editInventoryHandle(data) {
        hideEditInventory();
    }

    function hideEditInventory() {
        if (document.getElementById('Edit')) {
            if (document.getElementById('Edit').style.display != 'none') {
                document.getElementById('Edit').style.display = 'none';
                document.getElementById('displayEditInventory').style.display = 'block';
            }
        }
    }

    function showEditInventory() {
        if (document.getElementById('Edit')) {
            if (document.getElementById('Edit').style.display == 'none') {
                document.getElementById('Edit').style.display = 'block';
                document.getElementById('displayEditInventory').style.display = 'none';
            }
        }
    }



    function delete_inventory() {
        var sku = $('#dsku').val();
        var c = document.getElementById("dcategory");
        var category = c.options[c.selectedIndex].text;
        var v = document.getElementById("dvendor");
        var vendor = v.options[v.selectedIndex].text;
        var manIdent = $('#dman_ident').val();
        var description = $('#ddescription').val();
        var features = $('#dfeatures').val();
        var cost = $('#dcost').val();
        var retail = $('#dretail').val();
        var qty = $('#dqty').val();
        $.ajax({
            type: "POST",
            url: "/perl/jadrn011/proj1/delete_inventory.cgi", 
            data: "sku=" + sku,
             
            success: function(data){
                //alert(data);
                if(data=="Unauthorised"){
                    window.location.replace("http://jadran.sdsu.edu/perl/jadrn011/proj1/logout.cgi");       
                }
                
                $("#dSKU").text(sku);
                $("#dCat").text(category);
                $("#dVend").text(vendor);
                $("#dMI").text(manIdent);
                $("#dDesc").text(description);
                $("#dFeat").text(features);
                $("#dCost").text(cost);
                $("#dRet").text("$ " + retail);
                $("#dQty").text(qty);
                deleteInventoryHandle(data);
            },
            error: function() { 
              alert("There is a server issue. Please try again.");
            },   
        });
    }

    function deleteInventoryHandle(data) {
        hideDeleteInventory();
    }


    function showDeleteInventory() {
        if (document.getElementById('Delete')) {
            if (document.getElementById('Delete').style.display == 'none') {
                document.getElementById('Delete').style.display = 'block';
                document.getElementById('displayDeleteInventory').style.display = 'none';
            }
        }
    }

    function hideDeleteInventory() {
        if (document.getElementById('Delete')) {
            if (document.getElementById('Delete').style.display != 'none') {
                document.getElementById('Delete').style.display = 'none';
                document.getElementById('displayDeleteInventory').style.display = 'block';
            }
        }
    }


    function clearEditInventory() {
        document.getElementById("esku").value = "";
        $("#ecategory").val(0);
        $("#evendor").val(0);
        document.getElementById("eman_ident").value = "";
        $("#edescription").text("");
        $("#efeatures").text("");
        document.getElementById("ecost").value = "";
        document.getElementById("eretail").value = "";
        document.getElementById("eqty").value = "";
        $('#eprod_image').val("");
        $('#ep_image').prop('src', '/~jadrn011/proj1/no-image.jpg');
        disable_edit();   
        $('div#status').text("");
        $('#pic').html("&nbsp;");
    }

    function clearEditInventoryDetails() {
        $("#edSKU").text("");
        $("#edCat").text("");
        $("#edVend").text("");
        $("#edMI").text("");
        $("#edDesc").text("");
        $("#edFeat").text("");
        $("#edCost").text("");
        $("#edRet").text("");
        $("#edQty").text("");
    }

    function clearDeleteInventory() {
        document.getElementById("dsku").value = "";
        $("#dcategory").val(0);
        $("#dvendor").val(0);
        document.getElementById("dman_ident").value = "";
        $("#ddescription").text("");
        $("#dfeatures").text("");
        document.getElementById("dcost").value = "";
        document.getElementById("dretail").value = "";
        document.getElementById("dqty").value = "";
        $('#dprod_image').val("");
        $('#dp_image').prop('src', '/~jadrn011/proj1/no-image.jpg');
        disable_delete();
        $('div#status').text("");
        $('#pic').html("&nbsp;");
        
    }

    function clearDeleteInventoryDetails() {
        $("#dSKU").text("");
        $("#dCat").text("");
        $("#dVend").text("");
        $("#dMI").text("");
        $("#dDesc").text("");
        $("#dFeat").text("");
        $("#dCost").text("");
        $("#dRet").text("");
        $("#dQty").text("");
    }

    var editSendFile = false;
    function displayTask(event, clickedTab) {
        var container, tabs;

        container = document.getElementsByClassName("container");
        tabs = document.getElementsByClassName("tabs");
        for (var i=0; i < tabs.length; i++) {
            tabs[i].className = tabs[i].className.replace(" activeItem", "");
        }

        for (var i=0; i < container.length; i++) {
            container[i].style.display = "none";
        }

        document.getElementById(clickedTab).style.display = "block";
        event.currentTarget.className += " activeItem";

        if (clickedTab == "newInventory"){
            editSendFile = false;
            clearNewInventory();
            $("#sku").focus();
        }

        if (clickedTab == "editInventory"){
            clearEditInventory();
            editSendFile = true;
        }
        if (clickedTab == "deleteInventory"){
            editSendFile = false;
            clearDeleteInventory();
        }
    } 
 

    // https://www.w3schools.com/js/js_cookies.asp
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

var addBlur = false;

$(document).ready( function() {
    // checkAuthenticated();
    // function disableBack() { window.history.forward() }

    // window.onload = disableBack();

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
    elementHandle[10] = $('[name="esku"]');
    elementHandle[11] = $('[name="ecategory"]');
    elementHandle[12] = $('[name="evendor"]');
    elementHandle[13] = $('[name="eman_ident"]');
    elementHandle[14] = $('[name="edescription"]');
    elementHandle[15] = $('[name="efeatures"]');
    elementHandle[16] = $('[name="ecost"]');
    elementHandle[17] = $('[name="eretail"]');
    elementHandle[18] = $('[name="eqty"]');
    elementHandle[19] = $('[name="eprod_image"]');
    elementHandle[10].focus();
    elementHandle[20] = $('[name="dsku"]');
    elementHandle[20].focus();
    document.getElementById('displayNewInventory').style.display = 'none';
    document.getElementById('displayEditInventory').style.display = 'none';
    document.getElementById('displayDeleteInventory').style.display = 'none';

    document.getElementById('newInvent').click();
    displayProductImage("Start");
   
/////// HANDLERS

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
            errorStatusHandle.text("The retail price of the product might not be zero. Please enter correct retail")
            elementHandle[7].focus();            
            return false;
            }
        if(!(elementHandle[7].val() >= (1.25 * elementHandle[6].val()))) {
            elementHandle[7].addClass("error");
            errorStatusHandle.text("The retail price of the product might be 25% above the cost of the product")
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
        if(elementHandle[8].val() <= 0) {
            elementHandle[8].addClass("error");
            errorStatusHandle.text("The quantity of the product must be greater than zero ");
            elementHandle[8].focus();            
            return false;
            }
        if(!(isInteger(elementHandle[8].val()))) {
            alert(elementHandle[8].val());
            elementHandle[8].addClass("error");
            errorStatusHandle.text("The quantity appears to be invalid, "+
            "please restrict to integer numbers only ");
            elementHandle[8].focus();            
            return false;
            }




        if (size == 0) {
            elementHandle[9].addClass("error");
            errorStatusHandle.text("Please select an image file");
            elementHandle[9].focus();            
            return false;
            }
        if (size/1000 > 2000) {
            elementHandle[9].addClass("error");
            errorStatusHandle.text("File is too big, maximum file-size allowed is 1MB");
            elementHandle[9].focus();            
            return false;
            }
        return true;
    } 


    function isValidEditData() {
        if(isEmpty(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("Please enter SKU of the product");
            elementHandle[10].focus();
            return false;
            }
        if(!isSKUFormatCorrect(elementHandle[10].val())) {
            elementHandle[10].addClass("error");
            errorStatusHandle.text("The SKU entered appears to be invalid, "+
            "please enter sku in format XXX-###.");
            elementHandle[10].focus();            
            return false;
            }
        if(elementHandle[11].val() == 0) {
            elementHandle[11].addClass("error");
            errorStatusHandle.text("Please enter category of the product");
            elementHandle[11].focus();            
            return false;
            }
        if(elementHandle[12].val() == 0) {
            elementHandle[12].addClass("error");
            errorStatusHandle.text("Please enter vendor of the product");
            elementHandle[12].focus();           
            return false;
            }
        if(isEmpty(elementHandle[13].val())) {
            elementHandle[13].addClass("error");
            errorStatusHandle.text("Please enter Manufaturer's Identity of the product");
            elementHandle[13].focus();            
            return false;
            }
        if(isEmpty(elementHandle[14].val())) {
            elementHandle[14].addClass("error");
            errorStatusHandle.text("Please enter a description for the product");
            elementHandle[14].focus();            
            return false;
            }
        if(isEmpty(elementHandle[15].val())) {
            elementHandle[15].addClass("error");
            errorStatusHandle.text("Please enter features of the product");
            elementHandle[15].focus();            
            return false;
            }
        if(isEmpty(elementHandle[16].val())) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("Please enter cost of the product");
            elementHandle[16].focus();            
            return false;
            }            
        if(!$.isNumeric(elementHandle[16].val())) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("The cost entered appears to be invalid, "+
            "numbers only please. ");
            elementHandle[16].focus();            
            return false;
            }
        if(elementHandle[16].val() == 0) {
            elementHandle[16].addClass("error");
            errorStatusHandle.text("The cost of the product might not be zero. Please enter correct cost")
            elementHandle[16].focus();            
            return false;
            }   
        if(isEmpty(elementHandle[17].val())) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("Please enter retail price of the product");
            elementHandle[17].focus();            
            return false;
            }           
        if(!$.isNumeric(elementHandle[17].val())) {
            elementHandle[17].addClass("error");
            errorStatusHandle.text("The retail price appears to be invalid, "+
            "numbers only please. ");
            elementHandle[17].focus();            
            return false;
            }
        if(elementHandle[17].val() == 0) {
            //alert("zero");
            elementHandle[17].addClass("error");
            errorStatusHandle.text("The retail price of the product might not be zero. Please enter correct retail")
            elementHandle[17].focus();            
            return false;
            }
        if(parseFloat(elementHandle[17].val()) < parseFloat(elementHandle[16].val())) {
            //alert("greater");
            elementHandle[17].addClass("error");
            errorStatusHandle.text("The retail price of the product might not be less than the cost of the product")
            elementHandle[17].focus();            
            return false;
            }
        if(isEmpty(elementHandle[18].val())) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("Please enter the quantity of the product");
            elementHandle[18].focus();            
            return false;
            }            
        if(!$.isNumeric(elementHandle[18].val())) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("The quantity appears to be invalid, "+
            "numbers only please. ");
            elementHandle[18].focus();            
            return false;
            }
        if(elementHandle[18].val() <= 0) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("The quantity of the product must be greater than zero ");
            elementHandle[18].focus();            
            return false;
            }
        if(!(isInteger(elementHandle[18].val()))) {
            elementHandle[18].addClass("error");
            errorStatusHandle.text("The quantity appears to be invalid, "+
            "please restrict to integer numbers only ");
            elementHandle[18].focus();            
            return false;
            }
        

        // if (sizeEdit == 0) {
        //     elementHandle[19].addClass("error");
        //     errorStatusHandle.text("Please select an image file");
        //     elementHandle[19].focus();            
        //     return false;
        //     }
        if (sizeEdit/1000 > 2000) {
            elementHandle[19].addClass("error");
            errorStatusHandle.text("File is too big, maximum file-size allowed is 1MB");
            elementHandle[19].focus();            
            return false;
            }
        return true;
    } 




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
        displayProductImage("Add");
		});

    $('input[name="prod_image"]').on('click',function(e) {
        elementHandle[9].removeClass("error");
        errorStatusHandle.text("");
        });
	

    // elementHandle[10].on('blur', function() {
    //     if(isEmpty(elementHandle[10].val()) )
    //         return;
    //     $(this).removeClass("error");
    //     errorStatusHandle.text("");
    //     });
    elementHandle[11].on('blur', function() {
        if(isEmpty(elementHandle[11].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[12].on('blur', function() {
        if(isEmpty(elementHandle[12].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[13].on('blur', function() {
        if(isEmpty(elementHandle[13].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[14].on('blur', function() {
        if(isEmpty(elementHandle[14].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[15].on('blur', function() {
        if(isEmpty(elementHandle[15].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[16].on('blur', function() {
        if(isEmpty(elementHandle[16].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[17].on('blur', function() {
        if(isEmpty(elementHandle[17].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });
    elementHandle[18].on('blur', function() {
        if(isEmpty(elementHandle[18].val()))
            return;
        $(this).removeClass("error");
        errorStatusHandle.text("");
        });

/////////////////////////////////////////////////////////////////        
    
    var flag_eimg = false;
    var flag_esku = false;
    $('input[name="eprod_image"]').on('change',function(e) {
        flag_eimg = true;
        // document.getElementById("eprod_image").style.color = "black";
        // document.getElementById("eprod-image-label").style.visibility = "hidden"
        $('div#status').text("");
        sizeEdit = this.files[0].size;
        elementHandle[19].removeClass("error");
        errorStatusHandle.text("");
        displayProductImage("Edit");
        });

    $('input[name="eprod_image"]').on('click',function(e) {
        elementHandle[19].removeClass("error");
        errorStatusHandle.text("");
        });
    



	$(elementHandle[0]).on('blur', function() {
        // var sku = $('#sku').val();
        // if(!sku) return;
        // var url = "http://jadran.sdsu.edu/perl/jadrn011/proj1/check_dup.cgi?sku="+sku;
        // $.get(url, process_reply);
        //elementHandle[0].removeClass("error");
        check_duplicate_record();
    });


    $("#eclear-btn").on("click", function() {
        clearEditInventory();
    });

    $("#dclear-btn").on("click", function() {
        clearDeleteInventory();
    });

    $("#clear-btn").on("click", function() {
        clearNewInventory();
    });

    $("#add-invent-btn").on("click", function(e) {
        e.preventDefault();
        if(isValidData()){
            for(var i=0; i < 10; i++) {
                elementHandle[i].removeClass("error");
            } 
            errorStatusHandle.text("");
            check_duplicate_record();
            processUpload();
        }
    }); 

    $("#add-invent-backbtn").on("click", function(e) {
        clearNewInventory();
        clearNewInventoryDetails();
        showNewInventory();
    }); 


    $(elementHandle[10]).on('blur', function() {
        //$("#eprod_image").style.color = "white";
        check_record_exists();
        // if (flag_eimg == false || flag_esku == true) {
        //     document.getElementById("eprod_image").style.color = "white";
        //     document.getElementById("eprod-image-label").style.visibility = "display"
        // }
    });



    $(elementHandle[20]).on('blur', function() {
        check_record_exists();
    });


    $("#edit-invent-btn").on("click", function(e) {
        e.preventDefault();
        if(isValidEditData()){
            for(var i=10; i < 20; i++) {
                elementHandle[i].removeClass("error");
            } 
            errorStatusHandle.text("");
            //check_record_exists();
            if (flag_eimg) {
                uploadImage(document.getElementById("eprod_image"));
            }
            else {
                edit_inventory();
            }
        }
    }); 

    $("#edit-invent-backbtn").on("click", function(e) {
        clearEditInventory();
        clearEditInventoryDetails();
        showEditInventory();
    }); 

    $("#delete-invent-btn").on("click", function(e) {
        e.preventDefault();
        check_record_exists();
        delete_inventory();
    }); 

    $("#delete-invent-backbtn").on("click", function(e) {
        clearDeleteInventory();
        clearDeleteInventoryDetails();
        showDeleteInventory();
    }); 


        
    $(':reset').on('click', function() {
        for(var i=0; i < 10; i++)
            elementHandle[i].removeClass("error");
        errorStatusHandle.text("");
    });                                       
});