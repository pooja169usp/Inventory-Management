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