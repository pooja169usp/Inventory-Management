#!/usr/bin/perl 

# /* 	 Guggari, Pooja Maheshwar. 
# 	 Class Account# jadrn017 
# 	 Fall 2017
# */
#!/usr/bin/perl  

use CGI;
use CGI::Cookie

$q = new CGI;


#send a blank cookie.  You must insert this into the header before
#printing anything.  Also, using the CGI module makes printing
#content-type: text/html redundant.

my $cookie = $q->cookie(-name=>'jadrn011',-value=>'',-path=>'/');
print $q->header(-cookie=>$cookie);

my %cookies = $ENV{COOKIE};
for( keys %cookies) {
print "The value of the cookie is: $cookies{$_}\n";
}

#print "<table>\n";
#my ($key, $value);
     
%cookies = CGI::Cookie->fetch;
for(keys %cookies) {
    print "$cookies{$_}\n";
    }


     
%cookies = CGI::Cookie->fetch;

my $sku = "";
my $qty = "";
    
my $v = $q->cookie('jadrn011');
   
@rows = split('\|\|',$v);
# foreach $row (@rows) {
#     ($sku, $qty) = split('\|',$row);
# } 
   
use DBI;


my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn011";
my $username = "jadrn011";
my $password = "rake";
my $database_source = "dbi:mysql:$database:$host:$port";

	
my $dbh = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db'; 

foreach $row (@rows) {
    ($sku, $qty) = split('\|',$row);
    my $sth = $dbh->prepare("INSERT INTO sales (sku, quantity, dateofpurchase) VALUES('$sku', '$qty', CURRENT_TIMESTAMP())");
	$sth->execute();
} 




$str = "Success"+$sku+$qty;
 
#print "Content-type:  text/html\n\n";
$sth->finish();
$dbh->disconnect();

    	
print $sku;
print "\n";
print $qty;




