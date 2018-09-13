use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::Password;

##---------------------------- MAIN ---------------------------------------
# print "Content-type: text/html\n\n";

my $q = new CGI;
my $user = "";


$user = $q->param("username");
my $password = $q->param("password");       
open DATA, "</srv/www/cgi-bin/jadrn011/passwords.dat" 
    or die "Cannot open file.";
@file_lines = <DATA>;
close DATA;

$OK = 0; #not authorized

foreach $line (@file_lines) {
    chomp $line;
    ($stored_user, $stored_pass) = split (/=/, $line);    
    if($stored_user eq $user && check_password($stored_pass, $password)) {
        $OK = 1;
        last;
    }
}

if($OK) {
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1d');
    my $cookie = $q->cookie(jadrn011SID => $session->id);
    print $q->header( -cookie=>$cookie );
}
else {
    my $cookie = $q->cookie(jadrn011SID => '');
    print $q->header( -cookie=>$cookie );    
}

print $OK;