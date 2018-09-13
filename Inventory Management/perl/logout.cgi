#!/usr/bin/perl 
  
#    Guggari, Pooja Maheshwar. 
#    Class Account# jadrn011
#    Spring 2018

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn011SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
$session->flush();
my $cookie = $q->cookie(jadrn011SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  

# my $q = new CGI;
# my $cke1 = new CGI::Cookie(
# -name => $cookie,
# -value => $pwd,
# -expires => '-1m',);

# print $q->redirect(
# -cookie=>$cke1,
# -uri=>'http://jadran.sdsu.edu/~jadrn011/proj1/index.html');


print <<END;

	<html>
	<head>
	    <meta http-equiv="refresh" 
	        content=".0; url=http://jadran.sdsu.edu/~jadrn011/proj1/logout.html" />
	</head><body></body>
	</html>

END