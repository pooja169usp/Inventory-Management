use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use DBI;

my $q = new CGI;
my $sku = $q->param('sku');

my $host = 'opatija.sdsu.edu';
my $port = '3306';
my $database = 'jadrn011';
my $username = 'jadrn011';
my $password = 'rake';

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn011SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
	print $q->header('text/plain;charset=UTF-8');
	print "Unauthorised";	
	return;
}

my $database_source = "dbi:mysql:$database:$host:$port";
my $dbh = DBI->connect($database_source, $username, $password)
	or die "Cannot connect to DB";
	
my $sth = $dbh->prepare("SELECT * FROM product where sku='$sku'");
$sth->execute();
my $number_of_rows = $sth->rows;
my @row=$sth->fetchrow_array();
$sth->finish();
$dbh->disconnect();
print "content-type: text/html\n\n";
if($number_of_rows == 0) {
	print "DOESNOTEXIST";
}
else {
	foreach (@row) {
		print $_.'|';
	}
}