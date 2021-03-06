#!/usr/bin/perl 

#   file upload script.  

#   
#    Guggari, Pooja Maheshwar. 
#    Class Account# jadrn011
#    Spring 2018

use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;
use CGI::Session;

####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn011/public_html/proj1/_uploadDIR_';
my $safe_filename_chars = "a-zA-Z0-9_.-";
####################################################################

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn011SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
   print $q->header('text/plain;charset=UTF-8');
   print "Unauthorised";   
return;
}

my $filename = $q->param("prod_image");
my $sku = $q->param("sku");
unless($filename) {
    die "There was a problem uploading the image; ".
        "it's probably too big.";
    }
    
my ($name, $path, $extension) = fileparse($filename, qr/\..*/);
$filename = $sku;
$filename .= $extension;
$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    }   

$filename = untaint($filename);

# get a handle on the uploaded image     
my $filehandle = $q->upload("prod_image"); 

unless($filehandle) { die "Invalid handle"; }

# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    print UPLOADFILE $_;
    }
close UPLOADFILE;

print $q->header('text/plain;charset=UTF-8');
print "Success "; 


# this is needed because mod_perl runs with -T (taint mode), and thus the
# filename is insecure and disallowed unless untainted. Return values
# from a regular expression match are untainted.
sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }

