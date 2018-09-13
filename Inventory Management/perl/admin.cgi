#!/usr/bin/perl

#    Guggari, Pooja Maheshwar. 
#    Class Account# jadrn011 
#    Spring 2018


use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::Password;

##---------------------------- MAIN ---------------------------------------

my $q = new CGI;

my $cookie_sid = $q->cookie('jadrn011SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
    send_to_login_error();
}
else{
    send_to_main();
}





###########################################################################

###########################################################################
sub send_to_login_error {

print "Content-type: text/html\n";
print <<END;

    <html>
    <head>
        <meta http-equiv="refresh" 
            content="0; url=http://jadran.sdsu.edu/~jadrn011/proj1/error.html" />
    </head><body></body>
    </html>

END
    }  
    
###########################################################################
      
###########################################################################
sub send_to_main {

# args are DRIVER, CGI OBJECT, SESSION LOCATION
# default for undef is FILE, NEW SESSION, /TMP 
# for login.html, don't look for any existing session.
# Always start a new one.  Send a cookie to the browser.
# Default expiration is when the browser is closed.
# WATCH YOUR COOKIE NAMES! USE JADRNXXX_SID  
# Ref: https://www.quackit.com/javascript/tutorial/javascript_void_0.cfm

    # my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    # $session->expires('+1d');
    # my $cookie = $q->cookie(jadrn011SID => $session->id);
    # print $q->header( -cookie=>$cookie );   
    # my $sid = $session->id;
    print <<END;
Content-type: text/html

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8" />
  <meta http-equiv="Cache-Control" content="private, no-cache, no-store, must-revalidate, max-age=0, proxy-revalidate, s-maxage=0" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <meta http-equiv="Vary" content="*" />    
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
  <link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn011/proj1/login.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="http://jadran.sdsu.edu/~jadrn011/proj1/ajax_get_lib.js"></script>
  <script src="http://jadran.sdsu.edu/~jadrn011/proj1/admin.js"></script>
</head>
<body onunload="">

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="admin.html"><span id="brand">CME</span><br />Clicking Made Easy</a>
    </div>
    <ul class="nav navbar-nav">
      <li><a href="javascript:void(0)" class="tabs" id="newInvent" onclick="displayTask(event, 'newInventory')">New Inventory</a></li>
      <li><a href="javascript:void(0)" class="tabs" onclick="displayTask(event, 'editInventory')">Edit Inventory</a></li>
      <li><a href="javascript:void(0)" class="tabs" onclick="displayTask(event, 'deleteInventory')">Delete Inventory</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="/perl/jadrn011/proj1/logout.cgi"><span class="glyphicon glyphicon-log-out"></span>Log out</a></li>
    </ul>
  </div>
</nav>
 

<div id="newInventory" class="container">
<div id = "New">
    <form method="post" enctype="multipart/form-data" name="newInventForm" autocomplete="off">
    <div class="row" id="row1">
        <br>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">New Inventory Record</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-5">
                        SKU :
                    </div>
                    <div class="col-lg-6">
                        <input type="text" name="sku" id="sku" placeholder= "Eg: SON-001" class="form-control">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Category :
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control" name="category" id="category">
                            <option value="0">Choose Category</option>
                            <option value="1">DSLR</option>
                            <option value="2">Point and Shoot</option>
                            <option value="3">Advanced Amateur</option>
                            <option value="4">Underwater</option>
                            <option value="5">Film</option>
                            <option value="6">Mirrorless</option>
                            <option value="7">Superzoom</option>
                        </select>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Vendor :
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control" name="vendor" id="vendor">
                            <option value="0">Choose Vendor</option>
                            <option value="1">Nikon</option>
                            <option value="2">Canon</option>
                            <option value="3">Olympus</option>
                            <option value="4">Lumix</option>
                            <option value="5">Pentax</option>
                            <option value="6">Leica</option>
                            <option value="7">Sony</option>
                            <option value="8">Fuji</option>
                        </select>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Manufacturers Identifier :
                    </div>
                    <div class="col-lg-6">
                        <input type="text" placeholder="Eg: N11" class="form-control" name="man_ident" id="man_ident">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Description :
                    </div>
                     <div class="col-lg-6">
                        <textarea placeholder="Description" rows="3" class="form-control" name="description" id="description"></textarea>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Features :
                    </div>
                     <div class="col-lg-6">
                        <textarea placeholder="Features" rows="5" class="form-control" name="features" id="features"></textarea>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Cost :
                    </div>
                    <div class="col-lg-3">
                        <input type="text" class="form-control" name="cost" id="cost" maxlength="8">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Retail :
                    </div>
                    <div class="col-md-1 col-lg-zero">
                        &dollar;
                    </div>
                    <div class="col-lg-3">
                        <input type="text" class="form-control" name="retail" id="retail" maxlength="8">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Quantity :
                    </div>
                    <div class="col-lg-3">
                        <input type="number" class="form-control" name="qty" id="qty" maxlength="10">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Product Image :
                    </div>
                    <div class="col-lg-4">
                        <input type="file" accept="image/*" class="form-control" name="prod_image" id="prod_image">
                    </div>
                    <div class="col-lg-3">
                        <div class="thumbnail">
                          <img src="" alt="Product Image" id="p_image">
                        </div>
                    </div>
                </div>
                <br>
                <div id="pic"> </div>
                <br >
                <div id="status"> </div>
                <br>

                <div class="row">
                    <div class="col-lg-4">

                    </div>
                    <div class="col-lg-2">
                        <button type="reset" class="btn btn-danger" name="clear-btn" id="clear-btn">Clear Fields</button>
                    </div>
                   
                    <div class="col-lg-2">
                        <button class="btn btn-success" name="add-invent-btn" id="add-invent-btn">Add Inventory</button>
                    </div>
                    <div class="col-lg-3">
                    </div>
                </div>
                <br>
            

        </div>
    </div>
</div>
</form>
</div>

<div id="displayNewInventory">
    <div class="row" id="row1">
        <br>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Details of New Inventory Record you just added</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-5">
                        SKU :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newSKU" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Category :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newCat" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Vendor :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newVend" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Manufacturers Identifier :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newMI" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Description :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newDesc" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Features :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newFeat" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Cost :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newCost" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Retail :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newRet" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Quantity :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "newQty" ></h>
                    </div>
                </div>
                <br>


                <div class="row">
                    <div class="col-lg-4">

                    </div>
                    <div class="col-lg-2">
                        <button class="btn btn-success" name="add-invent-backbtn" id="add-invent-backbtn">Back</button>
                    </div>
                    <div class="col-lg-4">

                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</div>


<div id="editInventory" class="container">
<div id = "Edit">
    <form method="post" enctype="multipart/form-data" name="editInventForm" autocomplete="off">
    <div class="row" id="row1">
        <br>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Edit Inventory Record</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-5">
                        SKU :
                    </div>
                    <div class="col-lg-6">
                        <input type="text" name="esku" id="esku" placeholder= "Eg: SON-001" class="form-control">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Category :
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control" name="ecategory" id="ecategory">
                            <option value="0">Choose Category</option>
                            <option value="1">DSLR</option>
                            <option value="2">Point and Shoot</option>
                            <option value="3">Advanced Amateur</option>
                            <option value="4">Underwater</option>
                            <option value="5">Film</option>
                            <option value="6">Mirrorless</option>
                            <option value="7">Superzoom</option>
                        </select>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Vendor :
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control" name="evendor" id="evendor">
                            <option value="0">Choose Vendor</option>
                            <option value="1">Nikon</option>
                            <option value="2">Canon</option>
                            <option value="3">Olympus</option>
                            <option value="4">Lumix</option>
                            <option value="5">Pentax</option>
                            <option value="6">Leica</option>
                            <option value="7">Sony</option>
                            <option value="8">Fuji</option>
                        </select>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Manufacturers Identifier :
                    </div>
                    <div class="col-lg-6">
                        <input type="text" placeholder="Eg: N11" class="form-control" name="eman_ident" id="eman_ident">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Description :
                    </div>
                     <div class="col-lg-6">
                        <textarea placeholder="Description" rows="3" class="form-control" name="edescription" id="edescription"></textarea>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Features :
                    </div>
                     <div class="col-lg-6">
                        <textarea placeholder="Features" rows="5" class="form-control" name="efeatures" id="efeatures"></textarea>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Cost :
                    </div>
                    <div class="col-lg-3">
                        <input type="text" class="form-control" name="ecost" id="ecost" maxlength="8">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Retail :
                    </div>
                    <div class="col-md-1 col-lg-zero">
                        &dollar;
                    </div>
                    <div class="col-lg-3">
                        <input type="text" class="form-control" name="eretail" id="eretail" maxlength="8">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Quantity :
                    </div>
                    <div class="col-lg-3">
                        <input type="number" class="form-control" name="eqty" id="eqty" maxlength="10">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Product Image :
                    </div>
                    <div class="col-lg-4">
                        <input type="file" accept="image/*" class="form-control" name="eprod_image" id="eprod_image">
                    </div>
                    <div class="col-lg-3">
                        <div class="thumbnail">
                          <img src="" alt="Product Image" id="ep_image">
                        </div>
                    </div>
                </div>
                <br>

                <br>
                <div id="status"> </div>
                <br>

                <div class="row">
                    <div class="col-lg-4">

                    </div>
                    <div class="col-lg-2">
                        <button type="reset" class="btn btn-danger" name="eclear-btn" id="eclear-btn">Clear Fields</button>
                    </div>
                    
                    <div class="col-lg-2">
                        <button class="btn btn-success" name="edit-invent-btn" id="edit-invent-btn">Edit Inventory</button>
                    </div>
                    <div class="col-lg-3">
                    </div>
                </div>
                <br>
            

        </div>
    </div>
</div>
</form>
</div>

<div id="displayEditInventory">
    <div class="row" id="row1">
        <br>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Details of the Inventory Record you just edited</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-5">
                        SKU :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edSKU" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Category :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edCat" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Vendor :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edVend" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Manufacturers Identifier :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edMI" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Description :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edDesc" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Features :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edFeat" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Cost :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edCost" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Retail :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edRet" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Quantity :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "edQty" ></h>
                    </div>
                </div>
                <br>


                <div class="row">
                    <div class="col-lg-5">

                    </div>
                    <div class="col-lg-2">
                        <button class="btn btn-success" name="edit-invent-backbtn" id="edit-invent-backbtn">Back</button>
                    </div>
                    <div class="col-lg-4">

                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</div>


<div id="deleteInventory" class="container">
<div id = "Delete">
    <form method="post" enctype="multipart/form-data" name="deleteInventForm" autocomplete="off">
    <div class="row" id="row1">
        <br>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Delete Inventory Record</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-5">
                        SKU :
                    </div>
                    <div class="col-lg-6">
                        <input type="text" name="dsku" id="dsku" placeholder= "Eg: SON-001" class="form-control">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Category :
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control" name="dcategory" id="dcategory">
                            <option value="0">Choose Category</option>
                            <option value="1">DSLR</option>
                            <option value="2">Point and Shoot</option>
                            <option value="3">Advanced Amateur</option>
                            <option value="4">Underwater</option>
                            <option value="5">Film</option>
                            <option value="6">Mirrorless</option>
                            <option value="7">Superzoom</option>
                        </select>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Vendor :
                    </div>
                    <div class="col-lg-6">
                        <select class="form-control" name="dvendor" id="dvendor">
                            <option value="0">Choose Vendor</option>
                            <option value="1">Nikon</option>
                            <option value="2">Canon</option>
                            <option value="3">Olympus</option>
                            <option value="4">Lumix</option>
                            <option value="5">Pentax</option>
                            <option value="6">Leica</option>
                            <option value="7">Sony</option>
                            <option value="8">Fuji</option>
                        </select>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Manufacturers Identifier :
                    </div>
                    <div class="col-lg-6">
                        <input type="text" placeholder="Eg: N11" class="form-control" name="dman_ident" id="dman_ident">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Description :
                    </div>
                     <div class="col-lg-6">
                        <textarea placeholder="Description" rows="3" class="form-control" name="ddescription" id="ddescription"></textarea>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Features :
                    </div>
                     <div class="col-lg-6">
                        <textarea placeholder="Features" rows="5" class="form-control" name="dfeatures" id="dfeatures"></textarea>
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Cost :
                    </div>
                    <div class="col-lg-3">
                        <input type="text" class="form-control" name="dcost" id="dcost" maxlength="8">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Retail :
                    </div>
                    <div class="col-md-1 col-lg-zero">
                        &dollar;
                    </div>
                    <div class="col-lg-3">
                        <input type="text" class="form-control" name="dretail" id="dretail" maxlength="8">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Quantity :
                    </div>
                    <div class="col-lg-3">
                        <input type="number" class="form-control" name="dqty" id="dqty" maxlength="10">
                    </div>
                </div>
                <br>

                <div class="row">
                    <div class="col-lg-5">
                        Product Image :
                    </div>
                    <div class="col-lg-4">
                        <input type="file" accept="image/*" class="form-control" name="dprod_image" id="dprod_image">
                    </div>
                    <div class="col-lg-3">
                        <div class="thumbnail">
                          <img src="" alt="Product Image" id="dp_image">
                        </div>
                    </div>
                </div>
                <br>

                <br>
                <div id="status"> </div>
                <br>

                <div class="row">
                    <div class="col-lg-4">

                    </div>
                    <div class="col-lg-2">
                        <button type="reset" class="btn btn-danger" name="dclear-btn" id="dclear-btn">Clear Fields</button>
                    </div>
                    
                    <div class="col-lg-2">
                        <button class="btn btn-success" name="delete-invent-btn" id="delete-invent-btn">Delete Inventory</button>
                    </div>
                    <div class="col-lg-3">
                    </div>
                </div>
                <br>
            

        </div>
    </div>
</div>
</form>
</div>

<div id="displayDeleteInventory">
    <div class="row" id="row1">
        <br>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Details of the Inventory Record you just deleted</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-5">
                        SKU :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dSKU" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Category :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dCat" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Vendor :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dVend" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Manufacturers Identifier :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dMI" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Description :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dDesc" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Features :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dFeat" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Cost :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dCost" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Retail :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dRet" ></h>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-lg-5">
                        Quantity :
                    </div>
                    <div class="col-lg-6">
                        <h type = "text" id = "dQty" ></h>
                    </div>
                </div>
                <br>


                <div class="row">
                    <div class="col-lg-5">

                    </div>
                    <div class="col-lg-2">
                        <button class="btn btn-success" name="delete-invent-backbtn" id="delete-invent-backbtn">Back</button>
                    </div>
                    <div class="col-lg-4">

                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
</div>



</body>
</html>

END
}
