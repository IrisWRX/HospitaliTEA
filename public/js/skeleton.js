//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
// //---------------------------------------------------
function loadSkeleton() {
    // Load the footer regardless of login status
    $('#footerPlaceholder').load('./footer.html', function (response, status, xhr) {
        console.log('Loaded footer:', status);
        if (status == 'error') {
            console.log('Error loading footer:', xhr.status, xhr.statusText);
        }
    })
    $('#navbarPlaceholder').load('./navbar.html', function (response, status, xhr) {
        console.log('Loaded navbar:', status);
        if (status == 'error') {
            console.log('Error loading navbar:', xhr.status, xhr.statusText);
        }
    })
    ;
}

loadSkeleton(); // Invoke the function
