#!/usr/bin/perl 
  
#    Guggari, Pooja Maheshwar. 
#    Class Account# jadrn011
#    Spring 2018

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use DBI;


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn011";
my $username = "jadrn011";
my $password = "rake";
my $database_source = "dbi:mysql:$database:$host:$port";
my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn011SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
   print $q->header('text/plain;charset=UTF-8');
   print "UnAuthorised";	
return;
}

my $sku = "";
my $catid = "";
my $venid = "";
my $vendorModel = "";
my $description = "";
my $features = "";
my $cost = "";
my $retail = "";
my $quantity = "";
my $image = "";

$sku = $q->param("sku");
$catid = $q->param("category");
$venid = $q->param("vendor");
$vendorM = $q->param("manIdent");
$description = $q->param("description");
$features = $q->param("features");
$cost = $q->param("cost");
$retail = $q->param("retail");
$quantity = $q->param("qty");
$image = $q->param("prodImage");

my $categoryId="1";
my $vendorId="1";

my $dbhven = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $sth = $dbhven->prepare("Select id from vendor where name=?");
$sth->execute($venid);
$vendorId = $sth->fetchrow_array();
$sth->finish();
$dbhven->disconnect();

my $dbhcat = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $sth = $dbhcat->prepare("Select id from category where name=?");
$sth->execute($catid);
$categoryId = $sth->fetchrow_array();
$sth->finish();
$dbhcat->disconnect(); 

my $dbhdel = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $queryd = "Delete from product where sku='$sku'";
$dbhdel->do($queryd);
$dbhdel->disconnect();
 
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';
my $query = "Insert into product (sku, catID, venID, vendorModel, description, features, cost, retail, quantity, image) ";
$query .= "VALUES ('$sku', $categoryId, $vendorId,'$vendorM','$description','$features', $cost, $retail, $quantity, '$image')";
$dbh->do($query);
$dbh->disconnect();

print "Content-type: text/html\n\n";
print "Product modified in the database successfully";