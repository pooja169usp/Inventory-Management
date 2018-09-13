use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::Password;

##---------------------------- MAIN ---------------------------------------
print "Content-type: text/html\n\n";

my $q = new CGI;
my $user = "";


if(authenticate_user()) {
    send_to_main();   
    
else {
    send_to_login_error();
    }    
###########################################################################

###########################################################################
sub authenticate_user {
    $user = $q->param("username");
    my $password = $q->param("password");       
    open DATA, "</srv/www/cgi-bin/jadrn011/passwords.dat" 
        or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0; #not authorized

    foreach $line (@file_lines) {
        chomp $line;
        ($stored_user, $stored_pass) = split /=/, $line;    
    if($stored_user eq $user && check_password($stored_pass, $password)) {
        # create cookie and sen to browser
        $OK = 1;
        last;
        }
    }
else {
    # clear cookie and send to browser. $OK=0
}
          
    return $OK;
    }
###########################################################################

###########################################################################
sub send_to_login_error {
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
# Always start a new one.  \
# This example uses URL re-writing
  
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1m');
    my $cookie = $q->cookie(jadrn011SID => $session->id);
    print $q->header( -cookie=>$cookie );
    print $q->header( -Cache_control => 'no-cache' );    
    my $sid = $session->id;

print <<END;
   
    <html>
    <head>
        <meta http-equiv="refresh" 
            content=".0; url=http://jadran.sdsu.edu/perl/jadrn011/proj1/admin.cgi" />
    </head><body></body>
    </html>
END
}
###########################################################################    
    

