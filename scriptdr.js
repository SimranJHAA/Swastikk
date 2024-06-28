$(document).ready(function(){
    $('#pinForm').submit(function(event){
        event.preventDefault(); // Prevent the default form submission
        
        var pinCode = $('#pin').val(); // Get the pin code from the input field
        
        // Make AJAX request to fetch clinics based on pin code
        $.ajax({
            url: 'https://chemist-database.p.rapidapi.com/pin/ ${pin}',
            type: 'GET',
            success: function(response){
                // Display the fetched clinics on the webpage
                $('#clinics').empty(); // Clear previous results
                if (response.length > 0) {
                    var clinicsList = '<h2>Clinics in Pin Code ' + pinCode + '</h2><ul>';
                    response.forEach(function(clinic){
                        clinicsList += '<li>' + clinic.name + ' - ' + clinic.address + '</li>';
                    });
                    clinicsList += '</ul>';
                    $('#clinics').html(clinicsList);
                } else {
                    $('#clinics').html('<p>No clinics found for pin code ' + pinCode + '</p>');
                }
            },
            error: function(xhr, status, error){
                $('#clinics').html('<p>Error fetching clinics. Please try again later.</p>');
                console.error(status, error); // Log error to console for debugging
            }
        });
    });
});

